// Exact production hostnames; deployment previews stay excluded.
export const PRODUCTION_HOSTS=['funnel.enneo.ai','enneo-funnel.netlify.app'];
export const isProductionHost=hostname=>PRODUCTION_HOSTS.includes(hostname);
export const isProductionOrigin=origin=>PRODUCTION_HOSTS.some(host=>origin==='https://'+host);
