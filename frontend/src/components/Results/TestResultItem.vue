<template>
  <v-list-group>
      <template v-slot:activator>
          <v-list-item-icon class="py-2">
              <v-icon :color="testColour">{{testIcon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="py-2">
              <v-list-item-title> {{ test.description }} </v-list-item-title>
              <v-list-item-subtitle> {{ test.mark }} / {{test.out_of}} marks</v-list-item-subtitle>
              

          </v-list-item-content>
      </template>

      <div
        class="pa-3"
        style="color: black; background-color: #f5f5f5"
      >
        <div>
          <div class="body-1">
            <li>Exit Code: {{test.exit_code}} <span v-if="test.exit_code == null">None (test timed out)</span></li>
            <li>Time taken: {{Math.round(test.time * 100) / 100}}s</li>
            <div v-if="test.output != ''">
              <li>Output: </li>
              <pre>{{test.output}}</pre>
            </div>
          </div>
          
        </div>
      </div>
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