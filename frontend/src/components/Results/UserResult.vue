/*******************************************************/
    Top-level Results component for a single student
/*******************************************************/

<template>
  <div class="single-results">
    <v-app-bar 
      v-if="username"
    >
      <v-toolbar-title class="flex text-center">
        {{username.toUpperCase()}}
      </v-toolbar-title>
    </v-app-bar>

    <div
      v-if="username"
    >
      <v-row 
        class="ma-5"
        align="center"
        justify="space-around"
      >   
          <v-btn 
            color="#0cc0b4" 
            width="200"
            class="ma-2"
            @click="runTests(false)"
          > 
            Run tests (as is)
          </v-btn>
          <v-btn 
            color="#86fa3d" 
            width="200"
            class="ma-2"
            @click="runTests(true)"
          > 
            Run tests (recompile)
          </v-btn>
          
          <v-btn 
            color="#eaea24" 
            width="200"
            class="ma-2"
            @click="reDownload"
          > 
            <span v-if="!downloading"> Re-Download files </span>
            <v-progress-circular
              indeterminate
              v-if="downloading"
              color="green"
              size="20"
            />
          </v-btn>


          <v-btn 
            color="#8b9ef0" 
            width="200"
            class="ma-2"
            v-if="result && result.path"
            :href="'vscode://file/'+result.path"
            target="_blank"
          > 
            Open in VSCode 
          </v-btn>
      </v-row>
      
    </div>

    <v-divider/>
    
    <div 
      class="text-center mt-10" 
      v-if="username && loading"
    >
      <v-progress-circular
        indeterminate
        color="green"
      />
    </div>

    <div
      class="container infomessage" 
      v-if="result && !result.marked"
    >
      Submission is not marked yet.
    </div>

    <div v-if="result && result.marked && !loading && !result.json">
      <pre>{{result.text}}</pre>
    </div>

    <div v-if="result && result.marked && !loading && result.json">
      <body class="body-1 pa-4">
        Total marks: {{ result.total }}
      </body>

      <v-divider/>

      <v-list-group>
        <template v-slot:activator>
          <v-list-item-icon>
              <v-icon :color="result.compiled ? 'success' : 'error'">
                {{result.compiled ? 'mdi-check' : 'mdi-close'}}
              </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
              <v-list-item-title> 
                Compilation {{ result.compiled ? 'Succeeded' : 'Failed' }} 
              </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          disabled
        >
          <v-list-item-content>
            <div v-if="result.compile_log != ''">
              Compilation Logs:
              <pre>{{result.compile_log}}</pre>
            </div>
            <p v-if="result.compile_log == ''">
              No compilation output was generated.
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      
      <v-divider/>
      <v-divider/>

      <SearchableTests 
        v-if="result.compiled"
        :tests="result.tests"
        class="mb-10"
      />

    </div>
  </div>
</template>

<script>
  import SearchableTests from '@/components/Results/SearchableTests'
  import API from '@/lib/marker/API'

  export default {
    name: "UserResult",
    props: {
      username: String
    },
    components: {
      SearchableTests
    },

    data: () => ({ 
      loading: false,
      result: null,
      downloading: false,
    }),
    beforeMount() {
      this.refreshResults()
    },
    watch: {
      username() {
        this.refreshResults()
      }
    },
    methods: {
      async handleResult(callback) {
        this.loading = true;
        let res = await callback()        
        try {
          this.result = JSON.parse(res.data);
          this.result.json = true;
        } catch (err) {
          this.result = { 'text': res.data };
          this.result.json = false
        }
        this.result.path = res.path;
        this.result.marked = res.marked;
        this.result.message = res.message;
        this.loading = false;
      },
      refreshResults() {
        if (!this.username) return;
        this.result = null;
        this.handleResult(
          ()=>API.getStudentResults(this.username)
        );
      },
      async runTests(recompile) {
        await this.handleResult(
          ()=>API.runTestsSingle(this.username, recompile)
        )
        this.$store.dispatch("showSnackBar", "Finished running tests!")
        this.$emit('updateMarks', this.username, this.result.marks);
      },
      reDownload() {
        this.downloading = true
        API.downloadSingle(this.username, false)
           .then((res) => {
              this.downloading = false
              this.$store.dispatch("showSnackBar", "Finished downloading files!")
           })
           .catch((err) => {
             this.downloading = false
           })
      }
    },
  }
</script>

<style>
pre {
  background-color: rgb(240, 240, 240);
  font-family: 'Monaco', monospace;
  padding: 1em;
  overflow: hidden;
  margin: .5em 0em 0em 0em;
  border-radius: 10px;  
  white-space: pre-wrap;
  word-break: keep-all
}
.singleresults {
  height: auto !important;
  padding-bottom: 0px !important;
}
.appbar {
  box-shadow: 0 0 10px black inset;
}
.infomessage {
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  margin-top: 2em;
}
</style>