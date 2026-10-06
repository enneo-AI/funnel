# Enneo Demo Funnel — Übergabe, 2026-10-06

## Aktueller Stand

- Repository: https://github.com/enneo-AI/funnel, Veröffentlichungsbranch `main`.
- Live geprüfter UI-Stand: `20ef230` (Verkaufsstrecke V3). Nachfolgende Abschluss-Commits betreffen nur Dokumentation.
- Vorschauen: https://enneo-funnel.netlify.app/ (A), https://enneo-funnel.netlify.app/2 (B), https://enneo-funnel.netlify.app/3 (C).
- React/Vite, lokale Markenassets, keine externen Tracker. Netlify baut mit `npm run build` und veröffentlicht **`dist/client`**. `dist` verursacht eine 404 auf der Startseite. SPA-Fallback ist eingerichtet.

## Maßgebliche Nutzerentscheidungen

Aleksa plant mit Lara Meta-Kampagnen für qualifizierte Demo-Buchungen im deutschen Mittelstand und bei Großunternehmen. Alle drei Gestaltungsrichtungen bleiben für den späteren Vergleich erhalten.

Der Hero soll mobil kurz, mittig und mit sofort sichtbarem CTA sein. Das bedeutet ausdrücklich **nicht**, die gesamte Seite auf Hero und FAQ zu verkürzen: darunter gehören Nutzen, belegte Kundenreferenzen und erklärende Animationen. V3 ergänzt deshalb Kundenlogos, drei wählbare Servicebeispiele, Teamvorteile, die öffentliche EWE-Kundenstimme, Systemanbindung und einen zweiten Demo-CTA. Quellen: `docs/value-story-sources.md`.

Keine sichtbare Testleiste. Die Pfade dienen zunächst der getrennten Vorschau, noch nicht einer randomisierten Studie. Alle drei Varianten teilen die Verkaufsstrecke. Bewegung bleibt kurz und endlich, Reduced Motion wird respektiert.

## Grenzen und nächste Schritte

1. Visuelles Feedback zur erweiterten V3-Strecke einholen; keine finale Designfreigabe oder Conversion-Steigerung behaupten.
2. Eigene Domain festlegen und anbinden. Netlify ist bereits funktionsfähig.
3. Vor echtem Kampagnenverkehr Kontaktübermittlung/CRM, Calendly-Einbettung und bestätigte Buchungsereignisse einrichten. Vom Nutzer bestätigtes Kalenderziel: https://calendly.com/enneo-ai/demo. Ein gesonderter Embed-Code ist nicht erforderlich.
4. Qualifikation mit Lara festlegen; kleine oder unklare Unternehmen werden aktuell nicht automatisch ausgeschlossen. Privatanliegen werden separat abgefangen.
5. Consent, Attribution, Meta Pixel/CAPI, persistente Testzuordnung und Rückmeldung qualifizierter Demos implementieren. Testplanung in `docs/experiment-plan.md`. Supabase/Railway ist noch nicht ausgewählt oder erforderlich für die UI.

Derzeit bleiben Angaben nur im Arbeitsspeicher. Der Beispielkalender bucht nichts und zeigt feste, ausdrücklich markierte Beispieldaten. Der externe Calendly-Link ist der einzige Weg zum echten Kalender. Keinen realen Leadversand, fertiges Tracking oder automatische Erkennung aller besuchenden Unternehmen behaupten.

## Weiterarbeiten und Prüfung

- Lokal auf diesem Mac: `~/Desktop/Projects/enneo-demo-funnel/`; separat vom Team-Repository. Auf anderen Geräten das eigene Funnel-Repository klonen und dessen `AGENTS.md` lesen.
- `npm install`, `npm run dev -- --host 127.0.0.1 --port 4173`.
- Lokaler Arbeitsbranch hier: `codex/funnel-ui`, Upstream `origin/main`. Veröffentlichung explizit mit `git push origin HEAD:main`, keine Zugangsdaten in Dateien oder URLs.
- Letzte Prüfung: 9 Tests und Build erfolgreich; mobile Varianten bis 320 × 568 ohne horizontalen Überlauf und mit sichtbarem Hero-CTA. Desktop, Beispielwechsel, Wiederholen und zweiter CTA geprüft. Details/Belege: `design-qa.md`, `docs/qa/`.
- Browserprüfung nach UI-Änderungen durchführen; bestehende Sites-Kompatibilität gemäß `AGENTS.md` erhalten.
