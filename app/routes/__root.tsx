import {
  Link,
  Outlet,
  ReactNode,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Meta, Scripts } from '@tanstack/start';
import * as React from 'react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js';
import { NotFound } from '~/components/NotFound.js';
import appCss from '~/styles/app.css?url';
import { seo } from '~/utils/seo.js';
import { fetchSessionUser } from './_authed';
import { MetaHTMLAttributes } from 'react';

/**
 * Defines the root route configuration for the application.
 *
 * @constant
 * @type {object}
 *
 * @property {Function} meta - Returns an array of meta tags for the document head.
 * @property {Function} links - Returns an array of link tags for the document head.
 * @property {Function} beforeLoad - Asynchronously fetches the user from the session and adds it to the context.
 * @property {Function} errorComponent - Renders the error component when an error occurs.
 * @property {Function} notFoundComponent - Renders the component when a route is not found.
 * @property {React.ComponentType} component - The main component for the root route.
 */
export const Route = createRootRoute({
  head: () => {
    return {
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
      ],
    };
  },
  beforeLoad: async () => {
    // get the user from the session and add to context
    const user = await fetchSessionUser();

    return {
      user,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

/**
 * RootComponent is the main component for the root route.
 * It wraps the content in a RootDocument component and renders
 * an Outlet for nested routes.
 *
 * @returns {JSX.Element} The rendered root component.
 */
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

/**
 * RootDocument component is responsible for rendering the main structure of the application.
 * It includes the HTML, Head, and Body tags, and provides navigation links and user authentication status.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the body.
 *
 * @returns {JSX.Element} The rendered RootDocument component.
 *
 * @example
 * <RootDocument>
 *   <YourComponent />
 * </RootDocument>
 */
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
