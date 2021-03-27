import { corsHeaders } from './config';
import { browserHandler, cfHandler, headersHandler, indexHandler, ipHandler, optionsHandler, timeHandler } from './handlers';
import { Router } from './router';

export async function handleRequest(request: Request): Promise<Response> {
  const router = new Router()
    .get('/', req => indexHandler(req).then(htmlResponseFormatter))
    .options('/api/.*', req => optionsHandler(req))
    .get('/api/time', req => timeHandler(req).then(jsonResponseFormatter))
    .get('/api/headers', req => headersHandler(req).then(jsonResponseFormatter))
    .get('/api/ip', req => ipHandler(req).then(jsonResponseFormatter))
    .get('/api/browser', req => browserHandler(req).then(jsonResponseFormatter))
    .get('/api/cf', req => cfHandler(req).then(jsonResponseFormatter))
    .get('/api.*', req => Promise.resolve({status: 'error', code: 404 }).then(jsonResponseFormatter))
  
  return await router.route(request)
}
export function jsonResponseFormatter(data: unknown) {
  const body = JSON.stringify(data)
  return new Response(body, {
      headers: { 'content-type': 'application/json', ...corsHeaders },
  })
}

export function htmlResponseFormatter(body: string) {
  return new Response(body, {
      headers: { 'content-type': 'text/html', ...corsHeaders },
  })
}
