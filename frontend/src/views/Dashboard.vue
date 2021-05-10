<template>
<div class="root pa-5">
<v-row>
  <v-col
    cols=12
    sm=6
    lg=4
    class="split left ma-0 pa-5 pb-0"
  >
        <v-sheet 
          align="center"
          class="py-6 controls"
        >
            <v-btn 
              color="#bbd565" 
              @click="downloadClick"
            > 
              <v-icon>mdi-download</v-icon>
              <v-spacer></v-spacer>
              Download files
              <v-spacer></v-spacer>
            </v-btn><br>

            <v-btn 
              color="#0cc0b4" 
              @click="prepareClick"
            > 
              <v-icon>mdi-qrcode-edit</v-icon>
              <v-spacer></v-spacer>
              Prepare Submissions
              <v-spacer></v-spacer>
            </v-btn><br>

            <v-btn 
              color="#0cc0b4" 
              @click="runClick(false)"
            > 
              <v-icon>mdi-code-tags-check</v-icon>
              <v-spacer></v-spacer>
              Run tests
              <v-spacer></v-spacer>
            </v-btn><br>

            <v-btn 
              color="#bbd565" 
              @click="uploadMarksClick"
            > 
              <v-icon>mdi-counter</v-icon>
              <v-spacer></v-spacer>
              Upload Marks
              <v-spacer></v-spacer>
            </v-btn><br>

            <v-btn 
              color="#bbd565" 
              @click="uploadReportsClick"
              class="mb-5"
            > 
              <v-icon>mdi-file-upload</v-icon>
              <v-spacer></v-spacer>
              Upload Reports
              <v-spacer></v-spacer>
            </v-btn><br>

            <v-divider/>

            <v-btn 
              class="error mt-5"
              @click="stopJobClick"
            > 
              <v-icon>mdi-close</v-icon>
              <v-spacer></v-spacer>
              Stop Current Job
              <v-spacer></v-spacer>
              <v-icon>mdi-close</v-icon>
            </v-btn><br>

        </v-sheet>
        <JobTracker
          ref="tracker"
          @done="showMessage"
          :refreshInterval="500"
        />
  </v-col>
  <v-col
    cols=12
    sm=6
    lg=8
    class="split right pa-5"
  >

      <v-progress-circular
        v-if="loading"
        indeterminate
        color="green"
        class="ma-10"
      />
        <v-sheet 
          v-if="!loading"
          rounded="lg" 
          align="center"
          class="pa-1 controls mb-0"
        >
          <MultiSelectUsers
            ref="userSelector"
            :items="items"
            class="controls"
          />
        </v-sheet>
  </v-col>
</v-row>

<v-snackbar
  v-model="snackbar"
>
  {{snackbarText}}

  <template v-slot:action="{ attrs }">
    <v-btn
      color="pink"
      text
      v-bind="attrs"
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </template>
</v-snackbar>

</div>
</template>

<script>
import MultiSelectUsers from '@/components/Dash/MultiSelectUsers'
import JobTracker from '@/components/Dash/JobTracker'
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import API from "@/lib/marker/API"
import { sleep } from "@/utils"

export default {
  components: {
    MultiSelectUsers,
    Splitpanes, Pane,
    JobTracker
  },
  data: () => ({
    loading: true,
    items: null,
    job: null,
    snackbar: false,
    snackbarText: ""
  }),
  methods: {
    getSelectedUsernames() {
      return this.$refs.userSelector.getSelectedUsernames();
    },
    downloadClick() {
      let usernames = this.getSelectedUsernames()
      // console.log(usernames);
      this.runJob(
        ()=>API.downloadAll(usernames)
      );
    },
    prepareClick(recompile) {
      let usernames = this.getSelectedUsernames()
      this.runJob(
        ()=>API.prepareAll(usernames)
      );
    },
    runClick(recompile) {
      let usernames = this.getSelectedUsernames()
      this.runJob(
        ()=>API.runTestsAll(usernames, recompile)
      );
    },
    uploadMarksClick(recompile) {
      let usernames = this.getSelectedUsernames()
      this.runJob(
        ()=>API.uploadMarksAll(usernames)
      );
    },
    uploadReportsClick(recompile) {
      let usernames = this.getSelectedUsernames()
      this.runJob(
        ()=>API.uploadReportsAll(usernames)
      );
    },
    stopJobClick() {
      API.stopJob()
        .then((res) => {
          // No need to handle response here
        }).catch((err) => {
          console.log("OH NO COULDN'T KILL")
        })
    },
    async showMessage(message) {
      // console.log(message);
      let timeout = 0
      if (this.snackbar) {
        this.snackbar = false;
        timeout = 100;
      }
      setTimeout(() => {
        this.snackbarText = message;
        this.snackbar = true;
      }, timeout)
    },
    async runJob(func) {
      try {
        // console.log("Running job...")
        await func();
        this.$refs.tracker.refreshProgress();
      } catch (err) {
        this.showMessage("Another job is currently running.")
      }
    }
  },
  beforeMount() {
    API.getAllResults().then((res) => {
      this.loading = false;
      this.items = res;
    });
  },
}
</script>

<style scoped>
.root {
  width: 100%;
  background-color: #e0e0e0;
  height: 100%;
}
.controls {
  justify-content: center;
  align-items: center;
  width: 90%;
}
.split {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.controls {
  border-radius: 10px;
  width: 100%;
}

.v-btn {
  width: 90%;
  max-width: 300px;
  margin: 0.5em;
}
</style>