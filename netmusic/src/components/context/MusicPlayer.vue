<template>
<div class="musicPlayer" >
  <div class="btn" @click="playMusic()">播放</div>
  <audio ref="audio" autoplay>
    <source :src="musicList[0]">
  </audio>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref,
  
} from 'vue';
import {
  useStore
} from 'vuex'
import {get_data} from '../../network/request'


export default defineComponent({
  name: '',
  components:{  },
  props: {
  },
  
  setup(){
    let musicList:any = ref([])

    let store = useStore()

    const playMusic = ()=>{
      get_data().get('/song/url',{params:{'id':store.state.current_play_music}}).then(res=>{

        musicList.value.push(res.data.data[0].url)

        let url:string = musicList.value[0]

        let test = new Audio(url)
        test.play()
      })
    }
    let audio = ref<HTMLAudioElement|null>(null)

    return {
      playMusic,
      audio,
      musicList,
      
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .musicPlayer{
    position: fixed;
    bottom: 150px;
    left: 50%;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
</style>