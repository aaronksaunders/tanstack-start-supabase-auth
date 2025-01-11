import { createFileRoute } from '@tanstack/react-router';
import { Login } from '~/components/Login';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className='p-2 items-center justify-center flex flex-col'>
      <Login />
    </div>
  );
}
