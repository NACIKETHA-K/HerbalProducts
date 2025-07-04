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
@import "@/fonts/fonts.css";

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  max-width: 100vw;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

img, video {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

</style>