
export async function ipHandler(request: Request): Promise<unknown> {
    const result: {ip: string, connectingIp?:string, country: string} = {
        ip: request.headers.get('x-real-ip') || 'unknown',
        country: request.headers.get('cf-ipcountry') || 'unknown'
    }

    // add proxy ip if found any
    const connectingIp = request.headers.get('cf-connecting-ip');
    if (result.ip !== connectingIp) {
        result.connectingIp = connectingIp || 'unknown'
    }

    return Promise.resolve(result)
}