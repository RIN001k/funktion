import { supabaseAdmin } from "./supabase";
import { EVENT_NAME, EVENT_DATE } from "./stripe";
import { PRESALE_LIMIT, SALES_OPEN, TICKET_TYPES } from "./tickets";

// Presale counts only tickets of the CURRENT event (EVENT_NAME +
// EVENT_DATE), so switching those env vars for the next event starts a
// fresh presale of PRESALE_LIMIT tickets automatically.
export async function getPresaleSold(): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("tickets")
    .select("id", { head: true, count: "exact" })
    .eq("event_name", EVENT_NAME)
    .eq("event_date", EVENT_DATE)
    .eq("ticket_type", "presale");

  if (error) throw error;
  return count || 0;
}

export async function getTicketOptions() {
  // Sales closed: no need to ask the database at all.
  const sold = SALES_OPEN ? await getPresaleSold() : 0;
  const remaining = Math.max(0, PRESALE_LIMIT - sold);
  return {
    salesOpen: SALES_OPEN,
    presaleOpen: SALES_OPEN && remaining > 0,
    presaleRemaining: remaining,
    presaleLimit: PRESALE_LIMIT,
    prices: {
      presale: TICKET_TYPES.presale.priceCents,
      student: TICKET_TYPES.student.priceCents,
      regular: TICKET_TYPES.regular.priceCents,
    },
  };
}
