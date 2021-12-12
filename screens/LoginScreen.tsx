import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { colors } from "../constants/dogeStyle";

import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../assets/";
import { Formik } from "formik";
import { Button } from "../components/Button";
import { useStore } from "../store/useTokenStore";

export default function LoginScreen() {
  // const handleLogin = ({ username, password }) => {
  //   // const login = useStore((state) => state.login);
  //   // alert(login);
  //   // try {
  //   //   login();
  //   // } catch (error) {
  //   //   alert(error);
  //   // }
  // };
  let { login } = useStore();

  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Text style={Styles.loginHeader}>Log In</Text>
        {/* <Image source={images.logo}  />s */}
      </View>

      <View style={Styles.socialContainer}>
        <TouchableOpacity style={Styles.socialButton}>
          <Image source={images.google} />
          <Text style={Styles.text}>with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.socialButton}>
          <Image source={images.facebook} />
          <Text style={Styles.text}>with Facebook</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          //flex: 0.1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "#262626" }}></View>
        <Text style={{ marginLeft: 40, marginRight: 40, color: "#fff" }}>
          OR
        </Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "#262626",
          }}
        ></View>
      </View>

      <Formik initialValues={{ username: "", password: "" }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={Styles.userNameContainer}>
              <TextInput
                style={Styles.userNameInput}
                placeholder="Username or email"
                placeholderTextColor={"white"}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            <View style={Styles.passwordContainer}>
              <TextInput
                secureTextEntry={true}
                style={Styles.passwordInput}
                placeholder="Password"
                placeholderTextColor={"white"}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <Button title="Login" onPress={login} />
          </>
        )}
      </Formik>

      <View style={Styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={Styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#262626",
            height: 1,
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#969696" }}>New around here?</Text>
        <TouchableOpacity>
          <Text style={{ color: "#008bef" }}> Register.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#18191a",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  socialContainer: {
    flexDirection: "row",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    justifyContent: "space-between",
    alignContent: "center",
  },
  socialButton: {
    alignItems: "center",
    borderColor: "#343536",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    paddingVertical: 10,
    width: "47.5%",
    alignSelf: "stretch",
  },
  userNameContainer: {
    borderColor: "#262626",
    // backgroundColor: colors.loginInputBackground,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  userNameInput: {
    marginStart: 10,
    color: "white",
  },
  passwordContainer: {
    borderColor: "#262626",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    // backgroundColor: colors.loginInputBackground,
    marginBottom: 20,
  },
  passwordInput: { marginStart: 10, color: "white" },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginEnd: 20,
  },
  forgotPasswordText: {
    color: "#0088f8",
  },
  loginContainer: {
    alignItems: "center",
    height: 40,
    marginTop: 30,
    backgroundColor: "#0088f8",
    justifyContent: "center",
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
  },
  loginHeader: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
