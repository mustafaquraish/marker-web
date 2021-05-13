<template>
<div class="root pa-5">
<v-row>
  <v-col class="split left ma-0 pa-5 pb-0"
    cols=12 sm=6 lg=4
  >
        <v-sheet align="center" class="py-6 controls">
          <v-btn color="#34c0f3" @click="prepareClick"> 
            <v-icon>mdi-qrcode-edit</v-icon>
            <v-spacer/>Prepare Submissions<v-spacer/>
          </v-btn><br>

          <v-btn color="#34c0f3" class="mb-2" @click="runClick(false)" > 
            <v-icon>mdi-code-tags-check</v-icon>
            <v-spacer/>Run tests<v-spacer/>
          </v-btn><br>
          
          <div class="lms-buttons" v-if="config.lms && config.lms.length > 0">
            <v-divider class="my-2"></v-divider>

            <v-btn color="#bbd565" @click="downloadClick"> 
              <v-icon>mdi-download</v-icon>
              <v-spacer/>Download files<v-spacer/>
            </v-btn><br>

            <v-btn color="#bbd565" @click="uploadMarksClick"> 
              <v-icon>mdi-counter</v-icon>
              <v-spacer/>Upload Marks<v-spacer/>
            </v-btn><br>

            <v-btn color="#bbd565" @click="uploadReportsClick"> 
              <v-icon>mdi-file-upload</v-icon>
              <v-spacer/>Upload Reports<v-spacer/>
            </v-btn><br>
          
            <div v-if="config.lms == 'markus'">
              <v-btn color="#bbd565"> 
                <v-icon>mdi-file-upload</v-icon>
                <v-spacer/>Set Status<v-spacer/>
              </v-btn><br>
            </div>
          </div>

          <v-divider class="my-2"/>

          <v-btn class="error" @click="stopJobClick"> 
            <v-icon>mdi-close</v-icon>
            <v-spacer/>Stop Current Job<v-spacer/>
            <v-icon>mdi-close</v-icon>
          </v-btn><br>

        </v-sheet>
        <JobTracker
          ref="tracker"
          @done="jobDoneHandler"
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
        size="50"
        style="padding-top: 40%"
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
import API from "@/lib/marker/API"

export default {
  components: {
    MultiSelectUsers,
    JobTracker
  },
  computed: {
    config() {
      return this.$store.state.markerState.config;
    }
  },
  data: () => ({
    loading: true,
    items: null,
    job: null,
    snackbar: false,
    snackbarText: ""
  }),
  methods: {
    selectedUsers() {
      return this.$refs.userSelector.getSelectedUsernames();
    },
    downloadClick() {
      this.runJob(()=>API.downloadAll(this.selectedUsers()));
    },
    prepareClick(recompile) {
      this.runJob(()=>API.prepareAll(this.selectedUsers()));
    },
    runClick(recompile) {
      this.runJob(()=>API.runTestsAll(this.selectedUsers(), recompile));
    },
    uploadMarksClick(recompile) {
      this.runJob(()=>API.uploadMarksAll(this.selectedUsers()));
    },
    uploadReportsClick(recompile) {
      this.runJob(()=>API.uploadReportsAll(this.selectedUsers()));
    },
    async stopJobClick() {
      try {
        await API.stopJob()
      } catch (e) {
        console.log("Error stopping", e);
      }
    },
    async jobDoneHandler(message, type="") {
      // console.log(message);
      let timeout = 0
      if (this.snackbar) {
        this.snackbar = false;
        timeout = 100;
      }
      if (type == "download" || type == "run") {
        this.loading = true;
        API.getAllResults().then((res) => {
          this.loading = false;
          this.items = res;
        });
      }

      setTimeout(() => {
        this.snackbarText = message;
        this.snackbar = true;
      }, timeout)
    },
    async runJob(func) {
      try {
        await func();
        this.$refs.tracker.refreshProgress();
      } catch (err) {
        this.jobDoneHandler("Another job is currently running.")
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