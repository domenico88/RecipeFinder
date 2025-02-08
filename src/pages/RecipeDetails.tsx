import { useParams } from "react-router-dom";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  styled,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRecipe } from "../hooks/useRecipes";

const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useRecipe(id || "");

  if (isLoading)
    return (
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="warning" />
      </Box>
    );
  if (error || !data)
    return <Typography color="error">Error loading</Typography>;
  return (
    <Container maxWidth={"xl"}>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "24px",
          boxShadow: "6px 10px 34px -15px",
          borderRadius: "8px",
        }}
      >
        <Grid size={{ md: 6, xs: 9 }}>
          <Typography fontSize={18} fontWeight={600}>
            {data.name}
          </Typography>
        </Grid>
        <Grid
          size={{ md: 6, xs: 3 }}
          sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
        >
          <Chip label={data.difficulty} />
        </Grid>
        <Grid size={3}>
          <img src={data.image} style={{ width: 64, height: 64 }} />
        </Grid>
        <StyledGrid size={3}>
          <strong>Cook Time</strong>
          <Typography>{data.cookTimeMinutes} mins</Typography>
        </StyledGrid>
        <StyledGrid size={3}>
          <strong>Rating</strong>
          <Typography>{data.rating}</Typography>
        </StyledGrid>
        <StyledGrid size={3}>
          <strong>Servings</strong>
          <Typography>{data.servings}</Typography>
        </StyledGrid>
        <StyledGrid size={12}>
          <strong>Ingredients</strong>
          <Typography> {data.ingredients.join(", ")}</Typography>
        </StyledGrid>
        <StyledGrid size={12}>
          <strong>Instructions</strong>
          <Typography> {data.instructions.join(", ")}</Typography>
        </StyledGrid>
      </Grid>
    </Container>
  );
};

export default RecipeDetails;
