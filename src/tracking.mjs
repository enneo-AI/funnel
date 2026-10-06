import {isProductionHost} from './production-hosts.mjs';
// Public Meta pixel ID, verified in Enneo GmbH's Events Manager.
export const PIXEL_ID = '1573099514138831';
export const CONSENT_KEY = 'enneo-marketing-consent-v1';
const MAX_AGE = 180 * 86400000;
const eventNames = {
 funnel_start:'FunnelStart', step_view:'FunnelStepView', step_complete:'FunnelStepComplete',
 contact_preview_complete:'ContactPreviewComplete', calendar_preview_view:'CalendarPreviewView',
 booking_preview_complete:'BookingPreviewComplete', calendly_open:'CalendlyOpen', calendar_view:'CalendarView', calendar_time_selected:'CalendarTimeSelected',
};
export function createTracking(win, doc, variant) {
 let consent = null, initialized = false, viewed = false;
 const conversions=new Set();
 try { const saved=JSON.parse(win.localStorage.getItem(CONSENT_KEY));
  if(saved && typeof saved.allowed==='boolean' && Number.isFinite(saved.at) && Date.now()-saved.at>=0 && Date.now()-saved.at<MAX_AGE) consent=saved.allowed;
 } catch { /* Storage may be unavailable. */ }
 const permitted = () => consent===true && (isProductionHost(win.location.hostname));
 function activate(){
  if(!permitted())return;
  if(!initialized){
   if(!win.fbq){const q=function(...args){q.callMethod?q.callMethod(...args):q.queue.push(args);};q.queue=[];q.loaded=true;q.version='2.0';q.push=q;win.fbq=q;win._fbq=q;}
   win.fbq('consent','grant');
   win.fbq('set','autoConfig',false,PIXEL_ID);
   win.fbq('init',PIXEL_ID);
   const script=doc.createElement('script');script.async=true;script.src='https://connect.facebook.net/en_US/fbevents.js';doc.head.appendChild(script);
   initialized=true;
  }else win.fbq('consent','grant');
  if(!viewed){win.fbq('trackSingle',PIXEL_ID,'PageView',{funnel_variant:variant,funnel_mode:'live_calendar'});viewed=true;}
 }
 return {
  getConsent:()=>consent,
  conversion(name,eventId){
   if(!permitted()||!['Lead','Schedule'].includes(name)||typeof eventId!=='string'||!eventId||conversions.has(eventId))return;
   activate();conversions.add(eventId);
   win.fbq('trackSingle',PIXEL_ID,name,{funnel_variant:variant,funnel_mode:'live_calendar'},{eventID:eventId});
  },
  activate,
  setConsent(allowed){
   consent=allowed===true;
   try{win.localStorage.setItem(CONSENT_KEY,JSON.stringify({allowed:consent,at:Date.now()}));}catch{}
   if(consent)activate();else{
    if(initialized)win.fbq('consent','revoke');
    for(const name of ['_fbp','_fbc'])for(const domain of ['',`; domain=${win.location.hostname}`,`; domain=.${win.location.hostname}`])doc.cookie=`${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
   }
  },
  event(name,detail={}){
   if(!permitted()||!eventNames[name])return;
   activate();
   const params={funnel_variant:variant,funnel_mode:'live_calendar'};
   if(['industry','need','volume','stage'].includes(detail.step))params.funnel_step=detail.step;
   win.fbq('trackSingleCustom',PIXEL_ID,eventNames[name],params);
  },
 };
}
