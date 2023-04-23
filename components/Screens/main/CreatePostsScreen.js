import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [locationText, setLocationText] = useState("");
  const [titleText, setTitleText] = useState("");
  const locationTextHandler = (text) => setLocationText(text);
  const titleTextHandler = (text) => setTitleText(text);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image />
        <View style={styles.iconContainer}>
          <Entypo name="camera" size={24} color="#BDBDBD" />
        </View>
      </View>
      <Text style={styles.text}>Загрузите фото</Text>
      <TextInput
        placeholder={"Название..."}
        value={titleText}
        style={styles.input}
        onChangeText={titleTextHandler}
      />
      <View>
        <TextInput
          value={locationText}
          onChangeText={locationTextHandler}
          placeholder="Местность..."
          style={{ ...styles.input, paddingLeft: 30 }}
        />
        <Feather
          style={styles.containerInputIcon}
          name="map-pin"
          size={24}
          color="#BDBDBD"
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor:
            locationText !== "" && titleText !== "" ? "#FF6C00" : "#F6F6F6",
        }}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: locationText !== "" && titleText !== "" ? "#FFF" : "#BDBDBD",
          }}
        >
          Опубликовать
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#B4B4B4",
    paddingHorizontal: 16,
    alignContent: "space-around",
    textAlign: "left",
  },
  buttonText: {
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    backgroundColor: "#F6F6F6",
    height: 240,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    borderWidth: 1,
  },
  text: {
    // fontFamily: "Roboto",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    // textAlign: "left",
  },
  input: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    marginTop: 16,
    padding: 16,
  },
  containerInputIcon: {
    position: "relative",
    top: -42,
  },
  button: {
    borderRadius: 100,
    marginBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
