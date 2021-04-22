import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import Background from "../components/Background";
import { AppContext } from "../core/AppContextProvider";

export default function AuthLoadingScreen({ navigation }) {
  const { theme } = useContext(AppContext);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } else {
      // User is not logged in
      navigation.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      });
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
}
