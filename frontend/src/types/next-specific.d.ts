declare module 'next/dist/shared/lib/router/router' {
  import { NextRouter } from 'next/router'
  export type { NextRouter }
}

declare module 'next/dist/client/link' {
  import { LinkProps } from 'next/link'
  export type { LinkProps }
}

declare module 'next/dist/client/image' {
  import { ImageProps as NextImageProps } from 'next/image'
  export type { NextImageProps }
}

declare module 'next/dist/server/web/spec-extension/request' {
  export class NextRequest extends Request {
    readonly nextUrl: URL
    readonly cookies: {
      get(name: string): { name: string; value: string } | undefined
      getAll(): Array<{ name: string; value: string }>
      has(name: string): boolean
    }
    readonly geo: {
      city?: string
      country?: string
      countryRegion?: string
      latitude?: string
      longitude?: string
      region?: string
    }
    readonly ip?: string
  }

  export class NextResponse extends Response {
    static json(body: any): NextResponse
    static redirect(url: string): NextResponse
    static rewrite(url: string): NextResponse
    static next(): NextResponse
    cookies: {
      get(name: string): { name: string; value: string } | undefined
      getAll(): Array<{ name: string; value: string }>
      set(name: string, value: string): void
      delete(name: string): void
      has(name: string): boolean
    }
  }
}

// Deklaracja dla specyficznych komponentów Next.js
declare namespace JSX {
  interface IntrinsicElements {
    'next:script': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string
      strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload'
    }
  }
}

// Poprawa typów dla API Routes w App Router
declare module 'next' {
  export type NextApiRequest = import('next').NextApiRequest
  export type NextApiResponse<T = any> = import('next').NextApiResponse<T>

  export interface GetServerSidePropsContext {
    req: NextApiRequest
    res: NextApiResponse
    params?: { [key: string]: string }
    query: { [key: string]: string | string[] }
    resolvedUrl: string
  }

  export interface GetStaticPropsContext {
    params?: { [key: string]: string }
    preview?: boolean
    previewData?: any
    locale?: string
    locales?: string[]
    defaultLocale?: string
  }

  export interface GetStaticPathsContext {
    locales?: string[]
    defaultLocale?: string
  }
} 