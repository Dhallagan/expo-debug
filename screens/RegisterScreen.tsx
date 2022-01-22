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
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../constants/appStyle";

import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../assets";
import { ErrorMessage, Formik } from "formik";
import { Button } from "../components/Button";
import { useTokenStore } from "../store/useTokenStore";
import { useMutation } from "react-query";
import request, { gql } from "graphql-request";
import { useCurrentUserStore } from "../store/useCurrentUserStore";
import { endpoint } from "../constants/httpHelper";

const CREATE_USER = gql`
  mutation RegisterMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        email
        username
        firstName
        lastName
        picture {
          url
        }
        timeZone
        locale
      }
    }
  }
`;

type CreateUserInput = {
  username: "";
  email: "";
  password: "";
  firstName: "";
  lastName: "";
  idToken: "";
};

const initialState = {
  input: {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    idToken: "",
  } as CreateUserInput,
  errors: {} as Record<keyof CreateUserInput | "_", string[] | undefined>,
  loading: false,
};

export default function RegisterScreen() {
  let { login, logout } = useTokenStore();
  let { setMe } = useCurrentUserStore();
  const navigation = useNavigation();
  const [state, setState] = React.useState(initialState);

  const mutation = useMutation((input: CreateUserInput) => {
    return request(endpoint, CREATE_USER, {
      input,
    })
      .then((res) => {
        if (res.createUser?.user) {
          setMe(res.createUser.user);
          login(res.createUser?.accessToken);
        }
      })
      .catch((errors) => {
        console.log(errors);
        const err = errors.response.errors?.[0];
        setState((prev) => ({
          ...prev,
          errors: err?.errors ?? (err ? { _: [err.message] } : {}),
        }));
      });
  });

  return (
    <KeyboardAvoidingView behavior={"padding"} style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Text style={Styles.loginHeader}>Register</Text>
        {/* <Image source={images.logo}  />s */}
      </View>

      {/* <View style={Styles.socialContainer}>
        <TouchableOpacity style={Styles.socialButton}>
          <Image source={images.google} />
          <Text style={Styles.text}>with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.socialButton}>
          <Image source={images.facebook} />
          <Text style={Styles.text}>with Facebook</Text>
        </TouchableOpacity>
      </View> */}

      {/* <View
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
      </View> */}

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        onSubmit={(values) => mutation.mutate(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={Styles.userNameContainer}>
              <TextInput
                style={Styles.userNameInput}
                placeholder="First Name"
                placeholderTextColor={"white"}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
              />
            </View>
            <View style={Styles.userNameContainer}>
              <TextInput
                style={Styles.userNameInput}
                placeholder="Last"
                placeholderTextColor={"white"}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
              />
            </View>
            <View style={Styles.userNameContainer}>
              <TextInput
                style={Styles.userNameInput}
                placeholder="Username"
                placeholderTextColor={"white"}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            <View style={Styles.errorContainer}>
              <Text style={{ color: "red" }}>
                {!!state.errors.username && state.errors.username[0]}
              </Text>
            </View>
            <View style={Styles.userNameContainer}>
              <TextInput
                style={Styles.userNameInput}
                placeholder="Email"
                placeholderTextColor={"white"}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View style={Styles.errorContainer}>
              <Text style={{ color: "red" }}>
                {!!state.errors.email && state.errors.email[0]}
              </Text>
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
                returnKeyType="go"
              />
            </View>
            <View style={Styles.errorContainer}>
              <Text style={{ color: "red" }}>
                {(!!state.errors.password && state.errors.password[0]) || null}
              </Text>
            </View>

            <Button title="Register" onPress={handleSubmit} />
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
        <Text style={{ color: "#969696" }}>Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#008bef" }}> Login In.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primary900,
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
    // marginBottom: 20,
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
    // marginBottom: 5,
  },
  errorContainer: {
    justifyContent: "center",
    marginStart: 20,
    marginEnd: 20,
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
