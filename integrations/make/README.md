# Website funnel integration — work in progress

The blueprint is saved as inactive Make scenario 7804901. Make validation reports only the missing webhook. It has not passed a full CRM end-to-end test. Existing Meta Lead Ads and CRM scenarios remain separate. Website flow must be completed and tested before enabling MAKE_FUNNEL_ENABLED.

Expected sequence:
1. Custom webhook authenticated with x-make-apikey. URL/key stored only as Netlify server secrets.
2. Parallel execution because Make rejects Webhook Response in sequential mode. Data store 208824 checks the server-generated fingerprint; atomic pending-<fingerprint> insertion claims new work (overwrite false). Saved fingerprints take the existing-response branch. Lock errors respond 409 and Ignore. A failure after claiming must be resumed via Make incomplete executions; do not blindly clear claims or replay notes. A failed store write after note creation needs reconciliation before retry.
3. Attio upsert Person by email_addresses. Preserve existing fields; add the submitted name, company and answers in a new note, do not replace existing descriptions or invent company-domain relationships.
4. Add structured note to the Person, including source, variant, industry/need/volume/stage, route (business/review is NOT sales-qualified) and submission_id.
5. Webhook response only after successful save/note: HTTP 200 application/json, {"status":"saved","submission_id":"<incoming submission_id>","attio_record_id":"<actual Attio person UUID>"}. Never treat the default Make Accepted response as completion.
6. Meta CAPI Lead only if meta.consent is true. Map only the supplied meta fields, not contact or answers. Website Pixel ID 1573099514138831, action_source website; event_id matches browser Lead. CAPI failure must be retained for retry, not discard the already stored CRM lead. Return CRM acknowledgement independently of CAPI delivery.

No raw contact values are part of the proposed CAPI payload. IP/UA matching only initially. fbc/fbp and hashed contact matching have not been implemented. Do not claim full matching quality.

Server endpoint /api/lead validates origin, body size, fields and lead route; rate limit 10/min/IP+domain. Runtime enable flag defaults off. /api/funnel-config reports only feature availability, no credentials.

Calendly Schedule is currently a browser event triggered only by a valid postMessage from the actual iframe and exact calendly.com origin. For server Schedule, configure a verified Calendly webhook (signature/API verification), matching consent and the same invitee-based event ID. Never accept a bare browser event as server-side proof of a booking.

Required remaining external configuration: authenticated Make webhook/key; Attio mapping/note/idempotency/response end-to-end verification; authenticated Funnel webhook (separate-key approval pending), Netlify login/settings; server-side booking verification; Netlify secrets; real end-to-end CRM test. No activation until complete.

## Verified external state

- Attio connection `11644089`, name `enneo attio`, account shown as tristan@enneo.ai (Enneo), supplied by user in Make.
- User explicitly approved creating a CAPI token for Website_Pixel 1573099514138831 without Dataset Quality API, saved only in Make. Make HTTP v4 API-key keychain `260644`, name `Enneo Website Pixel 1573099514138831 — CAPI`. Token is not in code/files.
- Isolated HTTP test on 06.10.2026 17:48 Budapest: status 200; Meta Test Events showed `FunnelIntegrationTest` / `Server` / `Verarbeitet`, event ID `enneo-capi-setup-20261006`, test code TEST21141. Only synthetic documentation IP/UA, no customer or CRM data. Production blueprint uses server-serialized meta_json, no fixed test body.
- Draft https://eu1.make.com/3026829/scenarios/7804901/edit. Still INACTIVE; webhook unset, Netlify MAKE_FUNNEL_ENABLED false.
- Next: approve/create independent webhook key, configure authenticated webhook, wire its ID into module 1, add server-only Netlify secrets, verify new/duplicate/no-consent flows against a labelled CRM test record, then activate. Set scheduling to Immediately as data arrives; import can reset scheduling.
