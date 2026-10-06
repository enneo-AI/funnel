export const CALENDLY_URL = 'https://calendly.com/enneo-ai/demo';
export function calendlyMessage(event, iframeWindow) {
 if (!iframeWindow || event.source !== iframeWindow || event.origin !== 'https://calendly.com') return null;
 const data=event.data;
 if(!data || typeof data!=='object')return null;
 if(data.event==='calendly.event_type_viewed')return {type:'view'};
 if(data.event==='calendly.date_and_time_selected')return {type:'time_selected'};
 if(data.event!=='calendly.event_scheduled')return null;
 const eventUri=data.payload?.event?.uri, inviteeUri=data.payload?.invitee?.uri;
 const uuid='[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
 const match=typeof eventUri==='string' && eventUri.match(new RegExp(`^https://api\\.calendly\\.com/scheduled_events/(${uuid})$`,'i'));
 if(!match || typeof inviteeUri!=='string' || !new RegExp(`^${eventUri.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}/invitees/(${uuid})$`,'i').test(inviteeUri))return null;
 return {type:'scheduled',eventUri,inviteeUri,eventId:`calendly-${inviteeUri.split('/').at(-1)}`};
}
let widgetPromise;
export function loadCalendly(){
 if(window.Calendly)return Promise.resolve(window.Calendly);
 if(!widgetPromise)widgetPromise=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='https://assets.calendly.com/assets/external/widget.js';script.async=true;
  const timer=setTimeout(()=>{widgetPromise=undefined;script.remove();reject(new Error('timeout'));},15000);
  script.onload=()=>{clearTimeout(timer);if(window.Calendly)resolve(window.Calendly);else{widgetPromise=undefined;reject(new Error('unavailable'));}};
  script.onerror=()=>{clearTimeout(timer);widgetPromise=undefined;script.remove();reject(new Error('load'));};document.head.appendChild(script);
 });
 return widgetPromise;
}
