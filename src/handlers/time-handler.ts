
export async function timeHandler(request: Request) {
    const date = new Date();
    const result = {
        microtime: date.getTime(),
        isoTime: date.toISOString(),
    }

    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify(result)
    return new Response(body, init)
}