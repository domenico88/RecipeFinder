import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { styled, ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

const StyledAppbar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
}));

const queryClient = new QueryClient();

// Main App component that includes the AppBar and routing logic
const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if the current page is a recipe detail page
  const isDetailPage = location.pathname.startsWith("/recipe/");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledAppbar position="static">
          <Toolbar>
            {isDetailPage && (
              <ArrowBackIos
                color="inherit"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Recipes
            </Typography>
          </Toolbar>
        </StyledAppbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
