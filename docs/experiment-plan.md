# A/B/C-Testplan — noch nicht aktiv

## Hypothesen

A vermittelt die Ausführung bis ins Kundensystem schnell. B senkt die Einstiegshürde mit einer direkten Auswahl. C adressiert Kontrolle, Freigaben und Transparenz. Verglichen werden ganze Einstiegskonzepte; ein Ergebnis erklärt nicht isoliert, ob Text, Figur oder Seitenaufbau wirkte.

## Vergleich

Alle Ads laufen auf denselben Einstiegspunkt, dort zufällige 1:1:1-Verteilung pro Besucher; konsistente Wiederkehrer-Zuordnung. Nicht jede Anzeige fest an eine Variante koppeln. Kampagne, Creative und Gerät getrennt speichern, keine Namen/E-Mails in URLs oder Analytics. Forced-preview-URLs und interne Besucher aus Auswertung ausschließen. B enthält die erste der vier identischen Fragen bereits auf der Startseite.

Die Vorschau hat nur `variant=a|b|c` und fällt ohne Parameter auf A zurück. `allocateVariant` ist geprüft, aber noch nicht an echte Besucher oder persistenten Speicher angeschlossen.

## Messung

Primär: qualifizierte wahrgenommene Demos pro ursprünglich zugeordnetem Besucher (Intention-to-treat). Sales muss vorher die Qualifikationsdefinition vereinbaren. Sekundär: Startquote, Abbruch je Schritt, vollständige Kontakte, bestätigte Buchung, Teilnahme, Sales-Akzeptanz und Opportunity. Kosten pro qualifizierter wahrgenommener Demo als wirtschaftliche Auswertung. Kalenderklick ≠ Buchung. Bestätigungen serverseitig/providerseitig verifizieren, deduplizieren, Absagen/No-shows berücksichtigen.

Vor Start Baseline, minimal relevanten Effekt, Fehlerniveau/Power, Stichprobe, feste Auswertungsfenster und Nachlauf für Demo-Teilnahme festlegen. Mehrfachvergleiche einplanen. Nicht täglich anhand wechselnder Quoten einen Gewinner erklären. Bei zu wenig Traffic zunächst zwei Varianten vergleichen; keine seriöse feste Laufzeit ohne Daten.

## Anschlussbedarf

- Offizielles Calendly-Embed für https://calendly.com/enneo-ai/demo; responsiv, Lade-/Fehlerfall, optional Vorbefüllung. Öffentlicher Link reicht als Ausgangspunkt.
- Lead-Persistenz/CRM-Feldmapping und gesicherte Übertragung, Unternehmensname/Domain und Branche aus Nutzereingaben. Keine behauptete Erkennung sämtlicher anonymer Unternehmen.
- Mit Lara Vertriebsqualifikation und verbindliche Ausschlusskriterien klären; noch keine harten Mitarbeiter-/Volumenschwellen im Prototyp.
- Passendes Consent-/Datenschutzkonzept vor Messung. Meta Pixel/CAPI erst in späterer Phase.
- GitHub: https://github.com/enneo-AI/funnel. Hosting: Netlify (enneo-funnel.netlify.app); eigene Domain offen. Kein Supabase-/Railway-Zugang für die aktuelle UI erforderlich.

## Grundlagen

- [Optimizely: Experiment erstellen](https://docs.optimizely.com/web-experimentation/docs/steps-to-create-an-experiment)
- [Optimizely: Primäre und sekundäre Kennzahlen](https://docs.optimizely.com/experimentation-strategy/docs/primary-metrics-secondary-metrics-and-monitoring-goals)
- [Calendly: Einbettung](https://developer.calendly.com/api-docs/overview/embedding/getting-started)
- Zielgruppen-/Website-Recherche: Team-Workspace, Enni research/meta-funnel-2026-10-06/blueprint.html.
