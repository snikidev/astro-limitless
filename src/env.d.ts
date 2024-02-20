/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly DATOCMS_API_KEY: string;
    readonly PUBLIC_SUPABASE_KEY: string;
    readonly PUBLIC_SUPABASE_PROJECT_URL: string;
    readonly PUBLIC_GA_MEASUREMENT_ID: string;
  }