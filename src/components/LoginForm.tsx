import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase";

export const LoginForm = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        // delete cookies on sign out
        const expires = new Date(0).toUTCString();
        document.cookie = `al-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        document.cookie = `al-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
        document.cookie = `al-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `al-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;

        const params = new URL(window.location.href).searchParams;
        const next = params.get("next");
        console.log("next", next);
        window.location.href = next ?? "/dashboard";
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["github"]}
        // TODO: Site url variable
        redirectTo="http://localhost:4321/api/auth"
      />
    );
  } else {
    return <div>Logged in!</div>;
  }
};
