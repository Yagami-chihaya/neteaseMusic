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
        <li>
          <h2 class="title"><span class="arrow"></span>{{title_list[2].name}}<span class="icon"></span>({{create_list.length}})<div class="create_button">新建</div></h2>
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
        <li>
          <h2 class="title"><span class="arrow"></span>{{title_list[3].name}}<span class="icon"></span>({{collect_list.length}})</h2>
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
          </div>
          <div class="info">
            <h2><span></span>{{current_musicList_info.name}}</h2>
            <div class="creator">
              <img src="" alt="">
              <span class="name">{{current_musicList_creactor.nickname}}</span>
              <span class="time">{{current_musicList_info.createTime}}</span>
            </div>
            <div class="btn_list">

            </div>
            <div class="tag">
              标签:
              <span v-for="item in current_musicList_info.tags" :key="item">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="list">

        </div>
      </div>
    </div>
  </div>
  <div class="bottom" style="overflow:hidden">
    <img src="../../assets/img/bottom.png">
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
    let active_title = ref()
    let change_title = (name:string)=>{
      active_title.value = name
    }
    let active_index = ref(0)
    let current_musicList_info = ref({})
    let current_musicList = ref({})
    let current_musicList_creactor = ref({})
    let change_index = (index:number,id:number)=>{
      active_index.value = index
      get_data().get('/playlist/detail',{params:{
        'id':id,
        'cookie':cookie
      }}).then(res=>{
        console.log(res.data);
        current_musicList_info.value = res.data.playlist
        current_musicList.value = res.data.privileges
        current_musicList_creactor.value = res.data.playlist.creator
      })
    }
    
    let singer_info = ref([])
    get_data().get('/artist/sublist',{params:{
      'cookie':cookie,
      'uid':id
    }}).then(res=>{
      console.log(res.data);
      singer_info.value = res.data.data
    })

    let radio_info = ref([])
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
    };
  },
  

});
</script>

<style lang="scss" scoped>
  .mine_music{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: #f5f5f5;
    
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
      height: auto;
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
                    overflow: hidden;
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
        height: 800px;
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
          float: right;
          width: calc(100% - 240px);
          background: white;
          .top_info{
            .cover{
              img{
                width: 200px;
              }
              .mask{
                width: 200px;
                height: 200px;
                
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