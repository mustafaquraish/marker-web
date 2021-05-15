<template>
    <v-list flat class="dirlist" nav dense>
        <v-divider/>
        <v-list-item-group color="primary" class="listitems">
          <div v-for="(item, i) in values" :key="i">
            <v-list-item class="mb-0" @click="clickedItem(item)">
              <v-list-item-icon>
                <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="teal" @click.stop="clickedStar(item)" v-on="on" v-bind="attrs">
                    mdi-star
                  </v-icon>
                </template>
                Remove Favorite
              </v-tooltip>
                
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>

            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
</template>

<script>
export default {
    props: {
        values: Array
    },
    methods: {
        clickedItem(item) {
          this.$emit('folderClicked', item)
        },
        clickedStar(item) {
          this.$emit('removeFav', item)
        }
    }
}
</script>

<style scoped>
.dirlist {
  height: 100%;
  overflow-y: auto;
}
</style>