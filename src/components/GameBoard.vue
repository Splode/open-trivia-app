<template lang="html">
  <section>
    <app-questions></app-questions>
    <app-score></app-score>
    <app-star-power></app-star-power>
  </section>
</template>

<script>
import Questions from './Questions.vue';
import Score from './Score.vue';
import StarPower from './StarPower.vue';
export default {
  components: {
    'app-questions': Questions,
    'app-score': Score,
    'app-star-power': StarPower,
  }
}
</script>

<style lang="scss" scoped>@import ".././main.scss";

h2 {
    color: $color-white;
}

section {
  max-width: 600px;
  position: relative;
}
</style>
