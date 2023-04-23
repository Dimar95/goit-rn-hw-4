import { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import { AntDesign } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";

const RegistrationScreen = ({ navigation }) => {
  const userSchema = object({
    name: string().required("Обязательное поле").min(3, "Не мение 3 символов"),
    email: string()
      .email("Invalid Email")
      .min(6, "Не мение 6 символов")
      .required("Обязательное поле"),
    password: string()
      .required("Обязательное поле")
      .min(6, "Не мение 6 символов"),
  });

  const [showPass, setShowPass] = useState(true);
  const image = require("../../assets/Images/backgr.jpg");

  const onSubmit = ({ name, email, password }) => {
    Keyboard.dismiss();
    console.log(`Name: ${name} E-mail: ${email} Password: ${password}`);
    navigation.navigate("Home");
  };

  const onShowPass = () => {
    setShowPass(false);
    setTimeout(() => {
      setShowPass(true);
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground style={styles.imageBacgr} source={image}>
        <KeyboardAvoidingView
          style={styles.containerKeyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.formContainer}>
              <View style={styles.avatar}>
                <TouchableOpacity style={styles.imgAdd}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.h1}>Регистрация</Text>
              <Formik
                onSubmit={(values, action) => {
                  onSubmit(values);
                  action.resetForm();
                }}
                validationSchema={userSchema}
                initialValues={{ name: "", email: "", password: "" }}
              >
                {(props) => {
                  return (
                    <View style={styles.formikStyle}>
                      <TextInput
                        value={props.values.name}
                        onChangeText={props.handleChange("name")}
                        placeholder="Логин"
                        style={styles.input}
                      />
                      {props.errors.name && (
                        <Text style={styles.errorText}>
                          {props.errors.name}
                        </Text>
                      )}
                      <TextInput
                        value={props.values.email}
                        onChangeText={props.handleChange("email")}
                        placeholder="Адрес электронной почты"
                        style={styles.input}
                      />
                      {props.errors.email && (
                        <Text style={styles.errorText}>
                          {props.errors.email}
                        </Text>
                      )}
                      <View>
                        <TextInput
                          value={props.values.password}
                          onChangeText={props.handleChange("password")}
                          placeholder="Пароль"
                          style={styles.input}
                          secureTextEntry={showPass}
                        />
                        {props.errors.password && (
                          <Text style={styles.errorText}>
                            {props.errors.password}
                          </Text>
                        )}
                        {props.values.password !== "" && (
                          <TouchableOpacity
                            style={styles.openPass}
                            onPress={onShowPass}
                          >
                            <Text style={styles.showPassText}>Показать</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={props.handleSubmit}
                      >
                        <Text style={styles.buttonText}>
                          Зарегистрироваться
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              </Formik>
              <TouchableOpacity
                style={styles.login}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.login}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  imageBacgr: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  containerKeyboardAvoidingView: {
    justifyContent: "flex-end",
  },
  h1: {
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    padding: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
    paddingVertical: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    alignItems: "center",
    marginBottom: 45,
  },
  openPass: {
    alignItems: "flex-end",
    bottom: 65,
    right: 20,
  },
  showPassText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
    marginTop: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    bottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  formikStyle: {
    paddingHorizontal: 16,
    width: "100%",
  },
  imgAdd: {
    top: 35,
    left: 60,
  },
});

export default RegistrationScreen;
