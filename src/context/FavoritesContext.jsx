import { useEffect, useMemo, useState } from "react";
import { FavoritesContext } from "./favorites-context";
import { useAuth } from "../hooks/useAuth";
import {
  loadFavoritesFromFirestore,
  saveFavoritesToFirestore,
} from "../lib/favorites-service";

const STORAGE_KEY = "recipe-app-favorites";

export function FavoritesProvider({ children }) {
  const { currentUser } = useAuth();
  const [syncSource, setSyncSource] = useState("local");
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let isMounted = true;

    async function syncFromFirestore() {
      if (!currentUser) {
        if (isMounted) {
          setSyncSource("local");
        }
        return;
      }

      try {
        const localFavorites = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
        const cloudFavorites = await loadFavoritesFromFirestore(currentUser.uid);
        const mergedFavorites = [...new Set([...cloudFavorites, ...localFavorites])];

        if (!isMounted) {
          return;
        }

        setFavoriteIds(mergedFavorites);
        setSyncSource("firestore");

        if (mergedFavorites.length !== cloudFavorites.length) {
          await saveFavoritesToFirestore(currentUser.uid, mergedFavorites);
        }
      } catch {
        if (isMounted) {
          setSyncSource("local");
        }
      }
    }

    syncFromFirestore();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    if (syncSource !== "firestore") {
      return;
    }

    if (!currentUser) {
      return;
    }

    saveFavoritesToFirestore(currentUser.uid, favoriteIds).catch(() => {
      setSyncSource("local");
    });
  }, [currentUser, favoriteIds, syncSource]);

  const toggleFavorite = (recipeId) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(recipeId)
        ? currentIds.filter((id) => id !== recipeId)
        : [...currentIds, recipeId]
    );
  };

  const value = useMemo(
    () => ({
      favoriteIds,
      toggleFavorite,
      isFavorite: (recipeId) => favoriteIds.includes(recipeId),
      syncSource,
      hasCloudSync: syncSource === "firestore" && Boolean(currentUser),
    }),
    [currentUser, favoriteIds, syncSource]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
