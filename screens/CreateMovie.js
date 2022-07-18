import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../dataBase/firebase";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton.js";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
const CreateMovie = () => {
  const [time, setTime] = useState(new Date(Date.now()));
  const [timePicker, setTimePicker] = useState(false);

  const [state, setState] = useState({
    nombrePelicula: "",
    horario: "",
    duracion: "",
    sala: "",
    compra: false,
  });
  const [image, setImage] = useState(null);
  const handleChangeText = (nombrePelicula, value) => {
    setState({ ...state, [nombrePelicula]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const AddNewMovie = async () => {
    if (
      state.nombrePelicula == "" ||
      state.duracion == "" ||
      state.sala == "" ||
      state.horario == ""
    ) {
      Alert.alert("Error", "Campos vacios!");
    } else {
      var datosPelicula = {
        nombrePelicula: state.nombrePelicula,
        horario: state.horario,
        duracion: state.duracion,
        sala: state.sala,
        image: image,
        compra: state.compra,
      };
      const pelis = collection(database, "peliculas");

      await addDoc(pelis, datosPelicula);

      Alert.alert("Notificación", "Registrado");
    }
  };

  function showTimePicker() {
    setTimePicker(true);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  return (
    <ScrollView style={styles.container}>
      <FormInput
        labelValue={state.nombrePelicula}
        onChangeText={(value) => handleChangeText("nombrePelicula", value)}
        placeholderText="Nombre de la pelicula"
        iconType="tags"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={state.duracion}
        onChangeText={(value) => handleChangeText("duracion", value)}
        placeholderText="Duración"
        iconType="clockcircle"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={state.sala}
        onChangeText={(value) => handleChangeText("sala", value)}
        placeholderText="Sala"
        iconType="star"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {!timePicker && (
        <View>
          <Button title="Horario" color={"green"} onPress={showTimePicker} />
        </View>
      )}

      {timePicker && (
        <DateTimePicker
          value={time}
          mode={"time"}
          is24Hour={true}
          display={"default"}
          onChange={onTimeSelected}
        />
      )}
      <Text style={styles.inputGroup}>
        Horario = {(state.horario = time.toLocaleTimeString("en-US"))}
      </Text>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            marginLeft: 60,
          }}
        />
      )}
      <FormButton
        buttonTitle="Foto de la pelicula"
        onPress={() => pickImage()}
      />
      <FormButton buttonTitle="Registrar" onPress={() => AddNewMovie()} />
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
    paddingVertical: 15,
    fontSize: 20,
  },
});
export default CreateMovie;
