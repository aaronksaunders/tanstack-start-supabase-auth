import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { fetchSessionUser } from '../_authed';
import { fetchThings, deleteThing } from '../../utils/things-server';

export const Route = createFileRoute('/_authed/home')({
  component: AuthHomePageComponent,
  loader: authHomePageLoader,
});

/**
 * Loader function for the authenticated home page.
 *
 * This function fetches the session user and checks if the user is authenticated.
 * If the user is not authenticated, it redirects to the home page with a 301 status code.
 * If the user is authenticated, it fetches additional data and returns it along with the user data.
 *
 * @returns {Promise<{ userData: any, things: any }>} An object containing the user data and additional fetched data.
 * @throws {Redirect} If the user is not authenticated, a redirect to the home page is thrown.
 */
async function authHomePageLoader() {
  const response = await fetchSessionUser();
  console.log('response ===>', response);

  if (!response.user) {
    throw redirect({
      to: '/',
      statusCode: 301,
    });
  }

  // get some data from regular query
  const things = await fetchThings();

  return {
    userData: response.user,
    things,
  };
}

/**
 * AuthHomePageComponent is a React functional component that displays user information and a list of "things".
 * It provides options to add a new thing, logout, and delete existing things.
 *
 * @component
 * @example
 * // Usage example:
 * // <AuthHomePageComponent />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component relies on session data available in the context and full user data from the loader.
 * It uses the `useRouter` hook for navigation and reloading the router after deleting a thing.
 *
 * @throws {Error} If there is an error during the deletion process.
 */
function AuthHomePageComponent() {
  // session data is available in the context
  const { user } = Route.useRouteContext();

  // get full user data from loader
  const { userData, things } = Route.useLoaderData();

  const router = useRouter();

  /**
   * Deletes a thing by its ID and reloads the router.
   *
   * @param {string} thingId - The ID of the thing to be deleted.
   * @returns {Promise<void>} A promise that resolves when the thing is deleted and the router is reloaded.
   * @throws {Error} If there is an error during the deletion process.
   */
  const handleDeleteThing = async (thingId: string) => {
    try {
      await deleteThing({ data: thingId });
      await router.load();
    } catch (error) {
      alert('Error deleting thing: ' + (error as Error)?.message);
    }
  };

  return (
    <div className='p-8'>
      <h3 className='text-2xl my-4'>Welcome Back, {userData?.user_metadata?.first_name}!</h3>
      <div>
        <p>Your role is: {userData?.role}</p>
        <p>Your user id is: {userData?.id}</p>
        <p>Your email id is: {userData?.email}</p>
      </div>
      <div className='mt-6 flex gap-4'>
        <button
          className='bg-emerald-500 text-white px-4 py-2 rounded uppercase font-semibold text-sm'
          onClick={() =>
            router.navigate({
              to: '/add-thing',
            })
          }>
          ADD THING
        </button>
        <button
          className='bg-emerald-500 text-white px-4 py-2 rounded uppercase font-semibold text-sm'
          onClick={() =>
            router.navigate({
              to: '/logout',
            })
          }>
          Logout
        </button>
      </div>
      <div className='mt-6'>
        <h2 className='text-xl font-bold'>Things</h2>
        <div className='mt-2'>
          <ul>
            {things?.map((thing) => (
              <div key={thing.id} className='border p-2 my-2'>
                <div>{thing.title}</div>
                <div>{thing.description}</div>
                <div>{thing.created_at}</div>{' '}
                <div className='flex mt-2 gap-4'>
                  <button
                    className='border px-2.5 py-1 text-xs font-bold border-red-600'
                    onClick={() => handleDeleteThing(thing.id)}>
                    DELETE
                  </button>
                  <button
                    className='border px-2.5 py-1 text-xs font-bold border-emerald-600'
                    onClick={() => router.navigate({ to: `/thing-detail/${thing.id}` })}>
                    VIEW
                  </button>
                </div>
              </div>
            ))}
          </ul>
          {things?.length === 0 && (
            <div>
              <p>No things found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
