import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import jsCookie from "js-cookie";
import { supabase } from "../lib/supabase";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from "../constants";

export const LoginForm = () => {
  useEffect(() => {
    const accessToken = jsCookie.get(COOKIE_ACCESS_TOKEN);
    const refreshToken = jsCookie.get(COOKIE_REFRESH_TOKEN);

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then(({ data: { session } }) => {
          if (!session) return;
          window.location.href = "/dashboard";
        });
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      window.location.href = "/dashboard";
    });
  }, []);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["github"]}
      // TODO: Site url variable
      redirectTo="http://localhost:4321/api/auth"
    />
  );
};
