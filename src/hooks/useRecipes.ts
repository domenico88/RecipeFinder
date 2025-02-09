import { useQuery } from "@tanstack/react-query";
import { fetchRecipe, fetchRecipes } from "../api/recipes";

export const useRecipes = (query: string) => {
  return useQuery({
    queryKey: ["recipes", query],
    queryFn: () => fetchRecipes(query),
    enabled: !!query,
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipe(id),
    enabled: !!id, // Only run the query if the search query is not empty
  });
};
