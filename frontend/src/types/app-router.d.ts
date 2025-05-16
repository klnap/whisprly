declare module "next/navigation" {
  export function useRouter(): {
    back(): void
    forward(): void
    push(href: string): void
    refresh(): void
    replace(href: string): void
    prefetch(href: string): void
  }

  export function useParams<T = {}>(): T
  export function usePathname(): string
  export function useSearchParams(): URLSearchParams
}

declare module "next/link" {
  import { LinkProps as NextLinkProps } from "next/dist/client/link"
  import { AnchorHTMLAttributes, DetailedHTMLProps } from "react"
  
  type LinkProps = Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "href"
  > &
    NextLinkProps
  
  export default function Link(props: LinkProps): JSX.Element
}

declare module "next/image" {
  import { ImageProps as NextImageProps } from "next/dist/client/image"
  
  type ImageProps = Omit<NextImageProps, "src"> & {
    src: string | { src: string; height: number; width: number }
  }
  
  export default function Image(props: ImageProps): JSX.Element
}

declare module "next/headers" {
  export function headers(): Headers
  export function cookies(): {
    get(name: string): { name: string; value: string } | undefined
    getAll(): Array<{ name: string; value: string }>
    set(name: string, value: string): void
    delete(name: string): void
    has(name: string): boolean
  }
} 