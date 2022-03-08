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
    <div class="list_btn" @click="isShowListBox=!isShowListBox">{{store.state.musicList.length}}</div>
  </div>
  <div class="open">
    <div class="lock" @click="isOpen=!isOpen" :class="{unlock:!isOpen}">

    </div>
  </div>
  <div class="musicList_box" v-show="isShowListBox">
    <div class="head">
      <h4>播放列表</h4>
      <a href="javascript:;" class="collect_all"><span></span>收藏全部</a>
      <a href="javascript:;" class="clear" @click="clearAll"><span></span>清除</a>
      <p class="song_title">{{store.state.name_list[store.state.current_index]}}</p>
      <span class="close"></span>
    </div>
    <div class="list">
      <img :src="store.state.cover_list.length===0?require('../../assets/img/default_album.jpg'):store.state.cover_list[store.state.current_index]">
      <div class="mask"></div>
      <div class="left">
        <el-scrollbar>
          <ul>
            <li v-for="(item,index) in store.state.name_list" :key="index" :class="{active:store.state.musicList[index]==store.state.current_play_music}" @click="play(index)">
              <div class="col col1"></div>
              <div class="col col2">{{item}}</div>
              <div class="col col3">
                <div class="icon">
                  <span @click="console.log('qwe')" :style="{backgroundPosition:'-51px 0'}"></span>
                  <span class="delete" :style="{backgroundPosition:'-57px -50px'}"></span>
                  <span :style="{backgroundPosition:'0px 0'}"></span>
                  <span :style="{backgroundPosition:'-24px 0'}"></span>
                </div>
              </div>
              <div class="col col4">{{store.state.artist_list[index]}}</div>
              <div class="col col5"></div>
              
            </li>
          </ul>
        </el-scrollbar>
      </div>
      <div class="right">
        <el-scrollbar ref="scrollbarRef">
          <div ref="innerRef">
            <p class="lyric" :class="{active:store.state.current_music_now_time>=timeStack(item)&&store.state.current_music_now_time<=timeStack(store.state.current_lyric.split('\n')[index+1])}" v-for="(item,index) in store.state.current_lyric.split('\n')" :key="index">{{item.split(']')[1]}}</p>
          </div>
          
        </el-scrollbar>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref,
  computed,
  onMounted,
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
    let reg = /\[(.+)\./

    let audio = ref<HTMLAudioElement|null>(null)       

    let change = ()=>{              //改变播放进度条并播放对应当前时长
      changeNowTime(store)
    }

    let play = (index:number)=>{
      store.state.current_index = index
      playMusic(store,false,store.state.musicList[store.state.current_index])
    }

    let clearAll = ()=>{
      store.state.musicList = [] //清空播放列表
      store.state.current_index = 0  //重置歌单播放进度
      store.state.name_list = []
      store.state.cover_list = []
      store.state.artist_list = []
      store.state.current_lyric = ''
    }
    
    let next = ()=>{         //下一首
      
      
      if(store.state.current_index>=store.state.musicList.length-1)return 0 
      store.state.current_index++
      playMusic(store,false,store.state.musicList[store.state.current_index])
    }

    let prev = ()=>{      //上一首
      if(store.state.current_index<=0)return 0 
      store.state.current_index--
      playMusic(store,false,store.state.musicList[store.state.current_index])
    }

    let volume = ref(70)    
    let changeVoice = (value:number)=>{         //更改音量

      change_voice(value)
    }
    let isShowVoiceBox = ref(false)     //是否展示音量面板
    let isShowListBox = ref(false)
    let isOpen = ref(true)      //是否持续展开播放菜单
    let isDown = ref(false)     //是否下降播放菜单

    const scrollbarRef = ref<any>()    //滚动盒子对象

    let timeStack = computed(()=>(item:any)=>{        //分割出歌词中的时间，并转换为秒

      return Number((item.split(reg)[1]+'').split(':')[0])*60+Number((item.split(reg)[1]+'').split(':')[1])
      
    })

    let scrollTop = 0       //滚动条y轴偏移量
    let lyricList:any = ref([])   //播放时长队列

   
    const changeScroll = ()=>{       //更改滚动条使用的方法

      if(store.state.isPlaying&&lyricList.value.length==0){  //如果正在播放且歌词尚未获取，则获取歌词列表并提取出时间放入播放时长队列

        for(let item of store.state.current_lyric.split('\n')){
          lyricList.value.push(Number((item.split(reg)[1]+'').split(':')[0])*60+Number((item.split(reg)[1]+'').split(':')[1]))
          
        }
        
      
        
        
      }
      
      
      else if(store.state.isPlaying&&lyricList.value.length!=0){ //若正在播放且播放时长队列不为空，则遍历队列检测当前播放时长是否与队列任意一项元素相等，若相等则更改滚动条偏移量

        
    
        for(let index in lyricList.value){
          if(store.state.current_music_now_time==lyricList.value[index]){
            
            
            scrollTop=32*(Number(index)-2)
            
            scrollbarRef.value.setScrollTop(scrollTop)
            
            
          }
        }
        
        

      }
      if(store.state.current_music_now_time==0){  //若当前播放时长为0，还原滚动条偏移量
  
        
        lyricList.value = []
        scrollbarRef.value.setScrollTop(-64)
        scrollTop = -64
      } 
      requestAnimationFrame(changeScroll)        //递归
    }
    

    onMounted(()=>{
      requestAnimationFrame(changeScroll)
      
    })
    

    
    return {
      store,
      audio,
      playMusic,
      play,
      clearAll,
      change,
      next,
      prev,
      stopMusic,
      changeVoice,
      go_on_music,
      volume,
      isShowVoiceBox,
      isShowListBox,
      isOpen,
      isDown,
      reg,
      timeStack,

      scrollbarRef,
      changeScroll,
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
    z-index: 10;
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
      display: flex;
      align-items: center;
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
       
        background: url('https://s2.music.126.net/style/web2/img/frame/playbar.png?5cc1f16fa190a231e1da8514cb25fd95') -2px -248px no-repeat;
        cursor: pointer;
        &:hover{
          background-position: -31px -248px;
        }
      }
      .list_btn{
        display: block;
        float: none;
        width: 38px;
        height: 25px;
        padding-left: 21px;
        background: url('https://s2.music.126.net/style/web2/img/frame/playbar.png?a2a62bf5d07d974e5d346904d7fc25c5') 0 0 no-repeat;
        background-position: -42px -68px;
        line-height: 27px;
        text-align: center;
        color: #666;
        text-shadow: 0 1px 0 #080707;
        text-indent: 0;
        text-decoration: none;
        font-size: 12px;
        cursor: pointer;
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
    .musicList_box{
      position: absolute;
   
      left: 50%;
      transform: translateX(-50%);

      bottom: 47px;
      z-index: 1;
      width: 986px;

      height: 301px;
      .head{
        padding: 0 5px;
        width: 100%;
        height: 41px;
        background: url('https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?8c0c41096f11ab0fe2178abbeecabd8e') 0 0 no-repeat;
        background-position: 0 0;
        position: relative;
        h4{
          margin: 0;
          position: absolute;
          left: 25px;
          top: 0;
          height: 39px;
          line-height: 39px;
          font-size: 14px;
          color: #e2e2e2;
        }
        .collect_all{
          position: absolute;
          left: 398px;
          top: 12px;
          height: 15px;
          line-height: 15px;
          cursor: pointer;
          color: #ccc;
          text-decoration: none;

          &>span{
            float: left;
            margin: 1px 6px 0 0;
            width: 16px;
            height: 16px;
            background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?fd17d8d77dd5088f1d6a7fa52777f94c') no-repeat;
            background-position: -24px 0;
            
          }
          &:hover{
            text-decoration: underline;
            color: white;
            span{background-position-y: -20px;}
          }
        }
        .clear{
          position: absolute;
          left: 490px;
          top: 12px;
          height: 15px;
          line-height: 15px;
          cursor: pointer;
          color: #ccc;
          text-decoration: none;
          &>span{
            float: left;
            margin: 1px 6px 0 0;
            width: 13px;
            height: 16px;
            background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?fd17d8d77dd5088f1d6a7fa52777f94c') no-repeat;
            background-position: -51px 0;
          }
          &:hover{
            text-decoration: underline;
            color: white;
            span{background-position-y: -20px;}
          }
        }
        .song_title{
          position: absolute;
          left: 595px;
          top: 0;
          width: 346px;
          text-align: center;
          height: 39px;
          line-height: 39px;
          color: #fff;
          font-size: 14px;
          
        }
        .close{
          position: absolute;
          top: 6px;
          right: 28px;
          width: 30px;
          height: 30px;
          overflow: hidden;
          text-indent: -999px;
          cursor: pointer;
          background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?fd17d8d77dd5088f1d6a7fa52777f94c') no-repeat;
          background-position: -195px 9px;
          &:hover{
            background-position: -195px -21px;
          }
        }
      }
      .list{
        position: absolute;
        left: 0;
        top: 41px;
        width: 100%;
        height: 260px;
        overflow: hidden;
        background: url('https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?8c0c41096f11ab0fe2178abbeecabd8e');
        background-position: -1014px 0;
        background-repeat: repeat-y;
        &>img{
          position: absolute;
          left: 2px;
          top: -360px;
          
          z-index: 1;
          width: 980px;
          height: auto;
          opacity: .2;
          filter: blur(20px);
        }
        .mask{
          position: absolute;
          left: 2px;

          top: 0;
          z-index: 2;
          width: 558px;
          height: 260px;
          background: #121212;
          opacity: .5;
        }
        .left{
          position: absolute;
          left: 2px;
     
          top: 0;
          z-index: 4;
          height: 260px;
          width: 553px;
          overflow: hidden;
          .el-scrollbar{
            ul{
              color: #ccc;
              overflow: hidden;
              list-style: none;
              li{
                float: left;
                width: 100%;
                font-size: 12px;
                position: relative;
                .col{
                  float: left;
                  padding-left: 10px;
                  height: 28px;
                  line-height: 28px;

                  overflow: hidden;
                  cursor: pointer;
                }
                .col1{
                  opacity: 0;
                  margin-top: 8px;
                  margin-left: 10px;
                  width: 10px;
                  height: 13px;
                  background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?fd17d8d77dd5088f1d6a7fa52777f94c') 0 0 no-repeat;
                  background-position: -182px 0;
                }
                .col2{
                  padding: 0;
                  width: 256px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .col3{
                  opacity: 0;
                  position: relative;
                  width: 78px;
                  transition: .3s;
                  .icon{
                    // display: none;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 100px;
                    height: 23px;
                    span{
                      display: inline-block;
                      background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?fd17d8d77dd5088f1d6a7fa52777f94c') no-repeat;
                      width: 15px;
                      height: 16px;
                      float: right;
                      overflow: hidden;
                      margin: 7px 0 0 8px;
                      &:hover{
                        background-position-y: -20px !important;
                      }
                    }
                    .delete{
                      &:hover{
                        background-position: -80px -50px !important;
                        
                      }
                    }
                  }
                  &:hover{
                    opacity: 1;
                  
                    
                  }
                }
                .col4{
                  width: 70px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .col5{
                  position: absolute;
                  right: 10px;
                  padding: 0;
                  width: 14px;
                  height: 16px;
                  margin-left: 0;
                  background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?fd17d8d77dd5088f1d6a7fa52777f94c') 0 0 no-repeat;
                  background-position: -80px 0px;
                  overflow: hidden;
                  margin: 7px 0 0 10px;

                }
              }
              .active{
                background-color: rgba(0,0,0,0.3);
                color: white;
                .col1{
                  opacity: 1;
                }
              }
            }
          }
        }
        .right{
          position: absolute;
          right: 40px;
          top: 0;
          z-index: 4;
          margin: 21px 0 20px 0;
          height: 219px;
          width: 354px;
          overflow: hidden;
          
          p{
            color: #989898;
            word-wrap: break-word;
            text-align: center;
            line-height: 32px;
            height: auto !important;
            height: 32px;
            min-height: 32px;
            font-size: 12px;
            transition: color .2s;
          }
          .active{
            color: white;
            
          }
        }
      }
    }
  }
  .down{
    transform: translateY(42px);
  }
</style>