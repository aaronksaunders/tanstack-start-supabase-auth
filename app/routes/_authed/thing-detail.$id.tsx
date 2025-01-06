import { createFileRoute, useRouter } from '@tanstack/react-router';
import { fetchThing } from '~/utils/things-server';

export const Route = createFileRoute('/_authed/thing-detail/$id')({
  component: ThingDetailRouteComponent,
  loader: async ({ params }) => {

    const thing = await fetchThing({ data: params.id });
    console.log('Thing:', thing);
    return {
      id: params.id,
      thing,
    };
  },
});


/**
 * ThingDetailRouteComponent is a React component that displays the details of a specific "thing".
 * It uses the `useRouter` hook to navigate between routes and the `Route.useLoaderData` hook to fetch
 * the data for the "thing" from the route loader.
 *
 * @component
 * @example
 * // Example usage:
 * // This component is used within a route that provides the "thing" data via a loader.
 * <ThingDetailRouteComponent />
 *
 * @returns {JSX.Element} A JSX element that renders the details of a "thing" and a button to navigate back to the home page.
 */
function ThingDetailRouteComponent() {
  const router = useRouter();
  const { thing } = Route.useLoaderData();

  return (
    <div className='p-10'>
      <h3 className='text-2xl my-4'>Show A Thing</h3>
      <div>
        <pre>{JSON.stringify(thing, null, 2)}</pre>
        <button
          type='button'
          onClick={() => router.navigate({ to: '/home' })}
          className='bg-emerald-500 text-white px-4 py-2 rounded uppercase font-semibold text-sm mt-6'>
          GO BACK
        </button>
      </div>
    </div>
  );
}
