<template>
  <div class="trending">
    <div>
      <div>
        <h4 class="title">SERIES</h4>
      </div>
      <div class="sort">
        <select v-model="year" name="" id="">
          <option value="Year">Year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
        <select v-model="type" name="" id="">
          <option value="Type">Type</option>
          <option value="Action">Action</option>
          <option value="Fiction">Fiction</option>
        </select>
        <button @click="onSort">Sort</button>
      </div>
      <div class="card-list">
        <div class="card" v-for="movie in store.moviesSort" :key="movie.id">
          <div>
            <div class="card-item">
              <button
                v-for="favourite in storeUser.user?.favourites"
                :key="favourite.id"
                v-show="favourite.id === movie.id"
                @click="onFavourite(movie, 'unfavourite')"
                class="btn-fav-solid"
              >
                <i class="fas fa-heart"></i>
              </button>
              <button @click="onFavourite(movie, 'favourite')" class="btn-fav">
                <i class="far fa-heart"></i>
              </button>
              <router-link :to="`/movie-details/${movie.id}`">
                <div class="card-img">
                  <img class="img" :src="movie.thumbnail" alt="" />
                </div>

                <div class="card-movie">
                  <h5 class="name ellipsis">{{ movie.title }}</h5>
                  <p class="desc">{{ movie.type }} | {{ movie.year }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { useMoviesStore, useUserStore } from "../composible/pinia";
import { useGetMovies, useUpdateUser } from "../composible/firebase";
import { ref } from "vue";
import { Movies } from "../composible/type";
useGetMovies();
const storeUser = useUserStore();
const store = useMoviesStore();
const movies = ref<Movies[]>([]);
const year = ref("Year");
const type = ref("Type");
const onFavourite = (movie: any, type: any) => {
  useUpdateUser({ movies: movie, type });
};

const onSort = () => {
  // SELECTED BOTH
  if (year.value !== "Year" && type.value !== "Type") {
    store.movies.map((movie: any) => {
      if (movie.year === Number(year.value) && movie.type === type.value) {
        movies.value.push(movie);
      }
    });
    // SELECTED YEAR BUT NON TYPE
  } else if (year.value !== "Year") {
    store.movies.map((movie: any) => {
      if (movie.year === Number(year.value)) {
        movies.value.push(movie);
      }
    });
    // SELECTED TYPE BUT NON YEAR
  } else if (type.value !== "Type") {
    store.movies.map((movie: any) => {
      if (movie.type === type.value) {
        movies.value.push(movie);
      }
    });
  }
  // ARGUMENT
  store.moviesSort = movies.value;
  // RESET MOVIES ARRAY WHEN SORTED
  movies.value = [];
  // NON SELECTED BOTH
  if (type.value === "Type" && year.value === "Year") {
    store.moviesSort = store.movies;
  }
};
</script>

<style scoped>
.trending {
  padding-top: 7rem;
  height: 100%;
  overflow: scroll;
  background-color: var(--dark-bg);
}
.title {
  padding: 1rem 1.2rem 0.8rem 1.2rem;
  font-size: 1.2rem;
  color: white;
}
.sort select {
  padding: 0.2rem 0.4rem;
  margin: 0.5rem;
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}
.sort select option {
  color: black;
}
.sort button {
  cursor: pointer;
  border: none;
  box-shadow: -2px 2px 0px 0px rgb(255, 255, 255, 0.4);
}
.sort button:hover {
  background-color: rgb(255, 255, 255, 0.9);
}
.card-list {
  display: flex;
  flex-wrap: wrap;
}
.card {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  transition: all 1s linear;
  width: 20%;
}
.card-item:hover .card-img {
  transform: scale(1.1);
}
.card-item {
  position: relative;
  cursor: pointer;
  margin-bottom: 1rem;
}
.btn-fav {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 4;
  border-radius: 5px;
  border: none;
  padding-top: 3px;
  background-color: rgb(255, 255, 255, 0.8);
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s linear;
}
.btn-fav:hover {
  transform: scale(1.1);
  color: var(--primary-color);
}
.btn-fav i {
  color: var(--primary-color);
}
.btn-fav-solid {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 5;
  border-radius: 5px;
  border: none;
  padding-top: 3px;
  background-color: rgb(255, 255, 255, 0.8);
  color: var(--primary-color);
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s linear;
}
.btn-fav-solid:hover {
  transform: scale(1.1);
  color: var(--primary-color);
}
.card-movie {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.3rem 0;
  background-color: rgba(11, 11, 11, 0.9);
  color: white;
  text-align: center;
  /* left: calc(50% - (104px / 2)); */
}
.card .name {
  font-size: 1rem;
}
.card .desc {
  font-size: 0.8rem;
  opacity: 0.7;
}
.card-item {
  border-radius: 10px;
  overflow: hidden;
}
.img {
  object-fit: cover;
  width: 100%;
  height: 150px;
}
.card-img {
  transition: all 0.2s linear;
}
</style>
