<template lang="html">
  <div class="dropdown" @click="toggle = !toggle">
    <h2>Choose Category</h2>
    <ul v-if="toggle">
      <li>Test</li>
      <li>Test</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
    }
  }
}
</script>

<style lang="scss">@import ".././main.scss";

</style>
