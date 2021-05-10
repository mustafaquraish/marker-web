<template>
    <v-text-field
      :label="label"
      filled
      rounded
      dense
      v-model="searchTerm"
      append-icon="mdi-magnify"
      autocomplete="off"
      @keydown.esc="searchTerm = ''"
    >
    </v-text-field>
</template>

<script>
export default {
    name: "SearchBar",
    props: {
        label: String,
    },
    data: () => ({ 
      searchTerm: "",
    }),
    watch: {
        searchTerm: function (val) {
            this.$emit('searchChanged', this.searchTerm);
        },
    }
}
</script>
