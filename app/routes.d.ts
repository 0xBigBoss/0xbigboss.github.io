// deno-lint-ignore-file
/* eslint-disable */
// biome-ignore: needed import
import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/contact` | `/posts` | `/projects` | `/tabs` | `/tabs/` | `/tabs/profile` | `/tabs/settings` | `/test`
      DynamicRoutes: `/posts/${OneRouter.SingleRoutePart<T>}`
      DynamicRouteTemplate: `/posts/[slug]`
      IsTyped: true
      RouteTypes: {
        '/posts/[slug]': RouteInfo<{ slug: string }>
      }
    }
  }
}

/**
 * Helper type for route information
 */
type RouteInfo<Params = Record<string, never>> = {
  Params: Params
  LoaderProps: { path: string; params: Params; request?: Request }
}