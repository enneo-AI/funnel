# Enneo Funnel Analytics

GA4 property 551723662 (Enneo), dedicated web stream 16054667514 `Enneo Demo Funnel`, measurement ID G-DGN4ZBRG49. Created 06.10.2026. Enhanced measurement explicitly OFF for this stream. Main website stream unchanged.

## Measurement

Statistics consent is independent of Meta marketing consent. No Google script/events or journey storage before statistics consent. Google ad_storage, ad_user_data and ad_personalization stay denied; signals/ad personalization disabled. No form values, email, name or answers in GA4. URL is restricted to known routes and UTM campaign slugs (letters/digits/underscore/hyphen, max 80); other query parameters and referrer are omitted. Campaign names must not contain personal data. Local/deploy preview hosts remain silent. Pending custom domain must be explicitly added to the host allowlist when live.

One `funnel_view_<stage>` per measured journey: landing, industry, need, volume, stage, contact, calendar, private, success. B shows industry on landing, so both views fire at entry. Each question and contact has `funnel_complete_<stage>` once. Repeated views use `funnel_step_revisit`; navigation backwards sends funnel_back with target_step. Browser-tab session storage deduplicates reloads within 30 minutes of inactivity; a new idle period is marked partial if it starts mid-flow. This is an event deduplication window, not GA4 user identity; primary funnel reports count users, not raw event totals.

Other events: funnel_start, funnel_form_start, funnel_form_error (field name only), funnel_submit_attempt, funnel_submit_error, funnel_contact_valid, funnel_lead_saved, funnel_calendar_loaded, funnel_calendar_error, funnel_calendar_retry, funnel_time_selected, funnel_calendar_external, funnel_booking_confirmed, funnel_private_exit, funnel_restart.

Common dimensions: funnel_variant a/b/c, funnel_entry full/partial, funnel_mode calendar_only/crm_enabled, funnel_step. Back target is target_step. Error fields: error_field name/email/company; error_type static category only. step_time_ms excludes time while tab is hidden and is capped at 30 min. It does not measure time inside Calendly across a closed external tab.

Late consent emits only the current visible step, never reconstructs earlier events. Filter funnel_entry=full in the closed acquisition funnel. Private exits are an intentional separate outcome, not a technical form failure. Keep CRM-only Lead metrics out of current calendar_only conversion denominators while Attio is disabled.

## Primary funnel report

Closed, indirectly followed steps (allows correction/back-navigation), user-based count:
1. Landing: funnel_view_landing
2. Branche: funnel_view_industry
3. Anliegen: funnel_view_need
4. Volumen: funnel_view_volume
5. Vorhaben: funnel_view_stage
6. Kontaktformular: funnel_view_contact
7. Kalender geladen: funnel_calendar_loaded
8. Termin ausgewählt: funnel_time_selected
9. Buchung bestätigt: funnel_booking_confirmed

Use a 30-minute maximum between stages, show elapsed time. Breakdown by device category or Funnel Variante; filter to dedicated stream and Funnel Messbeginn=full. Campaign/source/medium use standard session attribution from allowlisted UTM parameters. Compare within the same dates and campaign mix; current A/B/C URLs are not randomly allocated, so differences alone do not establish a causal winner.

Question-level completion = distinct measured users with funnel_complete_<question> / users with corresponding view, respecting the same scope/window. Abandonment = missing next transition, not a browser-close event. Report why separately: error events, private exit, external-calendar click. External Calendly bookings cannot be observed by the embed once the visitor leaves the funnel.

## QA

Use ?analytics_debug=1 on live URLs for GA4 DebugView (removed from reported page URL). No automatic analytics grant. Test statistics-only (Meta remains off), denial, revocation, B embedded first question, back/revisit, validation failure, calendar error/retry. Never create an actual appointment just to test tracking. Actual booking notification handling is unit-tested with exact iframe origin/source and matching event/invitee URLs.

Google documentation: https://support.google.com/analytics/answer/9327974 ; https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic ; https://developers.google.com/analytics/devguides/collection/ga4/reference/config
