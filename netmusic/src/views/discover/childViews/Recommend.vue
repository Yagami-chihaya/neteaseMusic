<template>
<div class="recommend">
  
  <el-carousel height='20rem'>
    <el-carousel-item v-for="(item,index) in cover_data" :key="index">
      <div class="cover_box">
        <img :src="item.pic">
        
      </div>
      <img class="backboard" :src="item.pic">
      
    </el-carousel-item>
    <div class="download" >
      <img src="../../../assets/img/download.png">
      <div class="download_btn" @click="to('download')"></div>
    </div>
    
  </el-carousel>
  
 
    <div class="left">
      <div class="hot_recommend">
        <content-box title="热门推荐" :titleImg="require('../../../assets/img/circle1.png')" url="musicList" :otherTitle="['华语','流行','摇滚','民谣','电子']" rightText="更多>">
          <div class="item" v-for="(item,index) in hot_recommend" :key="index">
            <div class="cover">
              <img class="coverImg" :src="item.picUrl">
              <img class="filter" src="../../../assets/img/coverall.png">
              <div class="info">
                <img src="../../../assets/img/耳机.png">
                <span>{{ (item.playCount/10000).toFixed(2)}}万</span>
                <img class="play" @click="hot_recommend_play(item.id)" src="../../../assets/img/播放.png">
              </div>
              
            </div>
            <p class="title">{{item.name}}</p>
          </div>
        </content-box>
      </div>
      <div class="person_recommend" v-if="store.state.isLogin">
        <content-box title="个性化推荐" :titleImg="require('../../../assets/img/circle1.png')" rightText="">
          <div class="item" v-for="(item,index) in person_recommend.slice(0,4)" :key="index">
            <div class="cover">
              <img class="coverImg" :src="item.picUrl">
              <img class="filter" src="../../../assets/img/coverall.png">
              <div class="info">
                <img src="../../../assets/img/耳机.png">
                <span>{{ (item.playcount/10000).toFixed(2)}}万</span>
                <img class="play" @click="hot_recommend_play(item.id)" src="../../../assets/img/播放.png">
              </div>
              
            </div>
            <p class="title">{{item.name}}</p>
          </div>
        </content-box>
      </div>
      <div class="new_DVD">
        <content-box title='新碟上架' url="newDVD" :titleImg="require('../../../assets/img/circle1.png')" rightText="更多>">
          <div class="content">
            <div class="showBox">
              <div class="dvdBox" id="dvdBox">
                <div class="item" v-for="(item,index) in new_DVD_data" :key="index">
                  <div class="cover">
                    <img class="img" :src="item.blurPicUrl">
                    <img class="backboard" src="../../../assets/img/coverall.png">
                  </div>
                  
                  <p class="name">{{item.name}}</p>
                  <p class="artist">{{item.artist.name}}</p>
                </div>
              </div>
            </div>
          <img class="prev" @click="prev" src="../../../assets/img/左箭头.png">
          <img class="next" @click="next" src="../../../assets/img/左箭头.png">
        </div>
        </content-box>
        
        
      </div>
      <div class="topList">
        <content-box title="榜单" url="top" :titleImg="require('../../../assets/img/circle1.png')" rightText="更多>">
          <div class="content">
          <ul>
            <li>
              <div class="title">
                <div class="cover">
                  <img class="coverImg" src="../../../assets/img/18696095720518497.jpg">
                  <img class="board" src="../../../assets/img/coverall.png">
                </div>
                <div class="info">
                  <p>飙升榜</p>
                  <img class="btn" @click="top_play(top_data[0])" src="../../../assets/img/播放2.png">
                  <img class="btn" src="../../../assets/img/文件夹2.png">
                </div>
              </div>
              <ol class="musicList">
               
                <li v-for="(item,index) in top_data[0]" :key="index">
                  <span>{{index+1}}</span>
                  <p class="name">{{item.name}}</p>
                  
                  <div class="btnList">
                    <img class="btn" @click="play(item)" src="../../../assets/img/播放2.png">
                    <img class="btn" @click="after_play(item)" src="../../../assets/img/添加.png">
                    <img class="btn" src="../../../assets/img/文件夹2.png">
                  </div>
                  
                </li>
                <li class="check_all">查看全部></li>
              </ol>
            </li>
            <li>
              <div class="title">
                <div class="cover">
                  <img class="coverImg" src="../../../assets/img/18713687906568048.jpg">
                  <img class="board" src="../../../assets/img/coverall.png">
                </div>
                <div class="info">
                  <p>新歌榜</p>
                  <img class="btn" @click="top_play(top_data[1])" src="../../../assets/img/播放2.png">
                  <img class="btn" src="../../../assets/img/文件夹2.png">
                </div>
              </div>
              <ol class="musicList">
                <li v-for="(item,index) in top_data[1]" :key="index">
                  <span>{{index+1}}</span>

                  <p class="name">{{item.name}}</p>
                  
                  <div class="btnList">
                    <img class="btn" @click="play(item)" src="../../../assets/img/播放2.png">
                    <img class="btn" @click="after_play(item)" src="../../../assets/img/添加.png">
                    <img class="btn" src="../../../assets/img/文件夹2.png">
                  </div>
                </li>
                <li class="check_all">查看全部></li>
              </ol>
            </li>
            <li>
              <div class="title">
                <div class="cover">
                  <img  class="coverImg" src="../../../assets/img/18740076185638788.jpg">
                  <img class="board" src="../../../assets/img/coverall.png">
                </div>
                <div class="info">
                  <p>原创榜</p>
                  <img class="btn" @click="top_play(top_data[2])" src="../../../assets/img/播放2.png">
                  <img class="btn" src="../../../assets/img/文件夹2.png">
                </div>
                
                
              </div>
              <ol class="musicList">
                <li v-for="(item,index) in top_data[2]" :key="index">
                  <span>{{index+1}}</span>

                 <p class="name">{{item.name}}</p>
                  
                  <div class="btnList">
                    <img class="btn" @click="play(item)" src="../../../assets/img/播放2.png">
                    <img class="btn" @click="after_play(item)" src="../../../assets/img/添加.png">
                    <img class="btn" src="../../../assets/img/文件夹2.png">
                  </div>
                </li>
                <li class="check_all">查看全部></li>
              </ol>
            </li>

          </ul>
        </div>
        </content-box>

        
      </div>
    </div>

    <div class="right">
      <div class="loginBox" v-if="!store.state.isLogin">
        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
        <div class="login_btn" @click="store.state.isShowLoginBox=true">
          用户登录
        </div>
      </div>
      <div class="user_box" v-else>
        <div class="avatar">
          <img :src="user_info.avatarUrl" alt="">
        </div>
        <div class="info">
          <p class="name">{{user_info.nickname}}</p>
          <div class="level">{{level}}<span></span></div>
          <div class="sign" @click="sign" v-if="!isSign">签到<span></span></div>
          <div class="sign signed" v-if="isSign">已签到<span></span></div>
        </div>
        <div class="info2">
          <div class="item">
            <strong>{{user_info.cCount}}</strong>
            <p>动态</p>
          </div>
          <div class="item">
            <strong>{{user_info.follows}}</strong>
            <p>关注</p>
          </div>
          <div class="item">
            <strong>{{user_info.sCount}}</strong>
            <p>粉丝</p>
          </div>
        </div>
      </div>
      <div class="singer">
        <div class="info">
          <span class="title">入驻歌手</span>
          <span class="more">查看全部></span>
        </div>
        <div class="singer_list">
          <div class="item" v-for="(item,index) in singer_data" :key="index">
            <img :src="item.picUrl">
            <div class="singer_info">
              <p class="name">{{item.name}}</p>
            </div>
          </div>
          <a class="join" href="https://music.163.com/st/musician">
            申请成为网易音乐人
          </a>
        </div>
      </div>
      <div class="dj">
        <img src="../../../assets/img/dj.png">
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
  ref ,
  onMounted,
} from 'vue';
import { useStore } from 'vuex'
import {get_data} from '../../../network/request'
import {playMusic,afterPlay} from '../../../network/playMusic'
import contentBox from '../../../components/context/ContentBox.vue'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'


