import { useState } from 'react';
import './consent.css';
export function TrackingConsent({tracking}){
 const [open,setOpen]=useState(()=>tracking.getConsent()===null);
 function choose(allowed){tracking.setConsent(allowed);setOpen(false);}
 return <><button className="consent-settings" onClick={()=>setOpen(true)}>Cookie-Einstellungen</button>{open&&<section className="consent-panel" aria-label="Cookie-Einstellungen"><h2>Ihre Cookie-Auswahl</h2><p>Mit Ihrer Zustimmung verwenden wir den Meta-Pixel, um Seitenaufrufe und Schritte in diesem Funnel zu messen und unsere Werbung auszuwerten. Dabei erhält Meta unter anderem Ihre IP-Adresse, Browserinformationen und besuchte URL. Ihre Formulareingaben senden wir nicht an Meta. Sie können Ihre Auswahl jederzeit hier ändern.</p><a href="https://www.enneo.ai/legal/privacy-policy" target="_blank" rel="noreferrer">Datenschutz</a><div className="consent-actions"><button onClick={()=>choose(false)}>Nur notwendige</button><button onClick={()=>choose(true)}>Marketing erlauben</button></div></section>}</>;
}
