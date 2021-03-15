<template>
  <div>
    <p>Menu:</p>
    <ul>
        <li v-for="item in itemsSelected" :key="item[0]">
            {{ item[0] }} x {{ item[1] }}
        </li>
        <button id = "totalButton" v-on:click="findTotal(); sendOrder()">Add Order</button>
        <p v-show="showTotal">Subtotal: ${{ this.subTotal }}</p>
        <p v-show="showTotal">Grand Total: ${{ this.grandTotal }}</p>
    </ul>
  </div>
</template>

<script>

import database from '../firebase.js'
export default {
    name: 'Basket',
    data () {
        return {
            subTotal: 0,
            showTotal: false
        }
    },
    props: {
        itemsSelected: {
            type: Array
        }, 
        items: {
            type: Array
        }
    },
    methods: {
        findTotal: function() {
            var subTotal = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                subTotal += this.itemsSelected[i][2] * this.itemsSelected[i][1];
            }
            this.subTotal = subTotal;
            this.showTotal = true;
        },
        sendOrder: function() {
            var dict = {}
            for (let i = 0; i < this.itemsSelected.length; i++) {
                var curr = this.itemsSelected[i]
                dict[curr[0]] = curr[1]
            }
            
            var listArray = ["Prawn Omelette", "Dry Beef Hor Fun", "Sambal KangKung", "Pork Fried Rice", "Mapo Tofu", "Cereal Prawn"]
            for (let i = 0; i < listArray.length; i++) {
                if (!(listArray[i] in dict)) {
                    dict[listArray[i]] = 0
                }
            }
            database.collection('orders').add(dict).then(() => { location.reload() });
        }
    },
    computed: {
        grandTotal: function() {
            return (this.subTotal * 1.07).toFixed(2);
        }
    }
}
</script>

<style>
    #totalButton {
        background-color: #f5c5c5;
        font-size: 30px;
        border-radius: 10px;
    }
    li {
    flex-grow: 1;
    flex-basis: 300px;
    padding: 10px;
    margin: 10px;
    }

</style>