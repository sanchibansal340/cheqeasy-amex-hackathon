import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const signUpUser = async ({ name, email, password, pin }) => {
  try {
    let user;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        user = userCred.user;
        user.updateProfile({ displayName: name });
      })
      .then(() => {
        const db = firebase.firestore();
        db.collection("users").doc(user.uid).set({
          displayName: name,
          email,
          pin,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });

    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const sendEmailWithPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
