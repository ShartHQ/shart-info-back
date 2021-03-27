import { DEBUG } from './environment'
import { handleRequest } from './handler'


addEventListener('fetch', (event) => {
  try {
    event.respondWith(handleRequest(event.request))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})
