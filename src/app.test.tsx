import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom/vitest'
import App from './App';



const queryClient = new QueryClient();

describe('Recipe Search App', () => {

  test('renders the search bar', () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Cerca ricetta/i)).toBeInTheDocument();
  });


});
