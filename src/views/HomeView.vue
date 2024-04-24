<template>
  <div class="home"></div>
  <div class="content__box">
    <h1 class="content__title">Sports Car Store:<span> Where Speed Meets</span></h1>
    <p class="content__text">Explore our lineup of the finest sports cars</p>
    <router-link to="signin">
      <button class="btn">Explore</button>
    </router-link>
  </div>

  <img class="image" src="../assets/mersedes.png" alt="Greeen sport car mersedes" />
</template>

<script setup></script>

<style>
.home {
  position: relative;

  height: 100vh;
  display: flex;

  background-color: #090d10;

  clip-path: polygon(0% 20%, 40% 20%, 40% 0%, 100% 50%, 40% 100%, 40% 80%, 0% 80%);
}

.image {
  position: absolute;
  top: 10rem;
  right: 0;
  height: 40rem;
  background-size: cover;
  z-index: 5;
  animation: moveInLeft 1s ease-out;
}
.content__box {
  position: absolute;
  top: 15rem;
  left: 6rem;
}
.content__title,
.content__text {
  color: #fff;
  margin-bottom: 3rem;
  z-index: 10;
}

.content__title {
  font-size: 6rem;
  animation: moveInLeft 1s ease-out;
}
.content__text {
  font-size: 2rem;
  animation: moveInRight 1s ease-out;
}

.content__title span {
  color: red;
  z-index: 10;
}

.btn {
  padding: 2rem 6rem;
  border-radius: 5rem;
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
  background-color: #00cd4f;
  border: none;
  animation: moveInBottom 1s ease-out;
}
.btn:hover {
  background-color: #018e37;
  transform: translateY(1px);
  transition: 0.5s ease-out;
}

@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-10rem);
  }
  80% {
    transform: translate(2rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }
  80% {
    transform: translate(-2rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>
