import { ArrowRight, Check, ChevronRight, ShieldCheck, Zap, ShoppingBag, Building2, MessagesSquare, Workflow, FileText, Shapes, Inbox, CircleHelp, Target, Layers, Compass, UserRound, CircleCheck } from 'lucide-react';
import {questions} from './flow.mjs';
const icons={Zap,ShieldCheck,ShoppingBag,Building2,MessagesSquare,Workflow,FileText,Shapes,Inbox,CircleHelp,Target,Layers,Compass,UserRound};
export function Primary({children,onClick,disabled=false,type='button'}){return <button className="primary" type={type} onClick={onClick} disabled={disabled}>{children}<ArrowRight size={22} aria-hidden="true"/></button>;}
export function Choices({question,value,onSelect,compact=false}){return <div role="radiogroup" aria-label={question.title} className={`choices ${compact?'choices-compact':''}`}>{question.options.map(([id,label,detail,icon])=>{const I=icons[icon];return <button key={id} type="button" role="radio" tabIndex={value===id||(!value&&id===question.options[0][0])?0:-1} aria-checked={value===id} className={`choice ${value===id?'selected':''}`} onClick={()=>onSelect(id)} onKeyDown={event=>{if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(event.key)){event.preventDefault();const delta=['ArrowDown','ArrowRight'].includes(event.key)?1:-1;const next=(question.options.findIndex(o=>o[0]===id)+delta+question.options.length)%question.options.length;onSelect(question.options[next][0]);event.currentTarget.parentElement.children[next].focus();}}}><span className="choice-icon"><I size={24} strokeWidth={1.65}/></span><span className="choice-copy"><strong>{label}</strong>{detail&&!compact&&<span>{detail}</span>}</span><span className="choice-end">{value===id?<Check size={19}/>:<ChevronRight size={20}/>}</span></button>;})}</div>;}
function EntryArt({variant}) {
 return <div className={`entry-art entry-art-${variant}`} aria-hidden="true">
   <img src={`/assets/agent-${variant}.webp`} width={variant==='a'?1190:variant==='b'?1156:1161} height={variant==='a'?1322:variant==='b'?1360:1355} alt="" fetchPriority="high"/>
   {variant==='a'&&<div className="entry-result"><CircleCheck size={19}/><span>Anfrage erledigt.</span></div>}
 </div>;
}
export function Landing({variant,industry,onIndustry,onStart}) {
 const isDirect=variant==='b';
 return <main className={`entry entry-${variant}`}>
   <div className="entry-content">
     <h1>{variant==='a'?<>Chatbots antworten.<em>enneo erledigt.</em></>:isDirect?<>Ihr Service.<em>Ihre Demo.</em></>:<>Ihre KI arbeitet.<em>Sie entscheiden.</em></>}</h1>
     <p className="entry-description">{variant==='a'?'KI erledigt Serviceanfragen direkt in Ihren Systemen.':isDirect?'In welcher Branche arbeiten Sie?':'Automatisierter Service. Mit Ihren Freigaben.'}</p>
     {isDirect&&<Choices question={questions[0]} compact value={industry} onSelect={onIndustry}/>}
     <div className="entry-action">
       <Primary onClick={onStart} disabled={isDirect&&!industry}>Demo vorbereiten</Primary>
       <p className="entry-caption">{isDirect?'3 weitere Fragen · dann Termin wählen':'4 kurze Fragen · dann Termin wählen'}</p>
     </div>
   </div>
   <EntryArt variant={variant}/>
   <div className="entry-trust"><ShieldCheck size={15} aria-hidden="true"/><span>EU-gehostet · Kein Training mit Ihren Daten</span></div>
 </main>;
}
export function StepProgress({step}){return <div className="step-progress"><div className="progress-meta"><span>Ihre Demo vorbereiten</span><span>Frage {step+1} von 4</span></div><div className="progress-track" role="progressbar" aria-label="Fortschritt der Fragen" aria-valuemin={0} aria-valuemax={4} aria-valuenow={step+1}>{questions.map((q,i)=><span key={q.key} className={i<=step?'complete':''}/>)}</div></div>;}
export function MoreInfo({faq,setFaq}) {
 const items=[
   ['Was erwartet mich in der Demo?','In 30 Minuten sehen Sie einen passenden Serviceprozess und klären Ihre Fragen zu Integration und Freigaben.'],
   ['Muss ich etwas vorbereiten?','Ein konkretes Anliegen aus Ihrem Servicealltag genügt. Gern können auch Kolleginnen und Kollegen aus der IT teilnehmen.'],
   ['Funktioniert enneo mit unseren Systemen?','Welche Anbindungen und Lese- oder Schreibzugriffe möglich sind, klären wir anhand Ihres Prozesses.'],
 ];
 return <section className="entry-details"><h2>Gut zu wissen.</h2>{items.map(([q,a],i)=><div className="faq-item" key={q}><h3><button aria-expanded={faq===i} aria-controls={`faq-${i}`} onClick={()=>setFaq(faq===i?null:i)}>{q}<ChevronRight className={faq===i?'rotated':''} size={20}/></button></h3><div id={`faq-${i}`} hidden={faq!==i}><p>{a}</p></div></div>)}</section>;
}
