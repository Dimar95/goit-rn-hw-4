import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

const CommentsScreen = ({ route }) => {
  const titleTextHandler = (text) => setText(text);
  const [text, setText] = useState("");
  const height = useHeaderHeight();
  const { photo } = route.params;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height + 10}
    >
      <View style={styles.inner}>
        <View style={styles.postContainer}>
          <Image style={styles.img} source={{ uri: photo }} />
        </View>
        <View>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.iconContainer}>
              <AntDesign name="arrowup" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder={"Комментировать..."}
            value={text}
            style={styles.input}
            onChangeText={titleTextHandler}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  img: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postContainer: {
    width: "100%",
    marginTop: 32,
    // marginHorizontal: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    padding: 16,
    zIndex: 1,
  },
  iconContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    zIndex: 5,
    top: 60,
  },
  inputContainer: {
    flexDirection: "row-reverse",
  },
});
