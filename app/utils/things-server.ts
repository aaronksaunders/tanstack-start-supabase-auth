import { createServerFn } from '@tanstack/start';
import { getSupabaseServerClient } from './supabase-server';

export const fetchThing = createServerFn({ method: 'GET' })
  .validator((d: string) => {
    return d as string;
  })
  .handler(async ({ data: thingId }) => {
    console.info(`Fetching thing with id ${thingId}...`);

    const supabase = getSupabaseServerClient();
    const { data: thing, error } = await supabase
      .from('things')
      .select('*')
      .eq('id', thingId)
      .single();

    if (error) {
      throw error;
    }

    return thing;
  });

export const deleteThing = createServerFn({ method: 'POST' })
  .validator((d: string) => d as string)
  .handler(async ({ data: thingId }) => {
    console.info(`Deleting thing with id ${thingId}...`);

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from('things').delete().eq('id', thingId);
    if (error) {
      throw error;
    }

    return true;
  });

export const fetchThings = createServerFn({ method: 'GET' }).handler(async () => {
  console.info('Fetching things...');
  const supabase = getSupabaseServerClient();
  const { data: things, error } = await supabase.from('things').select('*');
  if (error) {
    throw error;
  }
  return things;
});

export const addNewThing = createServerFn({ method: 'POST' })
  .validator((formData: FormData) => {
    if (!(formData instanceof FormData)) {
      throw new Error('Invalid form data');
    }
    if (!formData.get('title') || !formData.get('description')) {
      throw new Error('title and description are required');
    }

    if (formData.get('file') && !(formData.get('file') instanceof File)) {
      throw new Error('Invalid file');
    }

    return {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      file: formData.get('file') as File | null,
    };
  })
  .handler(
    async ({
      data: { title, description, file },
    }: {
      data: { title: string; description: string; file: File | null };
    }) => {
      const supabase = getSupabaseServerClient();

      let file_id: string | null = null;
      let file_path: string | null = null;
      if (file) {
        const { data: fileData, error: fileError } = await supabase.storage
          .from('things')
          .upload(`things/${file.name}`, file);
        if (fileError) {
          throw fileError;
        }
        console.info('File uploaded:', fileData);
        file_id = fileData?.id;
        file_path = fileData?.path;
      }
      const { error } = await supabase.from('things').insert({
        title,
        description,
        file_name: file ? file.name : null,
        file_id,
        file_path,
      });
      return { error: error?.message };
    }
  );
