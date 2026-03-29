import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email: rawEmail, message, tool } = req.body;

  if (!rawEmail || typeof rawEmail !== "string" || !rawEmail.includes("@")) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const email = rawEmail.trim().toLowerCase();

  try {
    ensureDataDir();

    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const entries = JSON.parse(raw);

    const exists = entries.some((e: { email: string }) => e.email === email);
    if (exists) {
      return res.status(200).json({ success: true, message: "You're already on the list!" });
    }

    entries.push({
      email,
      message: message?.trim() || "",
      tool: tool || "general",
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");

    return res.status(200).json({ success: true, message: "You're in! We'll be in touch." });
  } catch (err) {
    console.error("Waitlist error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
