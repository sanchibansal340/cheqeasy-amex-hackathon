import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as LocalAuthentication from "expo-local-authentication";
import Background from "../components/Background";
import { AppContext } from "../core/AppContextProvider";
import Toast from "../components/Toast";

const EnterFingerprintScreen = ({ navigation, route }) => {
  const [compatible, setCompatible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState();
  const { amount, recName, accId } = route.params;
  const { theme } = useContext(AppContext);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

  const checkDeviceForHardware = async () => {
    const isFingerprintDev = await LocalAuthentication.hasHardwareAsync();
    setCompatible(isFingerprintDev);
    if (!compatible) {
      setError("Fingerprint Scanner not found.");
    }
  };

  const checkForBiometrics = async () => {
    const biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (!biometricRecords) {
      setError("No Biometrics Found");
    } else {
      handlePress();
    }
  };

  const handlePress = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      setScanned(true);
      updateDb();
    } else {
      setError("Fingerprint does not match");
    }
  };

  const updateDb = () => {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;

    db.collection("users")
      .doc(userId)
      .get()
      .then((userDoc) => {
        if (userDoc.exists) {
          db.collection("users")
            .doc(userId)
            .collection("accounts")
            .doc(accId.toString())
            .get()
            .then((accountDoc) => {
              if (accountDoc) {
                db.collection("users")
                  .doc(userId)
                  .collection("accounts")
                  .doc(accId.toString())
                  .collection("cheques")
                  .add({
                    recName,
                    amount,
                  });
              }
            });
        }
      });

    navigation.navigate("Dashboard");
  };

  return (
    <Background>
      <TouchableOpacity onPress={compatible && checkForBiometrics()}>
        <Text
          style={{
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          Fingerprint Scan
        </Text>
      </TouchableOpacity>
      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );
};

export default EnterFingerprintScreen;
