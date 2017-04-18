<template lang="html">
  <div>
    <!-- Single player score card -->
    <div class="single" v-if="mode">
      <div class="droplet-container">
        <i
        class="droplet"
        v-for="(drop, i) in quantity"
        :class="scores.playerOne.history[i]"></i>
      </div>
    </div>
    <!-- multiplayer score cards -->
    <div class="multi" v-if="!mode">
      <!-- Player One score -->
      <div class="droplet-container">
        <i
        class="droplet"
        v-for="(drop, i) in quantity"
        :class="scores.playerOne.history[i]"></i>
      </div>
      <!-- Player Two score -->
      <div class="droplet-container">
        <i
        class="droplet"
        v-for="(drop, i) in quantity"
        :class="scores.playerTwo.history[i]"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mode() {
      return this.$store.getters.mode;
    },
    // Quantity of dots, dependent on single player or multiplayer
    quantity() {
      return this.mode ? 10 : 5;
    },
    round() {
      return this.$store.getters.round;
    },
    scores() {
      return this.$store.state.scores;
    },
    turn() {
      return this.$store.getters.turn;
    },
  }
}
</script>

<style lang="scss" scoped>
@import ".././main.scss";

.droplet-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;
}

.droplet {
  background-color: whitesmoke;
  border-radius: 100%;
  margin: 0 5px;
  width: 10px;
  height: 10px;
}

.multi {
  display: flex;
  justify-content: space-around;
}

.single {
  display: flex;
  justify-content: center;
}

.correct {
  background-color: $color-green;
}

.incorrect {
  background-color: $color-red;
}
</style>
