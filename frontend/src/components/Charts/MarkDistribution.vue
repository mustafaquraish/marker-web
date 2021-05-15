<script>
import { Bar } from "vue-chartjs";
import { sum, mean, median } from '@/lib/utils'

export default {
  name: "Histogram",
  extends: Bar,
  props: {
    allResults: Array,
  },
  data: () => ({
    labels: [],
    data: [],
  }),
  mounted() {
    this.refreshChart(this.marks);
  },
  computed: {
    allMarksList() {
      return this.allResults.map((item) => (item.marks ? sum(item.marks) : 0));
    },
    compiledMarksList() {
      let compiled = this.allResults.filter(
        (item) => item.marks && item.marks.length > 0
      );
      return compiled.map((item) => sum(item.marks));
    },
  },
  methods: {
    refreshChart(marks) {
      let allData = this.computedData(this.allMarksList);

      this.renderChart(
        {
          labels: allData.labels,
          datasets: [
            {
              backgroundColor:
                "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              data: allData.data,
            },
          ],
        },
        {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }
      );
    },

    computedData: function (marks) {
      let chartData = marks.slice();
      chartData.sort((a, b) => a - b);

      let results = { 
        data: [],
        labels: []
      }
      // Add the student data to the chart labels and data.
      for (let i = 0; i < chartData.length; i++) {
        // Loop though the labels to see if the mark is present.
        let found = false;
        let index = 0;
        for (let j = 0; j < results.labels.length; j++) {
          if (!found && parseInt(results.labels[j]) === chartData[i]) {
            found = true;
            index = j;
          }
        }
        // If it was found.
        if (found) {
          results.data[index]++;
        } else {
          // Add a new label and data entry.
          results.labels.push(chartData[i].toString());
          results.data.push(1);
        }
      }
      // Make all the labels string.
      for (let l = 0; l < this.labels.length; l++) {
        results.labels[l] = results.labels[l].toString();
      }
      return results;
    },
  },
};
</script>