import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function amountValidator(amount) {
  const [accBal, setAccBal] = useState("");

  // TODO: Get account number
  const accNo = "";

  useEffect(() => {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    db.collection("user")
      .doc(userId)
      .get()
      .then((userDoc) => {
        if (userDoc.exists) {
          db.collection("accounts")
            .doc(accNo)
            .get()
            .then((account) => {
              if (account) {
                setAccBal(account.data().accBal);
              }
            });
        }
      });
  }, []);

  if (!amount) return "Amount can't be empty.";
  if (amount > accBal) return "Not enough balance in account";
  return "";
}
