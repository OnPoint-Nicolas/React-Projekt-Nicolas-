import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./auth-context";
import {
  auth,
  signInWithEmail,
  signInWithGooglePopup,
  signOutUser,
  signUpWithEmail,
} from "../lib/firebase";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      authLoading,
      signUpWithEmail,
      signInWithEmail,
      signInWithGooglePopup,
      signOutUser,
      isLoggedIn: Boolean(currentUser),
    }),
    [authLoading, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
