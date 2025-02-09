import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { beforeEach, describe, expect, test, vi } from "vitest";

globalThis.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ recipes: [] }),
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Recipe Search App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the search bar", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Search recipe/i)).toBeInTheDocument();
  });

  test("allows user to type in the search bar", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const searchInput = screen.getByLabelText(/Search recipe/i);
    fireEvent.change(searchInput, { target: { value: "Pasta" } });
    expect(searchInput).toHaveValue("Pasta");
  });

  test("fetches and displays recipes from API", async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        recipes: [
          {
            id: 1,
            name: "Pasta",
            ingredients: [],
            instructions: [],
            prepTimeMinutes: 10,
            cookTimeMinutes: 15,
            servings: 2,
            difficulty: "Easy",
            cuisine: "Italian",
            caloriesPerServing: 200,
            tags: [],
            userId: 1,
            image: "",
            rating: 4.5,
            reviewCount: 10,
            mealType: [],
          },
        ],
      }),
    });

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const searchInput = await screen.getByLabelText(/Search recipe/i);
    fireEvent.change(searchInput, { target: { value: "Pasta" } });

    waitFor(() => expect(screen.getByText("Pasta")).toBeInTheDocument());
  });
  test("shows the favorites button", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Show favorites/i)).toBeInTheDocument();
  });

  test("navigates to recipe detail page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Show favorites/i));
    expect(screen.getByText(/Show all/i)).toBeInTheDocument();
  });

  test("renders back button in recipe detail page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Show favorites/i));
    expect(screen.getByText(/Show all/i)).toBeInTheDocument();
  });
});
