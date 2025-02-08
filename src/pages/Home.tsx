import { Button, Container, useTheme } from "@mui/material";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const theme = useTheme();
  return (
    <Container maxWidth="xl">
      <SearchBar onSearch={setQuery} />

      <Button
        variant="outlined"
        onClick={() => setShowFavorites(!showFavorites)}
        sx={{
          color: theme.palette.background.default,
          width: "100%",
          borderColor: theme.palette.background.default,
          marginBottom: "24px",
        }}
      >
        {showFavorites ? "Show all" : "Show favorites"}
      </Button>

      <RecipeList query={query} showFavorites={showFavorites} />
    </Container>
  );
};

export default Home;
