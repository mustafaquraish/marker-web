<template>
  <div 
    class="bg-white root2"
  >
      <SearchBar
        label="Search users"
        @searchChanged="onSearchChange"
        class="search pa-5 pb-0"
      />
    
    <div align="center">
      <div>
        <v-btn class="ma-2" @click="selectAll(true)">
          Select All
        </v-btn>
        <v-btn 
          class="ma-2"
          @click="selectAll(false)"
          :disabled="settings.length == 0"
        >
          Unselect All ({{settings.length}})
        </v-btn>
      </div> 
    </div>

    <div
      class="container infomessage" 
      v-if="this.items.length==0"
    >
      No users found. Try downloading submissions first.
    </div>

    <v-list class="userlist pa-0 my-2" nav>
      <v-list-item-group
        v-model="settings"
        multiple
        class="ma-1"
      >
        <div v-for="(item, i) in items" :key="i" :hidden="isHidden(item, searchTerm)">
          <v-list-item class="px-4 my-0 listitem" :value="i">
            <template v-slot:default="{ active }">
              <v-list-item-avatar>
                <v-avatar color="#90CAF9" dark>
                  {{ iconText(item.username) }}
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.username }}</v-list-item-title>
                <v-list-item-subtitle v-if="item.marks">{{ sum(item.marks) }} / {{ totalMarks }} marks</v-list-item-subtitle>
                <v-list-item-subtitle v-if="!item.marks"> Unmarked</v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer/>
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-icon 
                    class="py-2" 
                    v-on="on" 
                    v-bind="attrs"
                    @click.stop="goToResult(item.username)"
                  >
                      <v-icon color="#90CAF9">mdi-arrow-top-right-thin-circle-outline</v-icon>
                  </v-list-item-icon>
                </template>
                <span>Open Results</span>
              </v-tooltip>
            </template>
          </v-list-item>
          <v-divider/>
        </div>
      </v-list-item-group>
    </v-list>
    
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import { sum, iconText } from "@/lib/utils";
import { isHidden } from '@/lib/search'

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
    settings: [],
  }),

  methods: {
    onSearchChange(username) {
      this.searchTerm = username;
    },
    sum,
    iconText,
    isHidden,
    getSelectedUsernames() {
      let lst = this.settings.reduce((result, index) => {
        let username = this.items[index].username;
        if (!result.includes(username)) {
          result.push(this.items[index].username);
        }
        return result;
      }, []);
      return lst;
    },
    selectAll(bool) {
      if (bool) {
        this.settings = [];
        for (let i = 0; i < this.items.length; i++) {
          if (!isHidden(this.items[i], this.searchTerm)) {
            this.settings.push(i);
          }
        }
      } else {
        this.settings = [];
      }
    },
    goToResult(username) {
      this.$router.push('/results/'+username);
    },
  },
  computed: {
    totalMarks() {
      return this.$store.state.markerState.config.tests.reduce((res, item) => {
        return res + item.mark;
      }, 0)
    }
  },
};
</script>

<style scoped>
.root2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
}

.bg-white {
  background-color: white;
}

.userlist {
  padding-bottom: 50px !important;
  width: 100%;
  text-align: left;
}

.search {
  width: 100%;
}
</style>