import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieList from "./screens/MovieList";
import MovieInfo from "./screens/MovieInfo";
import LoginFire from "./screens/LoginFire";
import Carrito from "./screens/Carrito";
import CreateMovie from "./screens/CreateMovie";
import CreateUser from "./screens/CreateUser";
import Blog from "./screens/Blog";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginFire" component={LoginFire} />
      <Stack.Screen name="MovieList" component={MovieList} />
      <Stack.Screen name="MovieInfo" component={MovieInfo} />
      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen name="Carrito" component={Carrito} />
      <Stack.Screen name="CreateMovie" component={CreateMovie} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
