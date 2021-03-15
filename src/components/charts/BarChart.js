import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Total number of each dish",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", '#87ceeb'],
                    data: []
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Total number of each dish"
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    let orderList = doc.data()
                    if (!this.datacollection.labels.length) {
                        Object.keys(orderList).forEach( item => {
                            this.datacollection.labels.push(item);
                            this.datacollection.datasets[0].data.push(Number(orderList[item]))
                        })
                    } else {
                        Object.keys(orderList).forEach( item => {
                            var i = this.datacollection.labels.indexOf(item);
                            var add = Number(orderList[item]);
                            this.datacollection.datasets[0].data[i] += add;
                        })
                    }
                    //this.datacollection.datasets[0].backgroundColor.push("red");
                })
                this.renderChart(this.datacollection, this.options)
            })
        }
    },

    created() {
        this.fetchItems()
    }
}
