// Enneo Demo Funnel stream 16054667514, verified in GA4 property 551723662.
export const GA_ID = 'G-DGN4ZBRG49';
export const ANALYTICS_CONSENT_KEY='enneo-analytics-consent-v1';
const JOURNEY_KEY='enneo-funnel-measurement-v1', AGE=180*86400000, IDLE=30*60000;
export const STEPS=['landing','industry','need','volume','stage','contact','calendar','private','success'];
const EVENTS=['funnel_start','funnel_form_start','funnel_form_error','funnel_submit_attempt','funnel_submit_error','funnel_contact_valid','funnel_lead_saved','funnel_calendar_loaded','funnel_calendar_error','funnel_calendar_retry','funnel_time_selected','funnel_calendar_external','funnel_booking_confirmed','funnel_private_exit','funnel_restart'];
const ONCE=new Set(['funnel_start','funnel_form_start','funnel_contact_valid','funnel_lead_saved','funnel_calendar_loaded','funnel_time_selected','funnel_booking_confirmed','funnel_private_exit']);
export function safeLocation(location){
 const path=['/','/1','/2','/3'].includes(location.pathname)?location.pathname:'/';
 const url=new URL(location.origin+path),query=new URLSearchParams(location.search);
 for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id']){const value=query.get(key);if(value&&/^[a-zA-Z0-9_-]{1,80}$/.test(value))url.searchParams.set(key,value);}
 return url.href;
}
export function createAnalytics(win,doc,variant,{id=GA_ID,now=()=>Date.now()}={}){
 let consent=null,initialized=false,current='landing',mode='calendar_only',entry='full',since=now(),elapsed=0;
 let seen=new Set(),lastActivity=now();
 try{const s=JSON.parse(win.localStorage.getItem(ANALYTICS_CONSENT_KEY));if(s&&typeof s.allowed==='boolean'&&now()-s.at>=0&&now()-s.at<AGE)consent=s.allowed;}catch{}
 const debug=new URLSearchParams(win.location.search).get('analytics_debug')==='1';
 const hostOK=()=>win.location.hostname==='enneo-funnel.netlify.app';
 const permitted=()=>consent===true&&hostOK()&&/^G-[A-Z0-9]+$/.test(id);
 function persist(){try{win.sessionStorage.setItem(JOURNEY_KEY,JSON.stringify({variant,seen:[...seen],at:now(),entry}));}catch{}}
 function restore(){try{const s=JSON.parse(win.sessionStorage.getItem(JOURNEY_KEY));if(s?.variant===variant&&now()-s.at>=0&&now()-s.at<IDLE&&Array.isArray(s.seen)){seen=new Set(s.seen.filter(v=>typeof v==='string'));entry=s.entry==='partial'?'partial':'full';}}catch{}}
 function activeTime(){const value=elapsed+(doc.visibilityState==='hidden'?0:Math.max(0,now()-since));return Math.min(IDLE,Math.round(value));}
 function send(name,detail={},once=false){
  if(!permitted())return;
  if(now()-lastActivity>=IDLE){seen.clear();entry=current==='landing'?'full':'partial';}
  lastActivity=now();if(once&&seen.has(name))return;if(once)seen.add(name);
  const params={send_to:id,funnel_variant:variant,funnel_mode:mode,funnel_entry:entry,funnel_step:current,page_location:safeLocation(win.location),page_title:'Enneo Demo Funnel',page_referrer:'',...(debug?{debug_mode:true}:{}),...detail};
  win.gtag('event',name,params);persist();
 }
 function viewCurrent(){send('funnel_view_'+current,{},true);if(current==='landing'&&variant==='b')send('funnel_view_industry',{funnel_step:'industry'},true);}
 function activate(){
  if(!permitted())return;
  win['ga-disable-'+id]=false;
  if(!initialized){
   restore();win.dataLayer=win.dataLayer||[];win.gtag=function(){win.dataLayer.push(arguments);};
   win.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
   win.gtag('js',new Date(now()));
   win.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:safeLocation(win.location),page_referrer:'',cookie_domain:'none',cookie_expires:180*86400});
   const script=doc.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;doc.head.appendChild(script);initialized=true;
  }
  send('page_view',{},true);viewCurrent();
 }
 return {
  activate,getConsent:()=>consent,setMode:value=>{mode=value===true?'crm_enabled':'calendar_only';},
  setConsent(allowed){consent=allowed===true;try{win.localStorage.setItem(ANALYTICS_CONSENT_KEY,JSON.stringify({allowed:consent,at:now()}));}catch{}
   if(consent){if(!initialized){entry=current==='landing'?'full':'partial';since=now();elapsed=0;}if(initialized){win['ga-disable-'+id]=false;win.gtag('consent','update',{analytics_storage:'granted'});}activate();}
   else{win['ga-disable-'+id]=true;if(initialized)win.gtag('consent','update',{analytics_storage:'denied'});seen.clear();try{win.sessionStorage.removeItem(JOURNEY_KEY);}catch{};for(const item of (doc.cookie||'').split(';')){const name=item.trim().split('=')[0];if(/^_ga(?:_|$)/.test(name))doc.cookie=name+'=; Max-Age=0; path=/; SameSite=Lax';}}
  },
  screen(step){if(!STEPS.includes(step))return;const changed=current!==step;if(changed&&permitted())send('funnel_step_leave',{step_time_ms:activeTime()});current=step;if(changed){since=now();elapsed=0;}if(permitted()){if(changed&&seen.has('funnel_view_'+step))send('funnel_step_revisit');viewCurrent();}},
  complete(step){if(!['industry','need','volume','stage','contact'].includes(step))return;send('funnel_complete_'+step,{funnel_step:step,step_time_ms:activeTime()},true);},
  back(to){if(STEPS.includes(to))send('funnel_back',{target_step:to,step_time_ms:activeTime()});},
  event(name,detail={}){if(!EVENTS.includes(name))return;const params={};if(['name','email','company'].includes(detail.field))params.error_field=detail.field;if(['validation','network','calendar_load','calendar_timeout'].includes(detail.error))params.error_type=detail.error;send(name,params,ONCE.has(name));},
  visibility(){if(doc.visibilityState==='hidden')elapsed+=Math.max(0,now()-since);since=now();},
  restart(){send('funnel_restart');seen.clear();current='landing';entry='full';elapsed=0;since=now();if(permitted()){persist();viewCurrent();}},
 };
}
