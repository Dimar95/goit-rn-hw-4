import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { email, displayImg, displayName } = useSelector((state) => state.auth);

  useEffect(() => {
    gerAllPosts();
  }, []);

  const gerAllPosts = async () => {
    const q = query(collection(db, "post"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push({ ...doc.data(), id: doc.id });
      });

      setPosts(cities);
    });
    // setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // doc.data() is never undefined for query doc snapshots
  };

  return (
    <View style={styles.container}>
      <View style={styles.prifileContainer}>
        <Image style={styles.prifileImg} source={{ uri: displayImg }} />
        <View style={styles.prifileText}>
          <Text style={{ fontFamily: "Roboto-Bold" }}>{displayName}</Text>
          <Text style={styles.prifileEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        style={styles.postContainer}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32 }}>
            <Image style={styles.img} source={{ uri: item.photoRef }} />
            <View style={styles.discrContainer}>
              <Text style={styles.title}>{item.titleText}</Text>
              <View style={styles.containerDown}>
                <TouchableOpacity
                  style={styles.commentsContainer}
                  onPress={() => {
                    navigation.navigate("CommentsScreen", {
                      ...item,
                    });
                  }}
                >
                  <FontAwesome
                    style={styles.iconComments}
                    name="comment-o"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.locationContainer}
                  onPress={() => {
                    navigation.navigate("MapScreen", {
                      ...item,
                    });
                  }}
                >
                  <Feather
                    style={styles.iconLocation}
                    name="map-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={{ color: "#BDBDBD" }}>{item.locationText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#B4B4B4",
  },
  img: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 32,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },
  commentsContainer: { flexDirection: "row" },
  locationContainer: { flexDirection: "row" },
  discrContainer: { flexDirection: "column" },
  iconComments: { marginRight: 6 },
  iconLocation: { marginRight: 4 },
  containerDown: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prifileContainer: {
    width: "100%",
    paddingLeft: 16,
    display: "flex",
    flexDirection: "row",
    marginTop: 32,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  prifileImg: {
    width: 60,
    height: 60,
  },
});
