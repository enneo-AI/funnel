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

## Verbindliches UI-Feedback vom 06.10.2026 (Mobile V2)

- Neue Nutzervorgabe ersetzt die ursprünglichen Mock-Layouts: mobil kurze, mittig ausgerichtete Hero-Texte, eine klare Handlung, keine überflüssigen Erklärungen oder versetzten Karten.
- CTA muss beim ersten Aufruf ohne Scrollen sichtbar sein, auch auf 320 × 568. Dekorative Figuren stehen mobil nach dem CTA.
- Keine sichtbare Testleiste/Variantenumschaltung. Direkte Vorschaupfade: `/` = A, `/2` = B, `/3` = C; alte Root-Querylinks bleiben kompatibel. Keine echte Zufallsverteilung aktiv.
- Auch Fragen und Kontakt kompakt halten. Bearbeitbare Antwortzusammenfassung standardmäßig eingeklappt. Vorschauhinweise zum fehlenden Versand und zur fehlenden Buchung beibehalten.
- `src/entry.css` enthält die Mobile-first-Anpassungen; QA unter `docs/qa/mobile-v2/`.

## Verbindliche Ergänzung: Verkaufsstrecke (06.10.2026)

- Nutzer fand Mobile V2 als gesamte Seite zu knapp: weniger Hero-Text heißt nicht weniger Verkaufsargumente. Kurzen ersten Bildschirm und sichtbaren CTA bewahren, darunter Nutzen, verifizierte Kundenreferenzen und erklärende Animationen anbieten.
- Gemeinsame Strecke für A/B/C in `src/ValueStory.jsx` + `src/story.css`: Kundenlogos, interaktiver Beispielprozess, Teamvorteile, EWE-Zitat, Systemdarstellung und erneuter Demo-CTA. Nicht wieder auf Hero + FAQ reduzieren.
- Nur öffentliche, belegte Kundenangaben nutzen. Quellen und Grenzen: `docs/value-story-sources.md`. Animationen endlich, viewport-gestartet, bei Reduced Motion statisch; keine obligatorischen Extra-Fragen.

## Meta-Tracking (06.10.2026)

- Nutzer hat Tracking-/Pixel-Implementierung beauftragt. Bestehenden `Website_Pixel` der Enneo GmbH verwenden: `1573099514138831` (öffentliche ID, kein Secret). CRM-Datensatz `1593485525599961` ist separat.
- `src/tracking.mjs` + `TrackingConsent.jsx`: Meta lädt ausschließlich auf `funnel.enneo.ai` und `enneo-funnel.netlify.app` nach Marketing-Zustimmung. Lokale/Deployment-Vorschauen senden nichts. Bei eigener Domain die Allowlist bewusst erweitern.
- Events: PageView, FunnelStart, FunnelStepView/Complete, ContactPreviewComplete, CalendarPreviewView, BookingPreviewComplete, CalendlyOpen; Parameter nur Variante, preview-Modus und erlaubte Schrittnamen. Keine Antworten/Kontaktfelder, kein Advanced Matching, autoConfig aus.
- Niemals Vorschauabschlüsse als Lead/Schedule melden. Echte Conversion-Events erst nach bestätigter Backend-Übermittlung/Calendly-Buchung. CAPI/CRM-Anbindung bleibt eigener offener Schritt.
- Consent 180 Tage, widerrufbar über Footer; keine rückwirkende Ereigniswarteschlange vor Zustimmung. Standard-URL-/Browserdaten werden durch Meta übertragen; keine personenbezogenen Daten in Kampagnen-URLs verwenden.

## Echte Calendly-Buchungen und CRM-Vorbereitung (06.10.2026)

