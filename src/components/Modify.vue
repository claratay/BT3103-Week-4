<template>
  <div id="app">
    <ul>
    <li v-for="(quantity, dish, index) in datapacket" :key="index">
        {{ dish }}: {{ quantity }} 
        <br>
        <input v-bind:id=index placeholder="0" type = "number" min= "0" max = "10">
        <br>
    </li>
    </ul>
    <button v-on:click = "updateOrder">Update Order</button>
    
  </div>
</template>

<script>
import database from '../firebase.js'
export default {
    name: 'Modify',
    data () {
        return {
            datapacket: {}
        }
    },
    props: {
        id: {
            type: String,
            default: "no"
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').doc(this.id).get().then(snapshot => {
                this.datapacket = snapshot.data()
            })
            
        },
        updateOrder: function() {
            var newDatapacket = {}
            for (var item in this.datapacket) {
                newDatapacket[item] = item.value
            }
            var index = 0;
            for (var dish in newDatapacket) {
                var newCount = document.getElementById(index).value
                if (newCount == '') {
                    newDatapacket[dish] = 0
                } else {
                    newDatapacket[dish] = newCount
                }
                index++;
            }
            database.collection('orders').doc(this.id).update(newDatapacket).then(this.$router.push("orders"))
        }    
    },
    created() {
        this.fetchItems();
        console.log("created")
    }


 
}
</script>

<style scoped>
ul{
    list-style-type:none;
}
button {
    background-color: #f7cac9;
    border-radius: 5px;
    border-width: 1px;
    padding: 10px;
    font-size:15px;
    position: relative;
    left: 60px
}
    
</style>

