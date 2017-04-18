<template lang="html">
  <section>
    <!-- Display player turn in multiplayer mode -->
    <div v-if="!mode" class="turnDisplay">
      <h2 v-if="turn === 'playerOne'">Player One</h2>
      <h2 v-if="turn === 'playerTwo'">Player Two</h2>
    </div>
    <app-questions></app-questions>
    <app-score-dots></app-score-dots>
    <app-star-power></app-star-power>
  </section>
</template>

<script>
import Questions from './Questions.vue';
import ScoreDots from './ScoreDots.vue';
import StarPower from './StarPower.vue';
export default {
  components: {
    'app-questions': Questions,
    'app-score-dots': ScoreDots,
    'app-star-power': StarPower,
  },
  computed: {
    mode() {
      return this.$store.getters.mode;
    },
    turn() {
      return this.$store.getters.turn;
    }
  }
}
</script>

<style lang="scss" scoped>@import ".././main.scss";

h2 {
    font-weight: bold;
}

section {
  max-width: 600px;
  position: relative;
}

.turnDisplay {
  background-color: $color-white;
  border-radius: 25px;
  color: $color-darkest;
  margin-bottom: 2em;
  padding: 0.15em;
}

@media (max-width: 600px) {
  h2 {
    margin: 0;
  }

  .turnDisplay {
    border-radius: 0;
    margin: 0;
  }
}
</style>
