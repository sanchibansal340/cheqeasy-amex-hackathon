import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { lightTheme } from "./theme";

export const AppContext = React.createContext(null);

const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [isLightThemeActive, setIsLightThemeActive] = useState(true);
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isLightThemeActive,
        setIsLightThemeActive,
      }}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
