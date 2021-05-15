<script>
import { Bar } from "vue-chartjs";
import { sum, mean, median } from '@/lib/utils'

export default {
  name: "BarGraph",
  extends: Bar,
  props: {
    allResults: Array,
  },
  mounted() {
    this.refreshChart();
  },
  computed: {
    perTestData() {
      let compiled = this.allResults.filter(
        (item) => item.marks && item.marks.length > 0
      );
      let passed = { values: [], labels: [] };
      for (let i = 0; i < compiled[0].marks.length; i++) {
        let val = sum(compiled.map((item) => item.marks[i] == 0));
        passed.labels.push(i.toString());
        passed.values.push(val);
      }
      return passed;
    },
  },
  methods: {
    refreshChart() {
      this.renderChart(
        {
          labels: this.perTestData.labels,
          datasets: [
            {
              label: "Number of students failed",
              backgroundColor:
                "#" + (((1 << 24) * Math.random()) | 0).toString(16),
              data: this.perTestData.values,
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
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Test case number',
                  fontSize: 13
                }
              }
            ]
          },
        }
      );
    },
  },
};
</script>