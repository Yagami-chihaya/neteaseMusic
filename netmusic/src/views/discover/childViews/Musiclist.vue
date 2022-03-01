<template>
<div class="musicList">
  <div class="content">
    <div class="title">
      <div class="left">
        <h2>全部</h2>
        <div class="choose_category" @click="isShowBox=!isShowBox"><span>选择分类</span><p class="down" :style="{transform:isShowBox? 'rotate(-90deg) translateX(3px)':''}"></p></div>
      </div>
      <div class="right">热门</div>
    </div>
    <div class="list_box">
      <div class="item" v-for="(item,index) in list_data" :key="index">
        <div class="cover">
          <img :src="item.coverImgUrl">
          <div class="mask"></div>
          <div class="info">
            <img src="../../../assets/img/耳机.png">
            <span>{{ (item.playCount/10000).toFixed(2)}}万</span>
            <img class="play" @click="hot_recommend_play(item.id)" src="../../../assets/img/播放.png">
          </div>
        </div>
        <p class="title">{{item.name}}</p>
        <p class="author"><span>by </span>{{item.creator.nickname}}</p>
        
      </div>
      <el-pagination @current-change="page_change" background layout="prev, pager, next" :total="total" :page-size=35>
      </el-pagination>
    </div>
    <div class="category_box" v-show="isShowBox">
      <div class="box_top">
        <span></span>
      </div>
      <div class="box_content">
        <h3>
          <div class="all">全部风格</div>
        </h3>
        <ul>
          <li v-for="(item,index) in category_type" :key="index">
            <p class="type_title">
              <span :style="{backgroundPosition:icon_pos[index]}"></span>
              {{item}}
            </p>
            <div class="type_categories">
              <div v-for="(item2,index2) in categories" v-show="item2.category==index" :key="index2">
                <span @click="change_category(item2.name)">{{item2.name}}</span>
                <span class="line">|</span>
              </div>
              
            </div>
          </li>
        </ul>
      </div>
      <div class="box_foot"></div>
    </div>
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
import {get_data} from '../../../network/request'
import {playMusic,afterPlay} from '../../../network/playMusic'
import {useStore} from 'vuex'

