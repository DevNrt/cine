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
import Peli from "../components/Peli";
import * as auth from "firebase/auth";
import { initializeApp } from "firebase/app";
import FormButton from "../components/FormButton.js";
import { firebaseConfig } from "../dataBase/config";
import FormInput from "../components/FormInput";

const MovieInfo = ({ navigation }) => {
  const app = initializeApp(firebaseConfig);
  const verificar = auth.getAuth(app);
  const [pelicula, setPelicula] = React.useState([]);

  const [state, setState] = React.useState({
    comentario: "",
  });
  const [time, setTime] = React.useState(new Date(Date.now()));
  const handleChangeText = (comentario, value) => {
    setState({ ...state, [comentario]: value });
  };
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
    const collectionRef = collection(database, "pelicula");
    const q = query(collectionRef);
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setPelicula(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          comentario: doc.data().comentario,
          hora: doc.data().hora,
        }))
      );
    });

    return unsuscribe;
  }, []);

  const AddNewComment = async () => {
    if (state.comentario == "") {
      RN.Alert.alert("Error", "Campos vacios!");
    } else {
      setTime(new Date(Date.now()));
      var datosPelicula = {
        comentario: state.comentario,
        hora: " Hora: " + time.toLocaleTimeString("en-US"),
      };

      const peli = collection(database, "pelicula");

      await addDoc(peli, datosPelicula);

      RN.Alert.alert("Notificación", "Registrado");
    }
  };

  return (
    <RN.ScrollView contentContainerStyle={styles.container}>
      {pelicula.map((peli) => (
        <Peli key={peli.id} {...peli} />
      ))}

      <FormInput
        labelValue={state.comentario}
        onChangeText={(value) => handleChangeText("comentario", value)}
        placeholderText="Comentario"
        iconType="star"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormButton
        buttonTitle="Enviar comentario"
        onPress={() => AddNewComment()}
      />
      <FormButton buttonTitle="Sign Out" onPress={() => LogOutUser()} />
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

export default MovieInfo;
