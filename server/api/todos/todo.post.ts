import { createClient } from "@supabase/supabase-js";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const supabaseUrl = "https://ocwgjvxqurrbxfozdlzv.supabase.co";
  const supabase = createClient(supabaseUrl, config.SUPABASE_KEY);

  const { data, error } = await supabase
    .from("todos")
    .insert([{ description: body.text }])
    .select();

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
  return data;
});
