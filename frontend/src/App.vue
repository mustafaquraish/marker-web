<template>
<div>
  <v-app v-if="!markerState.loaded">
    <div class="waiting-app">
      <v-progress-circular indeterminate class="ma-5" color="green"/>
      Connecting to the server...
    </div>
  </v-app>
  <v-app v-if="markerState.error">
    <div class="waiting-app">
      There appears to be some issues connecting to the server. Please have a look at the output logs and get in touch if you are not able to resolve the issue.
    </div>
  </v-app>
  <v-app 
    id="inspire"
    style="overflow: hidden"
    v-if="markerState.loaded && !markerState.error"
  >
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Marker
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
        v-if="markerState.valid"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>
      </v-list>
      <v-list dense nav>
        <v-list-item
          v-for="item in items2"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app
      fixed
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Marker</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view v-if="!markerState.loading"></router-view>
    </v-main>
    <Errors></Errors>
  </v-app>
</div>  
</template>

<script>
import FileExplorer from '@/views/FileExplorer.vue'
import Errors from '@/components/Errors.vue'

export default {
  components: {
    FileExplorer,
    Errors,
  },
  data: () => ({ 
    drawer: null,
    items: [
      { title: 'Dashboard ', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'Results', icon: 'mdi-list-status', to: '/results' },
      { title: 'Stats', icon: 'mdi-chart-bar-stacked', to: '/stats' },
      { title: 'Settings ', icon: 'mdi-help-box', to: '/settings' },
    ],
    items2: [
      { title: 'Change Directory ', icon: 'mdi-folder-outline', to: '/explorer' },
    ],
    right: null,
  }),
  computed: {
    markerState() {
      return this.$store.state.markerState;
    }
  },
  created(){
    addEventListener('resize', () => {
      this.$store.commit('updateMobile')
    })
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Marker',
    // all titles will be injected into this template
    titleTemplate: '%s | Marker'
  }
}
</script>

<style scoped>
.waiting-app {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 25%;
  text-align: center;
  font-size: 14pt;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>