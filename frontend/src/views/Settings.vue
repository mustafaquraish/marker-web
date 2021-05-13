<template>
  <div id="inspire" class="root">
    <div class="text-center mt-10" v-if="loading">
        <v-progress-circular
          indeterminate
          color="green"
        />
    </div>

  <div v-if="config" class="pa-10">

    <div class="display-1"> LMS Specific Configurations </div><br>
    <v-form class="py-3">
      <v-select     outlined v-model="config.lms"        label="LMS" :items="lmsOptions" clearable/>
      <v-text-field outlined v-model="config.base_url"   label="Base URL"/>
      <v-text-field outlined v-model="config.course"     label="Course ID"        v-if="config.lms == 'canvas'"/>
      <v-text-field outlined v-model="config.assignment" label="Assignment ID"/>
      <v-text-field outlined v-model="config.default_criteria" label="Default Marking Criteria" v-if="config.lms == 'markus'"/>
      <v-textarea outlined v-model="fileNamesString" color="teal" auto-grow>
        <template v-slot:label>Files to download</template>
      </v-textarea>
    </v-form>

    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <div class="display-1 pt-5"> Compilation </div><br>
    <v-form class="py-3">
      <v-text-field outlined v-model="config.src_dir"  label="Source directory"/>
      <v-textarea outlined v-model="importsString" color="teal" rows="2" auto-grow>
        <template v-slot:label>Files/Dirs to import</template>
      </v-textarea>
      <v-textarea outlined v-model="config.compile" color="teal" rows="2" auto-grow>
        <template v-slot:label>Compile Command</template>
      </v-textarea>
      <v-textarea outlined v-model="config.compile_check" color="teal" rows="2" auto-grow>
        <template v-slot:label>Compile Check Command</template>
      </v-textarea>
      <v-text-field outlined v-model="config.compile_log"  label="Compilation log file"/>
    </v-form>

    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <div class="display-1 pt-5"> General </div><br>
    <v-form class="py-3">
      <v-text-field outlined v-model="config.marksheet"   label="Marksheet"/>
      <v-text-field outlined v-model="config.report"   label="Report file"/>
      <v-select     outlined v-model="config.include_compile_log" label="Include compile log?" :items="[true, false]"/>
      <v-textarea outlined v-model="config.report_header" color="teal" rows="2" auto-grow>
        <template v-slot:label>Report Header</template>
      </v-textarea>
    </v-form>

  </div>
    
  </div>
</template>

<script>
import API from '@/lib/marker/API'

export default {
  components: {
  },
  data: () => ({ 
    loading: true,
    config: null,

    ///////////////////////////////////
    lmsOptions: ['markus', 'canvas'],
    importsString: "",
    fileNamesString: "",
  }),
  beforeMount() {
    API.getConfig().then((res) => {
      this.config = res;
      this.importsString = res.imports.join('\n')
      if (res.file_names)
        this.fileNamesString = res.file_names.join('\n')
      else
        this.fileNamesString = res.file_name
      this.loading = false;
    })
  }
}
</script>

<style scoped>
.v-text-field {
  font-family:monospace;
}
.root {
  margin: auto;
}
</style>