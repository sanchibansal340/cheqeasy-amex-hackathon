import React, { useContext } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { AppContext } from "../core/AppContextProvider";
import { lightTheme, darkTheme } from "../core/theme";

export default function StartScreen({ navigation }) {
  const { setTheme, isLightThemeActive, setIsLightThemeActive } = useContext(
    AppContext
  );
  return (
    <Background>
      <Logo />
      <Header>Welcome to Cheqeasy</Header>
      <Paragraph>An easy solution to cash cheques.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          if (isLightThemeActive === true) {
            setTheme(darkTheme);
            setIsLightThemeActive(false);
          } else {
            setTheme(lightTheme);
            setIsLightThemeActive(true);
          }
        }}
      >
        🌞Change Theme🌜
      </Button>
    </Background>
  );
}
