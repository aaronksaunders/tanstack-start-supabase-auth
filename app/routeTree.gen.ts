/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as VerifyImport } from './routes/verify'
import { Route as LogoutImport } from './routes/logout'
import { Route as LoginImport } from './routes/login'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedHomeImport } from './routes/_authed/home'
import { Route as AuthedAddThingImport } from './routes/_authed/add-thing'
import { Route as AuthedThingDetailIdImport } from './routes/_authed/thing-detail.$id'

// Create/Update Routes

const VerifyRoute = VerifyImport.update({
  id: '/verify',
  path: '/verify',
  getParentRoute: () => rootRoute,
} as any)

const LogoutRoute = LogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthedHomeRoute = AuthedHomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedAddThingRoute = AuthedAddThingImport.update({
  id: '/add-thing',
  path: '/add-thing',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedThingDetailIdRoute = AuthedThingDetailIdImport.update({
  id: '/thing-detail/$id',
  path: '/thing-detail/$id',
  getParentRoute: () => AuthedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      id: '/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutImport
      parentRoute: typeof rootRoute
    }
    '/verify': {
      id: '/verify'
      path: '/verify'
      fullPath: '/verify'
      preLoaderRoute: typeof VerifyImport
      parentRoute: typeof rootRoute
    }
    '/_authed/add-thing': {
      id: '/_authed/add-thing'
      path: '/add-thing'
      fullPath: '/add-thing'
      preLoaderRoute: typeof AuthedAddThingImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/home': {
      id: '/_authed/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof AuthedHomeImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/thing-detail/$id': {
      id: '/_authed/thing-detail/$id'
      path: '/thing-detail/$id'
      fullPath: '/thing-detail/$id'
      preLoaderRoute: typeof AuthedThingDetailIdImport
      parentRoute: typeof AuthedImport
    }
  }
}

// Create and export the route tree

interface AuthedRouteChildren {
  AuthedAddThingRoute: typeof AuthedAddThingRoute
  AuthedHomeRoute: typeof AuthedHomeRoute
  AuthedThingDetailIdRoute: typeof AuthedThingDetailIdRoute
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedAddThingRoute: AuthedAddThingRoute,
  AuthedHomeRoute: AuthedHomeRoute,
  AuthedThingDetailIdRoute: AuthedThingDetailIdRoute,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/verify': typeof VerifyRoute
  '/add-thing': typeof AuthedAddThingRoute
  '/home': typeof AuthedHomeRoute
  '/thing-detail/$id': typeof AuthedThingDetailIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/verify': typeof VerifyRoute
  '/add-thing': typeof AuthedAddThingRoute
  '/home': typeof AuthedHomeRoute
  '/thing-detail/$id': typeof AuthedThingDetailIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/verify': typeof VerifyRoute
  '/_authed/add-thing': typeof AuthedAddThingRoute
  '/_authed/home': typeof AuthedHomeRoute
  '/_authed/thing-detail/$id': typeof AuthedThingDetailIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/verify'
    | '/add-thing'
    | '/home'
    | '/thing-detail/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/verify'
    | '/add-thing'
    | '/home'
    | '/thing-detail/$id'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/login'
    | '/logout'
    | '/verify'
    | '/_authed/add-thing'
    | '/_authed/home'
    | '/_authed/thing-detail/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
  LoginRoute: typeof LoginRoute
  LogoutRoute: typeof LogoutRoute
  VerifyRoute: typeof VerifyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  LoginRoute: LoginRoute,
  LogoutRoute: LogoutRoute,
  VerifyRoute: VerifyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed",
        "/login",
        "/logout",
        "/verify"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/add-thing",
        "/_authed/home",
        "/_authed/thing-detail/$id"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/logout": {
      "filePath": "logout.tsx"
    },
    "/verify": {
      "filePath": "verify.tsx"
    },
    "/_authed/add-thing": {
      "filePath": "_authed/add-thing.tsx",
      "parent": "/_authed"
    },
    "/_authed/home": {
      "filePath": "_authed/home.tsx",
      "parent": "/_authed"
    },
    "/_authed/thing-detail/$id": {
      "filePath": "_authed/thing-detail.$id.tsx",
      "parent": "/_authed"
    }
  }
}
ROUTE_MANIFEST_END */
