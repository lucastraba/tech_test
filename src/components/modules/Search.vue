<template>
  <div class="search-input">
    <b-form-input
      v-model="searchTerm"
      placeholder="Search GitHub..."
      @keyup.enter="search"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      searchTerm: ''
    };
  },
  methods: {
    search () {
      this.$emit('search', this.searchTerm);
    }
  }
};
</script>
