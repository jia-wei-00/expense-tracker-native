import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './ExpoSettings.types';

type ExpoSettingsModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class ExpoSettingsModule extends NativeModule<ExpoSettingsModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(ExpoSettingsModule);
