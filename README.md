# Enneo Demo Funnel — UI-Prototyp

Stand: 6. Oktober 2026. Drei responsive Einstiege für Meta-Traffic, ein gemeinsamer Demo-Funnel. React 19 + Vite + CSS + Lucide. Keine Backend-Zugänge nötig.

## Lokal

`npm install`, dann `npm run dev -- --host 127.0.0.1 --port 4173`.

- A: `http://127.0.0.1:4173/?variant=a` — Anliegen → Ergebnis
- B: `http://127.0.0.1:4173/?variant=b` — Direkter Brancheneinstieg
- C: `http://127.0.0.1:4173/?variant=c` — Kontrolle und Nachvollziehbarkeit
- `&preview=0` blendet die interne Variantenleiste aus.

Vier Fragen → Kontakt → Beispielkalender → ausdrücklich als Vorschau gekennzeichneter Abschluss. Variante B stellt die erste Frage schon im Einstieg. Angaben bleiben ausschließlich im React-Arbeitsspeicher; Neuladen löscht sie. Es gibt keinen Versand, keine echten Buchungen, keine Besucherzuordnung und keine externen Tracker. Nur der ausdrücklich angeklickte Kalenderlink führt zu https://calendly.com/enneo-ai/demo.

## Dateien und Prüfung

`src/flow.mjs`: Fragen, Antwortwerte, vorläufige Routingregeln, experimentelle Zuordnungsfunktion (noch nicht eingebunden).
`src/App.jsx`: Ablauf, Formular, lokale Ereignisvorschau, Beispielkalender.
`src/components.jsx`: drei Einstiege und gemeinsame Komponenten.
`src/styles.css`, `src/responsive.css`: Gestaltung, Breakpoints und reduzierte Bewegung.
`public/assets`: lokale Originalmarken-Assets und generierte Figuren.

`npm test` prüft Routing, Zuordnungsgrenzen, Kontaktvalidierung und den mitgelieferten Hosting-Adapter. `npm run build` erzeugt `dist/client`, `dist/server` und `dist/.openai/hosting.json`. Noch keine Veröffentlichung. Visuelle Prüfung: `design-qa.md`, Belege unter `docs/qa`.

## Nächste Phase

GitHub-Repository: https://github.com/enneo-AI/funnel. Der UI-Stand wird hier versioniert. Als Nächstes Domain/Hosting festlegen. Vor Live-Traffic müssen Kontaktübermittlung, Calendly-Einbettung samt bestätigtem Buchungsereignis, qualifizierte CRM-Rückmeldung, Consent und belastbare Besucherzuordnung eingerichtet werden. Ein zusätzlicher Datenbank- oder Railway-Dienst ist dafür noch nicht festgelegt.

Der öffentliche Calendly-Link reicht für die Einbettung; kein separat zugesandter Embed-Code nötig. Vorbefüllung und Event-Handling folgen der offiziellen Calendly-Dokumentation. Anbieter-Verfügbarkeit und Tarifumfang vor Live-Integration prüfen.
