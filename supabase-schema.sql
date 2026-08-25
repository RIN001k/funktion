-- Run this once in your Supabase project's SQL editor
-- (Project → SQL Editor → New query → paste → Run)

create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  age int,
  stripe_session_id text not null unique,
  qr_token text not null unique,
  status text not null default 'valid' check (status in ('valid', 'used')),
  checked_in_at timestamptz,
  price_paid int not null default 0,
  event_name text,
  event_date text,
  created_at timestamptz not null default now()
);

create index if not exists tickets_email_idx on tickets (email);

create index if not exists tickets_qr_token_idx on tickets (qr_token);

-- Row Level Security: only the server (using the service role key) can
-- read/write. The public/anon key has no access at all — the app never
-- uses the anon key, but this keeps things safe by default.
alter table tickets enable row level security;
