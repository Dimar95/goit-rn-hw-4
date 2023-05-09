import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authSlice";
import { auth } from "../../firebase/config";

const { updateUserProfile, authStateChange, authSingOut } = authSlice.actions;

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(updateUserProfile({ userId: user.uid }));
    } catch (error) {
      console.log("error.message", error.message);
      console.log("🚀 ~ error:", error);
    }
  };

export const authSignUpUser =
  ({ name, email, password }) =>
  async (dispatch, getSatte) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: name,
      });

      const { displayName, uid } = await auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          displayName,
        })
      );
    } catch (error) {
      console.log("error.message", error.message);
      console.log("🚀 ~ error:", error);
    }
  };

export const authSignOutUser = () => async (dispatch, getSatte) => {
  await signOut(auth);
  dispatch(authSingOut());
};

export const authStateChanged = () => async (dispatch, getSatte) => {
  await onAuthStateChanged(auth, (user) => {
    console.log("🚀 ~ user:", user);
    if (user) {
      const userUpdateProfile = {
        displayName: user.displayName,
        userId: user.uid,
      };
      console.log("🚀 ~ userUpdateProfile:", userUpdateProfile);
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange(true));
    }
  });
};
