# Verkaufsstrecke: Quellen und Entscheidungen (06.10.2026)

Nutzerkorrektur: Der mobile Einstieg soll kurz bleiben, die gesamte Landingpage darf aber nicht auf Hero + FAQ schrumpfen. Nutzen, Kunden und erklärende Animationen gehören zwischen Einstieg und Qualifikation.

## Belegte Inhalte

- https://www.enneo.ai/ (live geprüft am 06.10.2026): EWE, GASAG, Qcells und stromee werden in der Kundenleiste geführt. Logos unverändert von den öffentlichen `/logos/{name}-logo.svg`-Assets übernommen und lokal eingebunden. Logozeile im Funnel ist eine Auswahl, keine Aussage über die Größe des Kundenstamms.
- Dieselbe Quelle führt das EWE-Zitat von Daniel Albrecht, Leiter Kunde & Service im EWE-Center Kundendienst. Wörtliches Zitat unverändert (7 Wörter); keine neue Fallstudie oder erfundenen Ergebniskennzahlen.
- https://www.enneo.ai/integrationen (live geprüft): projektbasierte Anbindung, CRM/ERP, SAP IS-U, rollenbasierte Berechtigungen. Keine pauschale Plug-and-play-Zusage.
- Öffentliche Website bestätigt Freigaben für kritische Schritte, Übergabe unklarer Fälle, EU-Hosting und kein Modelltraining mit Kundendaten.
- Prozesskarten sind ausdrücklich illustrative Szenarien. 90 Euro ist ein Beispielbetrag, keine echte Kundenaktion. Keine API-, CRM- oder Kalenderaufrufe.

## Motion und Gestaltung

enneo.ai im Browser angesehen: animierter Hero-Servicevorgang, Fortschrittsanzeige, Kundenleiste, dunkler strukturierter Abschnitt, Kanäle–enneo–Systeme. Der Funnel übersetzt diese Bewegungssprache in lokale React-/CSS-Komponenten; keine eingebettete fremde Website, kein neuer Animationsdienst.

Beim Scrollen starten kurze, endliche Einblendungen. Das Prozessbeispiel baut sich in unter drei Sekunden auf; Wechsel und Wiederholen per bedienbarem Button. Alle Inhalte bleiben ohne Animation verständlich; `prefers-reduced-motion` deaktiviert Bewegung. Kein Autoplay-Loop oder Scroll-Lock.

Alle drei Varianten erhalten dieselbe Verkaufsstrecke; der vergleichbare Unterschied bleibt der Einstieg. Bestehende Demo-Fragen werden nicht erweitert. Keine Aussage, dass eine Conversion-Steigerung bereits gemessen wurde.
