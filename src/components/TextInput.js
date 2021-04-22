import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { AppContext } from "../core/AppContextProvider";

export default function TextInput({ errorText, description, ...props }) {
  const { theme } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <Input
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
        }}
        selectionColor={theme.colors.primary}
        {...props}
      />
      {description && !errorText ? (
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.secondary,
            paddingTop: 8,
          }}
        >
          {description}
        </Text>
      ) : null}
      {errorText ? (
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.error,
            paddingTop: 8,
          }}
        >
          {errorText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
});
