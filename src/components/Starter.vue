<template lang="html">
  <section class="flex-center-col">
    <button
    @click="selectMode(true)"
    :class="mode ? 'active' : null"
    >Single Player</button>
    <button id="multi"
    @click="selectMode(false)"
    :class="!mode ? 'active' : null"
    >Multiplayer</button>
    <button @click="startGame">Start</button>

    <!-- Category dropdown selector -->
    <div class="dropdown" @click="dropdownToggle">
      <!-- dropdown label -->
      <div id="categories" class="dropdown-label">
        <h2>Choose Category</h2>
        <!-- toggle expand icons -->
        <transition name="fade" mode="out-in">
          <i class="material-icons expand-more" v-if="toggleExpand" key="expand-more">expand_more</i>
          <i class="material-icons expand-less" v-else key="expand-less">expand_less</i>
        </transition>
      </div>
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
    aboutShow() {
      return this.$store.state.aboutShow;
    },
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
      // Close About menu if open
      if (this.aboutShow) {
        this.$store.commit('aboutToggle');
      }
    },
  },
}
</script>

<style lang="scss" scoped>@import ".././main.scss";
@media (max-width: 600px) {
    section {
        padding: 0 2.5%;
    }
}

.expand-less,
.expand-more,
h2,
li {
    cursor: pointer;
}

h3 {
    color: $color-white;
    margin: 0;
}

li {
    margin: 0.5em 0;
    transition: all 0.3s ease;
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
    background-color: $color-darkest;
    border: 2px solid $color-darkest;
    color: $color-white;
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
    padding-top: 7px;
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

// Close dropdown
.close {
    animation: close 1s ease forwards;
}
#multi {
  display:none;
}
</style>
