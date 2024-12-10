import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { getSupabaseServerClient } from '~/utils/supabase-server';

const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const supabase = getSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  throw redirect({
    href: '/',
  });
});

export const Route = createFileRoute('/logout')({
  preload: false,
  loader: () => logoutFn(),
});
