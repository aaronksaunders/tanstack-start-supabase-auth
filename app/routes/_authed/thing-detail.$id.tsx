import { createFileRoute, useRouter } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import React from 'react';
import { set } from 'zod';
import { getSupabaseServerClient } from '~/utils/supabase-server';
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
  const [resultLink, setResultLink] = React.useState<string | null>(null);

  return (
    <div className='p-10'>
      <h3 className='text-2xl my-4'>Show A Thing</h3>
      <div>
        <pre>{JSON.stringify(thing, null, 2)}</pre>
        <div className='my-4'>
          {thing?.file_path ? (
            <button
              onClick={async () => {
                const result = await downloadFile({ data: thing.file_path });
                console.log('Download result:', result);
                setResultLink(result.signedUrl);
                // link good for 60 seconds
                setTimeout(() => {
                  setResultLink(null);
                }, 60000);
              }}
              className='border border-emerald-600 px-4 py-2 rounded text-sm font-semibold text-white'>
              SHOW FILE
            </button>
          ) : null}
          {resultLink ? <a href={resultLink}>Download file</a> : null}
        </div>
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

const downloadFile = createServerFn({ method: 'POST' })
  .validator((d: string) => d as string)
  .handler(async ({ data: file_path }) => {
    console.info(`Downloading file with id ${file_path}...`);

    const supabase = getSupabaseServerClient();
    const { data: signedUrl, error } = await supabase.storage
      .from('things')
      .createSignedUrl(file_path!, 60, {
        download: true,
      });

    if (error) {
      throw error;
    }

    return { ...signedUrl };
  });
