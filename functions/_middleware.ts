/**
 * Cloudflare Pages Function — runs for every request on every hostname this
 * project is deployed to (production domain once connected, plus every
 * *.pages.dev preview URL). Its only job is to keep preview deployments out
 * of search results without ever touching production indexability:
 *
 * - On any *.pages.dev hostname: adds X-Robots-Tag: noindex, nofollow.
 * - On any other hostname (jirehcooler.com once connected): passes the
 *   response through unmodified, so production stays fully indexable.
 *
 * This is deliberately hostname-aware rather than baked into page-level
 * <meta name="robots"> tags, so nothing needs to change in the Astro build
 * itself when the production domain is connected later.
 */

interface Context {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: Context): Promise<Response> => {
  const response = await context.next();
  const hostname = new URL(context.request.url).hostname;

  if (hostname.endsWith('.pages.dev')) {
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
};
