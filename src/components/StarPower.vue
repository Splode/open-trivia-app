<template lang="html">
  <div>
    <i
    v-if="show"
    v-for="star in quantity"
    class="material-icons star">star</i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 10,
    }
  },
  computed: {
    show() {
      return this.$store.state.starPower;
    }
  }
}
</script>

<style lang="scss">@import ".././main.scss";
@import url( 'https://fonts.googleapis.com/icon?family=Material+Icons');

$color-yellow: #FDD835;

// Star mixin for children
// Pass in upper limit for random size (based on em)
// Pass in timing for animation
@mixin star($fontSize, $timing) {
  animation: shoot $timing ease-in-out forwards;
  font-size: random($fontSize) + em;
  position: absolute;
  top: random(10) + vh;
  right: random(10) + vw;
  bottom: random(10) + vh;
  left: random(10) + vw;
  z-index: 1000;
}

// Star element
.star {
  color: #FDD835;
  position: absolute;
  &:nth-child(1) {
    @include star(8, 1.1s);
  }
  &:nth-child(2) {
    @include star(7, 1.3s);
  }
  &:nth-child(3) {
    @include star(6, 1.2s);
  }
  &:nth-child(4) {
    @include star(7, 1.1s);
  }
  &:nth-child(5) {
    @include star(7, 1s);
  }
  &:nth-child(6) {
    @include star(5, 1.1s);
  }
  &:nth-child(7) {
    @include star(8, 1.2s);
  }
  &:nth-child(8) {
    @include star(7, 1.3s);
  }
  &:nth-child(9) {
    @include star(7, 1.4s);
  }
  &:nth-child(10) {
    @include star(6, 1.5s);
  }
}
@keyframes shoot {
  0% {
    transform: rotate(0) translate3d(-90vw, 100vh, 0);
  }
  25% {
    transform: rotate(5deg) translate3d(10vw, 70vh, 0);
  }
  100% {
    transform: rotate(-10deg) translate3d(120vw, 0, 0);
  }
}
</style>
