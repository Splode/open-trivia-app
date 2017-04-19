<template lang="html">
  <div class="wrapper flex-center-col">
    <div class="droplet-container">
      <i class="droplet" v-for="drop in quantity"></i>
    </div>
    <div class="message">
      <transition name="fade">
        <h2 v-if="show">{{ message[counter] }}</h2>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: -1,
      quantity: 10,
      message: ["Doin' the worm", "Fetchin' your trivia", 'Massaging brain tissue'],
      show: false,
    }
  },
  methods: {
    delayIncrement() {
      const vm = this;
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          if (vm.counter >= vm.message.length) {
            vm.counter = -1;
          }
          vm.incrementCounter(vm.counter);
          console.log(vm.counter);
          resolve()
        }, 2000);
      });
    },
    delayToggle() {
      const vm = this;
      return new Promise(function(resolve, reject) {
        vm.show = vm.toggle(vm.show);
        resolve();
      });
    },
    incrementCounter(counter) {
      return counter += 1;
    },
    loopMessage() {
      setTimeout(() => {
        if (this.counter >= this.message.length-1) {
          this.counter = -1;
        }
        this.counter += 1;
      }, 500)
      setTimeout(() => {
        this.show = true;
      }, 1500)
      setTimeout(() => {
        this.show = false;
      }, 5000)
    },
    toggle(value) {
      return value = !value;
    }
  },
  created() {
    // TODO: refactor initial timing
    this.loopMessage();
    // TODO: refactor loops
    setInterval(() => {
      this.loopMessage();
    }, 5000)

  }
}
</script>

<style lang="scss" scoped>@import ".././main.scss";
@media (max-width: 600px) {}
@mixin drop($delay) {
  animation: drop-in 1s ease infinite;
  animation-delay: $delay;
}

.message {
  height: 3em;
}

.droplet-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 6em;
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
  height: 80vh; // NOTE: iOS browsers require explicit height
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
