<template>
  <div class="header">
    <div class="header-vertical">
      <div>
        <div class="watch">
          <i class="fas fa-mug-hot icon"></i>
          <span class="namepage">Jcmovie</span>
        </div>
        <ul class="nav">
          <li>
            <router-link to="/"
              ><i class="fas fa-film"></i><span>Home</span></router-link
            >
          </li>
          <li>
            <router-link to="/favourites">
              <i class="far fa-heart"></i><span>Favourites</span></router-link
            >
          </li>
          <li>
            <router-link to="/trending"
              ><i class="fas fa-chart-line"></i
              ><span>Trending</span></router-link
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
      <ul>
        <li>
          <router-link to="/community"
            ><i class="far fa-user"></i><span>Community</span></router-link
          >
        </li>
        <li>
          <router-link to="/social"
            ><i class="far fa-share-square"></i><span>Social</span></router-link
          >
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="/settings"
            ><i class="fas fa-cog"></i><span>Settings</span></router-link
          >
        </li>
        <li>
          <a @click="onSignout"
            ><i class="fas fa-sign-out-alt"></i><span>Logout</span></a
          >
        </li>
      </ul>
    </div>
    <div
      :class="[scrollerStore.scroller ? 'scroller' : '', 'header-horizontal']"
    >
      <ul class="nav-list">
        <li><router-link to="/movies">Movies</router-link></li>
        <li><router-link to="/series">Series</router-link></li>
        <li><router-link to="/documentaries">Documentaries</router-link></li>
      </ul>
      <ul class="nav-list">
        <li @click="openSearch"><i class="fas fa-search"></i></li>
        <li @click="openNotification"><i class="far fa-bell"></i></li>
        <li>
          <router-link to="profile" class="profile"
            ><img class="avatar" :src="storeUser.user?.avatar" alt="" /><span>{{
              storeUser.user?.name
            }}</span></router-link
          >
        </li>
      </ul>
      <div class="nav-mobile">
        <i @click="onToggleHeaderMobile" class="fas fa-bars"></i>
      </div>
    </div>
    <div v-if="istoggleHeaderMobile" class="header-mobile">
      <HeaderMobile @onToggleHeaderMobile="onToggleHeaderMobile" @onSignout="onSignout" />
    </div>
    <div ref="search" class="search">
      <i @click="closeSearch" class="fas fa-caret-up"></i>
      <form @submit.prevent="onSearch" class="search-group">
        <input placeholder="Ex: One Piece" type="text" v-model="searchText" />
        <i class="fas fa-search"></i>
      </form>
    </div>
    <div ref="notification" class="notification">
      <h3>Notification</h3>
      <div class="list-wrapper">
        <div class="notification-list">
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
          <div class="notification-item">
            <img
              class="img"
              src="../images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg"
              alt=""
            />
            <div class="notification-infor">
              <h4 class="title">The Warning Game</h4>
              <p class="desc">A TV series hottest in Jcmovie</p>
            </div>
          </div>
        </div>
      </div>
      <button @click="closeNotification">Close</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useLogOutUser } from "../composible/firebase";
import {
  useScrollerStore,
  useUserStore,
  useMoviesStore,
} from "../composible/pinia";
import { useRouter } from "vue-router";
import { Movies } from "../composible/type";
import HeaderMobile from "./HeaderMobile.vue";
const router = useRouter();
const storeUser = useUserStore();
const storeMovies = useMoviesStore();
const search = ref();
const notification = ref();
const scrollerStore = useScrollerStore();
const searchText = ref("");
const istoggleHeaderMobile = ref(false);
const onToggleHeaderMobile = () => {
  istoggleHeaderMobile.value = !istoggleHeaderMobile.value;
};
router.beforeEach(() => {
  istoggleHeaderMobile.value = false;
});

const onSignout = () => {
  useLogOutUser();
};

