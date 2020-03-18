import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from "./components/MapScreen";
import { createStackNavigator } from "@react-navigation/stack";
import WebViewScreen from "./components/WebViewScreen";
import { darkBlue } from "./utils/colors";

const Stack = createStackNavigator();

function MapStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ header: () => null }}
        name="Coronadex"
        component={MapScreen}
      />
      <Stack.Screen
        options={{
          title: null,
          headerTintColor: darkBlue
        }}
        name="TweetScreen"
        component={WebViewScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MapStackNavigator />
    </NavigationContainer>
  );
}
