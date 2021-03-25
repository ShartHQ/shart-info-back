import { timeHandler } from './handlers';
import { Router } from './router';

export async function handleRequest(request: Request): Promise<Response> {
  const r = new Router()

  r.get('/time', request => timeHandler(request))
  
  return await r.route(request)
}
