import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function createFavoritesRef(userId) {
  return doc(db, "users", userId, "preferences", "favorites");
}

export async function loadFavoritesFromFirestore(userId) {
  const favoritesRef = createFavoritesRef(userId);
  const favoritesSnapshot = await getDoc(favoritesRef);

  if (!favoritesSnapshot.exists()) {
    return [];
  }

  const data = favoritesSnapshot.data();

  return Array.isArray(data.favoriteIds) ? data.favoriteIds : [];
}

export async function saveFavoritesToFirestore(userId, favoriteIds) {
  const favoritesRef = createFavoritesRef(userId);

  await setDoc(
    favoritesRef,
    {
      userId,
      favoriteIds,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}
