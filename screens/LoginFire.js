import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton.js";
import SocialButton from "../components/SocialButton";
import * as auth from "firebase/auth";
import { initializeApp } from "firebase/app";
import * as Google from "expo-auth-session/providers/google";
import { firebaseConfig } from "../dataBase/config";
import { database } from "../dataBase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LoginFire = ({ navigation }) => {
  const app = initializeApp(firebaseConfig);
  const verificar = auth.getAuth(app);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "19534474362-sno8nvsg790gtsnpvpv7h2apkuf4sf9b.apps.googleusercontent.com",
    clientSecret: "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",
  });

  var actual = new Date(Date.now());
  const AddHistoryUser = async () => {
    var datosUser = {
      user: verificar.currentUser.email,
      date: "Fecha-" + actual.toLocaleString("en-US"),
      sesion: "Abrio sesión",
    };
    const user = collection(database, "users-history");
    await addDoc(user, datosUser);
  };

  const LoginUser = () => {
    auth
      .signInWithEmailAndPassword(verificar, email, password)
      .then(() => {
        navigation.navigate("MovieList");
        AddHistoryUser();
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          Alert.alert("Error", "Usuario desactivado por muchos intentos!");
        } else if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password"
        ) {
          Alert.alert("Error", "Email or password incorrecto!");
        } else {
          Alert.alert("Error", "Error: " + error);
        }
      });
  };

  const LoginUserGoogle = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Autorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();
    setUser(userInfo);
    console.log(userInfo);
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      //const { id_token } = response.params;

      //const provider = new auth.GoogleAuthProvider();
      //const credential = provider.credential(id_token);
      //auth.signInWithCredential(verificar, credential);

      setAccessToken(response.authentication.accessToken);
      accessToken && LoginUserGoogle();

      if (authentication) {
        navigation.navigate("CreateUser");
      }
    }
  }, [response]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Manager Cine</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Sign In" onPress={() => LoginUser()} />

      <View>
        <SocialButton
          disabled={!request}
          buttonTitle="Sign In with Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.invitadoButton}
        onPress={() => navigation.navigate("CreateUser")}
      >
        <Text style={styles.navButtonText}>Crear usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.invitadoButton}
        onPress={() => navigation.navigate("CreateMovie")}
      >
        <Text style={styles.navButtonText}>Crear peli</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginFire;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  invitadoButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
});
