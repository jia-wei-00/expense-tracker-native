import "react-native-url-polyfill/auto";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import { Home } from "./pages";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Auth } from "./components";
import "../gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View>
          <Auth>
            <Home />
          </Auth>
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}
