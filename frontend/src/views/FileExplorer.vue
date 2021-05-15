<template>
  <div class="root ma-0 pa-0 mr-0">
    
    <div class="subcontainer">
      <v-subheader class="title mb-2">
        Select assignment directory
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mx-5">mdi-information-outline </v-icon>
          </template>
          <span>Should contain a valid config file</span>
        </v-tooltip>
      </v-subheader>
      <div style="display: flex; flex-direction: row;">
        <span class="px-4">Current directory:</span><code>{{shortDirName}}</code>
      </div>

      <div class="dirControls my-2 mx-3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="getHome" v-bind="attrs" v-on="on"> mdi-folder-home </v-icon>
          </template>
          <span>Home Directory</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="getParent" v-bind="attrs" v-on="on"> mdi-folder-upload </v-icon>
          </template>
          <span>Parent Directory</span>
        </v-tooltip>
      
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="teal" @click="clickFav" v-on="on" v-bind="attrs">
              {{isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
            </v-icon>
          </template>
          <span v-if="isFavorite">Remove Favorite</span>
          <span v-if="!isFavorite">Add Favorite</span>
        </v-tooltip>
      

        
        <v-spacer></v-spacer>

        <v-checkbox class="ma-0" label="Show Hidden Files" v-model="hidden"/>
      </div>

    <div class="innerc">  
    <FileList :values="values" class="split left" @folderClicked="clickedItem"/>
    <FavoritesList 
      :values="favorites" 
      @folderClicked="selectedFav" 
      @removeFav="removeFav" 
      class="split right"
    />
    </div>
    

    <div style="width: 100%; display: flex; justify-content: center;">
      <v-btn @click="selectClick" class="mt-3" width="250px" >
        <v-progress-circular v-if="selectLoading" size="20" indeterminate color="green"/>
        <span v-if="!selectLoading">Select this directory...</span>
      </v-btn>
    </div>

    <v-dialog width="500" v-model="dialog">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Invalid Directory
        </v-card-title>

        <v-card-text class="mt-5">
          The directory you selected (<code>{{directory}}</code>) does not contain a valid configuration file. Please select a valid directory to see results, or make sure that the configuration file is a valid YAML file.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = !dialog" dense id="closeDialog">
            <span>Close</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    </div>
  </div>
</template>

<script>
import explorerAPI from '@/lib/explorer/API'
import markerAPI from '@/lib/marker/API'
import FileList from '@/components/Explorer/FileList'
import FavoritesList from '@/components/Explorer/FavoritesList'

export default {
  components: {
    FavoritesList,
    FileList
  },
  data: () => ({
    values: [],
    directory: "",
    hidden: false,
    dialog: false,
    selectLoading: false,
    favorites: [],
    fav: false,
  }),
  beforeMount () {
    let path = this.$store.state.markerState.path;
    explorerAPI.getPath(path).then((res) => {
      this.directory = res.path
      this.values = res.entries;
    })
    this.doRequestFav(()=>explorerAPI.getFavorites())
  },
  computed: {
    shortDirName () {
      let maxnamelength = 60;
      if (this.directory.length > maxnamelength) {
        return "..." + this.directory.substring(this.directory.length - maxnamelength)
      }
      return this.directory
    },
    isFavorite() {
      return this.favorites.reduce((res, item) => (
        (res || item.path == this.directory)
      ), false);
    }
  },
  watch: {
    hidden() {
      this.doRequestPath(()=>explorerAPI.getPath(this.directory, this.hidden))
    },
  },
  methods: {
    doRequestPath(func) {
      func().then((res) => {
        this.directory = res.path
        this.values = res.entries;
      })
    },
    doRequestFav(func) {
      func().then((res) => {
        this.favorites = res
      })
    },
    clickedItem(item) {
      if (item.dir) {
        this.doRequestPath(()=>explorerAPI.getPath(item.path, this.hidden))
      }
    }, 
    getParent() {
      this.doRequestPath(()=>explorerAPI.getParent(this.directory, this.hidden))
    },
    getHome() {
      this.doRequestPath(()=>explorerAPI.getHome(this.hidden))
    },
    clickFav() {
      if (this.isFavorite) {
        this.doRequestFav(()=>explorerAPI.delFavorite(this.directory))
      } else {
        this.doRequestFav(()=>explorerAPI.addFavorite(this.directory))
      }
    },
    removeFav(item) {
      this.doRequestFav(()=>explorerAPI.delFavorite(item.path))
    },
    selectedFav(item) {
      this.doRequestPath(()=>explorerAPI.getPath(item.path, this.hidden))
    },
    async selectClick() {
      this.selectLoading = true;
      let success = false;
      try {
        await markerAPI.setMarkerPath(this.directory);
        success = true;
      } catch (err) {
        this.dialog = true;
      } finally {
        await this.$store.dispatch('fetchMarkerState',
          () => markerAPI.getMarkerState()
        );
        this.selectLoading = false;
      }
      if (success) this.$router.push("/");
    }
      
  }
}
</script>

<style lang="scss" scoped>

.root {
  width:100%;
  height:100%;
  background-color: white;
  display:flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.subcontainer {
  position: absolute;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: #e0e0e0;
  border-radius: 10px;
}

.innerc {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display:flex;
  flex-direction: row;

  .split {
    margin: 0px 5px;
  }
}

.title {
  font-size: 10;
}

.left {
  // background-color: red;
  width: 60%;
}

.right {
  width: 40%
}

.dirControls {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: 0px 0px;

  .v-icon {
    width: 40px;
    background-color: #e0e0e0;
    padding: 5px 5px;
    border-radius: 2px;
    margin: 0px 5px;
  }
  .v-input--checkbox {
    height: 10px;
  }
}

#closeDialog {
  background-color: #e0e0e0;
  width: 100px;
}

</style>