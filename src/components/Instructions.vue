<template lang="html">
<div>
  <p>Test your trivial knowledge with 10 questions.
  </br>
    Play against a friend, or challenge yourself.</p>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import ".././main.scss";

div {
  margin: 0 0 1em 0;
}

p {
  font-size: 1.25em;
}

@media (max-width: 600px) {
  div {
    padding: 0 1em;
  }

  p {
    font-size: 1.1em;
  }
}
</style>
