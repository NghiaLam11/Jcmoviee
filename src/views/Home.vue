<template>
  <div class="home" v-if="idUser !== null">
    <div class="band">
      <div @mouseenter="onPlayVideo" class="img-thumbnail">
        <img class="img" :src="movieBand?.thumbnail" alt="" />
      </div>
      <div class="band-thumbnail" v-if="isDisplayThumbnail">
        <video
          ref="video"
          class="thumbnail"
          autoplay
          :muted="isMute"
          controls
          loop
        >
          <source :src="movieBand?.video" type="video/mp4" />
        </video>
      </div>

      <div class="infor-movie">
        <div>
          <h2>
            <b class="name">{{ movieBand?.title }}</b>
          </h2>
        </div>
        <p class="desc">
          <span>{{ movieBand?.type }}</span> |
          <span>{{ movieBand?.year }}</span>
        </p>
        <div class="btn-group">
          <button @click="onWatch" class="btn-watch">Watch now</button>
          <div class="btn-group-fav">
            <button
              v-for="favourite in storeUser.user?.favourites"
              :key="favourite.id"
              v-show="favourite.id === movieBand?.id"
              @click="onFavourite(movieBand, 'unfavourite')"
              class="btn-fav-solid"
            >
              <i class="fas fa-heart"></i>
            </button>
            <button
              class="btn-fav"
              @click="onFavourite(movieBand, 'favourite')"
            >
              <i class="far fa-heart"></i>
            </button>
          </div>
          <button
            v-if="isDisplayThumbnail"
            @click="onPlayAudio"
            class="btn-muted"
          >
            <i v-if="!isMute" class="fas fa-volume-up"></i
            ><i v-else class="fas fa-volume-mute"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="trending">
      <Trending />
    </div>
    <div class="new">
      <New />
    </div>
    <div class="continue-watch">
      <ContinueWatch />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Trending from "../components/Trending.vue";
import New from "../components/New.vue";
import ContinueWatch from "../components/ContinueWatch.vue";
import { computed, ref } from "vue";
import { db } from "../firebase";
import { useMoviesStore, useUserStore } from "../composible/pinia";
import { useUpdateUser } from "../composible/firebase";
const storeMovies = useMoviesStore();
const storeUser = useUserStore();
const movieBand = computed(() => {
  const randomIndex = Math.floor(Math.random() * storeMovies.movies.length);

  // get random item
  const item = storeMovies.movies[randomIndex];

  return item;
});
const onFavourite = (movie: any, type: any) => {
  console.log(movie.id);
  useUpdateUser({ movies: movie, type });
};
const idUser = JSON.parse(localStorage.getItem("idUser") || "");
const video = ref();
const onWatch = () => {
  video.value.requestFullscreen();
};
const isDisplayThumbnail = ref(false);
const isMute = ref(true);
const onPlayAudio = () => {
  isMute.value = !isMute.value;
  console.log(db);
};
const onPlayVideo = () => {
  setTimeout(() => {
    isDisplayThumbnail.value = true;
  }, 3000);
};
</script>
<style scoped>
.home {
  background-color: var(--dark-bg);
  color: white;
  position: relative;
  z-index: 2;
  width: 100%;
}
.img-thumbnail {
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0%;
  left: 0;
  /* object-fit: cover; */
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.band {
  height: 60vh;
  display: flex;
  align-items: flex-end;
  padding-left: 2rem;
  position: relative;
  overflow: hidden;
}
.band-thumbnail {
  position: absolute;
  right: 0;
  top: 0%;
  width: 100%;
  height: 100%;
  z-index: 5;
  user-select: none;
}
.thumbnail {
  width: 100%;
  height: 100%;
  transform: scale(1.7) translateY(5%);
  user-select: none;
}

.infor-movie {
  position: absolute;
  z-index: 8;
  bottom: 0;
}
/* @media screen and (min-width: 542px) and (max-width: 628px) {
  .infor-movie {
    position: absolute;
    z-index: 8;
    bottom: 13%;
  }
} */
.name {
  font-size: 2.5rem;
}
.desc {
  font-size: 0.9rem;
  color: rgb(255, 255, 255, 0.7);
}
.btn-group-fav {
  position: relative;
}
.btn-group {
  display: flex;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.btn-group button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
.btn-fav {
  margin: 0 0.5rem;
}
.btn-fav:hover {
  animation: shakeBtn 0.3s linear forwards;
}
.btn-fav-solid {
  margin: 0 0.5rem;
  color: var(--primary-color);
  position: absolute;
  z-index: 4;
}
.btn-fav-solid:hover {
  animation: shakeBtn 0.3s linear forwards;
}
.btn-watch {
  background-color: var(--primary-color);
  color: white;
}
.btn-watch:hover {
  animation: shakeBtn 0.3s linear forwards;
}
@keyframes shakeBtn {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  30% {
    transform: translateY(-3px) rotate(2deg) scale(1.01);
  }
  60% {
    transform: translateY(-3px) rotate(-2deg) scale(1.03);
  }
  100% {
    transform: translateY(-3px) rotate(0deg) scale(1.06);
    box-shadow: 1px 1px 5px 0 var(--primary-color);
  }
}
</style>
