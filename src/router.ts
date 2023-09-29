import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import Movie from "./views/Movie.vue"
import Series from "./views/Series.vue"
import Profile from "./views/Profile.vue"
import Favourites from "./views/Favourites.vue"
import Trending from "./views/Trending.vue"
import Documentaries from "./views/Documentaries.vue"
import Comingsoon from "./views/Comingsoon.vue"
import MovieDetails from "./views/MovieDetails.vue"
import Signup from "./views/Signup.vue"
import Signin from "./views/Signin.vue"
import Welcome from "./views/Welcome.vue"
import MoviesSearch from "./views/MoviesSearch.vue"


const routes = [
  { path: "/", component: Home },
  { path: "/favourites", component: Favourites },
  { path: "/trending", component: Trending },
  { path: "/movies", component: Movie },
  { path: "/series", component: Series },
  { path: "/profile", component: Profile },
  { path: "/documentaries", component: Documentaries },
  { path: "/comingsoon", component: Comingsoon },
  { path: "/welcome", component: Welcome },
  { path: "/signin", component: Signin },
  { path: "/signup", component: Signup },
  { path: "/movies-search", component: MoviesSearch },
  { path: "/movie-details/:id", component: MovieDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
