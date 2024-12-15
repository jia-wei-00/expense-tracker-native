import "react-native-url-polyfill/auto";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Navigator from "./src/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Auth } from "./src/components";
import { darkTheme } from "./src/themes";
import "./gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <Auth>
        <SafeAreaProvider>
          <PaperProvider theme={darkTheme}>
            <Navigator />
          </PaperProvider>
        </SafeAreaProvider>
      </Auth>
    </Provider>
  );
}
