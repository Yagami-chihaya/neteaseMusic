<template>
<div class="radio">
  <div class="content">
    <el-carousel height="194px" trigger="click" :autoplay="false" indicator-position='none' arrow="always">
      <el-carousel-item v-for="item in 2" :key="item">
        <div class="category_list">
          <ul>
           
            <li v-for="(item2,index2) in category_list.slice(18*(item-1))" :key="index2" @click="change_category(index2)">
              <div class="imgBox">
                <img :src="item2.url" :class="{active:active_category==index2}">
              </div>
              <p>{{item2.name}}</p>
            </li>
          </ul>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="box">
      <div class="recommend_program">
        <content-box title="推荐节目" rightText="更多>">
          <ul>
            <li v-for="(item,index) in recommend_program" :key="index" @click="radio_info(item.radio.id)">
              <div class="cover">
                <img :src="item.coverUrl">
                <div class="mask"></div>
              </div>
              
              <div class="info">
                <p>{{item.name}}</p>
                <p class="author">{{item.radio.name}}</p>
              </div>
              <a>{{item.radio.category}}</a>
            </li>
          </ul>
        </content-box>
      </div>
      <div class="top_program">
        <content-box title="节目排行榜" rightText="更多>">
          <ul>
            <li v-for="(item,index) in top_program.slice(0,10)" :key="index" @click="radio_info(item.program.radio.id)">
              <div class="rank">
                <p class="now_rank">{{item.rank>=10?item.rank:'0'+item.rank}}</p>
                <p class="last_rank" :style="{color:item.rank-item.lastRank==0?'#999':item.rank-item.lastRank>0?'#4abbeb':'#ba2226'}"><span :style="{ backgroundPosition:item.rank-item.lastRank==0?'-74px -274px':item.rank-item.lastRank>0?'-74px -324px':'-74px -304px'}"></span>{{Math.abs(item.rank-item.lastRank)}}</p>
              </div>
              <div class="cover">
                <img :src="item.program.coverUrl">
                <div class="mask"></div>
              </div>
              
              <div class="info">
                <p>{{item.program.name}}</p>
                <p class="author">{{item.program.radio.name}}</p>
              </div>
              <a>{{item.program.radio.category}}</a>
            </li>
          </ul>
        </content-box>
      </div>
    </div>
    <content-box title="音乐推荐·电台" rightText="更多>">
      <ul>
        
        <li v-for="(item,index) in radio_recommend.djRadios.slice(0,4)" :key="index">
          <img :src="item.picUrl">
          <div class="info">
            <h2>{{item.name}}</h2>
            <p>{{item.rcmdtext}}</p>
          </div>
        </li>
      </ul>
    </content-box>
    <content-box title="生活·电台" rightText="更多>">
      <ul>
        
        <li v-for="(item,index) in radio_life.djRadios.slice(0,4)" :key="index">
          <img :src="item.picUrl">
          <div class="info">
            <h2>{{item.name}}</h2>
            <p>{{item.rcmdtext}}</p>
          </div>
        </li>
      </ul>
    </content-box>
    <content-box title="情感·电台" rightText="更多>">
      <ul>
        
        <li v-for="(item,index) in radio_emotion.djRadios.slice(0,4)" :key="index">
          <img :src="item.picUrl">
          <div class="info">
            <h2>{{item.name}}</h2>
            <p>{{item.rcmdtext}}</p>
          </div>
        </li>
      </ul>
    </content-box>
    <content-box title="创作翻唱·电台" rightText="更多>">
      <ul>
        
        <li v-for="(item,index) in radio_fanchang.djRadios.slice(0,4)" :key="index">
          <img :src="item.picUrl">
          <div class="info">
            <h2>{{item.name}}</h2>
            <p>{{item.rcmdtext}}</p>
          </div>
        </li>
      </ul>
    </content-box>
    <content-box title="知识·电台" rightText="更多>">
      <ul>
        
        <li v-for="(item,index) in radio_knowledge.djRadios.slice(0,4)" :key="index">
          <img :src="item.picUrl">
          <div class="info">
            <h2>{{item.name}}</h2>
            <p>{{item.rcmdtext}}</p>
          </div>
        </li>
      </ul>
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
import {get_data} from '../../../network/request'
import contentBox from '../../../components/context/ContentBox.vue'
import {playMusic,afterPlay} from '../../../network/playMusic'
import {useStore} from 'vuex'

