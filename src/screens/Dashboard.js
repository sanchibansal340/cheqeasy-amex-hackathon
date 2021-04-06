import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
import "firebase/auth";
import "firebase/firestore";

export default function Dashboard({ navigation }) {
  const [name, setName] = useState("");
  const [allAccounts, setAllAccounts] = useState([]);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      setName(user.displayName);
    }

    const db = firebase.firestore();

    db.collection("users")
      .doc(user.uid)
      .get()
      .then((userDoc) => {
        if (userDoc.exists) {
          db.collection("accounts")
            .orderBy("createdAt", "desc")
            .get()
            .then((docs) => {
              if (docs) {
                docs.forEach((doc) => {
                  const data = doc.data();
                  const id = doc.id;
                  setAllAccounts((accounts) => [...accounts, { ...data, id }]);
                });
              }
            });
        }
      });
  }, []);

  return (
    <Background>
      <Header>Hello {name}</Header>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AddAccountScreen")}
      >
        Add an Account
      </Button>
      {allAccounts.map((account, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.replace("CashChequeScreen")}
        >
          <Text style={styles.link}>{account.bankName}</Text>
          <Text style={styles.link}>{account.accBal}</Text>
        </TouchableOpacity>
      ))}
      <Button mode="outlined" onPress={logoutUser}>
        Logout
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
