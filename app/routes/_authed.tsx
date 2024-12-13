import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn, json, JsonResponse } from '@tanstack/start';
import { Login } from '~/components/Login';
import { z } from 'zod';
import { getSafeSession, getSupabaseServerClient } from '~/utils/supabase-server';
import { Session, User } from '@supabase/supabase-js';

export const loginFn = createServerFn({ method: 'POST' })
  .validator(({ email, password }: { email: string; password: string }) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      email,
      password,
    };
  })
  .handler(async (ctx: any) => {
    // get the form data
    const { email, password } = ctx.data;

    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Redirect to posts page after successful login
    if (data?.user) {
      return {
        user: {
          id: data.user.id,
          email: data.user.email,
          first_name: data.user.user_metadata.first_name,
          last_name: data.user.user_metadata.last_name,
          session: {
            access_token: data.session?.access_token,
            refresh_token: data.session?.refresh_token,
          },
        },
        error: null,
      };
    }

    console.log('login error ===>', error);
    return { error: error?.message, user: null };
  });

// Validate the input with zod
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  redirectUrl: z.string().optional(),
});
/**
 * Handles user signup by creating a new user in the database and initiating a session.
 *
 * this is a server function that has a specific payload of email, password, and redirectUrl
 *
 * @param payload - The signup payload containing user details.
 * @param payload.email - The email address of the user.
 * @param payload.password - The password of the user.
 * @param payload.redirectUrl - Optional URL to redirect after signup.
 *
 * @returns An object indicating whether an error occurred and if the user already exists.
 *
 * @throws Redirects to the specified URL or the root URL after successful signup.
 */
export const signupFn = createServerFn<
  any,
  { error: string | undefined; user: User | null | undefined }
>({
  method: 'POST',
})
  .validator(signupSchema)
  .handler(async (ctx: any) => {
    const { email, password, first_name, last_name, redirectUrl } = ctx.data;

    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name, last_name },
      },
    });

    console.log('signup data ===>', data);
    console.log('signup error ===>', error);

    // Redirect to the prev page stored in the "redirect" search param
    if (data?.user) {
      throw redirect({
        to: redirectUrl || '/',
        statusCode: 301,
      });
    }

    return {
      error: error?.message,
      user: {
        id: data?.user?.id,
        email: data?.user?.email,
        first_name: data?.user?.user_metadata.first_name,
        last_name: data?.user?.user_metadata.last_name,
        session: {
          access_token: data?.session?.access_token,
          refresh_token: data?.session?.refresh_token,
        },
      },
    };
  });

/**
 * Fetches the user information from the server.
 *
 * This function performs a GET request to retrieve the user's email
 * from the server-side session. It ensures that the user is authenticated
 * by checking the session data for a user email.
 *
 * @returns {Promise<{ email: string } | null>} An object containing the user's email if authenticated, otherwise null.
 */
export const fetchSessionUser = createServerFn({ method: 'GET' }).handler<{
  user: User | null | undefined;
  error: string | null;
}>(async () => {
  // We need to auth on the server so we have access to secure cookies
  const sessionResponse = await getSafeSession();

  if (!sessionResponse || !sessionResponse.session) {
    return {
      user: null,
      error: 'No session found' as const,
    };
  }

  return {
    user: JSON.parse(JSON.stringify(sessionResponse.user)),
    error: null,
  };
});

/**
 * Route, and child routes that requires authentication.
 * also note the that route prefaced with the underscore character is not
 * included in the path of the child routes.
 *
 * If the user is not authenticated, the user is redirected to the login page.
 */
export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      // Redirect to the home page if the user is not authenticated
      throw redirect({
        to: '/',
        statusCode: 301,
      });
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      return <Login />;
    }

    throw error;
  },
});