export default defineComponent({
  name: '',
  components:{ contentBox },
  props: {
  },
  
  setup(){
    interface RecommendProgram{
      
      coverUrl:string,
      name:string,
      radio:{
        id:number,
        name:string,
        category:string
      }
    }
    interface TopProgram{
      program:{
        radio:{
          id:number,
          name:string,
          category:string,
        },
        coverUrl:string,
        name:string,
      },
      rank:number,
      lastRank:number,

    }

    
    let category_list = [
      {
        url:'https://p3.music.126.net/icULXvfqWJMFvcjTrXSLeA==/109951165406422565.jpg',
        name:'情感',
        id:3
      },
      {
        url:'https://p4.music.126.net/fWonYYR8sORR2mEKZfYqjQ==/109951165406418703.jpg',
        name:'音乐推荐',
        id:2
      },
      {
        url:'https://p3.music.126.net/Tg1Ids_gRSqaZXyZ3zj0Sg==/109951166109395795.jpg',
        name:'有声书',
        id:10001
      },
      {
        url:'https://p1.music.126.net/LIkzDiW_ktaSbk_s6MgMkg==/109951165406441809.jpg',
        name:'脱口秀',
        id:8
      },
      {
        url:'https://p4.music.126.net/GqeTI3A_g4FFzm_4MoNSsQ==/109951165406411412.jpg',
        name:'创作翻唱',
        id:2001
      },
      {
        url:'https://p4.music.126.net/3qyLawhgmTyHNabhuaKYTg==/109951165406422635.jpg',
        name:'电音',
        id:10002
      },
      {
        url:'https://p4.music.126.net/wOmtE80i2EMG2dR7DnTJUw==/109951166108735875.jpg',
        name:'知识',
        id:11
      },
      {
        url:'https://p4.music.126.net/bOFLdKG966TolZNpA1VYtw==/109951166108595279.jpg',
        name:'二次元',
        id:3001
      },
      {
        url:'https://p4.music.126.net/hxNgvipzXFp570FgkiFGcQ==/109951166108605164.jpg',
        name:'明星专区',
        id:14
      },
      {
        url:'https://p3.music.126.net/X3gH1OSeg5xQV5bqSv-cEg==/109951166108614572.jpg',
        name:'生活',
        id:6
      },
      {
        url:'https://p4.music.126.net/krSruAC4wwq3TXJkcSHvUQ==/109951166108617045.jpg',
        name:'亲子',
        id:13
      },
      {
        url:'https://p4.music.126.net/OS8NVOBjZoznnOc5YSBy3w==/109951166108651181.jpg',
        name:'新闻咨询',
        id:3087096
      },
      {
        url:'https://p4.music.126.net/la9HvnMewT3lp72DL-NgKA==/109951166108675738.jpg',
        name:'广播剧',
        id:3088097
      },
      {
        url:'https://p4.music.126.net/4pgJFKZYNU1tZxQdp6xa-A==/109951166111062508.jpg',
        name:'故事',
        id:3080097
      },
      {
        url:'https://p4.music.126.net/HXCbeAs1YDXgOOwE9oY2ew==/109951166111050278.jpg',
        name:'人文历史',
        id:3080098
      },
      {
        url:'https://p3.music.126.net/gFOkDDYZa8m93ccvIlmmvg==/109951166108686306.jpg',
        name:'娱乐',
        id:3083097
      },
      {
        url:'https://p3.music.126.net/BwIOmsgRTVLL1vrVieJD9w==/109951166108695116.jpg',
        name:'相声曲艺',
        id:3088098
      },
      {
        url:'https://p3.music.126.net/W1j-Lb5ozohzud342aPIpw==/109951166108699096.jpg',
        name:'其他',
        id:3081098
      },
      {
        url:'https://music.163.com/style/web2/img/index_radio/radio_faq.png',
        name:'常见问题',
      },
      {
        url:'https://music.163.com/style/web2/img/index_radio/radio_apply.png',
        name:'我要做主播'
      }


    ]
    let active_category= ref<number>()
    let change_category = (index:number)=>{
      
      
      active_category.value = index
    }
    let recommend_program = ref<Array<RecommendProgram>>()
    get_data().get('/program/recommend',{params:{'limit':10}}).then(res=>{
      console.log(res.data);
      recommend_program.value = res.data.programs
    })
    let top_program  = ref<Array<TopProgram>>([])
    get_data().get('/dj/program/toplist',{params:{'limit':10}}).then(res=>{
      console.log(res.data);
      top_program.value = res.data.toplist
    })
    let store = useStore();
    
    let radio_info = (id:Number)=>{
      get_data().get('/dj/program',{params:{
        'rid':id
      }}).then(res=>{
        console.log('radio_info');
        
        console.log(res.data);
        radio_play(res.data.programs)
      })
    }
    let after_play = (item:any)=>{
      console.log(item);
      
      store.state.name_list.push(item.mainSong.name)
      store.state.cover_list.push(item.mainSong.album.picUrl)
      store.state.artist_list.push(item.mainSong.artists[0].name)

      return afterPlay(store,item.mainSong.id)
    }
    let radio_play = (data:any)=>{
      
      
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
    let radio_recommend  = ref<any>({})
    radio_recommend.value= {djRadios:[]}  //防止使用slice导致报错
    let radio_life:any  = ref({})
    radio_life.value= {djRadios:[]}
    let radio_emotion:any  = ref({})
    radio_emotion.value= {djRadios:[]}
    let radio_fanchang:any  = ref({})
    radio_fanchang.value= {djRadios:[]}
    let radio_knowledge:any  = ref({})
    radio_knowledge.value= {djRadios:[]}
    let get_radio_info = (type:number,obj={value:{}})=>{
      get_data().get('/dj/recommend/type',{params:{
        'type':type
      }}).then(res=>{
        
        obj.value = res.data
        
    
        console.log(radio_recommend.value);
      })
    }

    get_radio_info(2,radio_recommend)
    get_radio_info(2001,radio_fanchang)
    get_radio_info(11,radio_knowledge)
    get_radio_info(6,radio_life)
    get_radio_info(3,radio_emotion)
    
    
    return {
      category_list,
      active_category,
      change_category,
      recommend_program,
      top_program,
      radio_info,
      store,
      radio_play,
      radio_recommend,
      radio_life,
      radio_emotion,
      radio_fanchang,
      radio_knowledge,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .radio{
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .content{
      width: 63.6rem;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      background: white;
      padding: 3rem;
      .el-carousel{
        
        .category_list{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          height: 194px;
          width: 900px;
          
          &>ul{
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            li{
              cursor: pointer;
              width: 70px;
              height: 70px;
              margin: 15px 15px;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              .imgBox{
                width: 48px;
                height: 48px;
                overflow: hidden;
                position: relative;
                img{
                  position: absolute;

                }
                .active{
                  left: -48px;
                }
              }
              
              p{
                font-size: 12px;
                color: #888;
              }
            }
          }
        }
        
        
      }
      .box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .recommend_program{
          width: 50%;
          
        }
        .top_program{
          width: 50%;
          .rank{
            padding-left: 20px;
            height: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
           
            .now_rank{
              width: 100%;
              text-align: center;
            }
            .last_rank{
              width: 100%;
              text-align: center;
              span{
                display: inline-block;
                width: 6px;
                height: 6px;
                margin: -1px 2px 0 0;

                vertical-align: middle;
                background: url('https://s2.music.126.net/style/web2/img/icon.png?f2d5fab27bca9e04779af5ca0eebc37b') 0 0 no-repeat;
               
              }
            }
          }
        }
        .contentBox{
          ul{
            list-style: none;
            width: 100%;
            margin: 0;
            transform: translateY(-30px);
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            li{
              width: 100%;
              height: 40px;
              padding: 10px 0;
              line-height: 40px;
              display: flex;
              align-items: center;
              .cover{
                width: 40px;
                height: 40px;
                margin: 10px;
                margin-left: 20px;
                position: relative;
                cursor: pointer;
                img{
                  width: 40px;
                }
                .mask{
                  position: absolute;
                  opacity: 0;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);
                  
                  width: 22px;
                  height: 22px;
                  background: url('https://s2.music.126.net/style/web2/img/iconall.png?563a08bfb456e2e3a65fce46d893f70a') 0 -85px no-repeat;
                  transition: .4s;
                  &:hover{
                    opacity: 1;
                  }
                }
                
              }
              
              p{
                width: 254px;
                height: 20px;
                color: #333;
                line-height: 20px;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .author{
                color: #666;
              }
              a{
                margin-left: 40px;
                color: #999;
                
                height: 16px;
                font-size: 12px;
                line-height: 16px;
                border: 1px solid #999;
                padding: 2px 5px;
                text-align: center;
              }
              &:nth-child(2n){
                background: #f7f7f7;
              }
            }
          }
        }
      }
      &>.contentBox{
        height: auto;
        ul{
          list-style: none;
          li{

            width: 435px;
            height: 120px;
            margin-left: 30px;
            float: left;
            padding: 20px 0;
            border-bottom: 1px solid #e7e7e7;
            display: flex;
            justify-content: flex-start;
            img{
              width: 120px;
            }
            .info{
              margin-left: 20px;
              h2{
                font-size: 18px;
                color: #333;
                margin-bottom: 30px;
              }
              p{
                margin-bottom: 6px;
                line-height: 20px;
                color: #999;
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