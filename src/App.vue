<script setup lang="ts">
import HeaderPage from "./components/Header.vue";
import { auth } from "./firebase";
import Loader from "./components/Loader.vue";

import { useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { useGetMovies, useGetUsers } from "./composible/firebase";
import { useLoaderStore, useScrollerStore } from "./composible/pinia";
import { onMounted, ref } from "vue";
// localStorage.setItem("idUser", JSON.stringify('6ywB6XsltQjOZbgZ82Ej'));
// const idUser = JSON.parse(localStorage.getItem("idUser") || "");

const loaderStore = useLoaderStore();
useGetMovies();
useGetUsers();
const route = useRouter();
// CHECK IF HAVE NOT HAD SIGN => SHOW "WELCOME" COMPONENT
//<<<<<<
onAuthStateChanged(auth, (user) => {
  if (!user) {
    route.push("welcome");
  }
});
//>>>>>>
const routerview = ref();
const scrollerStore = useScrollerStore();
onMounted(() => {
  // Add background color to the header horizontal when the user scrolls down
  routerview.value.addEventListener("scroll", () => {
    if (routerview.value.scrollTop > 0) {
      scrollerStore.scroller = true;
    } else {
      scrollerStore.scroller = false;
    }
  });
});
</script>

<template>
  <div>
    <div class="wrapper">
      <div class="headerpage">
        <HeaderPage />
      </div>
      <div class="routerview" ref="routerview">
        <router-view></router-view>
      </div>
      <div v-if="loaderStore.loader" class="load">
        <Loader />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  min-height: 100vh;
}
.routerview {
  width: 80%;
  height: 100vh;
  overflow: scroll;
  background-color: var(--dark-bg);
}
.headerpage {
  width: 20%;
}
@media screen and (max-width: 992px) {
  .headerpage {
    width: 0;
  }
  .routerview {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    background-color: var(--dark-bg);
  }
}
</style>
