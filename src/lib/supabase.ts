import { createClient } from "@supabase/supabase-js";
import type { SupportedStorage } from "@supabase/supabase-js";
import Cookies from "js-cookie";

const supportsLocalStorage = () => {
  let storage;
  try {
    storage = window["localStorage"];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
};

const customStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    if (!supportsLocalStorage()) {
      return Cookies.get(key) as string | null;
    }
    return globalThis.localStorage.getItem(key);
  },
  setItem: (key, value) => {
    if (!supportsLocalStorage()) {
      Cookies.set(key, value);
      return;
    }
    globalThis.localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    if (!supportsLocalStorage()) {
      Cookies.remove(key, { path: "" });
      return;
    }
    globalThis.localStorage.removeItem(key);
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

export const onAuthChangeClient = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      const expires = new Date(0).toUTCString();
      document.cookie = `al-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      document.cookie = `al-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    } else if (
      (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") &&
      session
    ) {
      const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
      document.cookie = `al-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      document.cookie = `al-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    }
  });
};

export const getUser = async (cookies) => {
  const refreshToken = cookies["al-refresh-token"];
  const accessToken = cookies["al-access-token"];

  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
  } else {
    // make sure you handle this case!
    throw new Error("User is not authenticated.");
  }

  // returns user information
  await supabase.auth.getUser();
};
