<template>
  <div>
    <v-dialog v-model="tokenDialog" width="80%">
      <v-card>
        <v-card-title class="headline grey lighten-2"
          >Missing LMS Access Token</v-card-title
        >
        <v-card-text class="mt-2" style="font-size: 12pt">
          Enter the access token below for <code>{{ baseURL }}</code
          >. <br />

          <v-text-field
            hide-details
            class="my-4"
            v-model="tokenInput"
            label="Access Token"
            placeholder="Enter token here"
            outlined
          ></v-text-field>

          Token will be saved in <code>~/.config/marker/tokens.json</code>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="tokenClick"> Save Token </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorDialog" width="80%" class="errordialog">
      <v-card>
        <v-card-title class="headline grey lighten-2">{{errorTitle}}</v-card-title>
        <v-card-text class="my-5 mb-0" style="font-size: 12pt">
            <pre style="background-color: #f5f5f5">{{ errorMessage }}</pre>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="errorDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackBar">
      {{ snackMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackBar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import API from "@/lib/marker/API";

export default {
  name: "Errors",
  data: () => ({
    tokenInput: "",
  }),
  computed: {
    tokenDialog: {
      get: function () {
        return this.$store.state.tokenDialog;
      },
      set: function (newValue) {
        this.$store.commit("setTokenDialog", newValue);
      },
    },
    errorDialog: {
      get: function () {
        return this.$store.state.errorDialog;
      },
      set: function (newValue) {
        this.$store.commit("setErrorDialog", newValue);
      },
    },
    snackBar: {
      get: function () {
        return this.$store.state.snackBar;
      },
      set: function (newValue) {
        this.$store.commit("setSnackBar", newValue);
      },
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
    errorTitle() {
      return this.$store.state.errorTitle;
    },
    snackMessage() {
      return this.$store.state.snackMessage;
    },
    baseURL() {
        if (!this.$store.state.markerState.config) return "";
        return this.$store.state.markerState.config.base_url;
    },
  },
  methods: {
    tokenClick() {
      API.saveToken(this.tokenInput).then(() => {
        this.tokenDialog = false;
        this.tokenInput = "";
      });
    },
  },
};
</script>

<style scoped>

.errordialog {
    height: 50%;
    font-size: 10pt;
}

</style>