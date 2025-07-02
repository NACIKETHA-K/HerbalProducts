<template>
  <div class="main">
    <NavBar/>
    <router-view/>

  </div>
  
</template>


<script>
import NavBar from './components/NavBar.vue'
export default {
  components:{
    NavBar
  }

}
</script>

<style>
@import "@/fonts/fonts.css"

</style>