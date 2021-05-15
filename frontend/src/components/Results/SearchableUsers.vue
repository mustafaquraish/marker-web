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
                {{ iconText(item.username) }}
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{ item.username }} </v-list-item-title>
              <v-list-item-subtitle v-if="item.marks">{{ sum(item.marks) }} / {{totalMarks}} marks</v-list-item-subtitle>
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
import { sum, iconText } from '@/lib/utils'

export default {
  name: "Home",

  props: {
    items: Array,
  },

  components: {
    SearchBar,
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
  computed: {
    totalMarks() {
      return this.$store.state.markerState.config.tests.reduce((res, item) => {
        return res + item.mark;
      }, 0)
    }
  },
  methods: {
    onSearchChange(username) {
      this.searchTerm = username;
    },
    clickedItem(username) {
      this.$emit('userClicked', username)
    },
    iconText(username) {
      if (username.includes(".")) {
        let parts = username.split(".");
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return username.substring(0, 2).toUpperCase()
    },
    sum,
    iconText,
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