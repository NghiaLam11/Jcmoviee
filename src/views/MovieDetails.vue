<template>
  <div class="movie-details">
    <div @mouseenter="onStartWatch" @mouseleave="onStopWatch" class="band">
      <div ref="imgThumbnail" class="img-thumbnail">
        <img class="img" :src="store.movieDetail?.thumbnail" alt="" />
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
          <source :src="store.movieDetail?.video" type="video/mp4" />
          <source :src="store.movieDetail?.video" type="video/mp4" />
        </video>
      </div>

      <div class="infor-movie">
        <div>
          <h2>
            <b class="name ellipsis">{{ store.movieDetail?.title }}</b>
          </h2>
        </div>
        <p class="type">
          <span>{{ store.movieDetail?.type }}</span> |
          <span>{{ store.movieDetail?.year }}</span>
        </p>
        <div class="btn-group">
          <button @click="onWatch" class="btn-watch">Watch now</button>
          <div class="btn-group-fav">
            <button
              v-for="favourite in storeUser.user?.favourites"
              :key="favourite.id"
              v-show="favourite.id === store.movieDetail?.id"
              @click="onFavourite(store.movieDetail, 'unfavourite')"
              class="btn-fav-solid"
            >
              <i class="fas fa-heart"></i>
            </button>
            <button
              class="btn-fav"
              @click="onFavourite(store.movieDetail, 'favourite')"
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
    <div class="movie-about">
      <div>
        <h4 class="topic">DESCRIPTION</h4>
        <p class="desc">
          {{ store.movieDetail?.desc1 }}<span ref="dots" id="dots">...</span
          ><span ref="moreText" id="more">{{ store.movieDetail?.desc2 }}</span>
          <span @click="onToggleReadDesc()" ref="btnText" class="myBtn">
            Read more
          </span>
        </p>
      </div>
      <div class="movie-comment">
        <h4 class="topic">COMMENTS</h4>
        <form @submit.prevent="onComment" class="comment-form">
          <input
            v-model="commentText"
            placeholder="What are you thinking?"
            type="text"
          />
          <button type="submit"><i class="far fa-paper-plane"></i></button>
        </form>
        <div>
          <div
            v-for="(comment, index) in store.movieDetail?.comments"
            :key="index"
            class="comment"
          >
            <div class="img">
              <img :src="comment.avatar" alt="" />
            </div>
            <div class="user">
              <div>
                <h4>{{ comment.name }}</h4>
                <span>{{ comment.date }}</span>
              </div>

              <p>
                {{ comment.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loaderStore.loader" class="load">
    <Loader />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  useMoviesDetailStore,
  useLoaderStore,
  useUserStore,
} from "../composible/pinia";
import Loader from "../components/Loader.vue";
import { useRoute } from "vue-router";
import {
  useGetMovieDetail,
  useUpdateMovie,
  useUpdateUser,
} from "../composible/firebase";
const store = useMoviesDetailStore();
const storeUser = useUserStore();
const loaderStore = useLoaderStore();
const route = useRoute();
useGetMovieDetail(route.params.id);
const video = ref();
const commentText = ref("");

const imgThumbnail = ref<any>();
const isDisplayThumbnail = ref(false);
const isMute = ref(true);
const onPlayAudio = () => {
  isMute.value = !isMute.value;
};

const onWatch = () => {
  isDisplayThumbnail.value = true;
  setTimeout(() => {
    video.value.requestFullscreen();
    isMute.value = !isMute.value;
  });
  const movieWatching = ref({
    movies: store.movieDetail,
    type: "watching",
  });
  useUpdateUser(movieWatching.value);
};
const onStartWatch = () => {
  isDisplayThumbnail.value = true;
};
const onStopWatch = () => {
  isDisplayThumbnail.value = false;
  console.log("aaaaaaa");
};
const dots = ref<any>();
const btnText = ref<any>();
const moreText = ref<any>();
function onToggleReadDesc() {
  if (dots.value.style.display === "none") {
    dots.value.style.display = "inline";
    btnText.value.innerHTML = "Read more";
    moreText.value.style.display = "none";
  } else {
    dots.value.style.display = "none";
    btnText.value.innerHTML = "Read less";
    moreText.value.style.display = "inline";
  }
}
const onFavourite = (movie: any, type: any) => {
  console.log(movie.id);
  useUpdateUser({ movies: movie, type });
};
const onComment = () => {
  useUpdateMovie(store.movieDetail, commentText.value);
  commentText.value = "";
};
</script>
<style scoped>
.movie-details {
  background-color: var(--dark-bg);
  color: white;
  position: relative;
  z-index: 2;
  height: 102vh;
  width: 100%;
  overflow: scroll;
}
.img-thumbnail {
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 10%;
  left: 0;
}
.img-thumbnail .img {
  width: 100%;
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
  z-index: 11;
}
.name {
  font-size: 2.5rem;
  color: white;
}
.type {
  font-size: 0.9rem;
  color: rgb(255, 255, 255, 0.7);
}
.btn-group {
  margin-top: 1rem;
  display: flex;
  margin-bottom: 2rem;
}
.btn-group-fav {
  position: relative;
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
.movie-about {
  padding: 1rem;
  padding-top: 5rem;
  position: relative;
  z-index: 10;
}
/* .movie-about::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9;
  bottom: 100%;
  height: 50px;
  transform: scaleY(1.8) scaleX(1.1);
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0)
  );
  filter: blur(0.9rem);
} */
.movie-about .topic {
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem 0;
}
.movie-about .desc {
  font-size: 0.9rem;
  opacity: 0.6;
}
#more {
  display: none;
}
.myBtn {
  text-decoration: underline;
  margin-left: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}
.movie-comment {
  margin-top: 3rem;
}
.comment-form {
  display: flex;
  align-items: center;
  border-bottom: 2px solid black;
}

.comment-form input {
  width: 100%;
  padding: 0.3rem 0.6rem;
}
.comment-form input {
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
}
.comment-form button {
  cursor: pointer;
  transition: all 0.3s linear;
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
}
.comment-form button:hover {
  transform: scale(1.1);
}
.comment {
  display: flex;
}
.comment .img {
  width: 10%;
  padding: 1rem;
}
.comment .img img {
  border-radius: 5px;
  height: 100px;
  object-fit: cover;
}
.comment .user {
  width: 90%;
  padding: 1rem;
}
.comment .user h4 {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}
.comment .user span {
  letter-spacing: 1px;
}

.comment .user div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment .user p {
  padding: 1rem;
  background-color: #3e3e3e;
  border-radius: 3px;
}
</style>
