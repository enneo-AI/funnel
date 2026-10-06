# Design QA — Mobile V2, 2026-10-06

Grundlage: ausdrückliches Nutzerfeedback zu weniger Text, mittiger mobiler Ausrichtung, sichtbarem CTA und getrennten Variantenpfaden. Frühere Mock-Layouts sind für diese Überarbeitung keine verbindliche Layoutreferenz mehr.

## Umsetzung und Prüfung

- Testleiste, Testdialog und redundante Hero-/Infoblöcke entfernt. Pro Einstieg eine Headline, ein kurzer Erklärungssatz und ein CTA. B enthält zusätzlich die kompakte Branchenwahl.
- `/`, `/2`, `/3` separat geprüft; alte Root-Querylinks bleiben kompatibel. Keine produktive Zufallszuordnung oder Messung.
- Alle neun Kombinationen aus drei Varianten und Viewports 320 × 568, 375 × 600, 390 × 844: CTA vollständig im ersten sichtbaren Bereich; keine horizontale Überbreite.

| Viewport | CTA-Unterkante A | B | C |
| --- | ---: | ---: | ---: |
| 320 × 568 | 294 px | 426 px | 260 px |
| 375 × 600 | 327 px | 462 px | 266 px |
| 390 × 844 | 331 px | 465 px | 270 px |

- Mobile Screens bei 375 × 667 und 320 × 568 sowie Desktop A/B/C bei 1440 × 1000 visuell geprüft. Tablet B bei 768 × 1024 einschließlich sichtbarer Tastaturauswahl geprüft. Screenshots: `docs/qa/mobile-v2/`.
- B übernimmt Branche und beginnt mit Frage 2. Vollständiger C-Ablauf mit Beispieldaten: Fragen → Kontakt → Zusammenfassung öffnen/Antwort ändern → Kontaktwerte erhalten → Beispieltermin → ausdrücklich als Vorschau gekennzeichneter Abschluss. Neustart erhält `/3`.
- Kontaktformular steht in visueller und DOM-Reihenfolge vor der eingeklappten Zusammenfassung. Vorschauhinweise und Kontaktvalidierung bleiben erhalten.
- FAQ-Aufklappen und Tastaturauswahl funktionieren; keine Browserwarnungen/-fehler im geprüften Ablauf. `npm test`: 9/9 bestanden; `npm run build` und `git diff --check`: bestanden.
- Web Interface Guidelines live geprüft: Fokuszustände, Radiotastatur, Labels, Fehlerfokus, Bildabmessungen, reduzierte Bewegung. Keine neuen dekorativen Endlosschleifen.

Grenzen: technischer/visueller UI-Nachweis, keine bewiesene Conversion-Steigerung. Keine echte Buchung oder Lead-Übermittlung, keine vollständige Screenreader-/Browsermatrix.

---

# Historische QA — erster Entwurf (durch Mobile V2 ersetzt)

Status: **passed for local UI prototype**. Nicht als Produktions-, Datenschutz- oder Conversion-Nachweis verstehen. Keine offenen P0/P1/P2-Befunde aus den unten beschriebenen Prüfungen; echte Integrationen sind ausdrücklich außerhalb dieser UI-Abnahme.

## Visueller Vergleich

Referenzen: drei Imagegen-Mocks im Chat, 853 × 1844. Browser-Mobilviewport 390 × 844; Browser liefert Screenshots 375 × 812 mit nativer Scrollbar. Für nebeneinander lesbare Vergleiche beide Ansichten auf 390 × 844 normalisiert; leichte Seitenbreiten-/Schrift-Rasterabweichung dadurch möglich. B für den Vergleich mit gewählter Energie-Branche aufgenommen, beim frischen Einstieg bleibt die Auswahl absichtlich leer.

