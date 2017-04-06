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
      <!-- dropdown label -->
      <div class="dropdown-label">
      <h2>Choose Category</h2>
      <!-- toggle expand icons -->
      <transition name="fade" mode="out-in">
        <i class="material-icons expand-more" v-if="toggleExpand" key="expand-more">expand_more</i>
        <i class="material-icons expand-less" v-else key="expand-less">expand_less</i>
      </transition>
    </div>
      <h3>{{ currentCategory.name }}</h3>
      <ul :class="dropdownClass">
        <li @click="chooseCategory({ name: 'Random', id: 9 })">Random (default)</li>
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
      toggleExpand: true, // toggles expand icons
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
      this.toggleExpand = !this.toggleExpand;
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

.expand-less,
.expand-more,
h2,
li {
    cursor: pointer;
}

h3 {
  color: $color-darkest;
  margin: 0;
}

li {
  margin: .5em 0;
  transition: all .3s ease;
  &:hover {
    color: $color-white;
    //font-size: 1.5em;
    transform: scale(1.5);
  }
}

ul {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

// Selected mode button
.active {
    background-color: $color-med;
    border: 2px solid $color-med;
    color: $color-white;
}

// Close dropdown
.close {
    animation: close 1s ease forwards;
}

.dropdown-label {
    align-items: center;
    display: flex;
    justify-content: center;
}

// Category dropdown expand icon
.expand-less,
.expand-more {
    font-size: 2em;
    padding-top: 10px;
    margin-left: 15px;
    transition: all 0.3s ease;
}

.expand-more {
  color: $color-white;
  &:hover {
    color: $color-darkest;
  }
}

.expand-less {
  color: $color-darkest;
  &:hover {
    color: $color-white;
  }
}

// Open dropdown
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
