import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import * as auth from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../dataBase/config";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton.js";

const CreateUser = () => {
  const [state, setState] = useState({
    name: "",
    pass: "",
  });
  const app = initializeApp(firebaseConfig);
  const verificar = auth.getAuth(app);
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const AddNewUser = () => {
    if (state.name == "" || state.pass == "") {
      Alert.alert("Error", "Campos vacios!");
    } else {
      auth
        .createUserWithEmailAndPassword(verificar, state.name, state.pass)
        .then(() => {
          Alert.alert("Notificación", "Usuario creado!");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("Error", "That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            Alert.alert("Error", "That email address is invalid!");
          }

          Alert.alert("Error", error);
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FormInput
        labelValue={state.name}
        onChangeText={(value) => handleChangeText("name", value)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={state.password}
        onChangeText={(value) => handleChangeText("pass", value)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormButton buttonTitle="Registrar" onPress={() => AddNewUser()} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderVottomColor: "#cccccc",
  },
});
export default CreateUser;
