import * as React from "react";
import * as RN from "react-native";
import { database } from "../dataBase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "../dataBase/config";
import { initializeApp } from "firebase/app";

export default function Peli({ comentario, hora }) {
  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.text}>----------------------------------</RN.Text>

      <RN.Text style={styles.text}>Comentario :{comentario}</RN.Text>
      <RN.Text style={styles.text}>Hora: {hora}</RN.Text>

      <RN.Text style={styles.text}>----------------------------------</RN.Text>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  textComentario: {
    fontSize: 30,
    marginBottom: 5,
    color: "#051d5f",
  },
  textHora: {
    fontSize: 20,
    marginBottom: 2,
    color: "#051d5f",
  },
});
