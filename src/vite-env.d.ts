/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_HOME_SECTIONS_TABLE?: string;
  readonly VITE_SUPABASE_HOME_IMAGES_BUCKET?: string;
  readonly VITE_SUPABASE_HOME_FILES_BUCKET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
