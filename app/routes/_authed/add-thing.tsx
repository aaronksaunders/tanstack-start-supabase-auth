import { createFileRoute, useRouter } from '@tanstack/react-router';
import { addNewThing } from '~/utils/things-server';

export const Route = createFileRoute('/_authed/add-thing')({
  component: AddThingRouteComponent,
});

/**
 * AddThingRouteComponent is a React component that renders a form for adding a new "thing".
 * It includes input fields for the title and description of the thing, and handles form submission.
 *
 * The form submission is handled by the `handleSubmit` function, which prevents the default form submission behavior,
 * gathers the form data, and sends it to the `addNewThing` function. If the response contains an error, it logs the error
 * to the console. Otherwise, it navigates to the home page.
 *
 * @component
 * @example
 * return (
 *   <AddThingRouteComponent />
 * )
 */
function AddThingRouteComponent() {
  const router = useRouter();

  /**
   * Handles the form submission to add a new thing.
   * Prevents the default form submission behavior, gathers form data,
   * and sends it to the `addNewThing` function.
   * If the response contains an error, it logs the error to the console.
   * Otherwise, it navigates to the home page.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await addNewThing({ data: formData });
      if (response.error) {
        console.error('Error adding new thing:', response.error);
      } else {
        router.navigate({
          to: '/',
        });
      }
    } catch (error) {
      console.error('Error adding new thing:', error);
    }
  };

  return (
    <div className='p-2 items-center justify-center flex flex-col'>
      <h3 className='text-2xl my-4'>Add A New Thing</h3>
      <div>
        <form className='flex flex-col gap-4 w-96 border p-4' onSubmit={handleSubmit}>
          <div className='flex items-center'>
            <label htmlFor='title' className='w-32'>
              Title
            </label>
            <input type='text' id='title' name='title' className='border p-1 w-full' />
          </div>
          <div className='flex items-center'>
            <label htmlFor='description' className='w-32'>
              Description
            </label>
            <input type='text' id='description' name='description' className='border p-1 w-full' />
          </div>
          <div className='flex items-center'>
            <label htmlFor='file' className='w-32'>
              File
            </label>
            <input type='file' id='file' name='file' className='border p-1 w-full' />
          </div>
          <div className='mt-6 flex gap-4'>
            <button
              type='submit'
              className='bg-emerald-500 text-white px-4 py-2 rounded uppercase font-semibold text-sm'>
              ADD THING
            </button>
            <button
              type='button'
              className='bg-red-500 text-white px-4 py-2 rounded uppercase font-semibold text-sm'>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
