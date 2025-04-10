import { createClient } from "@supabase/supabase-js";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabaseUrl = "https://ocwgjvxqurrbxfozdlzv.supabase.co";
  const supabase = createClient(supabaseUrl, config.SUPABASE_KEY);
  const query = getQuery(event);

  const queryToken = query.token;
  const {
    data: { user },
  } = await supabase.auth.getUser(queryToken as string);

  let { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user?.id);
  console.log(queryToken);

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
  return todos;
});
