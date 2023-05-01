import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { format } from "date-fns";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";

const CommentsScreen = ({ route }) => {
  const titleTextHandler = (text) => setText(text);
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  console.log("🚀 ~ comments:", comments);
  const height = useHeaderHeight();
  const { photo } = route.params;

  const onAddComment = () => {
    const data = format(new Date(), "dd MMMM yyyy | HH : mm");
    const comment = {
      text,
      data,
    };
    setComments((prevState) => [...prevState, comment]);
    console.log("🚀 ~ comment:", comment);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height + 10}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.postContainer}>
            <Image style={styles.img} source={{ uri: photo }} />
          </View>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.text}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row" }}>
                <View style={styles.myCommentContainer}>
                  <Text style={styles.comment}>{item.text}</Text>
                  <Text style={styles.data}>{item.data}</Text>
                </View>
                <View>
                  <Image
                    source={require("../../../assets/Images/149452.png")}
                    style={{ width: 28, height: 28, marginTop: 16 }}
                  />
                </View>
              </View>
            )}
          />

          <View>
            <TextInput
              placeholder={"Комментировать..."}
              value={text}
              style={styles.input}
              onChangeText={titleTextHandler}
            />
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onAddComment}
              >
                <AntDesign name="arrowup" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    paddingHorizontal: 16,
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
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    top: -42,
    left: 10,
  },
  inputContainer: {
    flexDirection: "row-reverse",
  },
  myCommentContainer: {
    width: 300,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    margin: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
  },
  userImg: {},
  comment: {
    fontFamily: "Roboto-Regulat",
    fontSize: 13,
    color: "#212121",
    textAlign: "left",
  },
  data: {
    fontFamily: "Roboto-Regulat",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right",
  },
});
