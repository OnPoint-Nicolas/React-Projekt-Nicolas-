import { Link } from "react-router-dom";
import recipes from "../data/mockRecipes";

export default function Recipes() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Recipes</h1>

      {recipes.map((r) => (
        <div key={r.id} style={styles.card}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <Link to={`/recipe/${r.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 10,
    marginBottom: 10,
  },
};