<template>
<div class="top">
  <div class="left">
    <p class="title">云音乐特色榜</p>
    <ul>
      <li v-for="(item,index) in list_part1" :key="index" @click="change_top(index)" :class="{active:active_top==index}">
        <img :src="item.coverImgUrl">
        <div class="info">
          <p>{{item.name}}</p>
          <p class="update">{{item.updateFrequency}}</p>
        </div>
        
      </li>
    </ul>
    <p class="title">全球媒体榜</p>
    <ul>
      <li v-for="(item,index) in list_part2" :key="index" @click="change_top(index+4)" :class="{active:active_top==index+4}">
        <img :src="item.coverImgUrl">
        <div class="info">
          <p>{{item.name}}</p>
          <p class="update">{{item.updateFrequency}}</p>
        </div>
        
      </li>
    </ul>
  </div>
  <div class="right">
    <div class="info">
      <div class="cover">
        <img :src="now_top.coverImgUrl" alt="">
        
      </div>
      <div class="top_info">
        <h2>{{now_top.name}}</h2>
        <img src="../../../assets/img/时钟.png">
        <span>最近更新：{{new Date(now_top.updateTime).toLocaleDateString()}}</span><span class="updateFrequency">({{updateFrequency}})</span>
        <div class="btn_list">
          <div class="play" @click="top_play(tracks)"><span></span>播放</div>
          <div class="add"><span></span></div>
          <div class="collect"><span>({{(now_top.subscribedCount/10000).toFixed(1)}}万)</span></div>
          <div class="share"><span>({{now_top.shareCount}})</span></div>
          <div class="download"><span>下载</span></div>
          <div class="comment"><span>({{now_top.commentCount}})</span></div>
        </div>
      </div>
      
    </div>
    <content-box title="歌曲列表" :rightText="'播放:'+now_top.playCount">
      <table>
        <thead>
          <tr>
            <th></th>
            <th><div>标题</div> </th>
            <th><div>时长</div> </th>
            <th><div>歌手</div> </th>
          </tr>
        </thead>
        <tbody>
          <tr class="hot" v-for="(item,index) in tracks.slice(0,3)" :key="index">
            <td>
              <div>{{index+1}}</div>
            </td>
            <td>
              <div>
                <img :src="item.al.picUrl">
                <span class="songs_title" @click="play(item)">{{item.al.name}}</span>
                <span class="other_title" v-show="item.al.tns.length>0"> - ({{item.al.tns[0]}})</span>
              </div>
            </td>
            <td>
              <div class="time">{{Math.floor(item.dt/1000/60)>=10?Math.floor(item.dt/1000/60):'0'+Math.floor(item.dt/1000/60)}}:{{Math.floor(item.dt/1000%60)}}</div>
            </td>
            <td>
              <div class="singger">{{item.ar[0].name}}</div>
            </td>
          </tr>
          <tr v-for="(item,index) in tracks.slice(3)" :key="index">
            <td>
              <div>{{index+4}}</div>
            </td>
            <td>
              <div>
                
                <span class="songs_title" @click="play(item)" >{{item.al.name}}</span>
                <span class="other_title" v-show="item.al.tns.length>0"> - ({{item.al.tns[0]}})</span>
              </div>
            </td>
            <td>
              <div class="time">{{Math.floor(item.dt/1000/60)>=10?Math.floor(item.dt/1000/60):'0'+Math.floor(item.dt/1000/60)}}:{{Math.floor(item.dt/1000%60)>=10?Math.floor(item.dt/1000%60):'0'+Math.floor(item.dt/1000%60)}}</div>
            </td>
            <td>
              <div class="singger">{{item.ar[0].name}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </content-box>
    
  </div>
  <div class="bottom" style="overflow:hidden">
    <img src="../../../assets/img/bottom.png">
  </div>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref 
} from 'vue';
import contentBox from '../../../components/context/ContentBox.vue'
import {get_data} from '../../../network/request'
import {playMusic,afterPlay} from '../../../network/playMusic'
import {useStore} from 'vuex'

