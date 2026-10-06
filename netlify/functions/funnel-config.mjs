export default async()=>new Response(JSON.stringify({leadEnabled:!!(process.env.MAKE_FUNNEL_ENABLED==='true'&&process.env.MAKE_FUNNEL_WEBHOOK_URL&&process.env.MAKE_FUNNEL_WEBHOOK_KEY)}),{headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export const config={path:'/api/funnel-config'};
