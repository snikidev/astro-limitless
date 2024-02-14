import { createClient } from "@supabase/supabase-js";
import type { SupportedStorage } from "@supabase/supabase-js";
import type { AstroCookies } from "astro";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import jsCookie from "js-cookie";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from "../constants";

const customStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    return jsCookie.get(key) as string | null;
  },
  setItem: (key, value) => {
    jsCookie.set(key, value);
  },
  removeItem: (key) => {
    jsCookie.remove(key, { path: "" });
  },
};

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_PROJECT_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY,
  {
    auth: {
      detectSessionInUrl: true,
      flowType: "pkce",
      storage: customStorageAdapter,
    },
  }
);

export const serverSupabase = (cookies: AstroCookies) =>
  createServerClient(
    import.meta.env.PUBLIC_SUPABASE_PROJECT_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        get(key) {
          return cookies.get(key)?.value;
        },
        set(key, value, options: CookieOptions) {
          cookies.set(key, value, options);
        },
        remove(key, options) {
          cookies.delete(key, options);
        },
      },
    }
  );