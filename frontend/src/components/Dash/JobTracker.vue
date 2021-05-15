<template>
  <v-sheet align="center" class="pa-6 controls mt-5 mb-0" v-if="job">
    <div class="rounded-card progcard ma-1" color="#e0e0e0">
      <div class="headline text-center">
        {{ job.name }}
      </div>
      <v-progress-linear
        :value="percentDone"
        :color="jobColor"
        class="mt-5"
        height="25"
        :indeterminate="percentDone===0 && !job.done"
      >
        <template v-slot:default="{ value }">
          <strong v-if="!job.done && percentDone > 0">{{ Math.ceil(value) }}%</strong>
          <strong v-if="job.done && !job.killed">Completed</strong>
          <strong v-if="job.killed">Stopped</strong>
        </template>
      </v-progress-linear>

      <v-btn class="mt-4" dark @click="showDialog" width="200" light>
        View logs
      </v-btn>

    </div>
  </v-sheet>
</template>

<script>
import API from "@/lib/marker/API";
export default {
  name: "JobTracker",
  props: {
    refreshInterval: {
      type: Number,
      default: 500,
    },
  },
  data: () => ({
    job: null,
    dialog: false,
  }),
  methods: {
    async refreshProgress() {
      this.job = await API.getJob();
      this.$store.commit('setErrorMessage', this.logsText)
      if (this.job && this.job.done) {
        this.onFinish();
      } else {
        setTimeout(() => {
          this.refreshProgress();
        }, this.refreshInterval);
      }
    },
    showDialog() {
      this.$store.dispatch("showErrorDialog", {
        message: this.logsText, 
        title: this.job.name + " (Logs)"
      })
    },
    onFinish() {
      if (this.job.killed) {
        this.$emit("done", "Job was Stopped", this.job.type);
      } else if (this.job.errors) {
        this.$emit("done", "Job finished with errors", this.job.type);
      } else {
        this.$emit("done", "Job finished", this.job.type);
      }
      if (this.job.errors) {
        this.showDialog()
      }
    },
  },
  computed: {
    logsText() {
      if (!this.job || !this.job.logs) {
        return "No logs generated for the job."
      }
      return this.job.logs;
    },
    jobColor() {
      if (this.job.killed) {
        return "red lighten-4";
      } else if (this.job.errors) {
        return "orange lighten-4";
      } else {
        return "#bbd565";
      }
    },
    percentDone() {
      if (this.job.total == 0) {
        return 0;
      }
      return (100 * this.job.progress) / this.job.total;
    },
  },
};
</script>

<style scoped>
.progcard {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center
}
.v-list-item__title {
    font-size: 30pt;
    word-wrap: break;
}
</style>