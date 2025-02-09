# Recipe finder

This project utilizes **React Query** for data fetching and caching, **React Router** for navigation, and **Material-UI** for UI components.


## Expanding the ESLint configuration

* React (with TypeScript)
* React Router for navigation
* React Query for API calls and caching
* Material-UI for UI components
* Zod for data validation
* Vitest & React Testing Library for testing
* Vite as the build tool

## Installation

 Install dependencies

 ```
 npm install
 ```

 Start development server

 ```
  npm run dev 
 ```

 Run test 

 ```
  npm run test 
 ```

 ## Assumptions

 * React and typescript: I decided to use React with Typecript for the better error dection during development. Also Typescript helps maintain code quality and makes the codebase more manageable.
 * React Query: In this case I decided to use React query mainly to simplify data fetching and to cache data and have automatically refetching. I didn't use , for example , RTK query because I did not need of a global state management in this case would add just more complexity.
 * Material UI: a simple way to manage the CSS part,I overrode the theme to inject it in the App.tsx with the ThemeProvider
 * Zod: used to validate DTO and manage runtime errors
 * Vite: wanted to try another kind of build tool and development server. Vite can offer a great HMR and it has a great bundler and transpiler.
 * What could I do better: managing the image loading to show a skeleton during the onloading and an avatar in case of error
