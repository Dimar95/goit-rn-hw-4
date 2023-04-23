import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./components/Screens/main/PostsScreen";
import CreateScreen from "./components/Screens/main/CreatePostsScreen";
import ProfileScreen from "./components/Screens/main/ProfileScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import { Home } from "./components/Screens/main/Home";
import RegistrationScreen from "./components/Screens/RegistrationScreen";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="grid-outline" size={24} color="black" />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          title: "Публикации",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="add" size={30} color="black" />
          ),
        }}
        name="Creat"
        component={CreateScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="black" />
          ),
        }}
        name={"Profile"}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
