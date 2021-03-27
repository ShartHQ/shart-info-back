import { corsHeaders } from "../config";

export async function optionsHandler(request: Request): Promise<Response> {
    let response: Response;
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    let headers = request.headers;
    if (
        headers.get("Origin") !== null &&
        headers.get("Access-Control-Request-Method") !== null &&
        headers.get("Access-Control-Request-Headers") !== null
    ) {
        // Handle CORS pre-flight request.
        // If you want to check or reject the requested method + headers
        // you can do that here.
        let respHeaders = {
            ...corsHeaders,
            // Allow all future content Request headers to go back to browser
            // such as Authorization (Bearer) or X-Client-Name-Version
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers") || '',
        }

        response = new Response(null, {
            headers: respHeaders,
        })
    } else {
        // Handle standard OPTIONS request.
        // If you want to allow other HTTP Methods, you can do that here.
        response = new Response(null, {
            headers: {
                Allow: "GET, HEAD, POST, OPTIONS",
            },
        })
    }

    return Promise.resolve(response);
}