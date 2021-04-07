import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { Card, Title, Text } from "react-native-paper";
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
    const db = firebase.firestore();
    setName(user.displayName);

    db.collection("users")
      .doc(user.uid)
      .get()
      .then((userDoc) => {
        if (userDoc.exists) {
          db.collection("users")
            .doc(user.uid)
            .collection("accounts")
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
        <Card
          key={index}
          elevation={3}
          style={styles.card}
          onPress={() =>
            navigation.navigate("CashChequeScreen", {
              accId: account.accNo,
              accBal: account.accBal,
            })
          }
        >
          <Card.Content>
            <Title style={styles.name}>{account.bankName}</Title>
            <TouchableOpacity>
              <Text style={styles.bal}>{account.accBal}</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ))}
      <Button mode="contained" onPress={logoutUser}>
        Logout
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  name: {
    fontWeight: "bold",
  },
  bal: {
    fontSize: 16,
  },
});
