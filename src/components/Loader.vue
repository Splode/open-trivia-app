<template lang="html">
  <div class="wrapper">
    <div class="droplet-container">
      <i class="droplet" v-for="drop in quantity"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 10,
    }
  },
}
</script>

<style lang="scss" scoped>
@import ".././main.scss";

@mixin drop($delay) {
  animation: drop-in 1s ease infinite;
  animation-delay: $delay;
}

.droplet-container {
  display: flex;
  flex-direction: row;
  //position: relative;
}

.droplet {
  background-color: whitesmoke;
  border-radius: 100%;
  margin: 0 5px;
  width: 10px;
  height: 10px;

  &:nth-child(1) {
    @include drop(.1s);
  }

  &:nth-child(2) {
    @include drop(.2s);
  }

  &:nth-child(3) {
    @include drop(.3s);
  }

  &:nth-child(4) {
    @include drop(.4s);
  }

  &:nth-child(5) {
    @include drop(.5s);
  }

  &:nth-child(6) {
    @include drop(.6s);
  }

  &:nth-child(7) {
    @include drop(.7s);
  }

  &:nth-child(8) {
    @include drop(.8s);
  }

  &:nth-child(9) {
    @include drop(.9s);
  }

  &:nth-child(10) {
    @include drop(1s);
  }
}

.wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

@keyframes drop-in {
  0% {
    transform: translatey(0);
  }
  33% {
    transform: translatey(30px);
  }
  66% {
    opacity: 1;
    transform: translatey(30px);
  }
  100% {
    transform: translatey(0);
  }
}
</style>
