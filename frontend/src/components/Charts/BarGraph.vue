<script>
import { Bar } from 'vue-chartjs'

export default {
  name: "BarGraph",
  extends: Bar,
  props: {
    data: Object,
    label: String,
    legend: {
      type: Boolean,
      default: false
    },
  },
  mounted() {
    this.refreshChart();
  },
  methods: {
    refreshChart() {      
      this.renderChart({
        labels: this.data.labels,
        datasets: [
          {
            label: this.label,
            backgroundColor: "#"+((1<<24)*Math.random()|0).toString(16),
            data: this.data.values
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
  }
}
</script>