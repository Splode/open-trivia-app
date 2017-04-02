<template lang="html">
  <section>
    <button
    @click="selectMode(true)"
    :class="mode ? 'active' : null"
    >Single Player</button>
    <button
    @click="selectMode(false)"
    :class="!mode ? 'active' : null"
    >Multiplayer</button>
    <div>
      <button @click="startGame">Start</button>
    </div>
    <!-- Category dropdown selector -->
    <div class="dropdown" @click="dropdownToggle">
      <h2>Choose Category</h2>
      <h3>{{ currentCategory.name }}</h3>
      <ul :class="dropdownClass">
        <li>Random (default)</li>
        <li v-for="category in categories" @click="chooseCategory(category)">{{ category.name }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dropdownClass: {
        close: false,
        open: false,
      },
    }
  },
  computed: {
    categories() {
      // Return categories from state
      return this.$store.state.categories;
    },
    currentCategory() {
      return this.$store.state.currentCategory;
    },
    mode() {
      // Return mode from state. Used to determine selected button style.
      return this.$store.state.solo;
    }
  },
  methods: {
    // Send category data to store, set selected category
    chooseCategory(category) {
      this.$store.commit('setCurrentCategory', category);
    },
    // Toggle animation/display classes for category list
    dropdownToggle() {
      if (this.dropdownClass.open) {
        this.dropdownClass.open = false;
        this.dropdownClass.close = true;
      } else {
        this.dropdownClass.open = true;
        this.dropdownClass.close = false;
      }
    },
    // Call selectMode mutation
    selectMode(mode) {
      this.$store.commit('selectMode', mode);
    },
    startGame() {
      this.$store.dispatch('startGame');
    },
  },
}
</script>

<style lang="scss" scoped>@import ".././main.scss";

h2 {
    cursor: pointer;
}

ul {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

li {
    cursor: pointer;
}

.active {
    text-decoration: underline;
}

.close {
    animation: close 1s ease forwards;
}

.open {
    animation: open 1s ease forwards;
}
@keyframes open {
    from {
        max-height: 0;
        opacity: 0;
    }
    to {
        max-height: 1000px;
        opacity: 1;
    }
}
@keyframes close {
    from {
        max-height: 1000px;
        opacity: 1;
    }
    to {
        max-height: 0;
        opacity: 0;
    }
}
</style>
