import { NextResponse, type NextRequest } from 'next/server'
import { clerkMiddleware } from '@clerk/nextjs/server'

function proxyFrontendApi(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/__clerk')) {
    const proxyHeaders = new Headers(req.headers)
    proxyHeaders.set('Clerk-Proxy-Url', process.env.NEXT_PUBLIC_CLERK_PROXY_URL || '')
    proxyHeaders.set('Clerk-Secret-Key', process.env.CLERK_SECRET_KEY || '')
    proxyHeaders.set('X-Forwarded-For', req.headers.get('X-Forwarded-For') || '')

    const proxyUrl = new URL(req.url)
    proxyUrl.host = 'frontend-api.clerk.dev'
    proxyUrl.port = '443'
    proxyUrl.protocol = 'https'
    proxyUrl.pathname = proxyUrl.pathname.replace('/__clerk', '')

    return NextResponse.rewrite(proxyUrl, {
      request: {
        headers: proxyHeaders,
      },
    })
  }

  return null
}

export default function proxy(req: NextRequest) {
  // First check if it's a proxy request
  const proxyResponse = proxyFrontendApi(req)
  if (proxyResponse) {
    return proxyResponse
  }

  // Otherwise, use Clerk's middleware
  return clerkMiddleware()(req, {} as any)
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc|__clerk)(.*)',
  ],
}
