<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "Donut",
  extends: Doughnut,
  props: {
    values: Array,
    labels: Array,
    colors: {
      type: Array,
      default: () => ["green", "red"],
    }
  },
  mounted() {
    this.refreshChart();
  },
  watch: {
    values() {
      this.refreshChart()
    }
  },
  methods: {
    refreshChart() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: this.colors,
              data: this.values,
            },
          ],
        });
    },
  },
};
</script>