// Deklaracje typów dla Next.js
import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';

declare module 'next' {
  export interface NextPageContext {
    req?: any;
    res?: any;
    pathname: string;
    query: Record<string, string | string[]>;
    asPath?: string;
  }

  export type NextPage<P = {}, IP = P> = {
    (props: P): ReactNode;
    getInitialProps?(context: NextPageContext): Promise<IP> | IP;
  };
}

declare module 'next/app' {
  export declare type AppProps = {
    pageProps: any;
    Component: any;
    router: any;
  };
}

declare module 'next/router' {
  export interface RouterEvents {
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
    emit(event: string, ...args: any[]): void;
  }

  export interface SingletonRouter {
    pathname: string;
    query: Record<string, string | string[]>;
    asPath: string;
    push(url: string, as?: string): Promise<boolean>;
    replace(url: string, as?: string): Promise<boolean>;
    reload(): void;
    back(): void;
    events: RouterEvents;
    beforePopState(cb: (state: any) => boolean): void;
  }

  export function useRouter(): SingletonRouter;
}

declare module 'next/navigation' {
  export interface NavigationInterface {
    back(): void;
    forward(): void;
    prefetch(href: string): void;
    push(href: string): void;
    refresh(): void;
    replace(href: string): void;
  }

  export function useRouter(): NavigationInterface;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/script';
declare module '@next/third-parties/google' {
  export function sendGTMEvent(data: Record<string, any>): void;
} 