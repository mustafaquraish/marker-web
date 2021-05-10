<template>
    <div class="toplevel" style="height:100%">
        <div
            class="container infomessage" 
            v-if="allResults != null && allResults.length==0"
        >
            Error getting results / stats. Make sure submissions are downloaded and marked.
            <v-btn 
                class="ma-5 pa-5"
                @click="$router.push('/')"
            >
                <v-icon class="pr-2">
                mdi-arrow-top-left-thick
                </v-icon>
                Go to Dashboard
            </v-btn>
        </div>

        <v-row 
            class="pa-8" 
            style="background-color: #e0e0e0; height:100% ma-0"
            v-if="allResults && stats"
        >
        <v-col cols="12" sm="6" md="4">
            <div class="rounded-card ma-1 pa-4" color="#e0e0e0">
                <v-list-item-title class="headline text-center pa-3">
                    Marks: all
                </v-list-item-title>
                <Histogram v-if="allMarksList"  
                    :marks="allMarksList"
                    class="pa-4"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <div class="rounded-card ma-1 pa-4" color="#e0e0e0">
                <v-list-item-title class="headline text-center pa-3">
                    Marks: compiled
                </v-list-item-title>
                <Histogram v-if="compiledMarksList"
                    :marks="compiledMarksList"
                    class="pa-4"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <div class="rounded-card ma-1 pa-4" color="#e0e0e0">
                <v-list-item-title class="headline text-center pa-3">
                    Compiled Submissions
                </v-list-item-title>
                <Donut
                    v-if="stats"
                    :labels="['Compiled', 'Failed']"
                    :values="[stats.compile_success,stats.compile_failed]"
                    :colors='["green", "red"]'
                    class="pa-4"
                />
            </div>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <div class="rounded-card ma-1 pa-4" color="#e0e0e0">
                <v-list-item-title class="headline text-center pa-3">
                    Breakdown: test cases
                </v-list-item-title>
                <BarGraph v-if="perTestData"
                    :data="perTestData"
                    label="Number of students failed"
                    class="pa-4"
                    legend
                />
            </div>
        </v-col>
    </v-row>

    </div>
</template>

<script>
import Histogram from '@/components/Charts/Histogram'
import Donut from '@/components/Charts/Donut'
import BarGraph from '@/components/Charts/BarGraph'
import API from '@/lib/marker/API'
import { sum, mean, median } from '@/utils'

export default {
    data: () => ({ 
        stats: null,
        allResults: null,
    }),
    components: {
        Histogram,
        Donut,
        BarGraph
    },
    computed: {
        allMarksList() {
            if (!this.allResults) return null
            return this.allResults.map((item) => item.marks ? sum(item.marks) : 0)
        },
        compiledMarksList() {
            if (!this.allResults) return null
            let compiled = this.allResults.filter((item) => item.marks && item.marks.length > 0);
            return compiled.map((item) => sum(item.marks))
        },
        perTestData() {
            if (!this.allResults) return null
            let compiled = this.allResults.filter((item) => item.marks && item.marks.length > 0);
            let passed = { 'values': [], 'labels': [] }
            for (let i = 0; i < compiled[0].marks.length; i++) {
                let val = sum(compiled.map((item) => item.marks[i] == 0))
                passed.labels.push(i.toString())
                passed.values.push(val)
            }
            return passed
        }
    },
    beforeMount() {
      API.getStats().then((res) => {
        this.stats = res;
      })
      API.getAllResults().then((res) => {
        this.allResults = res
      })
    },
}
</script>

<style scoped>
.rounded-card {
    border-radius: 30px;
    border-collapse: separate; 
    background-color: white;
    box-shadow: 0 0 5px rgb(189, 189, 189);
}
</style>