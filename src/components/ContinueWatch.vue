<template>
  <div class="continue">
    <div>
      <div>
        <h4 class="title">Continue watching</h4>
      </div>
      <div>
        <Carousel
          :breakpoints="breakpoints"
          :autoplay="5000"
          :wrap-around="true"
          :transition="500"
          pause-autoplay-on-hover
        >
          <Slide v-for="movie in store.user?.watchings" :key="movie.id">
            <div class="card">
              <div class="card-item">
                <div class="card-img">
                  <img class="img" :src="movie.thumbnail" alt="" />
                </div>
                <button class="btn-fav"><i class="far fa-heart"></i></button>

                <div class="card-movie">
                  <h5 class="name">{{ movie.title }}</h5>
                  <p class="desc">{{ movie.type }} | {{ movie.year }}</p>
                </div>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { useUserStore } from "../composible/pinia";
const store = useUserStore()
const breakpoints = ref({
  700: {
    itemsToShow: 2,
  },
  // 1024 and up
  1024: {
    itemsToShow: 3,
  },
});
</script>

<style scoped>
.carousel__slide {
    display: block !important;
}
.title {
  padding: 1rem 1.2rem 0.8rem 1.2rem;
  font-size: 1.2rem;
}
.card {
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  transition: all 1s linear;
}
.card-item:hover .card-img {
  transform: scale(1.1);
}
.card-item {
  position: relative;
  cursor: pointer;
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
.card-movie {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.3rem 0;
  background-color: rgba(11, 11, 11, 0.9);
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
