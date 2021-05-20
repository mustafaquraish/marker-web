<template>
<div class="root pa-5">
<v-row>
  <v-col class="split left ma-0 pa-5 pb-0"
    cols=12 sm=6 lg=4
  >
        <v-sheet align="center" class="py-6 controls">
          <v-btn color="#90CAF9" @click="prepareClick"> 
            <v-icon>mdi-qrcode-edit</v-icon>
            <v-spacer/>Prepare Submissions<v-spacer/>
          </v-btn><br>

          <v-btn color="#90CAF9" class="mb-2" @click="runClick(false)" > 
            <v-icon>mdi-code-tags-check</v-icon>
            <v-spacer/>Run tests<v-spacer/>
          </v-btn><br>
          
          <div class="lms-buttons" v-if="config.lms && config.lms.length > 0">
            <v-divider class="my-2"></v-divider>

            <v-btn color="#bbd565" @click="downloadClick"> 
              <v-icon>mdi-download</v-icon>
              <v-spacer/>Download Submissions<v-spacer/>
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
              <v-btn color="#bbd565" @click="setStatusDialog = true"> 
                <v-icon>mdi-list-status</v-icon>
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

  <v-dialog v-model="setStatusDialog" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">Set status</v-card-title>
      <v-card-text class="mt-4" style="font-size: 12pt">
          Please select the status to set            
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" width="40%" text @click="statusClick('complete')">Complete</v-btn>
        <v-spacer/>
        <v-btn color="primary" width="40%" text @click="statusClick('incomplete')">Incomplete</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
    snackbarText: "",
    setStatusDialog: false,
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
    statusClick(status) {
      this.setStatusDialog = false;
      this.runJob(()=>API.setStatusAll(status, this.selectedUsers()));
    },
    async stopJobClick() {
      await API.stopJob()
    },
    async jobDoneHandler(message, type="") {
      this.$store.dispatch('showSnackBar', message);

      if (type == "download" || type == "run") {
        this.loading = true;
        API.getAllResults().then((res) => {
          this.loading = false;
          this.items = res;
        });
      }
    },
    async runJob(func) {
      try {
        await func();
        this.$refs.tracker.refreshProgress();
      } catch (err) {
        // Nothing.
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