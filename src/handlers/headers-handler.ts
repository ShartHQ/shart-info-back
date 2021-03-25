
export async function headersHandler(request: Request): Promise<unknown> {
    return Promise.resolve(Object.fromEntries(request.headers))
}