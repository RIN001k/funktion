import { createClient } from "@supabase/supabase-js";

// This client uses the SERVICE ROLE key and must only ever be imported
// from server-side code (API routes, server components). Never expose
// this client or the service role key to the browser.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export type Ticket = {
  id: string;
  email: string;
  name: string;
  age: number | null;
  stripe_session_id: string;
  qr_token: string;
  status: "valid" | "used";
  checked_in_at: string | null;
  price_paid: number;
  created_at: string;
};
