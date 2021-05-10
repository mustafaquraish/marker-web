<template>
  <v-app 
    id="inspire"
    style="overflow: hidden"
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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
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