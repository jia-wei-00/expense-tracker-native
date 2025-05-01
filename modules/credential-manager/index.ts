// Reexport the native module. On web, it will be resolved to CredentialManagerModule.web.ts
// and on native platforms to CredentialManagerModule.ts
export { default } from "./src/CredentialManagerModule";
export * from "./src/CredentialManager.types";
