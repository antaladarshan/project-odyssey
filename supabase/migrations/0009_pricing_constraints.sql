-- Security follow-up to 0008_pricing.sql: the RLS policy on rate_plans and
-- pricing_rules only checks auth.role() = 'authenticated' (same blanket
-- policy every Phase-1 table uses), so range validation on base_price and
-- the discount percentages previously existed only in the Next.js server
-- action (src/lib/actions/pricing.ts) and could be bypassed by any
-- authenticated session writing directly via PostgREST. Since bad values
-- here flow straight through to a negative/free guest-facing price (see
-- calcPricing() in src/lib/pricing.ts), enforce the same bounds at the
-- database layer.

alter table rate_plans
  add constraint rate_plans_base_price_positive check (base_price > 0);

alter table pricing_rules
  add constraint pricing_rules_pct_range check (
    weekly_discount_pct   between 0 and 100 and
    extended_discount_pct between 0 and 100 and
    monthly_discount_pct  between 0 and 100 and
    weekend_discount_pct  between 0 and 100
  );
