<template>
  <div class="profile">
    <div class="user">
      <div class="avatar">
        <img class="img" :src="store.user?.avatar" alt="" />
        <div ref="setting" class="setting"><i class="fas fa-user-cog"></i></div>
      </div>
      <div class="infor">
        <h4 class="name">Jclahi</h4>
        <p class="bio">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <!-- <div ref="update" class="update">
        <form action="">
          <input class="custom-file-input" type="file" /><input
            placeholder="Change your name"
            type="text"
          />
          <input placeholder="Change your bio" type="text" />
          <button>Change</button>
        </form>
      </div> -->
    </div>
    <div class="continue-watch">
      <ContinueWatch />
    </div>
    <div class="favourites">
      <Favourites />
    </div>
    <div class="watched">
      <Watched />
    </div>
  </div>
</template>
<script lang="ts" setup>
import ContinueWatch from "../components/ContinueWatch.vue";
import Favourites from "../components/Favourites.vue";
import Watched from "../components/Watched.vue";
const store = useUserStore()
import { ref } from "vue";
import { useUserStore } from "../composible/pinia";
const setting = ref();
</script>
<style scoped>
.profile {
  max-height: 102vh;
  overflow: scroll;
  background-color: var(--dark-bg);
  padding-top: 7rem;
  color: white;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;

  box-shadow: -2px 2px 2px 0 black;
  transition: all 0.2s linear;
  z-index: 6;
  position: absolute;
}
.avatar {
  cursor: pointer;
  margin: 0 auto;
  width: 170px;
  height: 150px;
  position: relative;
  transition: all 0.2s linear;
}
.avatar:hover .setting {
  transform: translateX(-90%) translateY(2px);
}
.update {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  background-color: rgb(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;
}
.update form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-around;

  background-color: #2e2e2e;
  padding: 2rem 1rem;
}

.update form input {
  margin: 0.3rem 0;
  color: #000;
  background-color: #fff;
  outline: none;
  border-radius: 3px;
}

.update form button {
  cursor: pointer;
  margin: 0.3rem 0;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "Change your avatar";
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
  width: 100%;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
.setting {
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.setting i {
  font-size: 2rem;
}
.setting i:hover {
  text-shadow: -1px 1px 5px #cccccc;
}
.user {
  text-align: center;
}
.name {
  font-size: 2rem;
}
.bio {
  font-size: 0.9rem;
  opacity: 0.7;
}
/* .multiline-ellipsis {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap; 
} */
</style>
