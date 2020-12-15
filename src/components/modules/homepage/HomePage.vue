<template>
  <div
    class="home-page"
    :class="{ 'dark-mode': darkMode }"
  >
    <NavBar @toggleDarkMode="toggleDarkMode" />
    <Search @search="performSearch" />
    <MainTable :search-term="searchTerm" />
  </div>
</template>

<script>
import MainTable from '@/components/modules/MainTable';
import NavBar from '@/components/modules/NavBar';
import Search from '@/components/modules/Search';

export default {
  name: 'HomePage',
  components: {
    NavBar,
    MainTable,
    Search
  },
  data () {
    return {
      searchTerm: null,
      darkMode: false
    };
  },
  methods: {
    performSearch (searchTerm) {
      this.searchTerm = searchTerm;
    },
    toggleDarkMode (darkMode) {
      this.darkMode = darkMode;
    }
  }
};
</script>

<style scoped lang="sass">

</style>
