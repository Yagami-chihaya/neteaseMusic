<template>
  <div id="nav" @mousewheel="scrollMove">
    <navbar></navbar>
    <router-view/>
    <back-top @click="back_top_show=false" v-show="back_top_show"></back-top>
    <music-player></music-player>
    <login-box></login-box>
  </div>
  
</template>


<script lang="ts">
import navbar from './components/context/Navbar.vue'
import backTop from './components/common/BackTop.vue'
import loginBox from './components/context/LoginBox.vue'
import musicPlayer from './components/context/MusicPlayer.vue'
import {defineComponent,ref} from 'vue'

export default defineComponent({
  components:{
    navbar,
    backTop,
    musicPlayer,
    loginBox,
  },
  setup(){
    let back_top_show = ref(false)
    const scrollMove = () =>{
      console.log(document.documentElement.scrollTop);
      back_top_show.value = document.documentElement.scrollTop>500
    }
    
    
    return {
      back_top_show,
      scrollMove,
    }
  }
})

</script>

<style>
@import url('./assets/css/common.css');
</style>

<style lang="scss">

</style>
