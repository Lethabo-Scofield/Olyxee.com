-- Initial schema for Olyxee site
CREATE TABLE IF NOT EXISTS internships (
    code TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
