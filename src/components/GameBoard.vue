<template lang="html">
  <section>
    <app-questions></app-questions>
    <app-score></app-score>
  </section>
</template>

<script>
import Questions from './Questions.vue';
import Score from './Score.vue';
export default {
  components: {
    'app-questions': Questions,
    'app-score': Score,
  }
}
</script>

<style lang="scss" scoped>@import ".././main.scss";
h2 {
    color: $color-white;
}
</style>