- Nutzer beauftragte anschließend echte Conversions/CRM/CAPI. `BookingCalendar.jsx` ersetzt den Beispielkalender durch den bestätigten Calendly-Link; Kalender erst nach Kontaktformular öffnen und Name/E-Mail vorausfüllen.
- `booking.mjs` akzeptiert Buchungsbestätigungen ausschließlich von der echten Kalender-iframe-Window-Referenz und origin https://calendly.com mit plausiblen zusammengehörigen Event-/Invitee-URIs. `Schedule` nur nach dieser Bestätigung und Marketing-Einwilligung. Keine echte Testbuchung ohne ausdrücklichen Auftrag.
- `netlify/functions/lead.mjs` ist die geschützte serverseitige Make-Anbindung. Aktiv erst bei MAKE_FUNNEL_ENABLED=true plus Webhook-URL/Key. Bis dahin keine CRM-Speicherung/Lead-Conversion behaupten; Kalender bleibt nutzbar.
- Make-Empfang allein ist kein CRM-Erfolg: explizite saved-Antwort mit passender submission_id und Attio-Record-ID nötig. Stable IDs für Wiederholung/Dedupe. Make-Idempotenz, Notes, CAPI und Server-Buchungsnachweis sind noch fertigzustellen; `integrations/make/README.md` beachten.

## GA4 Funnel Analytics (06.10.2026)

- Nutzer beauftragte Abbruchanalyse je Frage. `src/analytics.mjs` ergänzt deduplizierte Schritte/Abschlüsse, Rücksprünge, Formular-/Backend-/Kalenderfehler, Kalenderladen/Terminauswahl/Buchung und private Abzweigung. Keine Formularwerte/Antworten in Analytics.
- Eigener GA4-Stream Enneo Demo Funnel: 16054667514, G-DGN4ZBRG49, Property 551723662. Enhanced Measurement dort deaktiviert. Main-Website-Stream unverändert. Direkter gtag nur nach separater Statistik-Einwilligung; kein zusätzlicher GTM-Container.
- Analytics/Marketing unabhängig im Cookie-Dialog. Alte Marketing-Einwilligung gilt nicht als Statistik-Einwilligung. Neue Hostnamen ausdrücklich freigeben; funnel.enneo.ai und enneo-funnel.netlify.app über src/production-hosts.mjs.
- Varianten B: Branchenfrage bereits im Hero sichtbar. Späte Einwilligung markiert partial, keine rückwirkenden Events. Nutzerbasierte Trichterquoten, keine Rohklickquoten; 30-Minuten-Inaktivitätsfenster für lokale Deduplizierung.
- Details, Messvertrag und Report-Spezifikation in docs/funnel-analytics.md. GA4-Bericht/Live-Abnahme separat verifizieren, nicht allein aus erfolgreichen Unit-Tests behaupten.

## Domainwechsel abgeschlossen — 06.10.2026

Produktionsdomain: https://funnel.enneo.ai (A: /, B: /2, C: /3). Deployment bdee708. Gemeinsame exakte Host-Allowlist in src/production-hosts.mjs für Meta, GA4 und den HTTPS-Origin des Lead-Endpunkts; Netlify-Adresse bleibt erlaubt. CAPI übernimmt den geprüften tatsächlichen Origin. GA4-Stream 16054667514 / G-DGN4ZBRG49 auf https://funnel.enneo.ai geändert, Enhanced Measurement weiterhin aus. Bestehender Bericht bleibt gültig.

33 Tests und Build bestanden. Live-Browserprüfung: vor Zustimmung ausschließlich eigenes App-Script; nach Zustimmung Google-Tag und Website_Pixel geladen, sieben GA4-Ereignisse bis funnel_view_need mit erfolgreichem Verarbeitungs-Callback. Das ist eine Client-Prüfung, keine erneute serverseitige DebugView-/Meta-Empfangsbestätigung. Widerruf getestet: disabled=true und keine zusätzlichen Ereignisse bei Rücknavigation. Keine Buchung/CRM-Speicherung ausgelöst. /api/funnel-config bestätigt leadEnabled=false; Attio-Schreibrechte bleiben offen.

