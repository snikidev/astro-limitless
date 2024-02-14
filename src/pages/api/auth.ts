import { serverSupabase } from "../../lib/supabase";
import { type APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = serverSupabase(cookies);
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      cookies.set('al-access-token', data?.session?.access_token, { path: '/', maxAge: 100 * 365 * 24 * 60 * 60, sameSite: 'lax', secure: true });
      cookies.set('al-refresh-token', data?.session?.refresh_token, { path: '/', maxAge: 100 * 365 * 24 * 60 * 60, sameSite: 'lax', secure: true });
      return redirect('/login');
    }

    // return the user to an error page with instructions
    return redirect("/login?error=oauth_error");
  }
};
