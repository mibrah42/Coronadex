import React from "react";
import { WebView } from "react-native-webview";

export const WebViewScreen = ({ route, navigation }) => {
  const { url } = route.params;
  return <WebView source={{ uri: url }} />;
};
