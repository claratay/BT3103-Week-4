<template>
  <div>
      <button v-on:click="decrement" class="button">-</button>
      <span>{{ counter }}</span>
      <button v-on:click="increment" class="button">+</button>
    
  </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    data () {
        return {
            counter: 0
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        decrement: function() {
            if (this.counter == 0) {
                this.counter = 0;
            } else {
                this.counter--;
            }
            this.$emit('counter', this.item, this.counter)
        },
        increment: function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.counter++;
            }
            this.$emit('counter', this.item, this.counter)
        }
    }

 
}
</script>

<style>
    .button {
        height: 50px;
        width: 50px;
        background-color: #f5c5c5; 
        font-size: 30px;
        margin: 10px;
        border-radius: 10px;

    }



</style>