<template>
  <v-list-group>
      <template v-slot:activator>
          <v-list-item-icon class="py-2">
              <v-icon :color="testColour">{{testIcon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="py-2">
              <v-list-item-title> {{ test.description }} </v-list-item-title>
              <v-list-item-subtitle>
              {{ test.mark }} marks</v-list-item-subtitle
              >
          </v-list-item-content>
      </template>

      <v-list-item
        disabled
      >
        <v-list-item-content>
          <div class="body-1">
            <p>
              Exit Code: {{test.exit_code}}
              <span v-if="test.exit_code == null">None (test timed out)</span>
            </p>
            <div v-if="test.output != ''">
              Output:
              <pre>{{test.output}}</pre>
            </div>
          </div>
          
        </v-list-item-content>
      </v-list-item>
  </v-list-group>
</template>

<script>
  export default {
    name: "TestResultItem",
    props: {
      test: Object
    },
    computed: {
      testIcon() {
        return (this.test.passed)    ? "mdi-check"             :
               (this.test.timed_out) ? "mdi-timer-off-outline" :
                                       "mdi-close";
      },
      testColour() {
        return (this.test.passed)    ? "success" :
               (this.test.timed_out) ? "blue"    :
                                       "error";
      },
    }
  }
</script>