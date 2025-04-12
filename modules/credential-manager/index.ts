// Reexport the native module. On web, it will be resolved to CredentialManagerModule.web.ts
// and on native platforms to CredentialManagerModule.ts
export { default } from './src/CredentialManagerModule';
export { default as CredentialManagerView } from './src/CredentialManagerView';
export * from  './src/CredentialManager.types';
