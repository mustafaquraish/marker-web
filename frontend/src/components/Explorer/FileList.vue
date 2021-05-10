<template>
    <v-list flat class="dirlist" nav dense>
        <v-divider/>
        <v-list-item-group color="primary" class="listitems">
          <div v-for="(item, i) in values" :key="i">
            <v-list-item class="mb-0" @click="clickedItem(item)">
              <v-list-item-icon>
                <v-icon v-if="item.dir">mdi-folder</v-icon>
                <v-icon v-if="!item.dir">mdi-file-outline</v-icon>
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
            console.log("Clicked...")
            if (item.dir) {
                console.log("Clicked...")
                this.$emit('folderClicked', item)
            }
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