export default defineComponent({
  name: '',
  components:{
    contentBox,
  },
  props: {
  },
  
  setup(){
    let top_list = ref([] as any[]) 
    let list_part1 = ref()
    let list_part2 = ref()
    let now_top = ref({})
    let updateFrequency = ref()
    let tracks = ref([])
    get_data().get('/toplist').then(res=>{
     
      top_list.value = res.data.list
      
      list_part1.value = top_list.value.slice(0,4)
      console.log(list_part1);
      list_part2.value = top_list.value.slice(4,-1)
      
      
      updateFrequency.value = top_list.value[active_top.value].updateFrequency
      console.log(updateFrequency.value);
      
      get_data().get('/playlist/detail',{params:{'id':res.data.list[0].id}}).then(res=>{
        now_top.value =  res.data.playlist
        tracks.value = res.data.playlist.tracks
        console.log(now_top.value);
        console.log(tracks.value);
      })
      
      
    })
    let active_top = ref(0)
    let change_top = (index:any)=>{
      get_data().get('/playlist/detail',{params:{'id':top_list.value[index].id}}).then(res=>{
        now_top.value =  res.data.playlist
        active_top.value = index
        tracks.value = res.data.playlist.tracks
        console.log('tracks');
        console.log(tracks.value);
        
        updateFrequency.value = top_list.value[active_top.value].updateFrequency
      })
    }
    let store = useStore();
    
    let play = (item:any)=>{
      
      
      
      store.state.name_list.unshift(item.name)
      store.state.cover_list.unshift(item.al.picUrl)
      store.state.artist_list.unshift(item.ar[0].name)
      console.log(store.state.name_list);
      
      playMusic(store,true,item.id)
    }

    let after_play = (item:any)=>{
      
      store.state.name_list.push(item.name)
      store.state.cover_list.push(item.al.picUrl)
      store.state.artist_list.push(item.ar[0].name)
      console.log(store.state.name_list);
      afterPlay(store,item.id)
    }

    let top_play = (data:any)=>{
      store.state.musicList = [] //清空播放列表
      store.state.name_list = []
      store.state.cover_list = []
      store.state.artist_list = []
      for(let item of data){
        after_play(item)
      }
      
      playMusic(store,false,store.state.musicList[0])
    }
    
    return {
      top_list,
      list_part1,
      list_part2,
      now_top,
      change_top,
      active_top,
      updateFrequency,
      tracks,
      play,
      after_play,
      top_play,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .top{
    display: flex;
    justify-content: center;
    background: #f5f5f5;
    flex-wrap: wrap;

    .left{
      padding-top: 40px;
      background: #f5f5f5;
      width: 17.6rem;
      border-left: 1px solid #ccc;
      .title{
        padding: 0 10px 12px 15px;
        font-weight: bold;
        font-size: 16px;
      }
      ul{
        list-style: none;
        font-size: 12px;
        width: 100%;
        li{
          width: 100%;
          height: 42px;
          padding: 10px 0;
          padding-left: 20px;
          display: flex;
          transition: .4s;
          cursor: pointer;
          &:hover{
            background: rgb(224, 224, 224);
          }
          
          img{
            width: 40px;
          }
          .info{
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 10px;
            .update{
              color: #999;
            }
          }
        }
        .active{
          background: rgb(200, 200, 200);
        }
      }
    }
    .right{
      padding-top: 40px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      background: rgb(255, 255, 255);
      width: 52rem;
   
      
      .info{
        width: 90%;
        height: 158px;
        padding: 0 5%;
        display: flex;
        align-items: center;
        
        .cover{
          width: 150px;
          height: 150px;
          padding: 3px;
          border: 1px solid #ccc;
          background: url('https://s2.music.126.net/style/web2/img/coverall.png?1c1ad1346ae266e8dd21269e9af33b44') no-repeat -230px -380px;
          display: flex;
          
          img{
            width: 100%;
          }
          
        }
        .top_info{
        
          width: 473px;
          height: 114px;
          margin-left: 30px;
          h2{
            margin: 0;
            margin-bottom: 8px;
            font-weight: 500;
            
          }
          img{
            width: 14px;
            vertical-align: middle;
          }
          span{
            vertical-align: middle;
            color: #666;
            font-size: 12px;
            .updateFrequency{
              color: #999;
            }
          }
          .btn_list{
            display: flex;
            height: 31px;
            margin-top: 20px;
            line-height: 30px;
            text-align: center;
            &>div{
              margin-right: 5px;
              cursor: pointer;
            }
            span{
              font-size: 10px;
              font-family: simsun,\5b8b\4f53;
            }
            .play{
              padding: 0 10px;
              background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') right -387px no-repeat;
              color: white;
             
              margin: 0;
              span{
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 2px;
                background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') 0 -1622px no-repeat;
              }
            }
            .add{
              padding: 0 5px 0 0 ;
              width: 31px;
              height: 31px;
              background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') 0 -1588px no-repeat;
              span{
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 2px;
                
              }
            }
            .collect{
              padding: 0 5px;
              background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') right -1020px no-repeat;
              span{
                display: inline-block;
                padding-left: 28px;
                height: 31px;
                
                padding-right: 4px;
                transform: translateY(-1.7px);
                background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') 0 -976px no-repeat;
              }
            }
            .share{
              padding: 0 5px;
              background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') right -1020px no-repeat;
              span{
                display: inline-block;
                padding-left: 28px;
                height: 31px;
                padding-right: 4px;
                transform: translateY(-1px);
                background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') 0 -1225px no-repeat;
              }
            }
            .download{
              padding: 0 5px;
              background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') right -1020px no-repeat;
              span{
                display: inline-block;
                padding-left: 28px;
                height: 31px;
                padding-right: 4px;
                transform: translateY(-1px);
                background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') 0 -2761px no-repeat;
              }
            }
            .comment{
              padding: 0 5px;
              background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') right -1020px no-repeat;
              span{
                display: inline-block;
                padding-left: 28px;
                height: 31px;
                padding-right: 4px;
                transform: translateY(-1px);
                background: url('https://s2.music.126.net/style/web2/img/button2.png?6b56b78f2cdea9673ddb678f20764628') 0 -1465px no-repeat;
              }
            }
          }
        }
      }
      .contentBox{
        
        table{
          width: 100%;
          border: 1px solid #d9d9d9;
          transform: translateY(-32px);
          border-collapse:collapse;
          thead{
            tr{
              
              th{
                color: #666;
                font-weight: 500;
                font-size: 12px;
                text-align: left;
                height: 38px;
                background-color: #f7f7f7;
                vertical-align: top;
                position: relative;
                padding: 0;
                &::after{
                  content: '';
                  position: absolute;
                  width: 10px;
                  height: 100%;
                  top: 50%;
                  
                  transform: translate(-25%,-50%);
                  background: url('https://s2.music.126.net/style/web2/img/table.png?bd6d570c50af0a1b1678514bd60e5496') 0 -55px no-repeat;
                }
                div{
                  padding: 8px;
                }
                background: url('https://s2.music.126.net/style/web2/img/table.png?bd6d570c50af0a1b1678514bd60e5496') 0 0 repeat-x;
                &:first-child{
                  width: 77px;
                  
                }
                &:nth-child(3){
                  width: 91px;
                }
                &:nth-child(4){
                  width: 26%;
                }
              }
            }
          }
          tbody{
            tr{
              &:nth-child(2n+1){
                background: rgb(240, 240, 240);    
              }
              td{
                padding: 6px 10px;
                font-size: 12px;
                color: #333;
                
                &:first-child{
                  width: 77px;
                  text-align: center;
                  color: #999;
                }
                &:nth-child(2){
                  img{
                    width: 50px;
                    height: 50px;
                    vertical-align: middle;
                  }
                  span{
                    vertical-align: middle;
                   
                  }
                  .songs_title{
                    cursor: pointer;
                    display: inline-block;
                    padding: 1px 25px;
                    padding-right: 5px;
                    margin-left: 10px;
                    background: url('https://s2.music.126.net/style/web2/img/table.png?bd6d570c50af0a1b1678514bd60e5496') 0 -103px no-repeat;
                    max-width: 49%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                  }
                  .other_title{
                    color: #aeaeae;
                  }
                }
                &:nth-child(3){
                  width: 91px;
                }
                &:nth-child(4){
                  width: 26%;
                }
              }
            }
            
          }
        }
      }
    }
    .bottom{
      img{
        width: 99vw;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>