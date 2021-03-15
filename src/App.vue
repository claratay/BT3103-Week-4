<template>
  <div id = "app">
    <h1 id = "storeName">~ CLARA'S ZI CHAR ~</h1>
    <router-view></router-view>  
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: Palatino, 'Palatino Linotype', serif;
  font-size: 30px;
}

#storeName {
  color: #f5c5c5;
  margin: 15px;
  border-style: solid;
  text-align: center;
  background-color: black;
}

</style>
