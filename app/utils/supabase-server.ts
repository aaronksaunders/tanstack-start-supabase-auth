import { parseCookies, setCookie } from 'vinxi/http';
import { createServerClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Creates and returns a Supabase server client instance.
 *
 * This function initializes the Supabase client with the provided environment variables
 * for the Supabase URL and anonymous key. It also sets up custom cookie handling for the
 * server environment.
 *
 * @returns {SupabaseClient} The initialized Supabase server client.
 *
 * @remarks
 * The `cookies` object provides custom implementations for getting and setting cookies.
 * The `getAll` method retrieves all cookies and returns them in an array of objects with
 * `name` and `value` properties. The `setAll` method sets multiple cookies based on the
 * provided array of cookie objects.
 *
 * @example
 * ```typescript
 * const supabaseClient = getSupabaseServerClient();
 * // Use the supabaseClient for database operations
 * ```
 */
export function getSupabaseServerClient() {
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      // @ts-ignore Wait till Supabase overload works
      getAll() {
        return Object.entries(parseCookies()).map(([name, value]) => ({
          name,
          value,
        }));
      },
      setAll(cookies) {
        cookies.forEach((cookie) => {
          setCookie(cookie.name, cookie.value);
        });
      },
    },
  });
}

/**
 * Retrieves a safe session and user information from Supabase.
 *
 * @returns {Promise<{ session: any; user: any; error: string | null }>} An object containing the session, user, and any error message.
 * - `session`: The current session object, or null if no session is found.
 * - `user`: The current user object, or null if there is an error retrieving the user.
 * - `error`: An error message if there is an issue retrieving the session or user, otherwise null.
 */
export async function getSafeSession() {
  const supabase = getSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return { session: null, user: null, error: 'No session found' };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    return { session, user: null, error: userError.message };
  }

  return { session, user, error: null };
}
