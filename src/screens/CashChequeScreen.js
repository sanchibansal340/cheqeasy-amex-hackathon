import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { nameValidator, amountValidator } from "../helpers";
import { theme } from "../core/theme";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function AddAccountScreen({ navigation, route }) {
  const [recName, setRecName] = useState({ value: "", error: "" });
  const [amount, setAmount] = useState({ value: "", error: "" });
  const [checked, setChecked] = useState("Yes");
  const { accId, accBal } = route.params;

  const handleCreateCheque = () => {
    const nameError = nameValidator(recName.value, "Receiver's Name");
    const amountError = amountValidator(amount.value, Number(accBal));

    if (nameError || amountError) {
      setRecName({ ...recName, error: nameError });
      setAmount({ ...amount, error: amountError });
      return;
    }

    navigation.navigate("EnterPinScreen", {
      amount: amount.value,
      recName: recName.value,
      bearer: checked,
      accId,
    });
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
      <RadioButton.Group
        onValueChange={(text) => setChecked(text)}
        value={checked}
        style={styles.radio}
      >
        <Text style={styles.bearer}>Bearer</Text>
        <RadioButton.Item
          label="Yes"
          value="Yes"
          color={theme.colors.primary}
        />
        <RadioButton.Item label="No" value="No" color={theme.colors.primary} />
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

const styles = StyleSheet.create({
  bearer: {
    fontSize: 18,
  },
  radio: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
