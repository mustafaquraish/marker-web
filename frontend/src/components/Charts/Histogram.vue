<script>
import { Bar } from 'vue-chartjs'

export default {
  name: "Histogram",
  extends: Bar,
  props: {
    marks: Array,
    label: String,
    legend: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    labels: [],
    data: [],
  }),
  mounted() {
    this.refreshChart(this.marks);
  },
  methods: {
    refreshChart(marks) {
      let chartData = marks.slice()
      chartData.sort((a,b) => a - b)
      this.computeLabels(chartData)

      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            backgroundColor: "#"+((1<<24)*Math.random()|0).toString(16),
            data: this.data
          }
        ]
      }, {
        legend: {
          display: this.legend
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      })
    },

    computeLabels: function (chartData) {
      // Add the student data to the chart labels and data.
      for (let i = 0; i < chartData.length; i++) {
        // Loop though the labels to see if the mark is present.
        let found = false;
        let index = 0;
        for (let j = 0; j < this.labels.length; j++) {
          if (!found && parseInt(this.labels[j]) === chartData[i]) {
            found = true;
            index = j;
          }
        }
        // If it was found.
        if (found) {
          this.data[index]++;
        } else {
          // Add a new label and data entry.
          this.labels.push(chartData[i].toString());
          this.data.push(1);
        }
      }
      // Make all the labels string.
      for (let l = 0; l < this.labels.length; l++) {
        this.labels[l] = this.labels[l].toString();
      }
    }
  }
}
</script>