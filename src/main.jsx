import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AllUsers from "./components/admin/users/AllUsers.jsx";
import AllMovies from "./components/admin/movie/AllMovies.jsx";
import AllTheaters from "./components/admin/theater/AllTheaters.jsx";
import AllCinemaHalls from "./components/admin/cinema_hall/AllCinemaHalls.jsx";
import ShowSeats from "./components/ShowSeats.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import SearchResults from "./components/SearchResult.jsx";
import AllMovieShows from "./components/admin/movie_show/AllMovieShows.jsx";
import MovieShowPage from "./pages/MovieShowPage.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import PaymentFailed from "./components/PaymentFailed.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx"; // Import the 404 Page component

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/payment-failed",
        element: <PaymentFailed />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "admin-panel",
        element: <AdminPage />,
        children: [
          {
            path: "all-user",
            element: <AllUsers />,
          },
          {
            path: "movies",
            element: <AllMovies />,
          },
          {
            path: "theaters",
            element: <AllTheaters />,
          },
          {
            path: "cinema-halls",
            element: <AllCinemaHalls />,
          },
          {
            path: "movie-shows/:id",
            element: <AllMovieShows />,
          },
        ],
      },
      {
        path: "movie-show/:id",
        element: <MovieShowPage />,
      },
      {
        path: "select-seats/:id",
        element: <ShowSeats />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "*", // Catch-all route for undefined paths
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
