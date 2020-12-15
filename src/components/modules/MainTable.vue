<template>
  <div class="overflow-auto results-table">
    <b-table
      v-if="(data.length || loading) && !errorMsg"
      striped
      :fields="fields"
      :items="data"
      :busy="loading"
    >
      <template #cell(url)="cellData">
        <a :href="cellData.item.url">{{ cellData.item.url }}</a>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <div
      v-else
      class="text-danger"
    >
      {{ errorMsg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainTable',
  props: {
    searchTerm: {
      type: String,
      required: false,
      default: null
    },
    darkMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      fields: [{
        key: 'name',
        label: 'Repository Name'
      },
      {
        key: 'url',
        label: 'URL'
      }],
      data: [],
      errorMsg: '',
      loading: false
    };
  },
  watch: {
    searchTerm: {
      immediate: true,
      handler: 'performSearch'
    }
  },
  methods: {
    async performSearch (searchTerm) {
      if (searchTerm === null) return;
      this.errorMsg = '';
      this.loading = true;
      const results = await this.$restActions.getSearchResults(searchTerm);
      if (!results || results.error) {
        this.errorMsg = results.error;
      } else if (results && results.data && results.data.length) {
        this.data = results.data;
      } else {
        this.errorMsg = 'No results have been found.';
      }
      this.loading = false;
    }
  }
};

</script>
