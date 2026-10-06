# Enneo Demo Funnel — UI-Prototyp

Stand: 6. Oktober 2026. Drei responsive Einstiege für Meta-Traffic, ein gemeinsamer Demo-Funnel. React 19 + Vite + CSS + Lucide. Keine Backend-Zugänge nötig.

## Lokal

`npm install`, dann `npm run dev -- --host 127.0.0.1 --port 4173`.

- A: `http://127.0.0.1:4173/` — Anliegen → Ergebnis
- B: `http://127.0.0.1:4173/2` — Direkter Brancheneinstieg
- C: `http://127.0.0.1:4173/3` — Kontrolle und Nachvollziehbarkeit

Keine sichtbare Testleiste. Die gleichen Pfade funktionieren auf Netlify. Alte Root-Links mit `?variant=a|b|c` bleiben kompatibel.

Unter dem kompakten Einstieg folgen Kundenlogos, ein interaktives Servicebeispiel, Teamvorteile, eine EWE-Kundenstimme, Systemanbindung und ein weiterer Demo-CTA. Öffentliche Quellen: `docs/value-story-sources.md`.

Vier Fragen → Kontakt → Beispielkalender → ausdrücklich als Vorschau gekennzeichneter Abschluss. Variante B stellt die erste Frage schon im Einstieg. Angaben bleiben ausschließlich im React-Arbeitsspeicher; Neuladen löscht sie. Es gibt keinen Versand, keine echten Buchungen, keine Besucherzuordnung und keine externen Tracker. Nur der ausdrücklich angeklickte Kalenderlink führt zu https://calendly.com/enneo-ai/demo.

## Dateien und Prüfung

`src/flow.mjs`: Fragen, Antwortwerte, vorläufige Routingregeln, experimentelle Zuordnungsfunktion (noch nicht eingebunden).
`src/App.jsx`: Ablauf, Formular, Ereignisse im Arbeitsspeicher (kein sichtbarer Testbereich), Beispielkalender.
`src/components.jsx`: drei Einstiege und gemeinsame Komponenten.
`src/ValueStory.jsx`, `src/story.css`: gemeinsame Verkaufsstrecke und kurze, viewport-gestartete Animationen mit Reduced-Motion-Alternative.
`src/styles.css`, `src/responsive.css`, `src/entry.css`: Gestaltung, Breakpoints, reduzierte Bewegung und kompakte Mobile-first-Einstiege.
`public/assets`: lokale Originalmarken-Assets und generierte Figuren.

`npm test` prüft Routing, Zuordnungsgrenzen, Kontaktvalidierung und den mitgelieferten Hosting-Adapter. `npm run build` erzeugt `dist/client`, `dist/server` und `dist/.openai/hosting.json`. UI-Vorschau auf Netlify; keine produktive Lead-Verarbeitung. Visuelle Prüfung: `design-qa.md`, Belege unter `docs/qa`.

## Netlify

Vorschau: https://enneo-funnel.netlify.app/. GitHub-Branch `main` ist mit Netlify verbunden. Die `netlify.toml` im Repository legt Build (`npm run build`), Basis (`.`) und Veröffentlichungsordner (`dist/client`) fest. `dist` allein ist falsch: Dann liegt die Startseite unter `/client/` statt `/`. Der Sites-Adapter in `dist/server` wird von Netlify nicht benötigt. Der SPA-Fallback erhält auch direkte Seitenaufrufe.

## Nächste Phase

GitHub-Repository: https://github.com/enneo-AI/funnel. Der UI-Stand wird hier versioniert. Netlify ist angebunden; eigene Domain noch offen. Vor Live-Traffic müssen Kontaktübermittlung, Calendly-Einbettung samt bestätigtem Buchungsereignis, qualifizierte CRM-Rückmeldung, Consent und belastbare Besucherzuordnung eingerichtet werden. Ein zusätzlicher Datenbank- oder Railway-Dienst ist dafür noch nicht festgelegt.

Der öffentliche Calendly-Link reicht für die Einbettung; kein separat zugesandter Embed-Code nötig. Vorbefüllung und Event-Handling folgen der offiziellen Calendly-Dokumentation. Anbieter-Verfügbarkeit und Tarifumfang vor Live-Integration prüfen.
