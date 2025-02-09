import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRecipes } from "../hooks/useRecipes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Recipe } from "../api/recipes";
import { Delete } from "@mui/icons-material";

const RecipeList: React.FC<{ query: string; showFavorites: boolean }> = ({
  query,
  showFavorites,
}) => {
  const { data, error, isLoading } = useRecipes(query);

  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === recipe.id)
        ? prev.filter((fav) => fav.id !== recipe.id)
        : [...prev, recipe]
    );
  };

   // Determine which recipes to display based on the "showFavorites" flag
  const filteredRecipes = showFavorites ? favorites : data?.recipes;

  if (isLoading)
    return (
      <>
        <Skeleton
          variant="rectangular"
          height={200}
          style={{ marginBottom: 24 }}
        />
        <Skeleton variant="rectangular" height={200} />
      </>
    );
  if (error) return <Typography color="error">Loading Error</Typography>;

  if (filteredRecipes?.length === 0 && query.length > 0) {
    return (
      <Box
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "24px",
          justifyContent: "center",
        }}
      >
        <Delete />
        No results found
      </Box>
    );
  }

  return (
    <>
      {filteredRecipes?.map((recipe) => (
        <Card sx={{ marginBottom: 2 }} key={recipe.id}>
          <CardMedia
            sx={{ height: 140 }}
            image={recipe.image}
            title={recipe.name}
          />
          <Link to={`/recipe/${recipe.id}`}>
            <CardContent sx={{ cursor: "pointer" }}>
              <Typography variant="h6">{recipe.name}</Typography>
              <Typography variant="body2">
                Ingredients: {recipe.ingredients.join(", ")}
              </Typography>
            </CardContent>
          </Link>
          <CardActions disableSpacing>
            <IconButton
              style={{ cursor: "pointer" }}
              aria-label="add to favorites"
              onClick={() => toggleFavorite(recipe)}
            >
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default RecipeList;
