<template>
    <div class="toplevel" style="background-color: #e0e0e0; height:100%">
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
            style=" height:100%"
            v-if="allResults && stats"
        >
        <v-col cols="12" sm="6" md="4">
            <div class="rounded-card ma-1 pa-4" color="#e0e0e0">
                <v-list-item-title class="headline text-center pa-3">
                    General Stats
                </v-list-item-title>
                <GeneralStats
                    v-if="stats"
                    :stats="stats"
                    class="pa-4"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <div class="rounded-card ma-1 pa-4" color="#e0e0e0">
                <v-list-item-title class="headline text-center pa-3">
                    Distribution
                </v-list-item-title>
                <MarkDistribution v-if="allResults"  
                    :allResults="allResults"
                    class="pa-4"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <div class="rounded-card ma-1 pa-4" color="#e0e0e0">
                <v-list-item-title class="headline text-center pa-3">
                    Compile Status
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
                    Testcase Stats
                </v-list-item-title>
                <PerTestBreakdown v-if="allResults"
                    :allResults="allResults"
                    class="pa-4"
                    legend
                />
            </div>
        </v-col>
    </v-row>

    </div>
</template>

<script>
import MarkDistribution from "@/components/Charts/MarkDistribution";
import PerTestBreakdown from "@/components/Charts/PerTestBreakdown";
import GeneralStats from "@/components/Charts/GeneralStats";
import Donut from "@/components/Charts/Donut";

import API from "@/lib/marker/API";
import { sum, mean, median } from "@/lib/utils";

export default {
  data: () => ({
    stats: null,
    allResults: null,
  }),
  components: {
    MarkDistribution,
    PerTestBreakdown,
    GeneralStats,
    Donut,
  },
  computed: {
    allMarksList() {
      if (!this.allResults) return null;
      return this.allResults.map((item) => (item.marks ? sum(item.marks) : 0));
    },
  },
  beforeMount() {
    API.getStats().then((res) => {
        console.log(res)
      this.stats = res;
    });
    API.getAllResults().then((res) => {
      this.allResults = res;
    });
  },
};
</script>

<style scoped>
.rounded-card {
  border-radius: 30px;
  border-collapse: separate;
  background-color: white;
  box-shadow: 0 0 5px rgb(189, 189, 189);
}
.toplevel {
  height: 100%;
}
</style>