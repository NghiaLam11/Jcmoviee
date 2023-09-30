<template>
  <div class="profile">
    <div class="user">
      <div class="avatar">
        <img class="img" :src="store.user?.avatar" alt="" />
        <div @click="onToggleSetting" class="setting">
          <i class="fas fa-user-cog"></i>
        </div>
      </div>
      <div class="infor">
        <h4 class="name">{{ store.user?.name }}</h4>
        <p class="bio">
          {{ store.user?.bio }}
        </p>
      </div>
      <div v-if="isDisplaySettings" ref="update" class="update">
        <form @submit.prevent="onChange">
          <div class="change-avatar">
            <input
              class="custom-file-input"
              @change="onLinkAvatar"
              type="file"
            /><img :src="store.user?.avatar" alt="thumbnail" />
          </div>

          <input
            class="update-name"
            v-model="name"
            placeholder="Change your name"
            type="text"
          />
          <span class="error" v-if="name.length < 3">User's name must have more than 3 character</span>
          <input
            class="update-bio"
            v-model="bio"
            placeholder="Change your bio"
            type="text"
          />
          <span class="error" v-if="bio.length > 100">User's name must have less than 100 character</span>

          <div class="btn-group">
            <button @click="onToggleSetting">Back</button
            ><button type="submit">Change</button>
          </div>
        </form>
      </div>
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
const store = useUserStore();
import { ref } from "vue";
import { useUserStore } from "../composible/pinia";
import { useUpdateAvatar } from "../composible/firebase";
const bio = ref();
const name = ref();
const isDisplaySettings = ref(false);
// const srcImgReader = ref<string | ArrayBuffer>("");
// const reader = new FileReader();
const onToggleSetting = () => {
  bio.value = store.user?.bio;
  name.value = store.user?.name;
  isDisplaySettings.value = !isDisplaySettings.value;
};
const file = ref();
const onLinkAvatar = (e: any) => {
  file.value = e.target.files[0];
};
const onChange = () => {
  if (name.value.length > 2) {
    console.log(file.value);
    isDisplaySettings.value = !isDisplaySettings.value;
    useUpdateAvatar({
      fileName:
        file.value?.name === undefined
          ? store.user?.avatarName
          : file.value.name,
      file: file.value,
      name: name.value,
      bio: bio.value,
    });
  }
};
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
  color: #000;
  background-color: #fff;
  outline: none;
  border-radius: 3px;
}

.update form button {
  cursor: pointer;
  margin: 0.1rem 0;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "Change your avatar";
  display: inline-block;
  background: linear-gradient(to top, #012962, #00303d);
  color: white;
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-weight: 700;
  font-size: 10pt;
  width: 100%;
  transition: all 0.4s ease-in-out;
}
.custom-file-input:hover::before {
  border-color: black;
  transform: scale(1.03);
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
.change-avatar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0 1.5rem 0;
}
.change-avatar input {
  width: 50%;
  padding: 0.4rem 0.5rem;
  background: linear-gradient(to top, #aa01f3, #00b3ff);

}
.change-avatar img {
  width: 50px;
}
.update-name,
.update-bio {
  padding: 0.7rem 1rem;
  font-size: 0.85rem;
}
.update-bio {
  margin: 1.5rem 0 0rem 0;
}
.btn-group {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
}
.btn-group button {
  padding: 0.3rem 0.7rem;
}
.error {
  color: red;
  font-size: 0.7rem;
  margin-left: 0.2rem;
  text-align: start;
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
