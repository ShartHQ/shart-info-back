import { RouteCondition, RouteHandler, RouteInfo } from "./types"

/**
 * Helper functions that when passed a request will return a
 * boolean indicating if the request uses that HTTP method,
 * header, host or referrer.
 */
export const Method = (method: string) => (req: Request) =>
    req.method.toLowerCase() === method.toLowerCase()
export const Connect = Method('connect')
export const Delete = Method('delete')
export const Get = Method('get')
export const Head = Method('head')
export const Options = Method('options')
export const Patch = Method('patch')
export const Post = Method('post')
export const Put = Method('put')
export const Trace = Method('trace')

export const Header = (header: string, val: string) => (req: Request) => req.headers.get(header) === val
export const Host = (host: string) => Header('host', host.toLowerCase())
export const Referrer = (host: string) => Header('referrer', host.toLowerCase())

export const Path = (regExp: string) => (req: Request) => {
    const url = new URL(req.url)
    const path = url.pathname
    const match = path.match(regExp) || []
    return match[0] === path
}

/**
* The Router handles determines which handler is matched given the
* conditions present for each request.
*/
export class Router {
    routes: RouteInfo[] = []

    handle(conditions: RouteCondition[], handler: RouteHandler) {
        this.routes.push({
            conditions,
            handler,
        })
        return this
    }

    connect(url: string, handler: RouteHandler) {
        return this.handle([Connect, Path(url)], handler)
    }

    delete(url: string, handler: RouteHandler) {
        return this.handle([Delete, Path(url)], handler)
    }

    get(url: string, handler: RouteHandler) {
        return this.handle([Get, Path(url)], handler)
    }

    head(url: string, handler: RouteHandler) {
        return this.handle([Head, Path(url)], handler)
    }

    options(url: string, handler: RouteHandler) {
        return this.handle([Options, Path(url)], handler)
    }

    patch(url: string, handler: RouteHandler) {
        return this.handle([Patch, Path(url)], handler)
    }

    post(url: string, handler: RouteHandler) {
        return this.handle([Post, Path(url)], handler)
    }

    put(url: string, handler: RouteHandler) {
        return this.handle([Put, Path(url)], handler)
    }

    trace(url: string, handler: RouteHandler) {
        return this.handle([Trace, Path(url)], handler)
    }

    all(handler: RouteHandler) {
        return this.handle([], handler)
    }

    route(req: Request): Promise<Response> {
        const route = this.resolve(req)

        if (route) {
            return route.handler(req)
        }

        const notFound = new Response('resource not found', {
            status: 404,
            statusText: 'not found',
            headers: {
                'content-type': 'text/plain',
            },
        })
        return Promise.resolve(notFound)
    }

    /**
     * resolve returns the matching route for a request that returns
     * true for all conditions (if any).
     */
    resolve(req: Request) {
        return this.routes.find(r => {
            if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
                return true
            }

            if (typeof r.conditions === 'function') {
                return r.conditions(req)
            }

            return r.conditions.every(c => c(req))
        })
    }
}
