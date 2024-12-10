import { createFileRoute, useRouter, Redirect, redirect } from '@tanstack/react-router';
import { fetchSessionUser } from './_authed';

export const Route = createFileRoute('/')({
  component: BasicHomePage,
  beforeLoad: async () => {
    // get the user from the session and add to context
    const response = await fetchSessionUser();

    // if the user is already logged in, redirect to the home page
    if (response.user) {
      throw redirect({
        to: '/home',
        statusCode: 301,
      });
    }
  },
});

function BasicHomePage() {
  const { user } = Route.useRouteContext();
  const router = useRouter();
  return (
    <div className='p-2'>
      <h3 className='text-2xl my-4'>Welcome Home!!!</h3>

      <div>
        <p>You are not logged in.</p>
        <div className='mt-6'>
          <button
            className='bg-emerald-500 text-white px-4 py-2 rounded uppercase font-semibold text-sm'
            onClick={() =>
              router.navigate({
                to: '/login',
              })
            }>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
