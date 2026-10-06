## Domainwechsel abgeschlossen — 06.10.2026

Produktionsdomain: https://funnel.enneo.ai (A: /, B: /2, C: /3). Deployment bdee708. Gemeinsame exakte Host-Allowlist in src/production-hosts.mjs für Meta, GA4 und den HTTPS-Origin des Lead-Endpunkts; Netlify-Adresse bleibt erlaubt. CAPI übernimmt den geprüften tatsächlichen Origin. GA4-Stream 16054667514 / G-DGN4ZBRG49 auf https://funnel.enneo.ai geändert, Enhanced Measurement weiterhin aus. Bestehender Bericht bleibt gültig.

33 Tests und Build bestanden. Live-Browserprüfung: vor Zustimmung ausschließlich eigenes App-Script; nach Zustimmung Google-Tag und Website_Pixel geladen, sieben GA4-Ereignisse bis funnel_view_need mit erfolgreichem Verarbeitungs-Callback. Das ist eine Client-Prüfung, keine erneute serverseitige DebugView-/Meta-Empfangsbestätigung. Widerruf getestet: disabled=true und keine zusätzlichen Ereignisse bei Rücknavigation. Keine Buchung/CRM-Speicherung ausgelöst. /api/funnel-config bestätigt leadEnabled=false; Attio-Schreibrechte bleiben offen.

# Enneo Demo Funnel — Übergabe, 2026-10-06

## Historischer UI-Stand vor Tracking-Erweiterungen

Die folgenden ursprünglichen UI-Abschnitte dokumentieren den Zwischenstand vor Meta, GA4 und echtem Calendly. Maßgeblich sind der Domainabschluss oben und die späteren Integrationsabschnitte unten. Aktuell offen: Attio-Records/Notes-Schreibrechte, danach E2E-/Dedupe-Prüfung und bewusste CRM-Aktivierung. Webhook- und CAPI-Zugänge sind bereits freigegeben und eingerichtet.

- Repository: https://github.com/enneo-AI/funnel, Veröffentlichungsbranch `main`.
- Live geprüfter UI-Stand: `20ef230` (Verkaufsstrecke V3). Nachfolgende Abschluss-Commits betreffen nur Dokumentation.
- Vorschauen: https://enneo-funnel.netlify.app/ (A), https://enneo-funnel.netlify.app/2 (B), https://enneo-funnel.netlify.app/3 (C).
- React/Vite, lokale Markenassets, Meta-Pixel nach ausdrücklicher Marketing-Zustimmung (Implementierung 06.10., siehe docs/tracking.md). Netlify baut mit `npm run build` und veröffentlicht **`dist/client`**. `dist` verursacht eine 404 auf der Startseite. SPA-Fallback ist eingerichtet.

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

## Tracking-Ergänzung 06.10.2026

Bestehender Website_Pixel 1573099514138831 mit Cookie-Auswahl eingebunden. PageView/Funnel-Schritte/Calendly-Klick, separate Vorschau-Events, keine Lead- oder Buchungsconversion. 14 Tests + Build bestanden. CAPI/CRM und echte Calendly-Bestätigung weiterhin offen. Domain-Allowlist im Tracking beachten.

Live-Abnahme: 06.10.2026 17:29 Budapest, Meta-Testevents PageView/FunnelStart/FunnelStepView/FunnelStepComplete als Verarbeitet bestätigt; Variante b/preview geprüft. Netlify-Version 464fc58. Nach Test Marketing-Einwilligung widerrufen. Keine Leads/Termine erzeugt. Werbekonto-Verknüpfung und CRM-CAPI nicht geändert.

## Laufende Erweiterung: Kalender + Lead-Schnittstelle

Echter Calendly-Kalender und consentgebundene Schedule-Conversion implementiert; im lokalen Browser verfügbare Tage gesehen, keine Buchung ausgelöst. 21 Tests + Build erfolgreich. Lead-Endpoint /api/lead ist nur vorbereitet und per MAKE_FUNNEL_ENABLED abgeschaltet. Ohne bestätigte CRM-Konfiguration öffnet das Formular nur den Kalender, speichert keinen Attio-Lead. Make-Verbindung „enneo attio“ wurde im Browser vom Nutzer angelegt. Separater inaktiver Website-Funnel-Entwurf angelegt, Mapping/Idempotenz/Antwort noch offen. CAPI-Token-Erzeugung vom Nutzer ausdrücklich freigegeben; Speicherung und Test noch im laufenden Vorgang. Keine abgeschlossene Ende-zu-Ende-Integration behaupten.

### Stand vor ausstehender Nutzeraktion

