<template>
<div class="mine_music">
  <div class="t0" v-if="!store.state.isLogin">
    <div class="t1">
      <div class="button" @click="store.state.isShowLoginBox=true"></div>
    </div>
  </div>
  <div class="content" v-else>
    <div class="left">
      <div class="left_box">
      <ul class="p1">
        <li class="title" :class="{active:active_title==title_list[0].name}" @click="change_title(title_list[0].name)">{{title_list[0].name}}({{singer_info.length}})</li>
        <li class="title" :class="{active:active_title==title_list[1].name}" @click="change_title(title_list[1].name)">{{title_list[1].name}}({{radio_info.length}})</li>
      </ul>
      <ul class="p2">
        <li :class="{showBox:isShowBox1}" >
          <h2 class="title"  @click="isShowBox1=!isShowBox1" ><span  class="arrow" ></span>{{title_list[2].name}}<span class="icon"></span>({{create_list.length}})<div class="create_button">新建</div></h2>
          <ul class="music_list">
            <li v-for="(item,index) in create_list" :key="index" :class="{active:active_index==index}" @click="change_index(index,item.id)">
              <img :src="item.coverImgUrl">
              <div class="info">
                <p class="name">{{item.name}}</p>
                <p class="count">{{item.trackCount}}首</p>
              </div>
            </li>
          </ul>
        </li>
        <li  :class="{showBox:isShowBox2}">
          <h2 class="title" @click="isShowBox2=!isShowBox2"><span class="arrow"></span>{{title_list[3].name}}<span class="icon"></span>({{collect_list.length}})</h2>
          <ul class="music_list">
            <li v-for="(item,index) in collect_list" :key="index" :class="{active:active_index==index+9999}" @click="change_index(index+9999,item.id)">
              <img :src="item.coverImgUrl">
              <div class="info">
                <p class="name">{{item.name}}</p>
                <p class="count">{{item.trackCount}}首</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      </div>
    </div>
    
    <div class="right">
      <content-box :title="active_title" rightText="" v-if="active_title=='我的歌手'">
        <ul>
          <li v-for="(item,index) in singer_info" :key="index">
            <img :src="item.picUrl" alt="">
            <div class="info">
              <p class="name">{{item.name}} <span>{{item.trans}}</span></p>
              <p class="size">{{item.albumSize}}个专辑 {{item.mvSize}}个MV</p>
            </div>
          </li>
        </ul>
      </content-box>
      <content-box :title="active_title" rightText="" v-if="active_title=='我的电台'">
        <ul>
          <li v-for="(item,index) in radio_info" :key="index">
            <img :src="item.picUrl" alt="">
            <div class="info">
              <p class="name">{{item.name}} <span>{{item.trans}}</span></p>
              <p class="size">by {{item.dj.nickname}}</p>
            </div>
            <div class="program_count">{{item.programCount}}期</div>
          </li>
        </ul>
      </content-box>
      <div class="musicList" v-else>
        <div class="top_info">
          <div class="cover">
            <img :src="current_musicList_info.coverImgUrl">
            <div class="mask"></div>
          </div>
          <div class="info">
            <h2><span></span>{{current_musicList_info.name}}</h2>
            <div class="creator">
              <img :src="current_musicList_creactor.avatarUrl" alt="">
              <span class="name">{{current_musicList_creactor.nickname}}</span>
              <span class="time">创建时间: {{new Date(current_musicList_info.createTime).toLocaleDateString()}}</span>
            </div>
            <div class="btn_list">
              <div class="play" @click="top_play(current_musicList)"><span></span>播放</div>
              <div class="add"><span></span></div>
              <div class="collect"><span>收藏</span></div>
              <div class="share"><span>分享</span></div>
              <div class="download"><span>下载</span></div>
              <div class="comment"><span>评论</span></div>
            </div>
            <div class="tag" v-if="current_musicList_info.tags!=''">
              标签:
              <span v-for="item in current_musicList_info.tags" :key="item">{{item}}</span>
            </div>
            <div class="description" v-if="current_musicList_info.description">
              介绍: {{current_musicList_info.description}}
            </div>
          </div>
          
        </div>
        <div class="list">
          <div class="head">
            <h3>歌曲列表</h3>
            <span class="count">{{current_musicList_info.trackCount}}首歌</span>
            <span class="playCount">播放: <span>{{current_musicList_info.playCount}}</span>次</span>
          </div>
          <div class="content">
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
                <tr class="hot" v-for="(item,index) in current_musicList.slice(0,3)" :key="index">
                  <td>
                    <div>{{index+1}}</div>
                  </td>
                  <td>
                    <div>
                      <img :src="item.al.picUrl">
                      <span class="songs_title" @click="play(item)">{{item.name}}</span>
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
                <tr v-for="(item,index) in current_musicList.slice(3)" :key="index">
                  <td>
                    <div>{{index+4}}</div>
                  </td>
                  <td>
                    <div>
                      
                      <span class="songs_title" @click="play(item)" >{{item.name}}</span>
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
          </div>
        </div>
      </div>
    </div>
  </div>
 
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref 
} from 'vue';
import {useStore} from 'vuex'
import {get_data} from '../../network/request'
import contentBox from '../../components/context/ContentBox.vue'
import {playMusic,afterPlay } from '../../network/playMusic'

