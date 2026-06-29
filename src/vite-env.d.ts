/// <reference types="vite/client" />

// Declaration for image assets so TypeScript recognizes imports like .png, .jpg
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

// Environment variable type definitions for IDE intellisense
interface ImportMetaEnv {
  readonly VITE_OPS_API_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Add other variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}