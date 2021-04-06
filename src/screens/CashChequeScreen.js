// NOT TESTED
import React, { useState } from "react";
import { Text } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { RadioButton } from "react-native-paper";
import { nameValidator, amountValidator } from "../helpers";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function AddAccountScreen({ navigation }) {
  const [recName, setRecName] = useState({ value: "", error: "" });
  const [amount, setAmount] = useState({ value: "", error: "" });
  const [amwords, setAmwords] = useState({ value: "", error: "" });
  const [checked, setChecked] = useState({ value: "Yes", error: "" });

  const handleCreateCheque = () => {
    const nameError = nameValidator(recName.value, "Receiver's Name");
    const amountError = amountValidator(amount.value);
    const amWordError = nameValidator(amwords.value, "Amount (in words)");

    if (nameError || amountError || amWordError) {
      setRecName({ ...recName, error: nameError });
      setAmount({ ...amount, error: amountError });
      setAmwords({ ...amwords, error: amWordError });
    }

    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;

    // TODO: Get account doc & set cheque
    db.collection("users").doc(userId).get();

    navigation.navigate("EnterPinScreen");
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Add Cheque Details</Header>
      <TextInput
        label="Receiver's Name"
        returnKeyType="next"
        value={recName.value}
        onChangeText={(text) => setRecName({ value: text, error: "" })}
        error={!!recName.error}
        errorText={recName.error}
      />
      <TextInput
        label="Amount (in Number)"
        returnKeyType="next"
        value={amount.value}
        onChangeText={(text) => setAmount({ value: text, error: "" })}
        error={!!amount.error}
        errorText={amount.error}
      />
      <TextInput
        label="Amount (in Words)"
        returnKeyType="next"
        value={amwords.value}
        onChangeText={(text) => setAmwords({ value: text, error: "" })}
        error={!!amwords.error}
        errorText={amwords.error}
      />
      <RadioButton.Group
        onValueChange={(text) => setChecked({ value: text, error: "" })}
        value={checked.value}
      >
        <Text>Bearer</Text>
        <RadioButton.Item label="Yes" value="Yes" />
        <RadioButton.Item label="No" value="No" />
      </RadioButton.Group>
      <Button
        mode="contained"
        style={{ marginTop: 24 }}
        onPress={handleCreateCheque}
      >
        Create Cheque
      </Button>
    </Background>
  );
}
