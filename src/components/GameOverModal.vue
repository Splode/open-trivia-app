<template lang="html">
  <div class="modal">
    <div class="container">
      <div v-if="mode">
        <h1>Game Over!</h1>
        <h2>Score: {{ scores.playerOne }}/10</h2>
      </div>
      <div v-if="!mode">
        <h1 v-if="scores.playerOne > scores.playerTwo">Player One Wins!</h1>
        <h1 v-if="scores.playerTwo > scores.playerOne">Player Two Wins!</h1>
        <h1 v-if="scores.playerOne === scores.playerTwo">Draw!</h1>
      </div>
      <button>New Game</button>
      <button v-if="!mode">Rematch!</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mode() {
      return this.$store.getters.mode;
    },
    scores() {
      return this.$store.state.scores;
    },
  },
}
</script>

<style lang="scss" scoped>@import ".././main.scss";

.container {
  background-color: $color-white;
  border-radius: 25px;
  color: $color-dark;
  margin-top: 4em;
  width: 500px;
  //height: 500px;
}

.modal {
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
</style>
