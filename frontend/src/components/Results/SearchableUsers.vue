<template>
  <div class="outerc">
    <SearchBar
      label="Search users"
      @searchChanged="onSearchChange"
      class="px-4 pt-7"
    />
    <div
      class="container infomessage" 
      v-if="this.items.length==0"
    >
      No users found. Try downloading submissions first.
      <v-btn 
        class="ma-5 pa-5"
        @click="$router.push('/')"
      >
        <v-icon class="pr-2">
          mdi-arrow-top-left-thick
        </v-icon>
        Go to Dashboard
      </v-btn>
    </div>
    <v-list class="userlist mb-10" nav>
      <v-list-item-group v-model="selectedIndex" color="indigo">
        <div 
          v-for="(item, i) in items" 
          :key="i"
          :hidden="hidden(item)"
        >
          <v-list-item 
            class="ma-0 py-1 px-5"
            @click="clickedItem(item.username)"
          >
            <v-list-item-avatar>
              <v-avatar color="#90CAF9" dark>
                {{ item.username.substring(0, 2).toUpperCase() }}
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{ item.username }} </v-list-item-title>
              <v-list-item-subtitle v-if="item.marks">{{ sum(item.marks) }} marks</v-list-item-subtitle>
              <v-list-item-subtitle v-if="!item.marks"> Unmarked</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />
        </div>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import { sum } from '@/utils'

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  name: "Home",

  props: {
    items: Array,
  },

  components: {
    SearchBar,
    Splitpanes,
    Pane,
  },

  data: () => ({
    searchTerm: "",
    selectedIndex: 0,
  }),
  mounted() {
    if (this.items.length > 0) {
      this.clickedItem(this.items[this.selectedIndex].username)
    }
  },
  methods: {
    onSearchChange(username) {
      this.searchTerm = username;
    },
    clickedItem(username) {
      this.$emit('userClicked', username)
    },
    sum,
    hidden(item) {
      let itemName = item.username.toLowerCase();
      if (!this.searchTerm.startsWith(':') &&
          !this.searchTerm.startsWith('.'))
        return !itemName.includes(this.searchTerm.toLowerCase())

      let meta = "";
      if (!item.marks)  meta += "unmarked"
      else {
        if (item.marks.length === 0) { meta += "failed" }
        if (sum(item.marks) == 0)    { meta +=  "zero"  }
      }
      return !meta.includes(this.searchTerm.slice(1).toLowerCase()) 
    }
  },
};
</script>