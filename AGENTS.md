# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Enneo-spezifischer Stand (2026-10-06)

- Nutzer Aleksa, Zusammenarbeit mit Lara für Meta-Kampagnen. Ziel: qualifizierte Demo-Buchungen im deutschen Mittelstand und bei Großunternehmen.
- Alle drei generierten Designrichtungen wurden für einen A/B/C-Vergleich gewählt. UI zuerst; externe Messung/CRM/Calendly später.
- Marke: Geist + Geist Mono, #7b5ae2, #613cdd, #292c3f, helle Originalkörnung, 3D-Agenten. Originalassets aus vom Nutzer bereitgestelltem Enneo Design System.zip. Stil der Anzeigen vom 02.10.2026 und von enneo.ai beibehalten.
- Kein unbestätigter 55-%-Claim. EU-gehostet statt pauschal Deutschland-Hosting. Keine pauschalen Integrationsgarantien.
- Qualifikation bleibt vorläufig: Privatanliegen separat; kleine Volumina und unsicherer Bedarf werden geprüft, nicht automatisch abgelehnt. `business` bedeutet nicht sales-qualifiziert.
- Nur Beispielangaben im Prototyp. Kein Tracking oder Lead-Backend ohne entsprechende nächste Implementierungsphase aktivieren. Keine API-Keys im Frontend.
- Kalenderziel vom Nutzer bestätigt: https://calendly.com/enneo-ai/demo. Kein Login/Embed-Code für öffentliches Embed nötig.
- Repository: https://github.com/enneo-AI/funnel. Hosting: https://enneo-funnel.netlify.app/ (Netlify, Branch main). netlify.toml setzt Build `npm run build`, Publish `dist/client` und SPA-Fallback. Niemals `dist` veröffentlichen: dessen index.html liegt im Unterordner client. Nicht im Team-Repository veröffentlichen.
- Siehe README.md, docs/experiment-plan.md und design-qa.md. Nach substantiellen Änderungen Browserprüfung und passende Tests durchführen.
