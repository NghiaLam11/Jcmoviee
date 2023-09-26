import { defineStore } from "pinia";
import { ref } from "vue";
import { Movies, User } from "./type";
export const useMoviesStore = defineStore("movies", () => {
  const movies = ref<Movies[]>([]);
  return {
    movies,
  };
});

export const useMoviesDetailStore = defineStore("moviesDetail", () => {
  const movieDetail = ref<Movies>();

  return {
    movieDetail,
  };
});

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();

  return {
    user,
  };
});

export const useLoaderStore = defineStore("loader", () => {
  const loader = ref(true);

  return {
    loader,
  };
});