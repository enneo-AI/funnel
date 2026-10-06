# Meta Funnel Tracking — 2026-10-06

Verified in Enneo GmbH Events Manager: existing Website_Pixel 1573099514138831. Before installation no activity received. No duplicate pixel created; no access permissions changed.

Consent-gated browser integration in src/tracking.mjs. No remote script before marketing consent. Reject/revoke supported, stored choice expires after 180 days. Localhost and deploy-preview hosts never send. No noscript tracking fallback. Pixel autoConfig disabled; no contact data used for advanced matching.

| Event | Trigger |
|---|---|
| PageView | Once per page load after consent |
| FunnelStart | Demo CTA |
| FunnelStepView | Forward navigation to a question |
| FunnelStepComplete | Completed question / preselected industry in B |
| ContactPreviewComplete | Validated preview contact form, NOT a stored lead |
| CalendarPreviewView | Preview calendar opened |
| BookingPreviewComplete | Example slot confirmed, NOT a booking |
| CalendlyOpen | Outbound link clicked, NOT a confirmed booking |

All events carry funnel_variant=a/b/c and funnel_mode=preview. Question events carry only the field name, not the answer. No form PII sent. Meta receives its normal browser/network/URL metadata. Campaign URLs must not contain PII.

No Lead/Schedule/Purchase conversion is implemented. Qualification is provisional. No CAPI, CRM sync, GA4, randomized variant allocation, or cross-domain booking confirmation added by this change. UTM/fbclid parameters remain on the landing URL for Meta's normal browser attribution after consent; no separate attribution database.

Sources: Meta's live manual-install wizard (pixel code verified); https://developers.facebook.com/docs/meta-pixel/get-started/ and https://developers.facebook.com/docs/meta-pixel/reference/ (public documentation fetch was rate-limited).

Validation: npm run build then npm test (14 tests). Consent tests cover default denial, single initialization/PageView, allowlisted event metadata, blocked conversion names, revoke/regrant, expiry and localhost exclusion. Browser: reject and continue funnel verified. Live event receipt must be checked in Events Manager > Events testen after deploying.
