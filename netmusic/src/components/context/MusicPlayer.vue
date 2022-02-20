<template>
<div class="musicPlayer" >
  <div class="leftMenu">
    <div class="btn prev"></div>
    <div class="btn play" @click="playMusic(store)"></div>
    <div class="btn next" @click="next"></div>
  </div>
  <div class="cover">
    <img src="../../assets/img/default_album.jpg">
  </div>

  <div class="play">
    <div class="info">
      <span class="name">{{store.state.name_list[0]}}</span>
      <span class="artist">{{store.state.artist_list[0]}}</span>
      <div></div>
    </div>
    <div class="scrollbar">
       <el-slider v-model="store.state.current_music_now_time" :max="store.state.current_music_max_time" @change="change"></el-slider>
    </div>
  </div>
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
import {playMusic,changeNowTime} from '../../network/playMusic'

export default defineComponent({
  name: '',
  components:{  },
  props: {
  },
  
  setup(){
    // let musicList:any = ref([])

    let store = useStore()
    
    // const playMusic = ()=>{
    //   get_data().get('/song/url',{params:{'id':store.state.current_play_music}}).then(res=>{

    //     musicList.value.push(res.data.data[0].url)

    //     let url:string = musicList.value[0]

    //     let test = new Audio(url)
    //     test.play()
    //   })
    // }
    let audio = ref<HTMLAudioElement|null>(null)

    let change = ()=>{
      changeNowTime(store)
    }

    console.log(playMusic);
    
    let next = ()=>{
      store.state.musicList.splice(0, 1)
      store.state.name_list.splice(0, 1)
      store.state.artist_list.splice(0, 1)
      playMusic(store)
    }

    return {
      store,
      audio,
      playMusic,
      change,
      next,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .musicPlayer{
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 100%;
    padding-top: 5px;
    height: 50px;
    
    display: flex;
    justify-content: center;
    
    background: url('../../assets/img/playbar.png');
    .leftMenu{
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
   
      .btn{
        overflow: hidden;
        padding: 0 5px;
        opacity: .6;
        cursor: pointer;
        &:hover{
          transition: .2s;
          opacity: 1;
        }
      }
      .prev{
        width: 28px;
        height: 28px;
        background: url('../../assets/img/playbar.png') no-repeat -28px -130px;
      }
      .play{
         width: 36px;
        height: 36px;
        background: url('../../assets/img/playbar.png') no-repeat -40px -204px;
      }
      .next{
         width: 28px;
        height: 28px;
        background: url('../../assets/img/playbar.png') no-repeat -112px -130px;
      }
    }
    .cover{
      display: flex;
      align-items: center;
      height: 100%;
      
      img{
        
        width: 34px;
        height: 34px;

      }
    }
    &>.play{
      width: 581px;
      .info{
        height: 28px;
        display: flex;
        justify-content: left;
        align-items: center;
        span{
          font-size: 12px;
          margin-left: 14px;
        }
        .name{
          color: #e8e8e8;
        }
        .artist{
          color: #9b9b9b;
        }

        &>div{
          width: 14px;
          height: 15px;
          margin: 3px 0 0 13px;
       
          background: url('../../assets/img/playbar.png') no-repeat -110px -103px;
        }
      }
    }
  }
</style>