
import Parser from 'ua-parser-js';

export async function browserHandler(request: Request): Promise<unknown> {
    const strUa = request.headers.get('user-agent') || 'unknown'
    const ua = new Parser(strUa)

    const result = ua.getResult()

    return Promise.resolve(result)
}