import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { currentPlatformUser, currentSessionToken, hashPassword, hashToken, verifyPassword } from "@/lib/platform-auth";
import { readJson, rejectCrossSite } from "@/lib/platform-request";

export const runtime = "nodejs";

export async function PATCH(req: Request) {
  const rejected = rejectCrossSite(req);
  if (rejected) return rejected;
  const user = await currentPlatformUser();
  if (!user) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    if (body.action === "password") {
      const current = typeof body.currentPassword === "string" ? body.currentPassword : "";
      const next = typeof body.newPassword === "string" ? body.newPassword : "";
      if (next.length < 12 || next.length > 128 || !current) {
        return NextResponse.json({ error: "Enter your current password and a new password of at least 12 characters." }, { status: 400 });
      }
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await client.query<{ password_hash: string }>("SELECT password_hash FROM platform_users WHERE id = $1 FOR UPDATE", [user.id]);
        if (!result.rows[0] || !(await verifyPassword(current, result.rows[0].password_hash))) {
          await client.query("ROLLBACK");
          return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
        }
        await client.query("UPDATE platform_users SET password_hash = $1, updated_at = now() WHERE id = $2", [await hashPassword(next), user.id]);
        const token = await currentSessionToken();
        await client.query("DELETE FROM platform_sessions WHERE user_id = $1 AND token_hash <> $2", [user.id, hashToken(token ?? "")]);
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
      return NextResponse.json({ ok: true });
    }
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    if (!name || name.length > 120 || company.length > 120) {
      return NextResponse.json({ error: "Enter a name of up to 120 characters." }, { status: 400 });
    }
    await pool.query("UPDATE platform_users SET name = $1, company = $2, updated_at = now() WHERE id = $3", [name, company, user.id]);
    return NextResponse.json({ ok: true, user: { name, company } });
  } catch (error) {
    console.error("Platform profile update failed", error);
    return NextResponse.json({ error: "Could not save changes. Please try again." }, { status: 503 });
  }
}