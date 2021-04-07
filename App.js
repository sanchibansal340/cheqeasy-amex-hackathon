import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import "firebase/auth";
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  AddAccountScreen,
  CashChequeScreen,
  EnterPinScreen,
  EnterFingerprintScreen,
} from "./src/screens";
import AppContextProvider from "./src/core/AppContextProvider";
import { FIREBASE_CONFIG } from "./src/core/config";

const Stack = createStackNavigator();
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export default function App() {
  return (
    <AppContextProvider>
      <Stack.Navigator
        initialRouteName="AuthLoadingScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddAccountScreen" component={AddAccountScreen} />
        <Stack.Screen name="CashChequeScreen" component={CashChequeScreen} />
        <Stack.Screen name="EnterPinScreen" component={EnterPinScreen} />
        <Stack.Screen
          name="EnterFingerprintScreen"
          component={EnterFingerprintScreen}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    </AppContextProvider>
  );
}
