<template>
  <div class="root ma-0 pa-0 mr-0">
    
    <div class="subcontainer">
      <v-subheader class="title">
        File Explorer
      </v-subheader>
      <div style="display: flex; flex-direction: row;">
        <span class="px-4">Current directory:</span><code>{{shortDirName}}</code>
      </div>

      <div class="dirControls py-2 px-3">
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
    <FavoritesList :values="favorites" @folderClicked="selectedFav" class="split right"/>
    </div>
    
    <v-dialog width="500" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        
        <div
          style="display: flex; justify-content: center;"
        >
          <v-btn v-bind="attrs" v-on="on"
            class="mt-5"
          >
            Select this directory...
          </v-btn>
        </div>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          You have selected:
        </v-card-title>

        <v-card-text>
          {{directory}}
          <br>
          <br>
          (Currently this does nothing, TODO...)
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Confirm?
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
  </div>
</template>

<script>
import API from '@/lib/explorer/API'
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
    favorites: [],
    fav: false,
  }),
  beforeMount () {
    API.getHome().then((res) => {
      console.log(res)
      this.directory = res.path
      this.values = res.entries;
    })
    this.doRequestFav(()=>API.getFavorites())
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
      return this.favorites.reduce((result, item) => (result || item.path == this.directory), false);
    }
  },
  watch: {
    hidden() {
      this.doRequestPath(()=>API.getSubdir(this.directory, null, this.hidden))
    },
  },
  methods: {
    doRequestPath(func) {
      func().then((res) => {
        console.log(res)
        this.directory = res.path
        this.values = res.entries;
      })
    },
    doRequestFav(func) {
      func().then((res) => {
        console.log(res)
        this.favorites = res
      })
    },
    clickedItem(item) {
      console.log("got smth")
      if (item.dir) {
        this.doRequestPath(()=>API.getPath(item.path, this.hidden))
      }
    }, 
    getParent() {
      this.doRequestPath(()=>API.getParent(this.directory, this.hidden))
    },
    getHome() {
      this.doRequestPath(()=>API.getHome(this.hidden))
    },
    clickFav() {
      if (this.isFavorite) {
        this.doRequestFav(()=>API.delFavorite(this.directory))
      } else {
        this.doRequestFav(()=>API.addFavorite(this.directory))
      }
    },
    selectedFav(item) {
      this.doRequestPath(()=>API.getPath(item.path, this.hidden))
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
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  padding: 2em;
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
    margin: 0px 12px;
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

</style>