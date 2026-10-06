export const VARIANTS = ['a', 'b', 'c'];
export const EXPERIMENT = Object.freeze({ id: 'enneo-demo-entry-v1', status: 'preview', allocation: { a: 1/3, b: 1/3, c: 1/3 }, primaryMetric: 'qualified_demo_attended_per_assigned_visitor' });
export function getVariant(value) { return VARIANTS.includes(value) ? value : 'a'; }
export function allocateVariant(random) {
  if (!Number.isFinite(random) || random < 0 || random >= 1) throw new RangeError('Expected a value in [0,1)');
  return VARIANTS[Math.floor(random * 3)];
}
export const questions = [
  { key: 'industry', title: 'In welcher Branche arbeitet Ihr Unternehmen?', intro: 'Damit wir Ihnen die Serviceprozesse zeigen, die zu Ihrem Alltag passen.', options: [
    ['energy', 'Energie & Stadtwerke', 'Vom Zählerstand bis zur Vertragsänderung', 'Zap'],
    ['finance', 'Versicherungen & Finanzen', 'Anliegen, Dokumente und Vertragsdaten', 'ShieldCheck'],
    ['commerce', 'Handel & Dienstleistungen', 'Statusfragen, Rechnungen und Kundenservice', 'ShoppingBag'],
    ['other', 'Weitere Branche', 'Auch andere Serviceprozesse sind willkommen', 'Building2'],
  ] },
  { key: 'need', title: 'Wo möchten Sie Ihr Team zuerst entlasten?', intro: 'Wählen Sie den Bereich, den Sie in der Demo genauer sehen möchten.', options: [
    ['routine', 'Wiederkehrende Anfragen', 'Routine über E-Mail, Telefon und Chat', 'MessagesSquare'],
    ['data', 'Daten & Verträge ändern', 'Vorgänge bis ins Bestandssystem bearbeiten', 'Workflow'],
    ['invoices', 'Rechnungen & Statusfragen', 'Informationen finden und Anliegen klären', 'FileText'],
    ['other', 'Einen anderen Prozess', 'Wir schauen gemeinsam auf Ihren Bedarf', 'Shapes'],
  ] },
  { key: 'volume', title: 'Wie viele Anfragen erreichen Ihr Serviceteam?', intro: 'Eine ungefähre Schätzung pro Monat genügt. Alle Kontaktkanäle zusammen.', options: [
    ['small', 'Unter 500', '', 'Inbox'], ['medium', '500 bis 2.000', '', 'Inbox'], ['large', '2.001 bis 10.000', '', 'Inbox'], ['enterprise', 'Mehr als 10.000', '', 'Inbox'], ['unknown', 'Das kann ich noch nicht einschätzen', '', 'CircleHelp'],
  ] },
  { key: 'stage', title: 'Wie konkret ist Ihr Vorhaben?', intro: 'So können wir das Gespräch auf Ihren aktuellen Stand ausrichten.', options: [
    ['process', 'Ich möchte einen konkreten Prozess prüfen', 'Wir kennen die Aufgabe, die wir automatisieren möchten', 'Target'],
    ['project', 'Wir vergleichen Lösungen für ein Projekt', 'Integration und Umsetzung sind für uns relevant', 'Layers'],
    ['research', 'Ich möchte die Möglichkeiten kennenlernen', 'Wir stehen noch am Anfang', 'Compass'],
    ['private', 'Ich suche Kundenservice als Privatperson', 'Zum Beispiel Hilfe zu meiner eigenen Rechnung', 'UserRound'],
  ] },
];
export function labelFor(key, value) { return questions.find(q => q.key === key)?.options.find(o => o[0] === value)?.[1] || 'Noch offen'; }
export function routeLead(answers) {
  if (!questions.every(q => q.options.some(o => o[0] === answers[q.key]))) return 'incomplete';
  if (answers.stage === 'private') return 'not-business';
  if (answers.volume === 'unknown' || answers.volume === 'small' || answers.stage === 'research') return 'review';
  return 'business';
}
export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Bitte geben Sie Ihren Namen ein.';
  if (!values.company.trim()) errors.company = 'Bitte geben Sie Ihr Unternehmen ein.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  return errors;
}
export const demoDays = [{id:'2026-10-12',day:'Mo',date:'12',label:'Montag, 12. Oktober 2026'}, {id:'2026-10-13',day:'Di',date:'13',label:'Dienstag, 13. Oktober 2026'}, {id:'2026-10-14',day:'Mi',date:'14',label:'Mittwoch, 14. Oktober 2026'}];
