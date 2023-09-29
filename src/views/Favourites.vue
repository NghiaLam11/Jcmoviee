<template>
  <div class="favourites">
    <div>
      <div>
        <h4 class="title">Favourites</h4>
      </div>
      <div class="card-list">
        <div class="card" v-for="movie in store.user?.favourites" :key="movie.id">
          <div>
            <div class="card-item">
              <button
                  v-for="favourite in store.user?.favourites"
                  :key="favourite.id"
                  v-show="favourite.id === movie.id"
                  @click="onFavourite(movie, 'unfavourite')"
                  class="btn-fav-solid"
                >
                  <i class="fas fa-heart"></i>
                </button>
                <button
                  @click="onFavourite(movie, 'favourite')"
                  class="btn-fav"
                >
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
// import { ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { useUserStore } from "../composible/pinia";
import { useUpdateUser } from "../composible/firebase";
  const store = useUserStore();
  const onFavourite = (movie: any, type: any) => {
  console.log(movie.id);
  useUpdateUser({ movies: movie, type });
};
</script>

<style scoped>
.favourites {
  padding-top: 7rem;
  /* max-height: calc(102vh - 100px); */
  height: 100%;
  overflow: scroll;
  background-color: var(--dark-bg);
}
.title {
  padding: 1rem 1.2rem 0.8rem 1.2rem;
  font-size: 1.2rem;
  color: white;
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
.btn-fav i {
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
