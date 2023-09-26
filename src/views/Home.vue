<template>
  <div class="home">
    <div class="band">
      <div ref="imgThumbnail" class="img-thumbnail">
        <img class="img" src="../images/onepiece.jpg" alt="" />
      </div>
      <div ref="thumbnail" class="band-thumbnail" v-show="isDisplayThumbnail">
        <video ref="video" class="thumbnail" autoplay :muted="isMute" controls loop>
          <source src="../images/video.mp4" type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div class="infor-movie">
        <div>
          <h2><b class="name">One Piece</b></h2>
        </div>
        <p class="desc">
          <span>Anime</span> | <span>Family</span> | <span>2023</span>
        </p>
        <div class="btn-group">
          <button @click="onWatch" class="btn-watch">Watch now</button>
          <button class="btn-fav"><i class="far fa-heart"></i></button>
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
    <div class="continue-watch">
      <ContinueWatch />
    </div>
    <div class="wew">
      <New />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Trending from "../components/Trending.vue";
import New from "../components/New.vue";
import ContinueWatch from "../components/ContinueWatch.vue";
import { onMounted, ref } from "vue";
import { db } from "../firebase"
const video = ref();
const onWatch = () => {
  video.value.requestFullscreen();
}
const imgThumbnail = ref<any>();
const thumbnail = ref<any>();
const isDisplayThumbnail = ref(false);
const isMute = ref(true);
const onPlayAudio = () => {
  isMute.value = !isMute.value;
  console.log(db)
};



onMounted(() => {
  const playVideo = imgThumbnail.value.addEventListener("mouseenter", () => {
    clearTimeout(playVideo);
    setTimeout(() => {
      isDisplayThumbnail.value = true;
    }, 3000);
  });
});
</script>
<style scoped>
.home {
  background-color: var(--dark-bg);
  color: white;
  position: relative;
  z-index: 2;
  max-height: 102vh;
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
}
.name {
  font-size: 2.5rem;
}
.desc {
  font-size: 0.9rem;
  color: rgb(255, 255, 255, 0.7);
}
.btn-group {
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
