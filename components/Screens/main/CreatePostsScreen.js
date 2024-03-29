import { useHeaderHeight } from "@react-navigation/elements";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { db, storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";

const CreatePostsScreen = ({ navigation }) => {
  const [locationText, setLocationText] = useState("");
  const [titleText, setTitleText] = useState("");
  const locationTextHandler = (text) => setLocationText(text);
  const titleTextHandler = (text) => setTitleText(text);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const height = useHeaderHeight();
  const { userId, displayName } = useSelector((state) => state.auth);

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = await ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const procesedPhoto = await getDownloadURL(storageRef);
    return procesedPhoto;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const onPublishPost = async () => {
    if (!photo) {
      Alert.alert("Зробіть фото. Пост без фото створити неможливо");
      return;
    }
    if (!locationText) {
      Alert.alert("Додайте назву локації.");
      return;
    }
    if (!titleText) {
      Alert.alert("Вигадайте назву для вашого фото");
      return;
    }
    const photoRef = await uploadPhotoToServer();
    const newPost = {
      photoRef,
      locationText,
      titleText,
      location,
      userId,
      displayName,
    };
    uploadPostToDatabase(newPost);

    navigation.navigate("Posts", {
      photo,
      locationText,
      titleText,
      location,
    });
    resetForm();
  };
  const uploadPostToDatabase = async (post) => {
    try {
      const docRef = await addDoc(collection(db, "post"), post);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const resetForm = () => {
    setPhoto(null);
    setLocationText("");
    setTitleText("");
  };
  return (
    <KeyboardAvoidingView
      style={styles.inner}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height + 10}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.imgContainer} />
            ) : (
              <Camera
                style={styles.imgContainer}
                type={type}
                ref={setCameraRef}
              >
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      await MediaLibrary.createAssetAsync(uri);
                      setPhoto(uri);
                    }
                  }}
                >
                  <Entypo name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </Camera>
            )}
          </View>
          <Text
            style={styles.text}
            onPress={() => {
              setPhoto(null);
            }}
          >
            {photo ? "Редактировать фото" : "Загрузите фото"}
          </Text>
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
            onPress={onPublishPost}
            style={{
              ...styles.button,
              backgroundColor:
                locationText !== "" && titleText !== "" ? "#FF6C00" : "#F6F6F6",
            }}
          >
            <Text
              style={{
                ...styles.buttonText,
                color:
                  locationText !== "" && titleText !== "" ? "#FFF" : "#BDBDBD",
              }}
            >
              Опубликовать
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  inner: {
    flex: 1,
  },
  buttonText: {
    // fontFamily: "Roboto-Regulat",
    fontSize: 16,
    fontFamily: "Roboto-Regulat",
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
    borderColor: "#E8E8E8",
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    // fontFamily: "Roboto",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
    // alignItems: "flex-start",
    justifyContent: "flex-start",
    fontFamily: "Roboto-Regulat",
    textAlign: "left",
  },
  input: {
    color: "#212121",
    // fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    marginTop: 16,
    padding: 16,
    fontFamily: "Roboto-Regulat",
  },
  containerInputIcon: {
    position: "relative",
    top: -40,
  },
  button: {
    borderRadius: 100,
    marginBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-Regulat",
  },
});
