import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../../pages/Home";
import RecipeDetail from "../../pages/RecipeDetail";
import Favorites from "../../pages/Favorites";
import NotFound from "../../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Navigate to="/" replace />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
