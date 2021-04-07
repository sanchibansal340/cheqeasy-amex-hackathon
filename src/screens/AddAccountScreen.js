import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { accNumValidator, nameValidator } from "../helpers";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function AddAccountScreen({ navigation }) {
  const [accNo, setAccNo] = useState({ value: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [bankName, setBankName] = useState({ value: "", error: "" });

  const onAddAccountPressed = async () => {
    const nameError = nameValidator(name.value, "Name");
    const bankNameError = nameValidator(bankName.value, "Bank Name");
    const accNumError = accNumValidator(accNo.value);

    if (nameError || bankNameError || accNumError) {
      setAccNo({ ...accNo, error: accNumError });
      setName({ ...name, error: nameError });
      setBankName({ ...bankName, error: bankNameError });
      return;
    }
    const db = firebase.firestore();
    const id = accNo.value.trim();
    const userId = firebase.auth().currentUser.uid;
    const min = 6000;
    const max = 10000;

    db.collection("users")
      .doc(userId)
      .get()
      .then(async (userDoc) => {
        if (userDoc.exists) {
          await db
            .collection("users")
            .doc(userId)
            .collection("accounts")
            .doc(id)
            .set({
              accNo: accNo.value,
              name: name.value,
              bankName: bankName.value,
              accBal: (min + Math.random() * max).toFixed(2),
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
      })
      .then(() => {
        navigation.navigate("Dashboard");
      });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Add Account Details</Header>
      <TextInput
        label="Account Number"
        returnKeyType="next"
        value={accNo.value}
        error={!!accNo.error}
        errorText={accNo.error}
        onChangeText={(text) => setAccNo({ value: text, error: "" })}
        keyboardType="number-pad"
        maxLength={16}
      />
      <TextInput
        label="Account Holder Name"
        returnKeyType="next"
        value={name.value}
        error={!!name.error}
        errorText={name.error}
        onChangeText={(text) => setName({ value: text, error: "" })}
        autoCompleteType="name"
      />
      <TextInput
        label="Bank Name"
        returnKeyType="next"
        value={bankName.value}
        error={!!bankName.error}
        errorText={bankName.error}
        onChangeText={(text) => setBankName({ value: text, error: "" })}
      />
      <Button mode="contained" onPress={onAddAccountPressed}>
        Add Account
      </Button>
    </Background>
  );
}
