<script setup lang="ts">
import HeaderPage from "./components/Header.vue";
import { auth } from "./firebase";
import Loader from "./components/Loader.vue";

import { useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { useGetMovies, useGetUsers } from "./composible/firebase";
import { useLoaderStore } from "./composible/pinia";
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
</script>

<template>
  <div>
    <div class="wrapper">
      <div class="headerpage">
        <HeaderPage />
      </div>
      <div class="routerview">
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
}
.headerpage {
  width: 20%;
}
</style>