const openSearch = () => {
  search.value.style.top = "0";
};
const closeSearch = () => {
  search.value.style.top = "-50%";
};
const openNotification = () => {
  notification.value.style.right = "0";
};
const closeNotification = () => {
  notification.value.style.right = "-100%";
};
const moviesSearch = ref<Movies[]>([]);
const onSearch = () => {
  // storeMovies.moviesSearchText = searchText.value
  storeMovies.movies.forEach((movie: Movies) => {
    if (movie.title.toLowerCase() == searchText.value.toLowerCase()) {
      moviesSearch.value.push(movie);
    }
  });
  storeMovies.moviesSearch = moviesSearch.value;
  moviesSearch.value = [];
  searchText.value = "";

  router.push("/movies-search");
};
</script>
<style scoped>
.header {
  height: 100%;
  position: relative;
  width: 100%;
  box-shadow: 1px 0 50px 0 rgba(54, 1, 108, 0.3);
  z-index: 4;
}
.watch i {
  padding: 0 0.5rem 0 0.7rem;
  font-size: 1.6rem;
}
.watch {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: -4rem;
  margin-bottom: 1.5rem;
}
.namepage {
  font-size: 1.4rem;
}
.scroller {
  background-color: rgba(0, 0, 0, 0.7);
}
.header-horizontal a,
i {
  color: #ffffff !important;
}
.profile {
  display: flex;
  align-items: center;
}
.profile span {
  margin: 0 0.2rem;
}
.header-horizontal .avatar {
  width: 25px;
  height: 25px;
  border-radius: 4px;
  object-fit: cover;
}
.header-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;

  width: 100%;
  /* background-color: rgb(0, 0, 0, 0.4); */

  position: fixed;
  top: 0;
  right: 0%;
  z-index: 999;
}
.nav-list {
  display: flex;
  padding: 2rem 1rem;
  align-self: center;
}
ul {
  padding: 0;
}
a {
  text-decoration: none;
  padding: 0 0.7rem;
  color: rgb(255, 255, 255, 0.5);
}
span {
  font-size: 0.9rem;
}
li {
  margin: 0.5rem 0.5rem;
  font-weight: lighter;
  padding-bottom: 0.2rem;
}
li:hover {
  text-decoration: underline;
  color: #ffffff;
}
i {
  padding-right: 0.5rem;
  cursor: pointer;
}
.nav a {
  display: flex;
  padding: 0.2rem 0;
  /* align-items: center; */
}
.router-link-active {
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-shadow: 2px 2px 5px white;
}

.search {
  position: fixed;
  top: -50%;
  right: 0;
  z-index: 9999;

  padding: 1rem 2rem;
  background-color: var(--dark-bg);

  display: flex;
  align-items: center;

  transition: all 1s ease-in-out;
}
.search > i {
  margin-right: 1rem;
  margin-bottom: 0.2rem;
  font-size: 2rem;
}
.notification h3 {
  text-align: center;
}

.notification button {
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: rgb(255, 255, 255, 0.3);
  color: #ffffff;
  cursor: pointer;
}

.search-group {
  overflow: hidden;
  border: 1px solid white;
  border-radius: 3px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  width: 60vw;
}
.search-group i {
  color: black !important;
}
.search-group input {
  outline: none;
  border: none;
  padding: 0.5rem 0.5rem;
  width: 100%;
}
.notification {
  width: 65%;
  padding: 1rem;

  position: fixed;
  right: -100%;
  top: 0;
  z-index: 9999;

  background-color: var(--dark-bg);
  color: #ffffff;
  border: 1px solid #ffffff;
  height: 100vh;
  transition: all 1s ease-in-out;
  overflow: hidden;
}
.notification .img {
  width: 20%;
  padding: 0.7rem;
}
.notification-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.notification-list {
  max-height: 80vh;
  overflow: scroll;
}
.notification-item:hover {
  border: 1px solid rgb(255, 255, 255, 0.3);
}
.notification-infor .title {
  font-weight: bold;
}

.notification-infor .desc {
  font-weight: lighter;
  font-size: 0.9rem;
  opacity: 0.8;
}
.nav-mobile {
  z-index: 6;
}
/* ---------------------------------------------------- XSM ----------------------------------------------------- */
@media screen and (max-width: 542px) {
  .header-vertical {
    display: none;
  }
  .nav-list:first-child {
    display: none;
  }
  .nav-mobile i {
    font-size: 1.4rem;
    margin-left: 1.5rem;
    cursor: pointer;
  }
  .search-group {
    width: 100%;
  }
  .notification {
    width: 100%;
  }
}
/* ---------------------------------------------------- SM ----------------------------------------------------- */
@media screen and (min-width: 542px) and (max-width: 638px) {
  .header-vertical {
    display: none;
  }
  .nav-list:first-child {
    display: none;
  }
  .nav-mobile i {
    font-size: 1.4rem;
    padding-left: 1.5rem;
  }
}
/* ---------------------------------------------------- MD ----------------------------------------------------- */
@media screen and (min-width: 638px) and (max-width: 992px) {
  .header-vertical {
    display: none;
  }

  .header-horizontal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    width: 100%;
    /* background-color: rgb(0, 0, 0, 0.4); */

    position: fixed;
    top: 0;
    right: 0%;
    z-index: 999;
  }
  .nav-mobile {
    display: none;
  }
}
/* ---------------------------------------------------- LG ----------------------------------------------------- */
@media screen and (min-width: 992px) {
  .header-vertical {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100vh;
    padding-left: 2rem;
    background-color: var(--dark-bg);
    color: rgb(255, 255, 255);
    padding-bottom: 2rem;
    padding-top: 2.5rem;
  }
  .header-mobile {
    display: none;
  }
  .header-vertical .nav li a {
    display: flex;
    align-items: center;
  }
  .header-horizontal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    width: 80%;
    /* background-color: rgb(0, 0, 0, 0.4); */

    position: fixed;
    top: 0;
    right: 0%;
    z-index: 999;
  }
  .nav-mobile {
    display: none;
  }

  .header-horizontal .avatar {
    width: 25px;
    height: 25px;
    border-radius: 4px;
    object-fit: cover;
  }
  .search-group {
    width: 70vw;
  }
  .notification {
    width: 55%;
  }
}
</style>
