import { browserHandler, headersHandler, ipHandler, timeHandler } from './handlers';
import { Router } from './router';

export async function handleRequest(request: Request): Promise<Response> {
  const router = new Router()
    .get('/time', req => timeHandler(req).then(jsonResponseFormatter))
    .get('/headers', req => headersHandler(req).then(jsonResponseFormatter))
    .get('/ip', req => ipHandler(req).then(jsonResponseFormatter))
    .get('/browser', req => browserHandler(req).then(jsonResponseFormatter))
  
  return await router.route(request)
}

export function jsonResponseFormatter(data: unknown) {
  const body = JSON.stringify(data)
  return new Response(body, {
      headers: { 'content-type': 'application/json' },
  })
}
