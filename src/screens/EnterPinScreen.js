// NOT TESTED
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function AddAccountScreen({ navigation }) {
  const [enterPin, setEnterPin] = useState();
  const [pin, setPin] = useState();
  const [wrongCount, setWrongCount] = useState(5);
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
    if (enterPin !== pin) {
      setWrongCount(wrongCount - 1);
      setError(`Incorrect PIN. You have ${wrongCount} attempts left.`);
    }
    // TODO: Build OTP logic
    navigation.navigate("EnterOtpScreen");
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Enter 6-digit PIN</Header>
      <TextInput
        label="Enter PIN"
        returnKeyType="next"
        value={enterPin}
        onChangeText={(text) => setEnterPin(...enterPin, text)}
      />
      <Text>{error}</Text>
      <Button mode="contained" style={{ marginTop: 24 }} onPress={handleAddPin}>
        Enter
      </Button>
    </Background>
  );
}
