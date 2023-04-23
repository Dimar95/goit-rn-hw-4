import { Text, View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreateScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerRight: () => (
            <MaterialIcons
              style={{ marginRight: 20 }}
              name="logout"
              size={24}
              color="#BDBDBD"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          ),
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerTitle: "Публикации",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarItemStyle: { borderRadius: 40 },
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-back"
              size={24}
              color="black"
            />
          ),

          tabBarShowLabel: false,
          headerTitle: "Создать публикацию",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarItemStyle: { borderRadius: 40 },
          tabBarActiveBackgroundColor: "#F6F6F6",
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            ) : (
              <Ionicons name="add" size={30} color={color} />
            ),
        })}
        name="Creat"
        component={CreateScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-back"
              size={24}
              color="black"
            />
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarItemStyle: { borderRadius: 40 },
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        })}
        name={"Profile"}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
