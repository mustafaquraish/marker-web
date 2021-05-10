<template>
  <div>
    <SearchBar
      label="Search tests"
      @searchChanged="onSearchChange"
      class="px-4 pt-6"
    />

    <v-divider></v-divider>
    <v-list class="py-0 testlist">
      <v-list-item-group mandatory color="indigo">
        <div v-for="(test, i) in filteredTests" :key="i">
          <TestResultItem
            :test="test"
          />
          <v-divider></v-divider>
        </div>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import TestResultItem from "@/components/Results/TestResultItem.vue";

export default {
  name: "SearchableTests",
  components: {
    SearchBar,
    TestResultItem
  },
  props: {
    tests: Array
  },
  data: () => ({
    searchTerm: "",
  }),
  methods: {
    onSearchChange(val) {
      this.searchTerm = val;
    },    
  },
  computed: {
    filteredTests() {
      return this.tests.filter((test) => {
        let testName = test.description.toLowerCase();
        if (!this.searchTerm.startsWith(':') &&
            !this.searchTerm.startsWith('.'))
          return testName.includes(this.searchTerm.toLowerCase())

        let meta = "";
        meta += (test.passed) ? "passed" : "failed"
        if (test.timed_out) meta += "timed_out"
        return meta.includes(this.searchTerm.slice(1).toLowerCase())        
      })
    }
  },
};
</script>

<style scoped>
.testlist {
  margin-left: 1px;
}
</style>