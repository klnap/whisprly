declare module "next/server" {
  import { NextRequest, NextResponse } from "next/dist/server/web/spec-extension/request"
  export { NextRequest, NextResponse }

  export type NextMiddleware = (
    request: NextRequest,
    event: { signal: AbortSignal }
  ) => Promise<NextResponse | void> | NextResponse | void

  export type NextMiddlewareResult = NextResponse | Response | undefined | void

  export interface NextConfig {
    experimental?: {
      instrumentationHook?: boolean
      serverActions?: boolean
      serverComponentsExternalPackages?: string[]
    }
    reactStrictMode?: boolean
    images?: {
      domains?: string[]
      unoptimized?: boolean
      remotePatterns?: {
        protocol?: 'http' | 'https'
        hostname: string
        port?: string
        pathname?: string
      }[]
    }
    rewrites?: () => Promise<any>
    redirects?: () => Promise<any>
    headers?: () => Promise<any>
  }

  export type Middleware = (
    request: NextRequest
  ) => Promise<NextResponse> | NextResponse

  export type MiddlewareConfig = {
    matcher: string | string[]
  }
}

declare module 'next/font/google' {
  type NextFontGoogleOptions = {
    weight?: string | string[]
    style?: string
    subsets?: string[]
    display?: string
    preload?: boolean
    fallback?: string[]
    adjustFontFallback?: boolean
    variable?: string
  }

  type FontReturnType = {
    className: string
    style: {
      fontFamily: string
      fontWeight?: number | string
      fontStyle?: string
    }
    variable?: string
  }

  export default function nextFontGoogle(
    font: string,
    options?: NextFontGoogleOptions
  ): FontReturnType
}

declare module 'next/cache' {
  export function revalidatePath(
    path: string,
    type?: 'page' | 'layout'
  ): void
  
  export function revalidateTag(tag: string): void
} 