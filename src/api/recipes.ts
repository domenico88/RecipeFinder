import { z } from "zod";

const RecipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number(),
  cookTimeMinutes: z.number(),
  servings: z.number(),
  difficulty: z.string(),
  cuisine: z.string(),
  caloriesPerServing: z.number(),
  tags: z.array(z.string()),
  userId: z.number(),
  image: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  mealType: z.array(z.string()),
});

const ApiSearchResponseSchema = z.object({
  recipes: z.array(RecipeSchema),
});

export type Recipe = z.infer<typeof RecipeSchema>;
type ApiSearchResponse = z.infer<typeof ApiSearchResponseSchema>;

export const fetchRecipes = async (
  query: string
): Promise<ApiSearchResponse> => {
  const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
  if (!res.ok) throw new Error("Error fetching data");
  return res.json();
};

export const fetchRecipe = async (id: string): Promise<Recipe> => {
  const res = await fetch(`https://dummyjson.com/recipe/${id}`);
  if (!res.ok) throw new Error("Error fetching data");
  const json = await res.json();
  return RecipeSchema.parse(json);
};
