import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
          var zonesList = {}
          var colors = ["#ff9999", "#cc3300", "#ffff99", "#00ccff", "#cc66ff", "#00cc66"]
          response.data['region_metadata'].forEach(data => { 
            var sample = {
              data:[],
              label:data['name'],
              fill:false,
              borderColor: colors[this.datacollection.datasets.length]
            }
            zonesList[data['name']] = this.datacollection.datasets.length
            this.datacollection.datasets.push(sample)
          })

          response.data['items'].forEach(item => {
            this.datacollection.labels.push(item['timestamp'])
            Object.keys(item['readings']['psi_twenty_four_hourly']).forEach(region => {
              var curr = this.datacollection.datasets[zonesList[region]]
              curr.data.push(item['readings']['psi_twenty_four_hourly'][region])
            })
          })
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}