Ganze Screens gemeinsam visuell geprüft: `docs/qa/comparison-a.jpg`, `comparison-b.jpg`, `comparison-c.jpg`. Zusätzlich Desktop 1440 × 1000 A/B/C und Tablet B 768 × 1024 angesehen. 320 × 740 geprüft; Überbreite behoben und `scrollWidth == clientWidth == 305` verifiziert.

Erhalten: Hierarchie, Headlines, Figurenrolle, lila CTAs, Prozesskarten, helle Körnung; B Branchenwahl und C dunkler Prozessabschnitt. Absichtliche Unterschiede: echte Markenfonts/Originalkörnung, neue freigestellte Figuren statt Screenshot als Oberfläche, normale UI-Icons, größere bedienbare Buttons, ehrliche Vorschau-Copy. Weiter unten zusätzliche Demo-Erwartungen und FAQ. Kein Anspruch auf pixelidentische Bildreproduktion.

## Iterationen

1. P1: zu starke helle Textur beeinträchtigte Text-/Markenhierarchie. Originalbitmap mit niedriger Deckkraft korrigiert; A Vergleich erneut angesehen.
2. P1: dunkle C-Textur zu hell unter Prozesslabels. Navy-Grund mit dezenter Originaltextur korrigiert.
3. P2: B auf Mobil zu lang; CTA zu weit unten. Figure/Abstände und Zeilenhöhen kompakter, finale Vergleichsansicht angesehen.
4. P2: 320px plus Scrollbar löste Überbreite aus. Body-Minimum auf 280px reduziert, Geometrie erneut geprüft.
5. P2: C-Figur zunächst zu klein, danach Haaranschnitt. Größe und Container korrigiert, finales Vergleichsbild ohne Anschnitt angesehen.
6. Bedienbarkeit: Formname/spellcheck, Radiogruppen mit Pfeiltasten und roving tab stop, Bildabmessungen, Textumbruch für lange Unternehmensnamen, begrenzte Dekoranimationen (<5 s) ergänzt. Reduced-motion deaktiviert Animationen.

## Funktionale Browserabnahme

- A/C starten bei Frage 1; B übernimmt die auf dem Einstieg gewählte Branche und beginnt bei Frage 2.
- Ohne Auswahl ist Weiter deaktiviert; Pfeiltastenauswahl funktioniert.
- Zurück bewahrt Antworten. Privatanliegen führt zur Hilfeseite, Korrektur führt wieder zu Frage 4.
- Kontaktvalidierung zeigt Fehler an den Feldern und fokussiert das erste; Beispielwerte führen zur Terminvorschau.
- Beispieltag + Uhrzeit → klarer Vorschauabschluss, ausdrücklich keine Buchung/Bestätigungsmail. Beleg `flow-complete.jpg`.
- Testplan öffnet, Tab hält Fokus im Dialog, Escape schließt und stellt Fokus wieder her.
- Keine Browser-Warnungen/Fehler beim geprüften vollständigen Ablauf.
- `npm test`: 8/8 bestanden; `npm run build`: bestanden.

## Guidelines-Review

Grundlage: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md (live gelesen).

- src/App.jsx: Formularnamen, E-Mail-Spellcheck, erste Fehlerfokussierung korrigiert; semantische Labels vorhanden.
- src/components.jsx: Radiotastatur und Bilddimensionen korrigiert; Icons aus Lucide, keine handgezeichneten Illustrationen.
- src/styles.css: Endlosschleifen durch kurze endliche Animationen ersetzt; sichtbare Fokuszustände vorhanden.
- src/responsive.css: kleiner Viewport, Modal-Overscroll und lange Firmennamen korrigiert.

Restgrenzen: keine vollständige Screenreader-/Browsermatrix, keine reale Buchung, keine tatsächlichen Leads, keine produktive Zufallszuordnung, kein experimenteller Gewinner. Feste Oktoberdaten sind ausdrücklich Beispieldaten. Screenshots und technische Tests belegen UI-Verhalten, nicht geschäftliche Wirksamkeit.
