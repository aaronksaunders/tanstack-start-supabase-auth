import { createFileRoute, redirect, useLoaderData, useRouter } from '@tanstack/react-router';
import { fetchSessionUser } from '../_authed';

export const Route = createFileRoute('/_authed/home')({
  component: AuthHomePage,
  loader: async () => {
    const response = await fetchSessionUser();
    console.log('response ===>', response);

    if (!response.user) {
      throw redirect({
        to: '/',
        statusCode: 301,
      });
    }

    return {
      userData: response.user,
    };
  },
});

function AuthHomePage() {
  // session data is available in the context
  const { user } = Route.useRouteContext();

  // get full user data from loader
  const { userData } = Route.useLoaderData();

  const router = useRouter();

  return (
    <div className='p-2'>
      <h3 className='text-2xl my-4'>Welcome Back, {userData?.user_metadata?.first_name}!</h3>
      <div>
        <p>Your role is: {userData?.role}</p>
        <p>Your user id is: {userData?.id}</p>
        <p>Your email id is: {userData?.email}</p>
      </div>
      <div className='mt-6'>
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
    </div>
  );
}
