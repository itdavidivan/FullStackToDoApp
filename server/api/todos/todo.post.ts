import { createClient } from "@supabase/supabase-js";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const supabaseUrl = "https://ocwgjvxqurrbxfozdlzv.supabase.co";
  const supabase = createClient(supabaseUrl, config.SUPABASE_KEY);
  const {
    data: { user },
  } = await supabase.auth.getUser(body.token);

  const { data, error } = await supabase
    .from("todos")
    .insert([{ description: body.text, user_id: user?.id }])
    .select();

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
  return data;
});
