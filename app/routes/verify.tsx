import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { getSupabaseServerClient } from '~/utils/supabase-server';

interface SearchParams {
  error?: string;
  error_code?: string;
  error_description?: string;
}

export const Route = createFileRoute('/verify')({
  component: VerifyComponent,
});

function VerifyComponent() {
  const router = useRouter();

  // Parse the fragment from the current location
  const fragment = router.state.location.hash.substring(1);
  const params = new URLSearchParams(fragment);

  const error = params.get('error');
  const errorCode = params.get('error_code');
  const errorDescription = params.get('error_description');

  return (
    <div>
      <h1>Verification Error</h1>
      <p>Error: {error}</p>
      <p>Error Code: {errorCode}</p>
      <p>Error Description: {errorDescription}</p>
    </div>
  );
}

export const verifyUserFn = createServerFn({
  method: 'GET',
}).handler(async (ctx) => {
  console.log('verifyUserFn ctx ===>', ctx);
});
