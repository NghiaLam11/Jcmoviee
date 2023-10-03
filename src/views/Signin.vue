<template>
  <div class="signin">
    <form class="form" @submit.prevent="onSignin">
      <div class="title">
        <h3>Sign In!</h3>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          placeholder="Enter your email!"
          class="email"
          type="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          placeholder="Enter your password!"
          class="password"
          type="password"
          v-model="password"
          required
        />
      </div>
      <div class="btn-group">
        <button type="submit" class="btn-signin">Sign in</button>
        <router-link to="/welcome"
          ><button class="btn-back">Back</button></router-link
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useLogInUser } from "../composible/firebase";
import { useRouter } from "vue-router";
// import { useUserStore } from "../composible/pinia";
const password = ref("");
const email = ref("");
const router = useRouter();

const onSignin = () => {
  const user = ref({
    email: email.value,
    password: password.value,
  });
  useLogInUser(user.value);
  router.push("/");
};
</script>

<style scoped>
.signin {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  background-color: var(--dark-bg);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group input {
  font-size: 0.9rem;
  padding: 0.3rem 0.7rem;
  width: 20rem;
}

.title {
  text-align: center;
}
.btn-group {
  text-align: center;
  margin-top: 1rem;
}
.btn-group .btn-back,
.btn-signin {
  margin: 0 0.5rem;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 0.9rem;
  color: white;
  border: none;
}
.btn-group .btn-back {
  background-color: rgb(220, 9, 24);

}.btn-group .btn-signin {
  background-color: rgb(12, 169, 49);

}
.btn-group .btn-back:hover {
  transform: rotate(7deg) scale(1.1);
  background-image: linear-gradient(to right, rgb(249, 9, 25), rgb(178, 10, 10));

}
.btn-group .btn-signin:hover {
  transform: rotate(7deg) scale(1.2);
  background-image: linear-gradient(to right, rgb(34, 216, 18), rgb(37, 167, 7));

}
</style>
