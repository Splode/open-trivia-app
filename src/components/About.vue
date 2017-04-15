<template lang="html">
<div>
  <h2>triv·i·a</h2>
  <p><em>noun</em><br>
details, considerations, or pieces of information of little importance or value.</p>
<br>
<p>I love trivia and I thought that you might too.</p>
  <h3>Made by <a href="http://christopherianmurphy.com" class="link-dark">Christopher Murphy</a></h3>
  <p>Powered by the <a href="https://opentdb.com/" class="link-light">Open Trivia Database</a>.</p>
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import ".././main.scss";

div {
  background-color: $color-darkest;
  margin-bottom: 2em;
  //padding-bottom: 2em;
  width: 100%;
  //height: 200px;
}

h2 {
  font-weight: bold;
}

h3 {
  color: $color-med;
  font-weight: bold;
}
p:last-child {
  margin-bottom: 2em;
}
</style>
