<template lang="html">
  <div>
    <h3 v-if="mode">Score: {{ scores.playerOne }}/10</h3>
    <div v-if="!mode">
      <h2 v-if="turn === 'playerOne'">Player One Turn</h2>
      <h2 v-if="turn === 'playerTwo'">Player Two Turn</h2>
      <h3>Player One: {{ scores.playerOne }}</h3>
      <h3>Player Two: {{ scores.playerTwo }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mode() {
      return this.$store.getters.mode;
    },
    round() {
      return this.$store.getters.round;
    },
    scores() {
      return this.$store.state.scores;
    },
    turn() {
      return this.$store.getters.turn;
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././main.scss";

div {
  background-color: $color-white;
  border-radius: 25px;
  padding: 1em 0;
  color: #03A9F4;
}

h3 {
  color: $color-darkest;
  font-weight: bold;
}
</style>
