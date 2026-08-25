-- Run this in your Supabase SQL Editor to add attendance-history
-- support to a tickets table that already exists in production.
-- Safe to run even if columns already exist (IF NOT EXISTS).

alter table tickets add column if not exists event_name text;
alter table tickets add column if not exists event_date text;

create index if not exists tickets_email_idx on tickets (email);

-- Backfill existing rows with the current event, so past tickets also
-- show up correctly in attendance history. Adjust the values below to
-- match what EVENT_NAME / EVENT_DATE were set to for those purchases.
update tickets
set event_name = 'FUNKTION', event_date = 'TBA'
where event_name is null;
