<template>
  <div class="signup">
    <form class="form" @submit.prevent="onSignup">
      <div class="title">
        <h3>Sign Up!</h3>
      </div>
      <div class="form-group">
        <label for="email">Name</label>
        <input
          placeholder="Enter your name!"
          class="name"
          type="text"
          required
          v-model="name"
        />
        <span class="error" v-if="isErrorName"
          >User's name must have more than 4 character</span
        >
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          placeholder="Enter your email!"
          class="email"
          type="email"
          required
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          placeholder="Enter your password!"
          class="password"
          type="text"
          v-model="password"
          required
        />
      </div>
      <span class="error" v-if="isErrorPassword"
        >User's password must have more than 6 character</span
      >

      <div class="btn-group">
        <button type="submit" class="btn-signup">Sign up</button>
        <router-link to="/welcome"
          ><button class="btn-back">Back</button></router-link
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useCreateUser } from "../composible/firebase";
const router = useRouter();
const password = ref("");
const email = ref("");
const name = ref("");
const isErrorName = ref(false);
const isErrorPassword = ref(false);
const onSignup = () => {
  if (name.value.length > 4 && password.value.length > 6) {
    const user = ref({
      email: email.value,
      name: name.value,
      password: password.value,
    });
    useCreateUser(user.value);

    router.push("/");
  }
  if (password.value.length <= 6) {
    isErrorPassword.value = true;
  }
  if (password.value.length <= 4) {
    isErrorName.value = true;
  }
};
</script>

<style scoped>
.signup {
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
  width: 20rem;
  padding: 0.3rem 0.7rem;
}

.title {
  text-align: center;
}
.btn-group {
  text-align: center;
  margin-top: 1rem;
}
.btn-group .btn-back,
.btn-signup {
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

}.btn-group .btn-signup {
  background-color: rgb(12, 169, 49);

}
.btn-group .btn-back:hover {
  transform: rotate(7deg) scale(1.1);
  background-image: linear-gradient(to right, rgb(249, 9, 25), rgb(178, 10, 10));

}
.btn-group .btn-signup:hover {
  transform: rotate(7deg) scale(1.2);
  background-image: linear-gradient(to right, rgb(34, 216, 18), rgb(37, 167, 7));

}
.error {
  color: red;
  font-size: 0.7rem;
  margin-left: 0.2rem;
  text-align: start;
}
</style>