export default defineComponent({
  name: '',
  components:{ contentBox },
  props: {
  },
  
  setup(){
    let store = useStore()
    let id =store.state.current_account.id;
    let cookie = localStorage.getItem('cookie')
    let title_list = [
      {
        name:'我的歌手',
        url:'/artist/sublist'
      },
      {
        name:'我的电台',
        url:'/dj/sublist'
      },
      {
        name:'创建的歌单',
        url:'/user/playlist'
      },
      {
        name:'收藏的歌单',
        url:'/user/playlist'
      },
    ]
    let active_title:any  = ref()
    let change_title = (name:string)=>{
      active_title.value = name
    }
    let active_index:any  = ref(0)
    let current_musicList_info:any  = ref({})
    let current_musicList:any  = ref([])
    let current_musicList_creactor:any  = ref({})
    let change_index = (index:number,id:number)=>{
      change_title('')
      active_index.value = index
      get_data().get('/playlist/detail',{params:{
        'id':id,
        'cookie':cookie
      }}).then(res=>{
        console.log(res.data);
        current_musicList_info.value = res.data.playlist
        current_musicList.value = res.data.playlist.tracks
        current_musicList_creactor.value = res.data.playlist.creator
      })
    }
    
    let singer_info:any  = ref([])
    get_data().get('/artist/sublist',{params:{
      'cookie':cookie,
      'uid':id
    }}).then(res=>{
      console.log(res.data);
      singer_info.value = res.data.data
    })

    let radio_info:any  = ref([])
    get_data().get('/dj/sublist',{params:{
      'cookie':cookie,
      
    }}).then(res=>{
      console.log(res.data);
      radio_info.value = res.data.djRadios
    })

    let create_list:any = ref([])
    let collect_list:any = ref([])
    get_data().get('/user/playlist',{params:{
      'cookie':cookie,
      'uid':id
    }}).then(res=>{
      console.log(res.data);
      for(let item of res.data.playlist){
        if(!item.subscribed){
          create_list.value.push(item)
        }else{
          collect_list.value.push(item)
        }
      }
      console.log(create_list.value[0]);
      change_index(0,create_list.value[0].id)
    })
    
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
      return afterPlay(store,item.id)
    }

    let top_play = (data:any)=>{
      store.state.musicList = [] //清空播放列表
      store.state.current_index = 0  //重置歌单播放进度
      store.state.name_list = []
      store.state.cover_list = []
      store.state.artist_list = []
      for(let item of data){
        after_play(item)
      }
      
      playMusic(store,false,store.state.musicList[0].id)
    }
   
    let isShowBox1 = ref(false)
    let isShowBox2 = ref(false)
  
    return {
      store,
      singer_info,
      radio_info,
      create_list,
      collect_list,
      title_list,
      active_title,
      change_title,
      active_index,
      change_index,
      current_musicList_info,
      current_musicList,
      current_musicList_creactor,
      play,
      after_play,
      top_play,
      isShowBox1,
      isShowBox2,
    };
  },
  

});
</script>