export default defineComponent({
  name: '',
  components:{ contentBox },
  props: {
  },
  
  setup(){
    let store = useStore();
    //获取顶部轮播图封面数据
    let cover_data:any  = ref();
    let cookie = store.state.isLogin?localStorage.getItem('cookie'):''
    console.log('cookie:'+cookie);
  
    get_data().get('/homepage/block/page').then(res=>{
      
      cover_data.value = res.data.data.blocks[0].extInfo.banners;
     
      
    }).catch(err=>{
      
      
    })


    //获取热门推荐数据
    let hot_recommend:any  = ref();

    get_data().get('/personalized',{params:{'limit':8,'cookie':cookie}}).then(res=>{
      
      hot_recommend.value = res.data.result
      
      
    })

    let person_recommend:any  = ref([]);
    get_data().get('/recommend/resource',{params:{'cookie':cookie}}).then(res=>{
      
      
      
      person_recommend.value = res.data.recommend
    })

    //获取最新碟片的数据
    let new_DVD_data:any  = ref();
    get_data().get('/album/newest').then(res=>{
     
      new_DVD_data.value = res.data.albums
    })

    //获取某某某节点
    let dvdBox:HTMLElement|null;
    onMounted(()=>{
      dvdBox = document.getElementById('dvdBox')
    })
    
    let left:any  = ref(0);         //dvdBox偏移量
    let isMove:any  = ref(false);  //是否移动，用于节流

    const move = (distance:number)=>{      //distance代表跳过几个item
      
      
      if(isMove.value) return 0;
      isMove.value = true;

      
      
      left.value += -distance*130;
     
      (dvdBox as HTMLElement).style.transform = `translateX(${left.value}px)`
      setTimeout(()=>{
        isMove.value = false;

      },2000)
      
    }

    const prev = ()=>{
      if(left.value>=0){
        left.value = -(dvdBox as HTMLElement).offsetWidth
      }
      move(-5)
      
    }
    const next = ()=>{
     
      
      if(Math.abs(left.value)>=(dvdBox as HTMLElement).offsetWidth-(new_DVD_data.value.length%5*130)){
        left.value = 130*5
      }
      move(5)
    }


    //获取榜单数据
   
    let top_data:any = ref([])

    get_data().get('/toplist').then(res=>{
      for(let index=0;index<3;index++){
        let list_data;
        get_data().get('/playlist/detail',{params:{'id':res.data.list[index].id}}).then(res=>{
          list_data = []
          for(let i=0;i<10;i++){
          
            list_data.push(res.data.playlist.tracks[i])
          }
         
          top_data.value.push(list_data)
          
        })
         
      }
     
      
    })

    //获取歌手信息
    let singer_data:any = ref([])
    get_data().get('/top/artists',{params:{'limit':5}}).then(res=>{
      
      singer_data.value = res.data.artists

      
      
    })
    
    
    
    let play = (item:any)=>{
      
      
      
      store.state.name_list.unshift(item.name)
      store.state.cover_list.unshift(item.al.picUrl)
      store.state.artist_list.unshift(item.ar[0].name)
   
      
      playMusic(store,true,item.id)
    }

    let after_play = (item:any)=>{
      
      store.state.name_list.push(item.name)
      store.state.cover_list.push(item.al.picUrl)
      store.state.artist_list.push(item.ar[0].name)
  
      
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

    let hot_recommend_play = (id:number)=>{  //播放热门歌单
      store.state.musicList = [] //清空播放列表
      store.state.current_index = 0  //重置歌单播放进度
      store.state.name_list = []
      store.state.cover_list = []
      store.state.artist_list = []
      get_data().get('/playlist/track/all',{params:{id}}).then(async res=>{
        
        for(let item of res.data.songs){
          await after_play(item)
        } 

   
        playMusic(store,false,store.state.musicList[0].id)
      })
   
      
    }

    const router = useRouter()

    const to = (url:string)=>{
      router.push(url)
    }

    let user_info:any  = ref({})
    let level:any  = ref()
    let isSign:any  = ref()
    get_data().get('/user/account',{params:{'cookie':cookie}}).then(res=>{


      get_data().get('/user/detail',{params:{'uid':res.data.account.id}}).then(res=>{

        user_info.value = res.data.profile
        level.value = res.data.level
        isSign.value = res.data.mobileSign||res.data.pcSign
      })
      
    })

    
    let sign = ()=>{
      get_data().get('/daily_signin',{params:{'cookie':cookie}}).then(res=>{

        if(res.data.code==200){
          ElMessage({
            message: '签到成功',
            type: 'success',
          })
        }
        
        isSign.value = true
      }).catch(err=>{
        ElMessage({

        })
      })
    }

    return {
      
      cover_data,
      hot_recommend,
      person_recommend,
      new_DVD_data,
      move,
      left,
      isMove,
      prev,
      next,
      top_data,
      singer_data,
      store,
      playMusic,
      play,
      after_play,
      top_play,
      hot_recommend_play,
      to,
      user_info,
      level,
      sign,
      isSign,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .recommend{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: #f5f5f5;
  }


  
  .el-carousel{
    width: 100%;
    overflow: hidden;
    
    .cover_box{
      
      position:absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 69.6rem;
      height: 100%;
      display: flex;
      background: red;
      img{
        width: 52rem;
        
      }
      
    }
    .backboard{
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    
  }
  
  .download{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width:69.6rem;
    z-index: 0;
    text-align: right;
    height: 20rem;
    
    img{
      height: 100%;
      
    }
    .download_btn{
      width: 242px;
      
      height: 64px;
      opacity: 0;
      position: absolute;
      bottom: 49px;
      right: 19px;
      background: black;
      cursor: pointer;
      &:hover{
        opacity: .1;
      }
    }
  }

  .left{
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background: white;
    width: 52rem;
    .hot_recommend{
      height: 40rem;
     

      .content{

        
        .item{
          width: 140px;
          height: 234px;
          margin-right: 30px;
          .cover{
            width: 100%;
            height: 140px;
            overflow: hidden;
            position: relative;
            .coverImg{
              width: 100%;
              z-index: -1;
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
            .filter{
              position: absolute;
              top: 0;
              left: 0;
              
            }
          }
          .title{
            padding: .5rem 0;
            line-height: 20px;
          }
        }
      }
    }
    .person_recommend{
      height: 20rem;
     

      .content{

        
        .item{
          width: 140px;
          height: 234px;
          margin-right: 30px;
          .cover{
            width: 100%;
            height: 140px;
            overflow: hidden;
            position: relative;
            .coverImg{
              width: 100%;
              z-index: -1;
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
            .filter{
              position: absolute;
              top: 0;
              left: 0;
              
            }
          }
          .title{
            padding: .5rem 0;
            line-height: 20px;
          }
        }
      }
    }
    .new_DVD{
      padding-bottom: 3rem;
      
      .content{
        width: 96%;
        margin: 1rem 2%;
        height: 184px;
        background: #f5f5f5;
        border: 1px solid rgb(202, 202, 202);
        position: relative;
        .showBox{
          width: 93%;
          height: 90%;
          margin: 1.25% 3.5%;
          position: relative;
          overflow: hidden;
          .dvdBox{
            transition: 2s;
            position: absolute;
            height: 100%;
            top: 1.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: nowrap;
            .item{
              width: 120px;
              height: 150px;
              margin:0 5px;
            
              .cover{
                position: relative;
                width: 100%;
                height: 100px;
                overflow: hidden;
                
                .img{
                  width: 100px;
                  z-index: -1;
                }
                .backboard{
                  position: absolute;
                  top: -570px;
                  left: 0;
                }
              }
              
              p{
                font-size: 12px;
                padding-top: 3px;
              }
              .artist{
                color: #666;
              }
            }
          }
        }
        .prev{
          cursor: pointer;
          width: 16px;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .next{
          width: 16px;
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 50%;
          transform: rotate(180deg);
        }
      }
    }
    .topList{
      padding-bottom: 3rem;
      
      .content{
        width: 96%;
        margin: 1rem 2%;
        height: 472px;
        background: #f5f5f5;
        border: 1px solid rgb(202, 202, 202);
        position: relative;
        &>ul{
          display: flex;
          justify-content: flex-start;
          flex-wrap: nowrap;
          height: 100%;
          &>li{
            width: 33.3%;
            list-style: none;
            border-right: 1px solid rgb(202, 202, 202);
            &:nth-last-child(1){
              border: none;
            }
            .title{
              width: 80%;
              height: 100px;
              padding-left: 10%;
              padding-top: 10%;
              display: flex;
              
              
              flex-wrap: wrap;
              .cover{
                width: 80px;
                height: 80px;
                overflow: hidden;
                position: relative;
                .coverImg{
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                }
                .board{
                  position: absolute;
                  top: -57px;
                  left: -145px;
                }
              }
              .info{
                p{
                  font-weight: bold;
                  width: 80px;
                  height: 20px;
                  padding: 10px;
                  font-size: 14px;
                }
                .btn{
                  padding-left:10px;
                  
                }

              }
              
            }
            .musicList{
              width: 100%;
              padding: 0;
              li{
                width: 80%;
                padding: 0 10%;
                list-style: none;
                height: 32px;
                line-height: 32px;
                
                position:relative;
                
                &:nth-child(2n-1){
                  background: rgb(226, 226, 226);
                }

                &:nth-child(-n+3)>span{
                  color: #c10d0c;
                }
                span{
                  font-size: 16px;
                  padding-right: 8px;
                }
                &:nth-child(n)>.name{
                  font-size: 12px;
                  color: black;
                  width:90px;
                  height: 100%;
                  overflow: hidden;
                  position: absolute;
                  left: 50px;
                  top: 0;
                }
                .btnList{
                  position: absolute;
                  top:0;
                  right:0;
                  width:100px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  
                  z-index: 1;
                  .btn{
                    padding-right: 5px;
                  }
                }
               
              }
              .check_all{
                text-align: right;
              }

            }
            .btn{
              width: 20px;
              height: 20px;
              opacity: .6;
              cursor: pointer;
              &:hover{
                transition: .3s;
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }

  .right{
    background: white;
    width: 17.6rem;
    border-right: 1px solid #ccc;
    .loginBox{
      height: 126px;
      background: url('../../../assets/img/index.png') 0 0 no-repeat;
      background-size: 50rem;
      &>p{
        color:#666;
        width: 84%;
        padding:6% 8%;
        font-size: 12px;
        line-height: 22px;
      }
      .login_btn{
       
        background: url('../../../assets/img/index.png') 0 -195px no-repeat;
        height:31px;
        line-height: 31px;
        width: 100px;
        color: white;
        text-align: center;
        margin-left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        cursor: pointer;
        &:hover{
          background: url('../../../assets/img/index.png') -110px -195px no-repeat;
          
        }
      }

    }
    .user_box{
      background: #f7f7f7;
      height: 165px;
      padding-top: 20px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .avatar{
      
        width: 80px;
        height: 80px;
        margin-left: 20px;
      
        padding: 2px;
        background: #fff;
        border: 1px solid #dadada;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        width: 115px;
        margin-left: 18px;
        padding-top: 3px;
        .name{
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          color: #333;
          font-weight: bold;
        }
        .level{
          display: inline-block;
          margin-top: 5px;
          height: 17px;
          overflow: hidden;
          font-size: 12px;
          padding-left: 25px;
          line-height: 18px;
          color: #999;
          font-weight: bold;
          font-style: italic;
          background: url('https://s2.music.126.net/style/web2/img/icon2.png?ba5260f473e0a6782a35560906b46add') -130px -64px no-repeat;
          span{
            display: inline-block;
            float: right;
            width: 8px;
            height: 17px;
            background: url('https://s2.music.126.net/style/web2/img/icon2.png?ba5260f473e0a6782a35560906b46add') -130px -64px no-repeat;
            background-position: -192px -64px;
          }
        }
        .sign{
          margin-top: 10px;
          color: #fff;
          background: url('https://s2.music.126.net/style/web2/img/button2.png?08a64dd484a6d5ed99f74327a19b069c') 0 0 no-repeat;
          background-position: 0 -387px;
          height: 31px;
          line-height: 31px;
          
          text-align: center;
          cursor: pointer;
          span{
            display: inline-block;
            float: right;
            width: 5px;
            height: 31px;
            background: url('https://s2.music.126.net/style/web2/img/button2.png?08a64dd484a6d5ed99f74327a19b069c') right -428px no-repeat;
          }
        }
        .signed{
          color: #bebebe;
          background-position: 0 -305px;
          cursor:default;
          span{
            background-position: right -346px;
          }
        }
      }
      .info2{
        margin: 0px 0 0 3px;
        color: #666;
        .item{
          float: left;
          height: 40px;
          padding: 0 18px;
          border-right: 1px solid #e4e4e4;
          &:last-child{
            border: none;
          }
          strong{
            font-size: 20px;
            font-weight: normal;
          }
          p{
            margin-left: 2px;
          }
        }
      }
    }
    .singer{
      height: 455px;
      margin-top: 15px;
      .info{
        height: 23px;
        margin: 0 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        span{
          font-size: 10px;
        }
        .title{
          font-weight: bold;
        }
        .more{
          color: #666;
          float: right;
        }
        
      }
      a{
        color: #333;
         &:visited{
          color: #333;
        }
      }
     
      .singer_list{
        
        .item{
        
          height: 62px;
          background: #fafafa;
          display: flex;
          align-items: center;
          margin: 15px 20px;
          border: 1px solid #e9e9e9;
          border-left: none;
          img{
            width: 62px;
            height: 100%;
          }
          .singer_info{
            height: 100%;
            line-height: 62px;
            .name{
              padding-left: 2rem;
              text-align: center;
              font-weight: bold;
            }
          }

        }
        .join{
          display: block;
          height: 31px;
          line-height: 31px;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          margin: 0 20px;
          border-radius: 5px;
          border: 1px solid #e9e9e9;
          background: #e9e9e9;
          text-decoration: none;
          cursor: pointer;
          &:hover{
            transition: .2s;
            background: white;
          }
          &:visited{
            color: black;
          }
        }
      }
    }
    .dj{
      
      margin: 0 20px;
      margin-top: 30px;
      height: 300px;
      
      img{
        
        width:100%;

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
</style>