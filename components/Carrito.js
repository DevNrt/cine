import * as React from "react";
import * as RN from "react-native";
import { database } from "../dataBase/firebase";
import {
  deleteDoc,
  doc,
  updateDoc,
  collection,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "../dataBase/config";
import * as auth from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function Carrito({
  id,
  nombrePelicula,
  horario,
  duracion,
  sala,
  image,
  compra,
}) {
  const app = initializeApp(firebaseConfig);
  const verificar = auth.getAuth(app);

  const UpdateMovie = () => {
    const ref = doc(database, "carrito-user" + verificar.currentUser.email, id);

    updateDoc(ref, {
      compra: true,
    });
    UpdateMovieHistory();
    RN.Alert.alert("Notificación", "Comprada!");
  };

  const UpdateMovieVender = () => {
    const ref = doc(database, "carrito-user" + verificar.currentUser.email, id);

    updateDoc(ref, {
      compra: false,
    });
    UpdateMovieVenderHistory();
    RN.Alert.alert("Notificación", "Vendida!");
  };

  const UpdateMovieHistory = () => {
    const ref = doc(database, "history", "history" + nombrePelicula);

    updateDoc(ref, {
      compra: true,
    });

    RN.Alert.alert("Notificación", "Comprada!");
  };

  const UpdateMovieVenderHistory = () => {
    const ref = doc(database, "history", "history" + nombrePelicula);

    updateDoc(ref, {
      compra: false,
    });

    RN.Alert.alert("Notificación", "Vendida!");
  };

  const DeleteMovie = () => {
    const ref = doc(database, "carrito-user" + verificar.currentUser.email, id);

    deleteDoc(ref);

    RN.Alert.alert("Notificación", "Eliminado");
  };
  return (
    <RN.View style={styles.container}>
      <RN.Image style={styles.logo} source={{ uri: image }} />
      <RN.Text style={styles.text}>Nombre :{nombrePelicula}</RN.Text>
      <RN.Text style={styles.text}>Horario: {horario}</RN.Text>
      <RN.Text style={styles.text}>Duración: {duracion}</RN.Text>
      <RN.Text style={styles.text}>Sala: {sala}</RN.Text>

      {compra ? (
        <RN.TouchableOpacity
          style={styles.addButton}
          onPress={() => UpdateMovieVender()}
        >
          <RN.Text style={[styles.navButtonText, { color: "red" }]}>
            Vender
          </RN.Text>
        </RN.TouchableOpacity>
      ) : (
        <RN.TouchableOpacity
          style={styles.addButton}
          onPress={() => UpdateMovie()}
        >
          <RN.Text style={styles.navButtonText}>Comprar</RN.Text>
        </RN.TouchableOpacity>
      )}

      <RN.TouchableOpacity
        style={styles.addButton}
        onPress={() => DeleteMovie()}
      >
        <RN.Text style={styles.navButtonText}>Eliminar</RN.Text>
      </RN.TouchableOpacity>
      <RN.Text style={styles.text}>----------------------------------</RN.Text>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    width: 400,
    height: 250,
  },
  text: {
    fontSize: 28,
    marginBottom: 5,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 5,
  },
  addButton: {
    marginVertical: 10,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
});