<style lang="scss" scoped>
  .mine_music{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: absolute;
    top: 5.4rem;
    left: 50%;
    transform: translateX(-50%);
    .t0{
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      background: white;
      width: 69.6rem;
      height: 700px;
      
      .t1{
        width: 807px;
        height: 268px;
        margin: 0 auto 0;
        padding-top: 104px;
        background: url('https://s2.music.126.net/style/web2/img/mymusic.png?916d7680265829e81c52aad77d036851') 0 0 no-repeat;
        background-position: 0 104px;
        position: relative;
        .button{
          width: 168px;
          height: 45px;
          background:white;
          opacity: 0;
          position: absolute;
          bottom: 22px;
          right: 158px;
          cursor: pointer;
          &:hover{
            opacity: 0.1;
          }
        }
      }
      
      
    }
    .content{
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      
      width: 69.6rem;
     
      .left{
        
        
        border-right: 1px solid #ccc;
        width: 240px;
        height: 938px;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        padding-bottom: 50px;
        padding-top: 40px;
        .left_box{
        
        
        
        
        
        
        ul{
          .title{
            height: 36px;
            line-height: 36px;
            color: #333;
            font-weight: bold;
            font-size: 16px;
            padding: 0 5px 2px 35px;
            cursor: pointer;
          }
        }
        .p1{
          li{
            transition: .3s;
            &:hover{
              background: #e3e3e3;
            }
          }
          .active{
            background: #e3e3e3;
          }
        }
        .p2{
          .showBox{
            .arrow{
              transform: rotate(-90deg);
            }
            .music_list{
              height: 0;
              
              overflow: hidden;
              
            }
          }
          li{
            
            .title{
              padding-left:14px;
            }
            h2{
              margin: 0;
              position: relative;
              .arrow{
                border-color: #ccc transparent transparent;
                border-style: solid dashed dashed;
                border-width: 8px 7px 0;
                display: inline-block;
                vertical-align: middle;
                margin: 0 2px 0 5px;
                cursor: pointer;
                font-size: 0;
                height: 0;
                line-height: 0;
              }
              
              .icon{
                background: url('https://s2.music.126.net/style/web2/img/black-r-icon@3x.png?80e077e4b64abb03397d54dc49513213') 0 0 no-repeat;
                display: inline-block;
                width: 8px;
                height: 8px;
                background-size: cover;
                transform: translateY(-10px);
              }
              .create_button{
                display: inline-block;
                width: 40px;
                height: 22px;
                background: url('https://s2.music.126.net/style/web2/img/button.png?84fa9e172b4240fedf0ca86c3b94ef71') 0 -96px no-repeat;
                transform: translate(10px,6px);
                line-height: 22px;
                cursor: pointer;
                overflow: hidden;
                padding-left: 20px;
                color: #515151;
                font-size: 12px;
                font-weight: normal;
              }
            }
            .music_list{
              li{
                height: 42px;
                padding: 6px 0 6px 20px;
                cursor: pointer;
                display: flex;
                font-size: 12px;
                transition: .3s;
                &:hover{
                  background: #e3e3e3;
                }
                
                img{
                  width: 40px;
                  height: 40px;
                }
                .info{
                  margin-left: 10px;
                  .name{
                    width: 150px;
                    
                    margin-top: 2px;
                    margin-bottom: 8px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                  }
                  .count{
                    color: #999;
                  }
                }
                
              }
              .active{
                background: #e3e3e3;
              }
            }
          }
        }
        }
      }
      
      .right{
        float: right;
        width: calc(100% - 240px);
        background: white;
        height: 100vh;
        .contentBox{

          ul{
            list-style: none;
            width: 100%;
            transform: translateY(-30px);
            li{
              padding: 10px 0;
              border-bottom: 1px solid #ddd;
              display: flex;
              width: 100%;
              position: relative;
              img{
                width: 80px;
                height: 80px;
              }
              .info{
                margin-left: 20px;
                .name{
                  height: 21px;
                  margin: 10px 0;
                  line-height: 21px;
                  color: #333;
                  font-size: 16px;
                  font-weight: bold;
                  span{
                    font-size: 12px;
                    color: #999;
                  }
                }
                .size{
                  font-size: 12px;
                  color: #666;
                }
              }
              .program_count{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0;
                font-size: 12px;
                color: #999;
              }
            }
          }
        }
        .musicList{
          float: left;
         
          width: 100%;
          background: white;
          .top_info{
            padding: 40px;
            display: flex;
            .cover{
              position: relative;
              img{
                width: 200px;
              }
              .mask{
                width: 208px;
                height: 208px;
                position: absolute;
                background: url('https://s2.music.126.net/style/web2/img/coverall.png?943446a025520203ae9ff9c4671edabd') 0 -1285px no-repeat;
                top: -4px;
                left: -4px;
              }
            }
            .info{
              margin-left: 30px;
              
              h2{
                margin: 0px 0 16px 0;
                line-height: 24px;
                font-size: 20px;
                font-weight: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
                &>span{
                  display: inline-block;
                  background: url('https://s2.music.126.net/style/web2/img/icon.png?5d1a377f6cd2c9f8c10fbd5dfa9c45b4') 0 0 no-repeat;
                  width: 54px;
                  height: 24px;
                  background-position: 0 -243px;
                  overflow: hidden;
                  vertical-align: middle;
                }
              }
              .creator{
                margin: 0 0 20px;
                // line-height: 35px;
                img{
                  width: 35px;
                  height: 35px;
                  margin-right: 10px;
                  vertical-align: middle;
                }
                span{
                  font-size: 12px;
                  
                }
                .name{
                  color: #0c73c2;
                  max-width: 210px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  word-wrap: normal;
                }
                .time{
                  margin-left: 15px;
                  color: #999;
                }
              }
              .btn_list{
                width: 500px;
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
                    vertical-align: middle;
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
              .tag{
                margin: 25px 0 5px;
                line-height: 22px;
                font-size: 12px;
                color: #666;
                &>span{
                  display: inline-block;
                  width: 50px;
                  height: 22px;
                  line-height: 22px;
                  border: 1px solid rgb(184, 184, 184);
                  border-radius: 10px;
                  background: #f3f3f3;
                  text-align: center;
                  margin: 0px 10px 3px 0;
                }
              }
              .description{
                width: 500px;
                height: 76px;
                margin-top: 4px;
                line-height: 18px;
                color: #666;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                word-wrap: normal;
                
              }
            }
          }
          .list{
            width: 100%;
            .head{
              padding: 0 18px 0 32px;
              height: 33px;
              border-bottom: 2px solid #c20c0c;
              h3{
                font-size: 20px;
                line-height: 28px;
                font-weight: normal;
                float: left;
                margin: 0;
              }
              .count{
                margin: 9px 0 0 20px;
                font-size: 12px;
                color: #666;
                float: left;
              }
              .playCount{
                float: right;
                font-size: 12px;
                color: #666;
                margin-top: 5px;
                &>span{
                  color: #c20c0c;
                }
              }
            }
            &>.content{
              width: 100%;
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
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          max-width: 49%;
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