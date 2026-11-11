-- Run ONCE in Supabase → SQL Editor, AFTER deploying the version with
-- permanent passes. Allows ticket_type 'staff' (a QR that works at every
-- event and never gets used up) and turns Rin's guest pass into one.

alter table tickets drop constraint if exists tickets_ticket_type_check;
alter table tickets
  add constraint tickets_ticket_type_check
  check (ticket_type in ('presale', 'student', 'regular', 'guest', 'staff'));

update tickets
set ticket_type = 'staff',
    status = 'valid',
    event_name = 'ALL EVENTS',
    event_date = 'PERMANENT'
where qr_token = 'ac202f13d3d14afbf0beb5092ccacc4a';
