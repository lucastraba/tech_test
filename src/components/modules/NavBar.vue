<template>
  <div
    class="navigation-bar"
    :class="{'dark-mode': darkMode}"
  >
    <b-navbar
      type="dark"
      variant="dark"
    >
      <b-navbar-brand href="#">
        GitHub Search by Azertium
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand
          right
          class="smaller-font"
        >
          Toggle Dark Mode <span
            class="regular-font"
            @click="toggleDarkMode"
          >
            <b-icon-toggle-off v-if="!darkMode" />
            <b-icon-toggle-on v-else />
          </span>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      darkMode: false
    };
  },
  methods: {
    toggleDarkMode () {
      this.darkMode = !this.darkMode;
      this.$emit('toggleDarkMode', this.darkMode);
    }
  }
};
</script>
