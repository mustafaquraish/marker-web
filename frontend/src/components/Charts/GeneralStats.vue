<script>
import { Bar } from "vue-chartjs";
import { sum, mean, median } from "@/lib/utils";

export default {
  name: "BarGraph",
  extends: Bar,
  props: {
    stats: Object,
  },
  mounted() {
    this.refreshChart();
  },
  methods: {
    refreshChart() {
      this.renderChart(
        {
          labels: ["Mean", "Median"],
          datasets: [
            {
              label: "All",
              backgroundColor:
                "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              data: [
                (100 * this.stats.all.mean / this.stats.out_of).toFixed(1),
                (100 * this.stats.all.median / this.stats.out_of).toFixed(1),
              ],
            },
            {
              label: "Compiled",
              backgroundColor:
                "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              data: [
                (100 * this.stats.compiled.mean / this.stats.out_of).toFixed(1),
                (100 * this.stats.compiled.median / this.stats.out_of).toFixed(1),
              ],
            },
          ],
        },
        {
          legend: {
            display: true,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  suggestedMax: 100,
                },
              },
            ],
          },
        }
      );
    },
  },
};
</script>