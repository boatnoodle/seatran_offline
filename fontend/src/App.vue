<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
export default {
  components: {
    navbar
  }
}
</script>

<style>
 .container{
   margin-top: 30px;
 }
</style>
