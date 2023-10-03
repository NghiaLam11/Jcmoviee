

<template>
  <div class="welcome">
    <div class="container">
      <div>
        <div class="watch">
          <i class="fas fa-mug-hot icon"></i><span>WATCH</span>
        </div>
        <p class="desc">Enjoy the newest movies</p>
        <router-link to="/signin"><button class="btn">Log in</button></router-link>
        <div class="signup">
          <span class="question">No account?</span
          ><span><router-link to="/signup" class="signup_link">Sign up</router-link></span>
        </div>
      </div>
    </div>
    <div class="blur"></div>
  </div>
</template>

<style scoped>
.welcome {
  background: url(../images//alex-litvin-MAYsdoYpGuk-unsplash.jpg) no-repeat
    center;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.blur {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    rgb(25, 24, 23, 0.8),
    rgb(97, 0, 194, 0.85)
  );
  z-index: 1;
}
.container {
  z-index: 2;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
}
.watch {
  font-weight: bold;
  font-size: 1.8rem;
}
.icon {
  margin: 0 0.5rem;
  animation: shake 3s ease-in-out 2s infinite;
  transition: animation 1s ease-in;
}

@keyframes shake {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  10% {
    transform: translateY(-10px) rotate(20deg);
  }
  20% {
    transform: translateY(-10px) rotate(-20deg);
  }
  30% {
    transform: translateY(0px) rotate(0deg);
  }
  40% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  60% {
    transform: translateY(0px) rotate(0deg);
  }
  70% {
    transform: translateY(0px) rotate(0deg);
  }
  80% {
    transform: translateY(0px) rotate(0deg);
  }
  90% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}
.desc {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.6;
}
.btn {
  outline: none;
  border: none;
  margin: 0.5rem 0;
  padding: 0.4rem 3.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
}

.btn:hover {
  animation: shakeBtn linear 0.5s forwards;
  box-shadow: 1px 1px 5px 0px var(--primary-color);
}
@keyframes shakeBtn {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  30% {
    transform: translateY(-3px) rotate(2deg) scale(1.03);
  }
  60% {
    transform: translateY(-3px) rotate(-2deg) scale(1.06);
  }
  100% {
    transform: translateY(0px) rotate(0deg) scale(1.1);
  }
}
.signup {
  font-size: 0.9rem;
  font-weight: lighter;
}

.signup a {
  color: white;
  transition: all 0.1s linear;
}

.signup a:hover {
  color: var(--primary-color);
}
.signup_link {
  font-weight: bold;
}
</style>
