export const VARIANTS = ['a', 'b', 'c'];
export const EXPERIMENT = Object.freeze({ id: 'enneo-demo-entry-v1', status: 'preview', allocation: { a: 1/3, b: 1/3, c: 1/3 }, primaryMetric: 'qualified_demo_attended_per_assigned_visitor' });
export function getVariant(value) { return VARIANTS.includes(value) ? value : 'a'; }
export function variantFromLocation(pathname, search = '') {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/2') return 'b';
  if (path === '/3') return 'c';
  if (path === '/1') return 'a';
  return path === '/' ? getVariant(new URLSearchParams(search).get('variant')) : 'a';
}
export function allocateVariant(random) {
  if (!Number.isFinite(random) || random < 0 || random >= 1) throw new RangeError('Expected a value in [0,1)');
  return VARIANTS[Math.floor(random * 3)];
}
export const questions = [
  { key: 'industry', title: 'In welcher Branche arbeiten Sie?', intro: '', options: [
    ['energy', 'Energie & Stadtwerke', 'Vom Zählerstand bis zur Vertragsänderung', 'Zap'],
    ['finance', 'Versicherungen & Finanzen', 'Anliegen, Dokumente und Vertragsdaten', 'ShieldCheck'],
    ['commerce', 'Handel & Dienstleistungen', 'Statusfragen, Rechnungen und Kundenservice', 'ShoppingBag'],
    ['other', 'Weitere Branche', 'Auch andere Serviceprozesse sind willkommen', 'Building2'],
  ] },
  { key: 'need', title: 'Was möchten Sie automatisieren?', intro: '', options: [
    ['routine', 'Wiederkehrende Anfragen', 'Routine über E-Mail, Telefon und Chat', 'MessagesSquare'],
    ['data', 'Daten & Verträge ändern', 'Vorgänge bis ins Bestandssystem bearbeiten', 'Workflow'],
    ['invoices', 'Rechnungen & Statusfragen', 'Informationen finden und Anliegen klären', 'FileText'],
    ['other', 'Einen anderen Prozess', 'Wir schauen gemeinsam auf Ihren Bedarf', 'Shapes'],
  ] },
  { key: 'volume', title: 'Wie viele Anfragen pro Monat?', intro: 'Alle Kanäle zusammen. Eine Schätzung genügt.', options: [
    ['small', 'Unter 500', '', 'Inbox'], ['medium', '500 bis 2.000', '', 'Inbox'], ['large', '2.001 bis 10.000', '', 'Inbox'], ['enterprise', 'Mehr als 10.000', '', 'Inbox'], ['unknown', 'Noch unklar', '', 'CircleHelp'],
  ] },
  { key: 'stage', title: 'Wie konkret ist Ihr Vorhaben?', intro: '', options: [
    ['process', 'Einen konkreten Prozess prüfen', 'Wir kennen die Aufgabe, die wir automatisieren möchten', 'Target'],
    ['project', 'Lösungen für ein Projekt vergleichen', 'Integration und Umsetzung sind für uns relevant', 'Layers'],
    ['research', 'Erst einmal informieren', 'Wir stehen noch am Anfang', 'Compass'],
    ['private', 'Kundenservice für mich als Privatperson', 'Zum Beispiel Hilfe zu meiner eigenen Rechnung', 'UserRound'],
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
