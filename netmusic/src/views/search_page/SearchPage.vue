<template>
<div class="searchBox">
  
  <div class="content">
    <div class="t1">
      <div class="search_box">
        <input type="text" v-model="search_text">
 
        <a class="search_icon" @click="get_search_data(active_type.type,search_text,30,0)"></a>
      </div>
      <div class="little_info">
        搜索"{{search_text}}",找到 <span class="count">{{songs_count}}</span> {{active_type.s}}{{active_type.name}}
      </div>
      <ul class="type_list">
        <li v-for="(item,index) in type_list" :key="index" @click="change_type(index)" :class="{active:active_index==index}">{{item.name}}</li>
      </ul>
      <div class="list">
        <div class="item" v-for="(item,index) in songs_list" :key="index">
          <span class="play" @click="play(item)"></span>
          <div class="t2">
            <span class="name">{{item.name}}</span>
            <span class="mv"></span>
            <span class="other">{{item.alia}}</span>
          </div>
          
          <span class="artist">{{item.artists[0].name}}</span>
          <span class="album">《{{item.album.name}}》</span>
          <span class="time">{{Math.floor(item.duration/1000)/60>=10?Math.floor(Math.floor(item.duration/1000)/60):'0'+Math.floor(Math.floor(item.duration/1000)/60)}}:{{Math.floor(item.duration/1000)%60>=10?Math.floor(item.duration/1000)%60:'0'+Math.floor(item.duration/1000)%60}}</span>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" :total="songs_count" :page-size="30" @current-change="page_change">
      </el-pagination>
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
import {get_data} from '../../network/request'
import {useStore} from 'vuex'
import {playMusic} from '../../network/playMusic'

export default defineComponent({
  name: '',
  components:{  },
  props: {
  },
  
  setup(){
    let store = useStore()
    let type_list = [
      {
        name:'单曲',
        s:'首',
        type:1,
      },
      {
        name:'歌手',
        s:'个',
        type:10,
      },
      {
        name:'专辑',
        s:'张',
        type:100,
      },
      {
        name:'视频',
        s:'个',
        type:1000,
      },
      {
        name:'歌词',
        s:'个',
        type:10000,
      },
      {
        name:'歌单',
        s:'个',
        type:100000,
      },
      {
        name:'声音主播',
        s:'个',
        type:1000000,
      },
      {
        name:'用户',
        s:'个',
        type:10000000,
      },
    ]
    let active_type:any  = ref(type_list[0])
    let active_index:any  = ref(0)
    let songs_list:any  = ref([])
    let songs_count:any  = ref(0)
    let search_text:any  = ref(store.state.input_text)
    let get_search_data = (type:number,keywords:string,limit:number,offset:number)=>{
      if(!keywords) return 0
      get_data().get('/search',{params:{type,keywords,limit,offset}}).then(res=>{

        console.log(res);
        songs_list.value = res.data.result.songs
        songs_count.value = res.data.result.songCount
      })
    }
    
    get_search_data(active_type.value.type,search_text.value,30,0)
    let change_type = (index:number)=>{
      active_index.value = index
    }
    let page_change = (page:any)=>{
      console.log(page);
      
      get_search_data(active_type.value.type,search_text.value,30,(page-1)*30)
    }
    let play = (item:any)=>{
      
      
      console.log(item);
      
      store.state.name_list.unshift(item.name)
      // store.state.cover_list.unshift(item.al.picUrl||undefined)
      store.state.artist_list.unshift(item.artists[0].name)
   
      
      playMusic(store,true,item.id)
    }

    return {
      store,
      active_type,
      type_list,
      active_index,
      change_type,
      songs_list,
      songs_count,
      get_search_data,
      search_text,
      page_change,
      play,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .searchBox{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    
    .content{
      background: white;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      
      width: 69.6rem;
      .t1{
        padding: 40px;
        .search_box{
          width: 420px;
          height: 40px;
          background: url('https://s2.music.126.net/style/web2/img/sprite.png?76c151b92e9ff36e92959f65b3c565b5') 0 0 no-repeat;
          background-position: 0 0;
          margin: 0 auto;
          z-index: 10;
          input{
            float: left;
            width: 320px;
            height: 17px;
            margin: 12px 0 0 20px;
            padding: 0;
            background: #fff;
            border: none;
            outline: none;
          }
          .search_icon{
            display: inline-block;
            float: right;
            width: 50px;
            height: 40px;
            background: white;
            opacity: 0;
            transition: .2s;
            cursor: pointer;
            &:hover{
              opacity: .2;
            }
          }
      
        }
        .little_info{
          margin: 28px 0 17px;
          color: #999;
          font-size: 12px;
          .count{
            color: #c20c0c;
          }
        }
        .type_list{
          height: 39px;
          border: 1px solid #ccc;
          border-width: 0 1px;
          background: url('https://s2.music.126.net/style/web2/img/tab.png?74f2aa97351b8c36722b078a1394a6ee');
          background-position: 0 0;
          background-repeat: repeat-x;
          list-style: none;
          display: flex;
          justify-content: space-evenly;
          li{
            height: 39px;
            
                
            width: 127px;
            padding: 2px 2px 0 0;
            line-height: 39px;
            cursor: pointer;
            text-align: center;
            &:hover{
              background: url('https://s2.music.126.net/style/web2/img/tab.png?74f2aa97351b8c36722b078a1394a6ee') left -90px no-repeat;
            
            }

          }
          .active{
            background: url('https://s2.music.126.net/style/web2/img/tab.png?74f2aa97351b8c36722b078a1394a6ee') left -90px no-repeat;
          }
        }
        .list{
          margin-top: 20px;
          .item{
            padding: 10px 10px 8px 18px;
            border: 1px solid #fff;
            display: flex;
            
            align-items: center;
            span{
              font-size: 12px;
              color: #333;
            }
            .play{
              display: inline-block;
              width: 17px;
              height: 17px;
              margin-right: 15px;
              cursor: pointer;
              background: url('https://s2.music.126.net/style/web2/img/table.png?0a9a812876b42b86a3090eff4cb0f419') 0 0 no-repeat;
              background-position: 0 -103px;
            }
            .t2{
              width: 50%;
              overflow: hidden;
              .name{
                max-width: 49%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                vertical-align: middle;
              }
              .mv{
                display: inline-block;
                background: url('https://s2.music.126.net/style/web2/img/table.png?0a9a812876b42b86a3090eff4cb0f419') 0 -151px no-repeat;
                width: 23px;
                height: 17px;
                padding-left: 5px;
                vertical-align: middle;
              }
              .other{
                color: #999;
                max-width: 39%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            
            .artist{
              width: 200px;
            }
            .album{
              color: #666;
              width: 200px;
            }
            
            &:nth-child(2n-2){
              background: #f7f7f7;
              border-color: #f7f7f7;
            }
          }
        }
        .el-pagination{
          text-align: center;
          margin-left: 50%;
          margin-top: 30px;
          transform: translateX(-50%);
          margin-bottom: 50px;
        }
      }
    }

  }
</style>