<template>
<div class="newDVD">
  <div class="content">
    <content-box title="热门新碟" rightText="更多>">
      <ul>
        <li v-for="(item,index) in hot_newDVD" :key="index">
          <div class="cover">
            <img :src="item.picUrl" alt="">
            <div class="mask"></div>
            <div class="play" @click="DVD_play(item.id)"></div>
          </div>
          <p class="name">{{item.name}}</p>
          <p class="artist">{{item.artists[0].name}}</p>
        </li>
      </ul>
    </content-box>
    <content-box class="all_newDVD" title="全部新碟" rightText="更多>">
      <div class="category"><span v-for="(item,index) in area" :key="index" @click="change_category(item.n)">{{item.name}}<span class="line">|</span></span></div>
      <ul>
        <li v-for="(item,index) in all_newDVD" :key="index">
          <div class="cover">
            <img :src="item.picUrl" alt="">
            <div class="mask"></div>
            <div class="play" @click="DVD_play(item.id)"></div>
          </div>
          <p class="name">{{item.name}}</p>
          <p class="artist">{{item.artists[0].name}}</p>
        </li>
      </ul>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="35" @current-change="changePage">
      </el-pagination>
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
import {get_data } from '../../../network/request'
import {playMusic,afterPlay} from '../../../network/playMusic'
import {useStore} from 'vuex'

export default defineComponent({
  name: '',
  components:{ contentBox },
  props: {
  },
  
  setup(){
    let hot_newDVD = ref([])
    let all_newDVD = ref([])
    let total = ref(0)
    let current_page = ref(0)
    let current_area = ref('')
    let area = [
      {
        name:'全部',
        n:'ALL'
      },
      {
        name:'华语',
        n:'ZH'
      },
      {
        name:'欧美',
        n:'EA'
      },
      {
        name:'日本',
        n:'JP'
      },
      {
        name:'韩国',
        n:'KR'
      }
    ]
    get_data().get('/album/newest').then(res=>{
      console.log(res.data);
      
      hot_newDVD.value = res.data.albums.slice(0,10)
    })
    let get_all_newDVD = (area:string,limit:number,offset:number)=>{
      get_data().get('/album/new',{params:{
        'area':area,
        'limit':limit,
        'offset':offset
      }}).then(res=>{
        console.log(res.data);
        all_newDVD.value = res.data.albums
        total.value = res.data.total
        
        
      })
    }
    get_all_newDVD('',35,0)
    let change_category = (area:string)=>{
      current_area.value = area
      current_page.value = 1
      get_all_newDVD(current_area.value,35,(current_page.value-1)*35)
    }
    let changePage = (page:number)=>{
      current_page.value = page
      get_all_newDVD(current_area.value,35,(current_page.value-1)*35)
    }

    let store = useStore()
    
    let after_play = (item:any)=>{
      store.state.current_play_music=item.id
      store.state.name_list.push(item.name)
      store.state.cover_list.push(item.al.picUrl)
      store.state.artist_list.push(item.ar[0].name)
      console.log(store.state.name_list);
      afterPlay(store)
    }

    let DVD_play = (album_id:number)=>{
      store.state.musicList = [] //清空播放列表
      store.state.name_list = []
      store.state.cover_list = []
      store.state.artist_list = []
      get_data().get('album',{params:{'id':album_id}}).then(res=>{
        for(let item of res.data.songs){
          after_play(item)
        }
        playMusic(store)
      })
      
    }
    return {
      hot_newDVD,
      all_newDVD,
      total,
      get_all_newDVD,
      area,
      change_category,
      changePage,
      DVD_play,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .newDVD{
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .content{
      width: 69.6rem;
      padding: 10px;
      background: white;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      .contentBox{
        height: auto;
        ul{
          list-style: none;
          li{
            width: 153px;
            height: 178px;
            overflow: hidden;
            padding: 0 0 30px 50px;
            line-height: 1.4;
            float: left;
            cursor: pointer;
            &:hover{
              .cover{
                .play{
                  opacity: .6;
                }
              }
              
            }
            .cover{
              position: relative;
              width: 153px;
              height: 130px;
              img{
                width: 130px;
              }
              .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;                  
                background: url('https://s2.music.126.net/style/web2/img/coverall.png?943446a025520203ae9ff9c4671edabd') 0 -845px no-repeat;
              }
              .play{
                position: absolute;
                width: 28px;
                height: 28px;
                left: 94px;
                right: 10px;
                bottom: 5px;
                opacity: 0;
                transition: .3s;
                z-index: 5;
                &:hover{
                  opacity: 1;
                }
                background: url('https://s2.music.126.net/style/web2/img/iconall.png?5b828000cc13a6c1fc5b1ddad261d384') 0 -140px no-repeat;
              }
            }
            
            p{
              padding-top: 8px;
              max-width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .name{
              font-size: 14px;
              
            }
            .artist{
              font-size: 12px;
              color: #666;
            }
          }
        }
      }
      .all_newDVD{
        position: relative;
        .category{
          position: absolute;
          top: 1.8rem;
          left: 8rem;
          span{
            font-size: 12px;
            color: #666;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
          .line{
            margin: 0 10px;
            
            color: #c7c7c7;
          }
        }
        .el-pagination{

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