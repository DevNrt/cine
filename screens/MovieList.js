import * as React from "react";
import * as RN from "react-native";
import { database } from "../dataBase/firebase";
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  query,
  getDoc,
} from "firebase/firestore";
import Pelis from "../components/Pelis";
import * as auth from "firebase/auth";
import { initializeApp } from "firebase/app";
import FormButton from "../components/FormButton.js";
import { firebaseConfig } from "../dataBase/config";

const MovieList = ({ navigation }) => {
  const app = initializeApp(firebaseConfig);
  const verificar = auth.getAuth(app);
  const [peliculas, setPeliculas] = React.useState([]);
  var actual = new Date(Date.now());

  const AddHistoryUser = async () => {
    var datosUser = {
      user: verificar.currentUser.email,
      date: "Fecha-" + actual.toLocaleString("en-US"),
      sesion: "Finalizo sesión",
    };
    const user = collection(database, "users-history");
    await addDoc(user, datosUser);
  };

  const LogOutUser = () => {
    auth
      .signOut(verificar)
      .then(
        () => RN.Alert.alert("Notificación", "Sesión finalizada"),
        navigation.navigate("LoginFire"),
        AddHistoryUser()
      );
  };

  React.useEffect(() => {
    const collectionRef = collection(database, "peliculas");
    const q = query(collectionRef);
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setPeliculas(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          nombrePelicula: doc.data().nombrePelicula,
          horario: doc.data().horario,
          duracion: doc.data().duracion,
          sala: doc.data().sala,
          image: doc.data().image,
          compra: doc.data().compra,
        }))
      );
    });

    return unsuscribe;
  }, []);

  return (
    <RN.ScrollView contentContainerStyle={styles.container}>
      {peliculas.map((pelis) => (
        <Pelis key={pelis.id} {...pelis} />
      ))}
      <FormButton buttonTitle="Sign Out" onPress={() => LogOutUser()} />
      <FormButton
        buttonTitle="Carrito"
        onPress={() => navigation.navigate("Carrito")}
      />
    </RN.ScrollView>
  );
};
const styles = RN.StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  addButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
});

export default MovieList;
