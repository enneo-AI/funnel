import {createHash} from 'node:crypto';
import {routeLead,validateContact,questions,labelFor} from '../../src/flow.mjs';
const ORIGIN='https://enneo-funnel.netlify.app';
const json=(status,body)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export function parseLead(body){
 if(!body||typeof body!=='object'||body.website)return null;
 const contact=body.contact;
 if(!contact||['name','email','company'].some(k=>typeof contact[k]!=='string'||contact[k].length>(k==='email'?254:160))||Object.keys(validateContact(contact)).length)return null;
 if(!body.answers||['incomplete','not-business'].includes(routeLead(body.answers))||!['a','b','c'].includes(body.variant))return null;
 if(typeof body.submissionId!=='string'||!/^\w[\w-]{15,79}$/.test(body.submissionId))return null;
 return {submission_id:body.submissionId,contact:Object.fromEntries(Object.entries(contact).filter(([k])=>['name','email','company'].includes(k)).map(([k,v])=>[k,v.trim()])),answers:Object.fromEntries(questions.map(q=>[q.key,body.answers[q.key]])),variant:body.variant,source:'enneo-demo-funnel',route:routeLead(body.answers)};
}
export function createLeadHandler({env=process.env,fetcher=fetch}={}){return async (request,context={})=>{
 if(request.method!=='POST')return json(405,{error:'method_not_allowed'});
 if(request.headers.get('origin')!==ORIGIN)return json(403,{error:'origin_not_allowed'});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return json(415,{error:'json_required'});
 const raw=await request.text();if(raw.length>12000)return json(413,{error:'too_large'});
 let lead;try{lead=parseLead(JSON.parse(raw));}catch{}if(!lead)return json(400,{error:'invalid_submission'});
 const endpoint=env.MAKE_FUNNEL_WEBHOOK_URL,secret=env.MAKE_FUNNEL_WEBHOOK_KEY;
 if(env.MAKE_FUNNEL_ENABLED!=='true'||!endpoint||!secret)return json(503,{error:'lead_service_unavailable'});
 let url;try{url=new URL(endpoint);}catch{return json(503,{error:'lead_service_unavailable'});}
 if(url.protocol!=='https:'||!/^hook\.(eu1|eu2|us1|us2)\.make\.com$/.test(url.hostname))return json(503,{error:'lead_service_unavailable'});
 const fingerprint=createHash('sha256').update(JSON.stringify(lead)).digest('hex');
 const noteContent=[`Name: ${lead.contact.name}`,`E-Mail: ${lead.contact.email}`,`Unternehmen (Selbstauskunft): ${lead.contact.company}`,...questions.map(q=>`${q.title} ${labelFor(q.key,lead.answers[q.key])}`),`Funnel-Variante: ${lead.variant}`,`Prüfpfad: ${lead.route} (keine bestätigte Sales-Qualifikation)`,`Anfrage-ID: ${lead.submission_id}`].join('\n');
 const consent=JSON.parse(raw).marketingConsent===true;
 const meta=consent?{event_name:'Lead',event_id:`lead-${lead.submission_id}`,event_time:Math.floor(Date.now()/1000),action_source:'website',event_source_url:ORIGIN+(lead.variant==='b'?'/2':lead.variant==='c'?'/3':'/'),user_data:{client_ip_address:context.ip,client_user_agent:request.headers.get('user-agent')||undefined},custom_data:{funnel_variant:lead.variant}}:null;
 try{
  const result=await fetcher(endpoint,{method:'POST',headers:{'Content-Type':'application/json','x-make-apikey':secret},body:JSON.stringify({...lead,fingerprint,note_title:`Enneo Demo-Anfrage ${lead.submission_id}`,note_content_json:JSON.stringify(noteContent),marketing_consent:consent,meta_json:consent?JSON.stringify({data:[meta]}):null}),signal:AbortSignal.timeout(20000)});
  if(!result.ok)return json(502,{error:'lead_not_confirmed'});
  const data=await result.json();
  // An ordinary Make "Accepted" response must NEVER count as an Attio save.
  if(data.status!=='saved'||data.submission_id!==lead.submission_id||typeof data.attio_record_id!=='string'||!/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(data.attio_record_id))return json(502,{error:'lead_not_confirmed'});
  return json(200,{status:'saved',eventId:`lead-${lead.submission_id}`});
 }catch{return json(502,{error:'lead_not_confirmed'});}
};}
export default createLeadHandler();
export const config={path:'/api/lead',rateLimit:{windowLimit:10,windowSize:60,aggregateBy:['ip','domain']}};
