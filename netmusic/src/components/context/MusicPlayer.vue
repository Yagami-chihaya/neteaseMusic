<template>
<div class="musicPlayer" >
  <div class="btn" @click="playMusic(33894312)">播放</div>
  <audio ref="audio" autoplay controls>
    <source :src="musicList[0]">
  </audio>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref 
} from 'vue';
import {get_data} from '../../network/request'


export default defineComponent({
  name: '',
  components:{  },
  props: {
  },
  
  setup(){
    let musicList:any = ref([])

    const playMusic = (id:number)=>{
      get_data().get('/song/url',{params:{'id':id}}).then(res=>{
        console.log(res.data);
        musicList.value.push(res.data.data[0].url)
        console.log(musicList.value);
        console.log(audio);
        let url:string = musicList.value[0]
        console.log('test');
        console.log(musicList.value[0]);
        
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