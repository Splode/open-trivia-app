<template lang="html">
<div>
  <h3>Player One: {{ scores.playerOne }}</h3>
  <h3 v-if="!mode">Player Two: {{ scores.playerTwo }}</h3>
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
    }
  }
}
</script>

<style lang="scss">
@import ".././main.scss";
</style>
