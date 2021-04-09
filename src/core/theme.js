import { DefaultTheme, DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#000000",
    primary: "#121330",
    secondary: "#414757",
    error: "#f13a59",
    success: "#00B386",
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "#fff",
    primary: "#ffbe0f",
    secondary: "#8ac4d0",
    error: "#f13a59",
    success: "#00B386",
  },
};
