<template>
  <div class="movies-search">
    {{ store.moviesSearchText }}
  </div>
</template>

<script lang="ts" setup>
import { useMoviesStore } from "../composible/pinia";

const store = useMoviesStore();
</script>
