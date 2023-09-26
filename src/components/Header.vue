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
    <div ref="headerHorizontal" class="header-horizontal">
      <ul class="nav-list">
        <li><router-link to="/movies">Movies</router-link></li>
        <li><router-link to="/series">Series</router-link></li>
        <li><router-link to="/documentaries">Documentaries</router-link></li>
      </ul>
      <ul class="nav-list">
        <li @click="openSearch"><i class="fas fa-search"></i></li>
        <li @click="openNotification"><i class="far fa-bell"></i></li>
        <li> 
          <router-link to="profile"
             class="profile"><img
              class="avatar"
              :src="store.user?.avatar"
              alt=""
            /><span>{{ store.user?.name }}</span></router-link
          >
        </li>
      </ul>
      <div ref="search" class="search">
        <i @click="closeSearch" class="fas fa-caret-up"></i>
        <div class="search-group">
          <input placeholder="Ex: One Piece" type="text" name="" id="" />
          <i class="fas fa-search"></i>
        </div>
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
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useLogOutUser } from '../composible/firebase';
import { useUserStore } from "../composible/pinia";
const store = useUserStore();
const search = ref();
const notification = ref();
const headerHorizontal = ref();
const onSignout = () => {
  useLogOutUser();
}

// Add background color to the header horizontal when the user scrolls down
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    headerHorizontal.value.style.backgroundColor = "rgba(0,0,0,0.8)";
  } else {
    headerHorizontal.value.style.backgroundColor = "rgb(0, 0, 0, 0.0)";
  }
});
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
</script>
<style scoped>
.header {
  height: 100%;
  position: relative;
  width: 100%;
  box-shadow: 1px 0 50px 0 rgba(54, 1, 108, 0.3);
  z-index: 4;
}

.header-vertical {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  padding: 0 4rem;
  background-color: var(--dark-bg);
  color: rgb(255, 255, 255);
}
.header-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 80%;
  /* background-color: rgb(0, 0, 0, 0.4); */

  position: fixed;
  top: 0;
  right: 0%;
  z-index: 999;
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
.nav-list {
  display: flex;
  padding: 2rem 1rem;
  align-self: center;
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
.search-group {
  overflow: hidden;
  border: 1px solid white;
  border-radius: 3px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  width: 50vw;
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
  width: 35%;
  padding: 1rem;

  position: fixed;
  right: -100%;
  top: 0;

  background-color: var(--dark-bg);
  color: #ffffff;
  border: 1px solid #ffffff;
  height: 100vh;
  transition: all 1s ease-in-out;
  overflow: hidden;
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
</style>
