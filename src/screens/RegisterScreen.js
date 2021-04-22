import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { AppContext } from "../core/AppContextProvider";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  pinValidator,
} from "../helpers";
import { signUpUser } from "../api/auth-api";
import Toast from "../components/Toast";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [pin, setPin] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { theme } = useContext(AppContext);

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value, "Name");
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const pinError = pinValidator(pin.value);
    if (emailError || passwordError || nameError || pinError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPin({ ...pin, error: pinError });
      return;
    }
    setLoading(true);
    const response = await signUpUser({
      name: name.value,
      email: email.value,
      password: password.value,
      pin: pin.value,
    });
    if (response.error) {
      setError(response.error);
    }
    setLoading(false);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create an Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="6-digit PIN"
        returnKeyType="done"
        value={pin.value}
        onChangeText={(text) => setPin({ value: text, error: "" })}
        error={!!pin.error}
        errorText={pin.error}
        secureTextEntry
        maxLength={6}
      />
      <Button
        loading={loading}
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text
            style={{
              fontWeight: "bold",
              color: theme.colors.primary,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
});