export default defineComponent({
  name: '',
  components:{  },
  
  
  setup(){
    let list_data = ref()
    let total = ref(0)
    let current_category = ref('')
    let categories = ref()
    let category_type = ref()
    let icon_pos = ['-20px -735px','0 -60px','0 -88px','0 -117px','0 -141px']
    let store = useStore()
    get_data().get('/playlist/catlist').then(res=>{
      category_type.value = res.data.categories
      categories.value = res.data.sub
    })
    let get = (limit:Number,offset:Number,order='',cat:string)=>{
      if(!store.state.isLogin){
        get_data().get('/top/playlist',{params:{
          'order':order,
          'cat':cat,
          'limit':limit,
          'offset':offset
        }}).then(res=>{
          console.log(res.data);
          list_data.value = res.data.playlists
          total.value = res.data.total
          console.log(total.value);
          
        })
      }else{
        get_data().get('/top/playlist',{params:{
          'cookie':localStorage.getItem('cookie'),
          'order':order,
          'cat':cat,
          'limit':limit,
          'offset':offset
        }}).then(res=>{
          console.log(res.data);
          list_data.value = res.data.playlists
          total.value = res.data.total
          console.log(total.value);
          
        })
      }
      
    }
    get(35,0,'','全部')

    
    let after_play = (item:any)=>{
      store.state.current_play_music=item.id
      store.state.name_list.push(item.name)
      store.state.cover_list.push(item.al.picUrl)
      store.state.artist_list.push(item.ar[0].name)
      console.log(store.state.name_list);
      afterPlay(store)
    }
    let hot_recommend_play = (id:number)=>{  //播放热门歌单
      store.state.musicList = [] //清空播放列表
      store.state.name_list = []
      store.state.cover_list = []
      store.state.artist_list = []
      get_data().get('/playlist/track/all',{params:{id}}).then(res=>{
        for(let item of res.data.songs){
          after_play(item)
        } 
        playMusic(store)
      })
      console.log(store.state.musicList);
      
    }

    let page_change = (page:any)=>{
      get(35,(page-1)*35,'',current_category.value)
    }

    let change_category = (name:string)=>{
      current_category.value = name
      console.log(current_category.value);
      isShowBox.value = false
      get(35,0,'',current_category.value)
    }

    let isShowBox = ref(false)
    return {
      list_data,
      store,
      after_play,
      hot_recommend_play,
      total,
      page_change,
      current_category,
      categories,
      category_type,
      icon_pos,
      isShowBox,
      change_category,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .musicList{
    
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .content{
      width: 900px;
      padding: 40px;
      background: white;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      position: relative;
      &>.title{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #c20c0c;
        .left{
          display: flex;
          
          h2{
            margin: 0;
            width: 48px;
            height: 31px;
            line-height: 31px;
            text-align: center;
            font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
            font-weight: 500;
            font-size: 24px;
          }
          .choose_category{
            cursor: pointer;
            width: 91px;
            height: 31px;
            border-radius: 5px;
            margin-left: 12px;
            margin-top: 2px;
            font-size: 12px;
            position: relative;
            background: url('https://s2.music.126.net/style/web2/img/button2.png?7dee7e9c4b2af6e8584d52b923461235') right -100px no-repeat;
            span{
              display: inline-block;
              color: #0c73c2;
              width: 61px;
              height: 31px;
              line-height: 31px;
              
              padding: 0 10px 0 15px;
              background: url('https://s2.music.126.net/style/web2/img/button2.png?7dee7e9c4b2af6e8584d52b923461235') 0 -59px no-repeat;
            }
            .down{
              display: inline-block;
              width: 8px;
              height: 5px;
              position: absolute;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
              background: url('https://s2.music.126.net/style/web2/img/icon.png?67f5af3788f5fefc54aa589a8bdbf029') -70px -543px no-repeat;
            }
          }
        }
        .right{
          color: white;
          width: 46px;
          height: 29px;
          line-height: 29px;
          text-align: center;
          border-radius: 3px;
          
          background: url('https://s2.music.126.net/style/web2/img/button.png?09524dee53b7ba26df496a04ac0597df') 0 0 no-repeat;
        }
      }
      .list_box{
        width: 950px;
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .item{
          width: 140px;
          height: 188px;
          overflow: hidden;
          margin: 0 50px 30px 0;
          line-height: 1.4;
          .cover{
            width: 140px;
            height: 140px;
            position: relative;
            &>img{
              width: 100%;
              z-index: -1;
            }
            .mask{
              position: absolute;
              top: 0;
              left: 0;  
              width: 100%;
              height: 100%;
              background: url('https://s2.music.126.net/style/web2/img/coverall.png?9c2d4eb53358db7eba15815e2259af92' ) 0 0 no-repeat ;
            }
            .info{
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 27px;
              display: flex;
              align-items: center;
              background: rgba(0, 0, 0, 0.5);
              img{
                width: 14px;
                padding: 0 10px;
              }
              span{
                color: #ccc;
                font-size: 12px;
              }
              .play{
                position: absolute;
                right: 0;
                width: 18px;
                opacity: .6;
                cursor: pointer;
                &:hover{
                  transition: .3s;
                  opacity: 1;
                }
              }
              
            }
          } 
          .title{
            width: 100%;
            margin: 6px 0px 0px 0px;
            font-size: 14px;
            display: inline-block;
            max-width: 100%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          .author{
            font-size: 12px;
            span{
              color: #999;
            }
            color: #666;

          }
        }
        .el-pagination{

        }
      }
      .category_box{
        position: absolute;
        left: 0;
        top: 75px;
        z-index: 5;
        width: 720px;
        .box_top{
          height: 32px;
          background: url('https://s2.music.126.net/style/web2/img/sltlyr.png?21c319d39b116d3bd5fd6b884205bd9d') no-repeat;
          span{
            position: absolute;
            top: 2px;
            left: 132px;
            display: inline-block;
            width: 24px;
            height: 11px;
            background: url('https://s2.music.126.net/style/web2/img/iconall.png?fa587b35419798bc2fd994de3dde40ae') no-repeat -48px 0;
          }
        }
        .box_content{
          width: 700px;
          
          padding: 0 10px;
          background: url('https://s2.music.126.net/style/web2/img/sltlyr.png?21c319d39b116d3bd5fd6b884205bd9d');
          background-position: -720px 0;
          background-repeat: repeat-y;
          h3{
            margin: 0;
            height: 37px;
            padding-left: 26px;
            border-bottom: 1px solid #e6e6e6;
            font-weight: normal;
            .all{
              background: url('https://s2.music.126.net/style/web2/img/button.png?09524dee53b7ba26df496a04ac0597df') 0 -64px no-repeat;
              width: 72px;
              height: 26px;
              text-align: center;
              line-height: 26px;
              font-size: 12px;
              border-right: 2px solid #e6e6e6;
            }
          }
          ul{
            list-style: none;
            
            li{
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;
              
              .type_title{
                padding-top: 10px;
                width: 70px;
                height: 27px;
                line-height: 27px;
                
                font-weight: bold;
                font-size: 12px;
                
                margin-left: 26px;
                display: flex;
                align-items: center;
                span{
                  width: 23px;
                  height: 23px;
                  display: inline-block;
                  margin-right: 8px;
                  margin-bottom: 4px;
                  background: url('https://s2.music.126.net/style/web2/img/icon.png?67f5af3788f5fefc54aa589a8bdbf029') 0 0 no-repeat;
                  
                }
              }
              .type_categories{   
                
                width: 578px;
                padding:0 12px;
                padding-top: 10px;
                padding-bottom: 10px;
                line-height: 24px;
                border-left: 1px solid #e6e6e6;
                &>div{

                  display: inline-block;
                }
                span{
                  cursor: pointer;
                  
                  font-size: 12px;
                  color: #333;
                  &:hover{
                    text-decoration: underline;
                  }
                }
                .line{
                  margin: 0 12px 0 6px;
                  color: #d8d8d8;
                }
              }
            }
          }
        }
        .box_foot{
          height: 20px;
          background: url('https://s2.music.126.net/style/web2/img/sltlyr.png?21c319d39b116d3bd5fd6b884205bd9d') -1440px -12px no-repeat;
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