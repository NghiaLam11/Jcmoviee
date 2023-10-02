<template>
  <div class="mobile">
    <div>
      <div class="logo">
        <i class="fas fa-mug-hot icon"></i>
        <span class="namepage">Jcmovie</span>
      </div>
      <ul class="nav">
        <div class="back">
          <i @click="onBack" class="fas fa-times"></i>
        </div>
        <li>
          <router-link to="/"
            ><i class="fas fa-home"></i><span>Home</span></router-link
          >
        </li>
        <li>
          <router-link to="/movies"
            ><i class="fas fa-film"></i><span>Movies</span></router-link
          >
        </li>
        <li>
          <router-link to="/series"
            ><i class="fas fa-hamburger"></i><span>Series</span></router-link
          >
        </li>
        <li>
          <router-link to="/documentaries"
            ><i class="fas fa-book"></i><span>Documentaries</span></router-link
          >
        </li>
        <li>
          <router-link to="/favourites">
            <i class="far fa-heart"></i><span>Favourites</span></router-link
          >
        </li>
        <li>
          <router-link to="/trending"
            ><i class="fas fa-chart-line"></i><span>Trending</span></router-link
          >
        </li>
        <li>
          <router-link to="/comingsoon"
            ><i class="fas fa-calendar-alt"></i
            ><span>Coming soon</span></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue/dist/vue.js";
const emit = defineEmits(["onToggleHeaderMobile"]);
const onBack = () => {
  emit("onToggleHeaderMobile");
};
</script>

<style scoped>
.mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: var(--dark-bg);
  color: white;
}
.mobile a {
  text-decoration: none;
  color: white;
}
.router-link-active {
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-shadow: 2px 2px 5px white;
}
.mobile li {
  padding: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
}
.mobile li:hover {
  border: 1px solid white;
}

.mobile i {
  padding-right: 0.3rem;
}
.mobile .back {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
}
.logo {
  margin-top: 10px;
  margin-bottom: 2.5rem;
  font-size: 1.7rem;
  font-weight: bold;
  padding-left: 1rem;
}
ul {
  padding-left: 1rem;
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .mobile li:nth-child(3),
  li:nth-child(4),
  li:nth-child(5) {
    display: none;
  }
}
</style>
