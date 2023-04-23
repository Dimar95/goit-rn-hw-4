import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";
import { useRoute } from "./router";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [auth, setAuth] = useState(false);
  const routing = useRoute(auth, setAuth);
  const [fontsLoaded] = useFonts({
    "Roboto-Regulat": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return;
  }
  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {routing}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
