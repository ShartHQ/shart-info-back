
export async function timeHandler(request: Request): Promise<unknown> {
    const date = new Date();

    return Promise.resolve({
        microtime: date.getTime(),
        isoTime: date.toISOString(),
    })
}