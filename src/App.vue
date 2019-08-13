<template>
  <div id="app">
    <appcomponent></appcomponent>
  </div>
</template>

<script>
import appcomponent from './components/appcomponent.vue'

export default {
  name: 'app',
  components: {
    appcomponent
  }
}
</script>

<style>
#app {
  background-color: #AAB7B8;
}
</style>
