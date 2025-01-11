import { useRouter } from '@tanstack/react-router';
import { loginFn, signupFn } from '../routes/_authed';
import { useState } from 'react';
import ToggleActionButton from './ToggleActionBtn';
import { useServerFn } from '@tanstack/start';
import { User } from '@supabase/supabase-js';

export function Login() {
  const router = useRouter();
  const [action, setAction] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState<string | null>(null);

  // functions

  // validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  /**
   * Handles the sign-in process when the form is submitted.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the sign-in process is complete.
   *
   * This function prevents the default form submission behavior, sends the form data to the login function,
   * and handles the response. If there is an error, it logs the error message. If the sign-in is successful,
   * it invalidates the router cache and navigates to the home page.
   */
  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError(null); // Clear error message

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const resp = (await loginFn({
        data: {
          email: data.email as string,
          password: data.password as string,
        },
      })) as { user: User | null; error: string | null };

      if (resp?.user) {
        router.navigate({
          to: '/home',
        });
      }

      if (resp?.error) {
        setError(resp?.error);
      }
    } catch (error) {
      console.error('handleSignin', error);
    }
  };

  /**
   * Handles the signup process when the form is submitted.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the signup process is complete.
   *
   * @async
   */
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError(null); // Clear error message

      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const first_name = e.currentTarget.first_name.value;
      const last_name = e.currentTarget.last_name.value;

      // @TODO: check back later - https://github.com/TanStack/router/issues/1992
      // bind the signup function so when it throw the redirect it will be handled
      // properly - BUT THERE IS AN ERROR HERE SO I CANNOT USE useServerFn
      const value = await signupFn({
        data: { email, password, first_name, last_name },
      });
      if (value?.error) {
        setError(value?.error);
      }
    } catch (error) {
      console.error('handleSignup', error);
      alert('An error occurred. Please try again.' + (error as any).message);
    }
  };

  /**
   * Handles the click event on the action button to toggle between "signin" and "signup" states.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The mouse event triggered by clicking the button.
   */
  const onActionBtnChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAction(action === 'signin' ? 'signup' : 'signin');

    // Clear error message
    setError(null);
  };

  return (
    <div className='fixed inset-0 bg-white dark:bg-black flex items-start justify-center p-8'>
      <div className='bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md'>
        {error && <div className='mb-4 p-2 bg-red-500 text-white rounded font-bold'>{error}</div>}
        <h1 className='text-2xl font-bold mb-4'>
          {action === 'signin' ? 'Sign In' : 'Create Account'}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            action === 'signin' ? handleSignin(e) : handleSignup(e);
          }}
          className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm mb-2'>
              Username
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='px-2 py-1 w-full text-sm rounded border border-gray-500/20 bg-white dark:bg-gray-800'
            />
          </div>
          <div className='pb-4'>
            <label htmlFor='password' className='block text-sm mb-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className='px-2 py-1 w-full text-sm rounded border border-gray-500/20 bg-white dark:bg-gray-800'
            />
          </div>

          {action === 'signup' ? (
            <div className='pb-4'>
              <div className='mb-2'>
                <label htmlFor='first_name' className='block text-sm mb-2'>
                  First Name
                </label>
                <input
                  type='text'
                  name='first_name'
                  id='first_name'
                  className='px-2 py-1 w-full text-sm rounded border border-gray-500/20 bg-white dark:bg-gray-800'
                />
                {errors.first_name && (
                  <p className='text-red-500 text-xs mt-1'>{errors.first_name}</p>
                )}
              </div>

              <div className='mb-2'>
                <label htmlFor='last_name' className='block text-sm mb-2'>
                  Last Name
                </label>
                <input
                  type='text'
                  name='last_name'
                  id='last_name'
                  className='px-2 py-1 w-full text-sm rounded border border-gray-500/20 bg-white dark:bg-gray-800'
                />
                {errors.last_name && (
                  <p className='text-red-500 text-xs mt-1'>{errors.last_name}</p>
                )}
              </div>
            </div>
          ) : null}

          <button
            type='submit'
            className='w-full bg-emerald-600 text-white rounded py-2 font-semibold uppercase'>
            {action === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>

          <ToggleActionButton action={action} onChange={onActionBtnChange} />
        </form>
      </div>
    </div>
  );
}
