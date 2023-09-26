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
  // movieDetail.value?.comments.sort((a: any, b: any) => b.date - a.date);
  return {
    movieDetail,
  };
});

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const users = ref<User[]>([]);

  return {
    user,
    users,
  };
});

export const useLoaderStore = defineStore("loader", () => {
  const loader = ref(true);

  return {
    loader,
  };
});