Kalender-Code 825abba live, Netlify /api/funnel-config bestätigt leadEnabled=false. CAPI-Zugang mit ausdrücklicher Freigabe erzeugt und nur in Make-Keychain 260644 gespeichert. Isoliertes Server-Testevent am 06.10. 17:48 als Verarbeitet bei Meta bestätigt. Attio-Make-Verbindung 11644089 verfügbar. Vollständiger inaktiver Entwurf 7804901, Dedupe-Datenspeicher 208824 (nur Fingerabdruck-Schlüssel, keine Kontaktdaten). Make validiert bis auf fehlenden Webhook. **Noch keine Attio-Testübermittlung, kein produktives CAPI-Lead, keine echte Terminbuchung.** Offen: Netlify-Login des Nutzers, separate Webhook-Schlüssel-Freigabe, Endpoint/Secrets, End-to-End-Tests und Aktivierung. CRM-Stufenfeedback aus altem Szenario 7737437 bleibt unverändert/inaktiv; keine Qualified/Purchase-Zuordnung bestätigt. 23 lokale Tests + Build erfolgreich.

## 06.10.2026 — Webhook/Netlify eingerichtet, Attio-Rechte blockieren Live-Test

Nutzer hat den separaten Webhook-Schlüssel ausdrücklich genehmigt. `Enneo Demo Funnel` als authentifizierten Make-Webhook angelegt, Keychain `Enneo Funnel → Make (Server)`. Zufälliger Schlüssel ausschließlich dort und in Netlify Production als Secret `MAKE_FUNNEL_WEBHOOK_KEY`; URL ebenfalls als Production-Secret `MAKE_FUNNEL_WEBHOOK_URL`. Keine Werte in Repo, Chat oder lokalen Dateien. Netlify-Account info@aleksa.ai/Team Aleksa geprüft. Scheduling im Make-Szenario 7804901 auf Immediately as data arrives, 10 Runs/min, weiterhin inaktiv.

E2E-Test 18:22 Budapest, Anfrage-ID `enneo-funnel-test-20261006-001`, E-Mail `funnel-integration-test-20261006@example.com`, Marketing-Consent false: Netlify→authentifizierter Make-Webhook funktioniert, Attio-Modul 2 antwortet **403: Records Read-Write fehlt**. Kein CRM-Kontakt/keine Notiz angelegt, kein Meta-Lead ausgelöst. Endpoint liefert korrekt 502 lead_not_confirmed. Nutzer um Records- und Notes-Schreibrechte für die bestehende Attio-Verbindung gebeten. Keine Freigaben erneut erfragen: Webhook und CAPI sind bereits autorisiert.

MAKE_FUNNEL_ENABLED danach wieder auf false gesetzt; aktueller Dokumentations-Push löst das Deployment zur Übernahme aus. Nach korrigiertem Attio-Token/-Scope: Flag true/deploy, Run once, gleiche Anfrage erneut testen (noch kein Lock/Record geschrieben), Person/Notiz lesen, doppelte/parallele/no-consent-Anfrage prüfen; danach aktivieren und Marketing-Lead mit Consent prüfen. Noch keine Ende-zu-Ende-Erfolgsmeldung.

## GA4-Erweiterung in Arbeit

GA4-Stream 16054667514 / G-DGN4ZBRG49 in bestehender Enneo-Property 551723662 angelegt. Enhanced Measurement aus. Eigene Statistik-Einwilligung und vollständige Funnel-Ereignisse implementiert, 30 Tests + Build bestanden; Cookie-Auswahl und B-Einstieg lokal im Browser geprüft. Registrierung von Auswertungsdimensionen und Einrichtung des gespeicherten Trichterberichts/Live-Test läuft noch. Details docs/funnel-analytics.md. Keine Änderung an deaktivierter CRM-Pipeline oder Attio-Zugriffsgrenzen.

## GA4-Abnahme abgeschlossen (06.10.2026)

GA4-Messung auf Netlify live (8d842c9 / 7b94475 / c8c8186), 30 Tests + Build. Tatsächliche DebugView-Events inkl. Fragenaufruf/Abschluss/Rücksprung bestätigt; Parameter b/need/full und NPA=1 geprüft. Statistik und Meta separat auswählbar, Widerruf im isolierten Browser verifiziert. Fragen bis Kalender/Terminauswahl mit Testangaben durchlaufen, **keine echte Buchung/CRM-Übermittlung**. Optionaler QA-Diagnosebereich nur bei analytics_debug=1.

Gespeicherter und innerhalb bestehender Property-Nutzer geteilter Bericht „Enneo Demo Funnel – Abbrüche und Varianten“: https://analytics.google.com/analytics/web/?authuser=1#/analysis/a406128363p551723662/edit/bOzUjuw6QQiTHFO8PV9JHg . Tabs Geräte (Fragen bis Buchung), A/B/C, Kampagnen; neun Stufen, je Übergang max. 30 Min, Filter eigener Stream + Messbeginn full. Sechs Custom Dimensions und Schrittzeit-Messwert registriert. Default letzte 28 Tage bis gestern; neue Felder/Events brauchen Verarbeitung, keine rückwirkende Messung. Weitere Details docs/funnel-analytics.md.

Weiter offen wie zuvor: Attio Records/Notes-Schreibrechte, CRM-E2E-Abnahme und Aktivierung; Subdomain-Umstellung inkl. drei Host-/Origin-Freigaben. Analytics benötigt diese CRM-Rechte nicht.
