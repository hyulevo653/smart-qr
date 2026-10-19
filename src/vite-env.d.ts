/// <reference types="./theme/styled.d.ts" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_GATE_API: string;
  readonly VITE_BASE_SSO_URL: string;
  readonly VITE_CAPT_KEY: string;
  readonly VITE_APP_CODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
