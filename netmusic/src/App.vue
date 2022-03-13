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
import {get_data } from './network/request'
import { useStore} from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  components:{
    navbar,
    backTop,
    musicPlayer,
    loginBox,
  },
  setup(){
    let back_top_show:any  = ref(false)
    const scrollMove = () =>{
      console.log(document.documentElement.scrollTop);
      back_top_show.value = document.documentElement.scrollTop>500
    }
    let store = useStore()
    let check_login = ()=>{
      get_data().get('login/status',{params:{'cookie':localStorage.getItem('cookie')}}).then(res=>{
        console.log(res.data.data);
        if(res.data.data.account!=null){
          console.log('not null');
          
          
          store.state.isLogin = true
          store.state.user_info = res.data.data
          store.state.current_account = res.data.data.account
          store.state.current_profile = res.data.data.profile
        }else{
          
          console.log('null');
          store.state.isLogin = false
        }
      })
    }
    check_login()
    
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
  #nav{
    background: #f5f5f5;
  }
</style>
