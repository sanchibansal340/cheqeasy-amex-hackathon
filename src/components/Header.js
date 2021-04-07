import React, { useContext } from "react";
import { Text } from "react-native-paper";
import { AppContext } from "../core/AppContextProvider";

export default function Header(props) {
  const { theme } = useContext(AppContext);

  return (
    <Text
      style={{
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: "bold",
        paddingVertical: 12,
      }}
      {...props}
    />
  );
}
