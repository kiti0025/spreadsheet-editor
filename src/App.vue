<template>
  <div id="app">
    <SpreadsheetEditor />
  </div>
</template>

<script>
import SpreadsheetEditor from './components/SpreadsheetEditor.vue'

export default {
  name: 'App',
  components: {
    SpreadsheetEditor
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
}

#app {
  width: 100vw;
  height: 100vh;
}
</style>