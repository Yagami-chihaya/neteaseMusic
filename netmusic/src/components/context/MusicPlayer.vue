<template>
<div class="musicPlayer" @mouseenter="isDown=false" @mouseleave="isDown=true" :class="{down:isDown&&!isOpen}">
  <div class="leftMenu">
    <div class="btn prev" @click="prev"></div>
    <div class="btn play" @click="go_on_music(store)" v-if="!store.state.isPlaying"></div>
    <div class="btn stop" @click="stopMusic(store)" v-else></div>
    <div class="btn next" @click="next"></div>
  </div>
  <div class="cover">
    <img :src="store.state.cover_list.length===0?require('../../assets/img/default_album.jpg'):store.state.cover_list[store.state.current_index]">
  </div>

  <div class="play">
    <div class="info">
      <span class="name">{{store.state.name_list[store.state.current_index]}}</span>
      <span class="artist">{{store.state.artist_list[store.state.current_index]}}</span>
      <div></div>
    </div>
    <div class="scrollbar">
       <el-slider v-model="store.state.current_music_now_time" :max="store.state.current_music_max_time" @change="change"></el-slider>
    </div>
    <div class="time">
      <span class="now_time">{{store.state.current_music_now_time/60>=10?Math.floor(store.state.current_music_now_time/60):'0'+Math.floor(store.state.current_music_now_time/60)}}:{{store.state.current_music_now_time%60>=10?store.state.current_music_now_time%60:'0'+store.state.current_music_now_time%60}} / </span>
      <span class="max_time">{{store.state.current_music_max_time/60>=10?Math.floor(store.state.current_music_max_time/60):'0'+Math.floor(store.state.current_music_max_time/60)}}:{{store.state.current_music_max_time%60>=10?store.state.current_music_max_time%60:'0'+store.state.current_music_max_time%60}}</span>
    </div>
    
  </div>
  <div class="btn_list">
    <div class="voice_box" v-show="isShowVoiceBox">
      <div class="barbg"></div>
      <el-slider v-model="volume" vertical height="90px" size="small" @change="changeVoice"> </el-slider>
    </div>
    <div class="voice" @click="isShowVoiceBox=!isShowVoiceBox"></div>
  </div>
  <div class="open">
    <div class="lock" @click="isOpen=!isOpen" :class="{unlock:!isOpen}">

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
import {playMusic,changeNowTime,stopMusic,go_on_music,change_voice} from '../../network/playMusic'

export default defineComponent({
  name: '',
  components:{  },
  props: {
  },
  
  setup(){

    let store = useStore()
    

    let audio = ref<HTMLAudioElement|null>(null)

    let change = ()=>{
      changeNowTime(store)
    }

    console.log(playMusic);
    
    let next = ()=>{
      
      store.state.current_index++
      playMusic(store,false,store.state.musicList[0])
    }

    let prev = ()=>{
      store.state.current_index--
      playMusic(store,false,store.state.musicList[0])
    }

    let volume = ref(70)
    let changeVoice = (value:number)=>{
      
      console.log(value);
      
      change_voice(value)
    }
    let isShowVoiceBox = ref(false)

    let isOpen = ref(true)
    let isDown = ref(false)
    return {
      store,
      audio,
      playMusic,
      change,
      next,
      prev,
      stopMusic,
      changeVoice,
      go_on_music,
      volume,
      isShowVoiceBox,
      isOpen,
      isDown,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .musicPlayer{
    position: fixed;
    bottom: -2px;
    left: 0;
    width: 100%;
    padding-top: 5px;
    height: 50px;
    
    display: flex;
    justify-content: center;
    transition: 1s;
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
      .stop{
        width: 36px;
        height: 36px;
        background: url('../../assets/img/playbar.png') no-repeat -40px -165px;
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
      width: 571px;
      position: relative;
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
      .scrollbar{
        transform: translate(20px,-10px);
        .el-slider{
          width: 466px;
        }
      }
      .time{
        position: absolute;
        right: 0;
        bottom: 10px;
        font-size: 12px;
        .now_time{
          color: #a1a1a1;
        }
        .max_time{
          color: #797979;
        }
      }
      
    }
    .btn_list{
      margin-left: 20px;
      position: relative;
      .voice_box{
        position: absolute;
        top: -110px;
        left: -3px;
        clear: both;
        width: 32px;
        height: 113px;
        .barbg{
          position: absolute;
          top: 0;
          left: 0;
          width: 32px;
          height: 113px;
          background: url('https://s2.music.126.net/style/web2/img/frame/playbar.png?5cc1f16fa190a231e1da8514cb25fd95') 0 -503px no-repeat;
        }
        .el-slider{
          position: absolute;
          top: 0px;
          left: -3px;
          --el-slider-button-size: 12px;
          
        }
      }
      .voice{
        width: 25px;
        height: 25px;
        margin: 11px 2px 0 0;
        background: url('https://s2.music.126.net/style/web2/img/frame/playbar.png?5cc1f16fa190a231e1da8514cb25fd95') -2px -248px no-repeat;
        cursor: pointer;
        &:hover{
          background-position: -31px -248px;
        }
      }
    }
    .open{
      position: absolute;
      background: url('https://s2.music.126.net/style/web2/img/frame/playbar.png?5cc1f16fa190a231e1da8514cb25fd95') 0 0 no-repeat;
      top: -14px;
      right: 15px;
      width: 52px;
      height: 67px;
      background-position: 0 -380px;
      .lock{
        display: block;
        width: 18px;
        height: 18px;
        margin: 6px 0 0 17px;
        background: url('https://s2.music.126.net/style/web2/img/frame/playbar.png?5cc1f16fa190a231e1da8514cb25fd95') -100px -380px no-repeat;
        cursor: pointer;
        &:hover{
          background-position: -100px -400px;
        }
        
      }
      .unlock{
        display: block;
        width: 18px;
        height: 18px;
        margin: 6px 0 0 17px;
        background-position: -80px -380px;
        &:hover{
          background-position: -80px -400px;
        }
      }
    }
  }
  .down{
    transform: translateY(42px);
  }
</style>