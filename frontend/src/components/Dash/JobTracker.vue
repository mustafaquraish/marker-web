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
        stream
      >
        <template v-slot:default="{ value }">
          <strong v-if="!job.done">{{ Math.ceil(value) }}%</strong>
          <strong v-if="job.done && !job.killed">Completed</strong>
          <strong v-if="job.killed">Stopped</strong>
        </template>
      </v-progress-linear>

      <v-dialog v-model="dialog" width="70%">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mt-4" dark v-bind="attrs" v-on="on" width="200" light>
            View logs
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            {{ job.name }} (Logs)
          </v-card-title>
          <v-card-text>
              <pre v-if="job.logs">{{job.logs}}</pre>
              <pre v-if="!job.logs">No logs generated for the job.</pre>
          </v-card-text>
        </v-card>
      </v-dialog>

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
      if (this.job && this.job.done) {
        this.onFinish();
      } else {
        setTimeout(() => {
          this.refreshProgress();
        }, this.refreshInterval);
      }
    },
    onFinish() {
      if (this.job.killed) {
        this.$emit("done", "Job was killed");
      } else if (this.job.errors) {
        this.$emit("done", "Job finished with errors");
      } else {
        this.$emit("done", "Job finished");
      }
    },
  },
  computed: {
    jobColor() {
      if (this.job.killed) {
        return "red lighten-4";
      }
      if (this.job.errors) {
        return "orange lighten-4";
      }
      return "green lighten-4";
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