import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Clock3, Building2, MessagesSquare, Workflow, Pencil, RotateCcw } from 'lucide-react';
import { questions, variantFromLocation, labelFor, routeLead, validateContact } from './flow.mjs';
import { Primary, Choices, Landing, StepProgress, MoreInfo } from './components.jsx';
import { ValueStory } from './ValueStory.jsx';
import { createTracking } from './tracking.mjs';
import { TrackingConsent } from './TrackingConsent.jsx';
import { BookingCalendar } from './BookingCalendar.jsx';
export function App(){
 const [variant]=useState(()=>variantFromLocation(window.location.pathname,window.location.search)),[step,setStep]=useState(-1);
 const [answers,setAnswers]=useState({industry:'',need:'',volume:'',stage:''});
 const [contact,setContact]=useState({name:'',email:'',company:''}),[errors,setErrors]=useState({});
 const events=useRef([{name:'funnel_view',variant}]);
 const [tracking]=useState(()=>createTracking(window,document,variant));
 useEffect(()=>{tracking.activate();},[tracking]);
 const [faq,setFaq]=useState(null),[submitting,setSubmitting]=useState(false),[submitError,setSubmitError]=useState(''),[leadEnabled,setLeadEnabled]=useState(false);
 const submission=useRef({id:crypto.randomUUID(),fingerprint:'',saved:false});
 const booked=useRef(new Set());
 useEffect(()=>{let active=true;fetch('/api/funnel-config').then(r=>r.ok?r.json():{}).then(c=>{if(active)setLeadEnabled(c.leadEnabled===true);}).catch(()=>{});return()=>{active=false;};},[]);
 const contentRef=useRef(null);
 const emit=(name,detail={})=>{events.current.push({name,variant,...detail});tracking.event(name,detail);};
 const move=next=>{setStep(next);window.scrollTo({top:0,behavior:'instant'});};
 useEffect(()=>{if(step!==-1)contentRef.current?.focus({preventScroll:true});},[step]);
 function start(){emit('funnel_start');const next=variant==='b'&&answers.industry?1:0;if(next===1)emit('step_complete',{step:'industry'});emit('step_view',{step:questions[next].key});move(next);}
 function next(){emit('step_complete',{step:questions[step].key});if(step===3){emit('qualification_result',{step:routeLead(answers)});move(answers.stage==='private'?7:4);}else{emit('step_view',{step:questions[step+1].key});move(step+1);}}
 function restart(){setAnswers({industry:'',need:'',volume:'',stage:''});setContact({name:'',company:'',email:''});setErrors({});submission.current={id:crypto.randomUUID(),fingerprint:'',saved:false};setSubmitError('');events.current=[{name:'funnel_view',variant}];move(-1);}
 async function submitContact(e){
  e.preventDefault();if(submitting)return;
  const errs=validateContact(contact);setErrors(errs);if(Object.keys(errs).length){document.getElementById(Object.keys(errs)[0])?.focus();return;}
  setSubmitError('');
  if(leadEnabled){
   const fingerprint=JSON.stringify({contact,answers});
   if(submission.current.fingerprint!==fingerprint)submission.current={id:crypto.randomUUID(),fingerprint,saved:false};
   if(!submission.current.saved){
    setSubmitting(true);
    try{const response=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contact,answers,variant,marketingConsent:tracking.getConsent()===true,submissionId:submission.current.id,website:e.currentTarget.elements.website.value})});
     const result=await response.json();if(!response.ok||result.status!=='saved')throw new Error('not saved');
     submission.current.saved=true;tracking.conversion('Lead',result.eventId);
    }catch{setSubmitError('Ihre Anfrage konnte noch nicht bestätigt werden. Bitte versuchen Sie es erneut oder öffnen Sie direkt den Kalender.');setSubmitting(false);return;}
    setSubmitting(false);
   }
  }
  emit('calendar_view');move(5);
 }
 function scheduled(booking){if(booked.current.has(booking.eventId))return;booked.current.add(booking.eventId);tracking.conversion('Schedule',booking.eventId);move(6);}
 const queryStep=step>=0&&step<4;
 return <div className={`app variant-${variant} ${step>=0?'in-flow':''}`}><a href="#main-content" className="skip-link">Zum Inhalt</a>
 <header className="site-header"><button className="brand-button" onClick={()=>move(-1)} aria-label="Zurück zum Einstieg"><img src="/assets/logo.svg" width="142" height="29" alt="enneo"/></button>{step>=0&&<span className="header-duration"><Clock3 size={15}/>30 Min.</span>}</header>
 <div id="main-content" ref={contentRef} tabIndex={-1} className="main-content">
 {step===-1&&<Landing variant={variant} industry={answers.industry} onIndustry={value=>setAnswers({...answers,industry:value})} onStart={start}/>}
 {queryStep&&<main className="flow-layout" key={`step-${step}`}><aside className="flow-aside"><p className="eyebrow">PASSEND ZU IHREM ALLTAG</p><h2>Ihre Prozesse.<br/><em>Ihre Demo.</em></h2><p>Ein paar Angaben helfen uns, Ihnen die richtigen Möglichkeiten zu zeigen.</p><img src="/assets/agent-b.webp" width="1156" height="1360" alt=""/><div className="aside-time"><Clock3 size={19}/><span>30 Minuten.<br/>Raum für Ihre Fragen.</span></div></aside><section className="question-panel"><StepProgress step={step}/><h1>{questions[step].title}</h1>{questions[step].intro&&<p className="question-intro">{questions[step].intro}</p>}<Choices compact question={questions[step]} value={answers[questions[step].key]} onSelect={value=>setAnswers(prev=>({...prev,[questions[step].key]:value}))}/><div className="question-actions"><button className="back-button" onClick={()=>move(step===0?-1:step-1)}><ArrowLeft size={18}/>Zurück</button><Primary onClick={next} disabled={!answers[questions[step].key]}>{step===3?'Demo zusammenstellen':'Weiter'}</Primary></div></section></main>}
 {step===4&&<main className="flow-layout contact-layout"><section className="contact-panel"><h1>Für wen ist die Demo?</h1><p className="question-intro">Danach wählen Sie Ihren Termin.</p><form onSubmit={submitContact} noValidate>{[['name','Ihr Name','Vor- und Nachname','name'],['company','Unternehmen','Ihr Unternehmen','organization'],['email','Geschäftliche E-Mail-Adresse','name@unternehmen.de','email']].map(([key,label,placeholder,autoComplete])=><div key={key}><label htmlFor={key}>{label}</label><input id={key} name={key} spellCheck={key!=='email'} type={key==='email'?'email':'text'} autoComplete={autoComplete} required maxLength={key==='email'?254:160} value={contact[key]} onChange={e=>setContact({...contact,[key]:e.target.value})} aria-invalid={!!errors[key]} aria-describedby={errors[key]?`${key}-error`:undefined} placeholder={placeholder}/>{errors[key]&&<p className="field-error" id={`${key}-error`} role="alert">{errors[key]}</p>}</div>)}<p className="form-privacy">{leadEnabled?'Mit „Anfrage senden & Termin wählen“ senden Sie Ihre Angaben an enneo zur Bearbeitung Ihrer Demo-Anfrage. Danach öffnen wir Calendly mit Ihrem Namen und Ihrer E-Mail-Adresse.':'Mit „Weiter zum Kalender“ öffnen Sie Calendly. Ihr Name und Ihre E-Mail-Adresse werden für die Terminbuchung vorausgefüllt.'} Zum Umgang mit Ihren Daten: <a href="https://www.enneo.ai/legal/privacy-policy" target="_blank" rel="noreferrer">Datenschutzerklärung</a>.</p><label className="submit-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>{submitError&&<div className="submission-error" role="alert"><p>{submitError}</p><button type="button" className="back-button" onClick={()=>move(5)}>Direkt zum Kalender</button></div>}<Primary type="submit" disabled={submitting}>{submitting?'Wird gesendet …':leadEnabled?'Anfrage senden & Termin wählen':'Weiter zum Kalender'}</Primary><button className="back-button form-back" type="button" onClick={()=>move(3)}><ArrowLeft size={17}/>Zurück</button></form></section><aside className="summary"><details><summary>Ihre Angaben ansehen</summary><div className="summary-rows">{questions.map((q,i)=><div key={q.key}><span>{['Branche','Ihr Schwerpunkt','Anfragen pro Monat','Ihr Vorhaben'][i]}</span><strong>{labelFor(q.key,answers[q.key])}</strong><button onClick={()=>move(i)} aria-label={`${['Branche','Schwerpunkt','Anfragevolumen','Vorhaben'][i]} ändern`}><Pencil size={15}/></button></div>)}</div></details></aside></main>}
 {step===5&&<main className="booking-layout"><div className="booking-intro"><h1>Ihr <em>Demo-Termin.</em></h1><div className="meeting-facts"><span><Clock3 size={18}/>30 Minuten</span><span><Workflow size={18}/>{labelFor('need',answers.need)}</span><span><Building2 size={18}/>{contact.company}</span></div><button className="back-button" onClick={()=>move(4)}><ArrowLeft size={18}/>Angaben bearbeiten</button></div><BookingCalendar contact={contact} onScheduled={scheduled} onEvent={type=>emit(type==='time_selected'?'calendar_time_selected':type==='open'?'calendly_open':'calendar_view')}/></main>}
 {step===6&&<main className="success-panel"><div className="success-icon"><Check size={32}/></div><h1>Ihr Termin ist<br/><em>gebucht.</em></h1><p>Calendly hat Ihre Buchung bestätigt. Die Einladung mit den Termindetails erhalten Sie per E-Mail.</p><button className="back-button" onClick={restart}><RotateCcw size={17}/>Zurück zum Einstieg</button></main>}
 {step===7&&<main className="success-panel private-panel"><div className="success-icon"><MessagesSquare size={30}/></div><h1>Ihr Anliegen gehört<br/><em>zu Ihrem Anbieter.</em></h1><p>Fragen zu Ihrer Rechnung oder Ihrem Vertrag? Nutzen Sie die Kontaktangaben Ihres Anbieters. enneo ist eine Software für Unternehmen.</p><button className="primary" onClick={()=>move(3)}>Ich suche eine Lösung für mein Unternehmen<ArrowLeft size={20}/></button></main>}
 </div>{step===-1&&<><ValueStory onStart={start}/><MoreInfo faq={faq} setFaq={setFaq}/></>}<footer className="site-footer"><span>© 2026 enneo GmbH</span><nav aria-label="Rechtliche Informationen"><a href="https://www.enneo.ai/legal/imprint" target="_blank" rel="noreferrer">Impressum</a><a href="https://www.enneo.ai/legal/privacy-policy" target="_blank" rel="noreferrer">Datenschutz</a></nav></footer><TrackingConsent tracking={tracking}/></div>;
}
