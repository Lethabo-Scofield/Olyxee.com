import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

export const pool =
  global.__pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  global.__pgPool = pool;
}

export interface Internship {
  code: string;
  full_name: string;
  role_title: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
}
