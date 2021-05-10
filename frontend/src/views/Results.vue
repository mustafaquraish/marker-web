<template>
  <splitpanes vertical class="root">
    <pane size="40%" min-size="30%">
      <div class="text-center mt-10" v-if="loading">
          <v-progress-circular
            indeterminate
            color="green"
          />
      </div>

      <SearchableUsers
        v-if="!loading"
        :items="items"
        @userClicked="onUserClick"
      />
    </pane>

    <pane min-size="30%" v-if="!mobile">
      <UserResult :username="selectedUsername"></UserResult>
    </pane>
  </splitpanes>
</template>

<script>
import SearchableUsers from "@/components/Results/SearchableUsers";
import UserResult from "@/components/Results/UserResult";
import MultiSelectUsers from '@/components/Dash/MultiSelectUsers'

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import API from "@/lib/marker/API";

export default {
  name: "Home",
  props: {
    username: {
      type: String,
      default: ""
    },
  },
  components: {
    SearchableUsers,
    MultiSelectUsers,
    UserResult,
    Splitpanes,
    Pane,
  },

  data: () => ({
    selectedUsername: "",
    loading: true,
    items: [],
    ignoreFirstClick: false,
  }),

  methods: {
    onUserClick(username) {
      if (this.ignoreFirstClick) {
        this.ignoreFirstClick = false;
      } else if (this.mobile) {
        this.$router.push('/result/'+username)
      } else {
        this.selectedUsername = username;
      }
    }
  },
  computed: {
    mobile() {
      return this.$store.state.isMobile;
    }
  },
  beforeMount() {
    API.getAllResults().then((res) => {
      this.loading = false;
      this.items = res;
    });
  },
  mounted() {
    if (this.username && this.mobile) {
      this.$router.replace('/result/' + this.username)
    } else if (this.mobile) {
      this.ignoreFirstClick = true;
    } else if (this.username) {
      this.ignoreFirstClick = true;
      this.selectedUsername = this.username;
    }
  }
};
</script>

<style scoped>
.root {
  outline: 1px solid #e0e0e0;
  margin: 0;
  position: absolute;
}
.splitpanes__pane {
  outline: 1px solid #e0e0e0;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: auto;
}
.splitpanes--vertical > .splitpanes__splitter {
  max-width: 0px;
}
</style>