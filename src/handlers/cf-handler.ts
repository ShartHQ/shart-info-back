
export async function cfHandler(request: Request): Promise<unknown> {
    return Promise.resolve(request.cf)
}