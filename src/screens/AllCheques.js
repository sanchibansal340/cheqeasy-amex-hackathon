import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { Card, Title, Text } from "react-native-paper";
import Background from "../components/Background";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import "firebase/auth";
import "firebase/firestore";

export default function Dashboard({ navigation, route }) {
  const [allCh, setAllCh] = useState([]);
  const { accId } = route.params;

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();

    db.collection("users")
      .doc(user.uid)
      .get()
      .then((userDoc) => {
        if (userDoc.exists) {
          db.collection("users")
            .doc(user.uid)
            .collection("accounts")
            .doc(accId.toString())
            .collection("cheques")
            .get()
            .then((docs) => {
              if (docs) {
                docs.forEach((doc) => {
                  const data = doc.data();
                  const id = doc.id;
                  setAllCh((cheques) => [...cheques, { ...data, id }]);
                });
              }
            });
        }
      });
  }, []);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>All Cheques</Header>
      {allCh.map((cheque, index) => (
        <Card key={index} elevation={3} style={styles.card}>
          <Card.Content>
            <Title style={styles.name}>{cheque.recName}</Title>
            <TouchableOpacity>
              <Text style={styles.bal}>Status: {cheque.status}</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ))}
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
