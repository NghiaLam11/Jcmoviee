<template>
    <div class="trending">
      <div>
        <div>
          <h4 class="title">Series</h4>
        </div>
        <div class="sort">
            <select name="" id="">
                <option value="">Year</option>
                <option value="">2021</option>
                <option value="">2022</option>
            </select>
            <select name="" id="">
                <option value="">Type</option>
                <option value="">Action</option>
                <option value="">Fiction</option>
            </select>
            <select name="" id="">
                <option value="">Country</option>
                <option value="">Vietnam</option>
                <option value="">Korea</option>
            </select>
            <button>Sort</button>
        </div>
        <div class="card-list">
          <div class="card" v-for="movie in movies" :key="movie.title">
            <div>
              <div class="card-item">
                <div class="card-img">
                  <img class="img" :src="movie.thumbnail" alt="" />
                </div>
                <button class="btn-fav"><i class="far fa-heart"></i></button>
  
                <div class="card-movie">
                  <h5 class="name">{{ movie.title }}</h5>
                  <p class="desc">{{ movie.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref } from "vue";
  import "vue3-carousel/dist/carousel.css";
  const movies = ref([
    {
      title: "Avatar 2",
      desc: "2022 | Action",
      thumbnail: "/src/images/avatar.jpg",
    },
    {
      title: "The Breaking Bad",
      desc: "2019 | Action",
      thumbnail: "/src/images/thebreakingbad.jpg",
    },
    {
      title: "Spiderman",
      desc: "2021 | Fiction",
      thumbnail: "/src/images/spiderman.jpg",
    },
    {
      title: "The Witcher",
      desc: "2020 | Horror",
      thumbnail: "/src/images/witcher.jpg",
    },
    {
      title: "Avatar 3",
      desc: "2022 | Action",
      thumbnail: "/src/images/avatar.jpg",
    },
    {
      title: "The Breaking Bad 2",
      desc: "2019 | Action",
      thumbnail: "/src/images/thebreakingbad.jpg",
    },
    {
      title: "Avatar 4",
      desc: "2022 | Action",
      thumbnail: "/src/images/avatar.jpg",
    },
    {
      title: "The Breaking Bad 4",
      desc: "2019 | Action",
      thumbnail: "/src/images/thebreakingbad.jpg",
    },
    {
      title: "Avatar 5",
      desc: "2022 | Action",
      thumbnail: "/src/images/avatar.jpg",
    },
    {
      title: "The Breaking Bad 6",
      desc: "2019 | Action",
      thumbnail: "/src/images/thebreakingbad.jpg",
    },
    {
      title: "Avatar 7",
      desc: "2022 | Action",
      thumbnail: "/src/images/avatar.jpg",
    },
    {
      title: "The Breaking Bad 8",
      desc: "2019 | Action",
      thumbnail: "/src/images/thebreakingbad.jpg",
    },
    {
      title: "Avatar 8",
      desc: "2022 | Action",
      thumbnail: "/src/images/avatar.jpg",
    },
    {
      title: "The Breaking Bad 9",
      desc: "2019 | Action",
      thumbnail: "/src/images/thebreakingbad.jpg",
    },
    {
      title: "Avatar 17",
      desc: "2022 | Action",
      thumbnail: "/src/images/avatar.jpg",
    },
    {
      title: "The Breaking Bad 18",
      desc: "2019 | Action",
      thumbnail: "/src/images/thebreakingbad.jpg",
    },
  ]);
  </script>
  
  <style scoped>
  .trending {
    padding-top: 7rem;
    /* max-height: calc(102vh - 100px); */
    max-height: 102vh;
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
  