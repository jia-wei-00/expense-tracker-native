import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './CredentialManager.types';

type CredentialManagerModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class CredentialManagerModule extends NativeModule<CredentialManagerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(CredentialManagerModule);
