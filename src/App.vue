<template>
  <!-- starPower hack for proper animation display on style binding -->
<div class="container" :style="starPower">
  <app-game-over-modal v-if="isGameOver"></app-game-over-modal>
  <main>
    <header :class="classHeader">
      <h1>Winsome Trivia</h1>
    </header>

    <transition name="fade" mode="out-in">
      <component :is="currentView"></component>
      <!-- <app-loader></app-loader> -->
    </transition>

  </main>
</div>
</template>

<script>
import GameBoard from './components/GameBoard.vue';
import GameOverModal from './components/GameOverModal.vue';
import Intro from './components/Intro.vue';
import Loader from './components/Loader.vue';
export default {
  components: {
    'app-game-board': GameBoard,
    'app-game-over-modal': GameOverModal,
    'app-intro': Intro,
    'app-loader': Loader,
  },
  computed: {
    currentView() {
      return this.$store.state.currentView;
    },
    isGameOver() {
      return this.$store.state.isGameOver;
    },
    // Expand and contract header when changing game state
    classHeader() {
      let classHeader = {
        grow: this.currentView === 'app-intro',
        small: this.currentView !== 'app-intro',
      }
      return classHeader;
    },
    // HACK: set overflow to hidden on primary page container for correct answer animation.
    // Linked to StarPower.vue and starPower state
    starPower() {
      return this.$store.state.starPower ? 'overflow: hidden' : 'overflow: inherit';
    },
  },
  created() {
    // Fetch categories from open trivia using vue-resource, send to store
    this.$http.get('https://opentdb.com/api_category.php')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.$store.state.categories = data.trivia_categories;
      });
  }
}
</script>

<style lang="scss">@import "main.scss";
body {
    background-color: #4481eb;
    background-image: $back-gradient;
    background-repeat: no-repeat;
    color: $color-white;
    display: flex;
    font-family: 'Quicksand', sans-serif;
    height: 100vh;
    justify-content: center;
    text-align: center;
}

header {
    //background-color: $color-darkest;
    color: $color-white;
    //width: 100%;
}

h1 {
  margin: 0;
}

main {
    align-items: center;
    animation: fade-in 1.5s ease; // defined in main.scss
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
}

.container {
    width: 100%;
}

.grow {
    animation: grow 0.5s ease forwards;
    //background-color: $color-dark;
}

.small {
    animation: squeeze 0.5s ease forwards;
    //background-color: $color-darkest;
}
@keyframes grow {
    from {
        padding: 0.25em 0;
    }
    to {
        padding: 1em;
    }
}
@keyframes squeeze {
    from {
      font-size: 1em;
        padding: 1em;
    }
    to {
        font-size: .75em;
        padding: 0.5em 0;
    }
}
</style>
