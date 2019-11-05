<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h1> {{ currentPage }} </h1>
    <h1> {{ count }} </h1>
    <button @click="increase()">点击</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentPage: 'aaa',
      count: 0
    }
  },
  created () {
    // console.log(this.$store.getters.getCount)
    this.count = this.$store.getters.getCount
    // console.log(this.$store.getters.doneTodos)
    // console.log(123)
    this.$store.dispatch('update_title', 'helloWorld')
  },
  methods: {
    increase: function () {
      this.$store.dispatch('increment')
      this.count = this.$store.getters.getCount
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  text-align: center;
}
</style>
