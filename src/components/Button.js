import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { AppContext } from "../core/AppContextProvider";

export default function Button({ mode, style, ...props }) {
  const { theme } = useContext(AppContext);
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
