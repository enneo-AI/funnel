# Website funnel integration — work in progress

The blueprint is a saved inactive starter, not a finished automation. Existing Meta Lead Ads and CRM scenarios remain separate. Website flow must be completed and tested before enabling MAKE_FUNNEL_ENABLED.

Expected sequence:
1. Custom webhook authenticated with x-make-apikey. URL/key stored only as Netlify server secrets.
2. Sequential processing; idempotency by submission_id in Make data store. Retries must return the previous successful receipt rather than duplicate CRM notes or Meta events.
3. Attio upsert Person by email_addresses. Preserve existing fields; add the submitted name, company and answers in a new note, do not replace existing descriptions or invent company-domain relationships.
4. Add structured note to the Person, including source, variant, industry/need/volume/stage, route (business/review is NOT sales-qualified) and submission_id.
5. Webhook response only after successful save/note: HTTP 200 application/json, {"status":"saved","submission_id":"<incoming submission_id>","attio_record_id":"<actual Attio person UUID>"}. Never treat the default Make Accepted response as completion.
6. Meta CAPI Lead only if meta.consent is true. Map only the supplied meta fields, not contact or answers. Website Pixel ID 1573099514138831, action_source website; event_id matches browser Lead. CAPI failure must be retained for retry, not discard the already stored CRM lead. Return CRM acknowledgement independently of CAPI delivery.

No raw contact values are part of the proposed CAPI payload. IP/UA matching only initially. fbc/fbp and hashed contact matching have not been implemented. Do not claim full matching quality.

Server endpoint /api/lead validates origin, body size, fields and lead route; rate limit 10/min/IP+domain. Runtime enable flag defaults off. /api/funnel-config reports only feature availability, no credentials.

Calendly Schedule is currently a browser event triggered only by a valid postMessage from the actual iframe and exact calendly.com origin. For server Schedule, configure a verified Calendly webhook (signature/API verification), matching consent and the same invitee-based event ID. Never accept a bare browser event as server-side proof of a booking.

Required remaining external configuration: authenticated Make webhook/key; Attio mapping/note/idempotency/response; Meta CAPI credential (approval pending); server-side booking verification; Netlify secrets; real end-to-end CRM test. No activation until complete.
