import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./components/Screens/main/PostsScreen";
import CreateScreen from "./components/Screens/main/CreatePostsScreen";
import CommentsScreen from "./components/Screens/main/CommentsScreen";
import ProfileScreen from "./components/Screens/main/ProfileScreen";
import MapScreen from "./components/Screens/main/MapScreen";
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
        <AuthStack.Screen name="CommentsScreen" component={CommentsScreen} />
        <AuthStack.Screen name="MapScreen" component={MapScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <AuthStack.Screen name="CommentsScreen" component={CommentsScreen} />
      <AuthStack.Screen name="MapScreen" component={MapScreen} />
    </AuthStack.Navigator>
  );
};
