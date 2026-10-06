import {useEffect,useRef,useState} from 'react';
import {CALENDLY_URL,calendlyMessage,loadCalendly} from './booking.mjs';
import './booking.css';
export function BookingCalendar({contact,onScheduled,onEvent}){
 const container=useRef(null),callbacks=useRef({onScheduled,onEvent});
 callbacks.current={onScheduled,onEvent};
 const [error,setError]=useState(false),[retry,setRetry]=useState(0),[loading,setLoading]=useState(true);
 useEffect(()=>{
  let cancelled=false;const node=container.current;
  setError(false);setLoading(true);
  const listener=e=>{const message=calendlyMessage(e,node.querySelector('iframe')?.contentWindow);if(!message)return;if(message.type==='scheduled')callbacks.current.onScheduled(message);else{if(message.type==='view')setLoading(false);callbacks.current.onEvent(message.type);}};
  window.addEventListener('message',listener);
  loadCalendly().then(calendly=>{if(cancelled)return;calendly.initInlineWidget({url:CALENDLY_URL+'?primary_color=613cdd',parentElement:node,prefill:{name:contact.name,email:contact.email},resize:true});}).catch(()=>{if(!cancelled){setError(true);setLoading(false);callbacks.current.onEvent('error');}});
  return()=>{cancelled=true;window.removeEventListener('message',listener);node.replaceChildren();};
 },[contact.name,contact.email,retry]);
 return <section className="real-calendar" aria-label="Demo-Termin buchen"><h2>Wählen Sie Ihren Termin</h2>{loading&&<p role="status">Verfügbare Termine werden geladen …</p>}{error&&<div role="alert"><p>Der Kalender konnte nicht geladen werden.</p><button className="back-button" onClick={()=>{callbacks.current.onEvent('retry');setRetry(n=>n+1);}}>Erneut versuchen</button></div>}<div ref={container} className="calendly-container"/><p className="calendar-fallback">Kalender nicht sichtbar? <a href={CALENDLY_URL} target="_blank" rel="noreferrer" onClick={()=>callbacks.current.onEvent('open')}>Bei Calendly öffnen</a></p></section>;
}
