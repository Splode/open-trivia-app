<template lang="html">
  <section>
    <app-instructions></app-instructions>
    <app-starter></app-starter>
  </section>
</template>

<script>
import Instructions from './Instructions.vue';
import Starter from './Starter.vue';
export default {
  components: {
    'app-instructions': Instructions,
    'app-starter': Starter,
  }
}
</script>

<style lang="scss">@import ".././main.scss";</style>
