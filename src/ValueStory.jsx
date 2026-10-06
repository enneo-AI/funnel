import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, CircleCheck, Database, Mail, MessageSquare, Phone, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { Primary } from './components.jsx';

// Motion only starts when a section enters view; readable static content is the fallback.
function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); observer.disconnect(); }
    }, { threshold: .15 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${className} story-reveal ${seen ? 'is-seen' : ''}`}>{children}</div>;
}

const examples = [
  { name: 'Abschlag', request: '„Bitte ändern Sie meinen Abschlag auf 90 €.“', check: 'Vertrag zuordnen. Änderungsregeln prüfen.', result: 'Abschlag im Kernsystem angepasst.', system: '90 € / Monat', detail: 'Bestätigung an den Kunden vorbereitet.' },
  { name: 'Bestellstatus', request: '„Wann kommt meine Bestellung an?“', check: 'Bestellung finden. Lieferstatus abrufen.', result: 'Aktuellen Lieferstatus bereitgestellt.', system: 'Sendung unterwegs', detail: 'Antwort mit den Daten aus dem ERP erstellt.' },
  { name: 'Rechnung', request: '„Ich brauche eine Kopie meiner Rechnung.“', check: 'Kundenkonto zuordnen. Beleg ermitteln.', result: 'Passenden Rechnungsbeleg gefunden.', system: 'Rechnung verfügbar', detail: 'Antwort mit dem angefragten Beleg vorbereitet.' },
];

function ProcessExample() {
  const [selected, setSelected] = useState(0);
  const [replay, setReplay] = useState(0);
  const item = examples[selected];
  return <section className="story-process" aria-labelledby="process-title">
    <Reveal className="story-process-inner">
      <div className="story-heading"><p className="story-kicker">VOM ANLIEGEN ZUM ERGEBNIS</p><h2 id="process-title">Nicht nur eine Antwort.<br/><em>Ein erledigter Vorgang.</em></h2><p>Sehen Sie an einem Beispiel, wie enneo die Arbeit zwischen Ihren Systemen übernimmt.</p></div>
      <div className="process-picker" role="group" aria-label="Servicebeispiel wählen">{examples.map((example, index) => <button key={example.name} aria-pressed={selected === index} onClick={() => setSelected(index)}>{example.name}</button>)}</div>
      <div className="process-scene" key={`${selected}-${replay}`}>
        <div className="process-card incoming"><span className="process-step"><Mail size={16} aria-hidden="true"/>01 · ANFRAGE</span><p>{item.request}</p></div>
        <div className="process-connector" aria-hidden="true"><span/><ArrowDown size={19}/></div>
        <div className="process-card working"><span className="process-step"><Sparkles size={16} aria-hidden="true"/>02 · ENNEO ARBEITET</span><p>{item.check}</p><div className="process-track" aria-hidden="true"><span/></div><span className="process-rule"><ShieldCheck size={14} aria-hidden="true"/>Nach Ihren Regeln und Freigaben</span></div>
        <div className="process-connector second" aria-hidden="true"><span/><ArrowDown size={19}/></div>
        <div className="process-card result" aria-live="polite" aria-atomic="true"><span className="process-step"><CircleCheck size={16} aria-hidden="true"/>03 · ERGEBNIS</span><h3>{item.result}</h3><span className="result-status"><Check size={16} aria-hidden="true"/>{item.system}</span><p>{item.detail}</p></div>
      </div>
      <div className="process-caption"><span>Illustrativer Ablauf · kein Live-Vorgang</span><button onClick={() => setReplay(value => value + 1)}><Play size={14} aria-hidden="true"/>Noch einmal</button></div>
    </Reveal>
  </section>;
}

export function ValueStory({ onStart }) {
  return <div className="value-story">
    <section className="customer-proof" aria-labelledby="customer-title"><p id="customer-title">Unternehmen, die enneo bereits einsetzen</p><Reveal className="customer-logos">{[['ewe','EWE'],['gasag','GASAG'],['qcells','Qcells'],['stromee','stromee']].map(([file,name]) => <img key={file} src={`/assets/customers/${file}.svg`} width="150" height="44" loading="lazy" alt={name}/>)}</Reveal></section>
    <ProcessExample/>
    <section className="story-benefits" aria-labelledby="benefit-title"><Reveal><div className="story-heading"><p className="story-kicker">MEHR RAUM FÜR GUTEN SERVICE</p><h2 id="benefit-title">Routine für die KI.<br/><em>Zeit für Ihr Team.</em></h2></div><div className="benefit-lines">{[
      ['01','Weniger Handarbeit','Anliegen zuordnen, Daten nachschlagen, Vorgänge bearbeiten: enneo übernimmt wiederkehrende Schritte.'],
      ['02','Weniger Systemwechsel','Daten aus CRM und ERP nutzen, statt Informationen zwischen Fenstern zu kopieren.'],
      ['03','Mehr Kontrolle','Ihr Team gibt kritische Schritte frei. Unklare Fälle kommen mit Kontext zurück.'],
    ].map(([number,title,body]) => <div className="benefit-line" key={number}><span className="benefit-number">{number}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div></Reveal></section>
    <section className="customer-voice" aria-label="Kundenstimme EWE"><Reveal><img src="/assets/customers/ewe.svg" width="116" height="44" loading="lazy" alt="EWE"/><blockquote>„Durch KI wird der Kundenservice menschlicher.“</blockquote><p><strong>Daniel Albrecht</strong><span>Leiter Kunde & Service im EWE-Center Kundendienst</span></p><a href="https://www.enneo.ai/" target="_blank" rel="noreferrer">Kundenstimme auf enneo.ai<ArrowRight size={15} aria-hidden="true"/></a></Reveal></section>
    <section className="story-integration" aria-labelledby="integration-title"><Reveal><div className="story-heading"><p className="story-kicker">PASST IN IHREN SERVICEALLTAG</p><h2 id="integration-title">Mit Ihren Systemen.<br/><em>Nach Ihren Regeln.</em></h2></div><div className="system-bridge" aria-label="enneo verbindet Kontaktkanäle mit CRM, ERP und Ticketsystemen"><div className="bridge-channels"><span><Mail size={17} aria-hidden="true"/>E-Mail</span><span><Phone size={17} aria-hidden="true"/>Telefon</span><span><MessageSquare size={17} aria-hidden="true"/>Chat</span></div><div className="bridge-line" aria-hidden="true"/><div className="bridge-center"><img src="/assets/logo.svg" width="130" height="30" loading="lazy" alt="enneo"/></div><div className="bridge-line" aria-hidden="true"/><div className="bridge-systems"><Database size={19} aria-hidden="true"/><span>CRM · ERP · Ticketsystem</span></div></div><p className="integration-note">Zum Beispiel SAP IS-U oder Salesforce. Anbindung und Berechtigungen stimmen wir auf Ihren Prozess ab.</p><div className="security-notes"><span><ShieldCheck size={17} aria-hidden="true"/>Hosting in der EU</span><span><Check size={17} aria-hidden="true"/>Kein Modelltraining mit Ihren Daten</span></div></Reveal></section>
    <section className="story-close" aria-labelledby="close-title"><Reveal><p className="story-kicker">IHRE PROZESSE. IHRE DEMO.</p><h2 id="close-title">Was könnte enneo<br/><em>für Ihr Team erledigen?</em></h2><p>Wir zeigen Ihnen einen passenden Serviceprozess und klären Ihre Fragen zu Anbindung und Freigaben.</p><Primary onClick={onStart}>Meine Demo vorbereiten</Primary><span className="close-caption">30 Minuten · auf Ihren Service zugeschnitten</span></Reveal></section>
  </div>;
}
