-- Run this ONCE in Supabase → SQL Editor → New query → paste → Run,
-- BEFORE deploying the presale / student / non-student version of the site.
-- Adds a ticket_type column ('presale', 'student' or 'regular').
-- Existing tickets become 'regular'. Safe to run more than once.

alter table tickets
  add column if not exists ticket_type text not null default 'regular';

alter table tickets drop constraint if exists tickets_ticket_type_check;
alter table tickets
  add constraint tickets_ticket_type_check
  check (ticket_type in ('presale', 'student', 'regular'));

create index if not exists tickets_event_type_idx
  on tickets (event_name, event_date, ticket_type);
