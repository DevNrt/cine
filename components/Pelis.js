import * as React from "react";
import * as RN from "react-native";
import { database } from "../dataBase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "../dataBase/config";
import * as auth from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function Pelis({
  nombrePelicula,
  horario,
  duracion,
  sala,
  image,
  compra,
}) {
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const verificar = auth.getAuth(app);

  const AddMovieCart = async () => {
    var datosPelicula = {
      nombrePelicula: nombrePelicula,
      horario: horario,
      duracion: duracion,
      sala: sala,
      image: image,
      compra: compra,
    };

    const pelis = collection(
      database,
      "carrito-user" + verificar.currentUser.email
    );

    await addDoc(pelis, datosPelicula);
    AddMovieCartHistory();
    RN.Alert.alert("Notificación", "Registrado en el carrito");
  };

  const AddMovieCartHistory = async () => {
    await setDoc(doc(database, "history", "history" + nombrePelicula), {
      nombrePelicula: nombrePelicula,
      horario: horario,
      duracion: duracion,
      sala: sala,
      image: image,
      compra: compra,
    });
  };

  return (
    <RN.View style={styles.container}>
      <RN.Image style={styles.logo} source={{ uri: image }} />
      <RN.Text style={styles.text}>Nombre :{nombrePelicula}</RN.Text>
      <RN.Text style={styles.text}>Horario: {horario}</RN.Text>
      <RN.Text style={styles.text}>Duración: {duracion}</RN.Text>
      <RN.Text style={styles.text}>Sala: {sala}</RN.Text>

      <RN.TouchableOpacity
        style={styles.addButton}
        onPress={() => AddMovieCart()}
      >
        <RN.Text style={styles.navButtonText}>Añadir a tu carrito</RN.Text>
      </RN.TouchableOpacity>

      <RN.TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("MovieInfo")}
      >
        <RN.Text style={styles.navButtonText}>MovieInfo</RN.Text>
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
