import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { pinValidator } from "../helpers";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

// TODO: Disable add acoount and bank buttons when count = 0

export default function AddAccountScreen({ navigation, route }) {
  const [enterPin, setEnterPin] = useState({ value: "", error: "" });
  const [pin, setPin] = useState();
  const [wrongCount, setWrongCount] = useState(4);
  const [error, setError] = useState("");

  useEffect(() => {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;

    db.collection("users")
      .doc(userId)
      .get()
      .then((userDoc) => {
        if (userDoc.exists) {
          setPin(userDoc.data().pin);
        }
      });
  }, []);

  const handleAddPin = () => {
    const pinError = pinValidator(enterPin.value);
    if (pinError) {
      setEnterPin({ ...enterPin, error: pinError });
      return;
    }

    if (Number(enterPin.value) !== pin) {
      setWrongCount((prevWrongCount) => prevWrongCount - 1);
      setError(`Incorrect PIN. You have ${wrongCount} attempts left.`);
      setEnterPin("");
    }
    navigation.navigate("EnterFingerprintScreen", { route });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Enter 6-digit PIN</Header>
      <TextInput
        label="Enter PIN"
        returnKeyType="next"
        value={enterPin.value}
        onChangeText={(text) => setEnterPin({ value: text, error: "" })}
        error={!!enterPin.error}
        errorText={enterPin.error}
        secureTextEntry
        maxLength={6}
      />
      <Text>{error}</Text>
      <Button mode="contained" style={{ marginTop: 24 }} onPress={handleAddPin}>
        Enter
      </Button>
    </Background>
  );
}
