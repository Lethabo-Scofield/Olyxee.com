import { findRoleBySlug, type Role } from "./careers-roles";

const KEY = "olyxee:recent-career-application";
const RECEIPT_LIFETIME_MS = 24 * 60 * 60 * 1000;

export function rememberCareerApplication(roleSlug: string): boolean {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ roleSlug, submittedAt: Date.now() }));
    return true;
  } catch {
    return false;
  }
}

export function recentCareerApplication(): Role | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    const { roleSlug, submittedAt } = data as Record<string, unknown>;
    if (typeof roleSlug !== "string" || typeof submittedAt !== "number" ||
        submittedAt > Date.now() || Date.now() - submittedAt > RECEIPT_LIFETIME_MS) {
      sessionStorage.removeItem(KEY);
      return null;
    }
    return findRoleBySlug(roleSlug) ?? null;
  } catch {
    return null;
  }
}