<template>
<div class="singer">
  <div class="left">
    <ul v-for="(item,index) in categories" :key="index">
      <h2>{{item.title}}</h2>
      <li v-for="(item2,index2) in item.list" :key="index2" :class="{active:active_category==index*1000+index2}" @click="change_category(index*1000+index2,item2.title)">
        <p class="child-title">{{item2.title}}</p>
      </li>
    </ul>
  </div>
  <div class="right">
    <content-box :title="now_title" rightText="">
      <ul>
        <li v-for="(item,index) in artists_data" :key="index"> 
          <div class="cover">
            <div class="mask"></div>
            <img :src="item.img1v1Url" alt="">
          </div>
          <p>{{item.name}}</p>
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
import contentBox from '../../../components/context/ContentBox.vue'
import {get_data } from '../../../network/request'

export default defineComponent({
  name: '',
  components:{ contentBox, },
  props: {
  },
  
  setup(){
    let categories = [
      {
        'title':'推荐',
        'list':[
          {
            'title':'热门歌手',
            'url':'/top/artists',
            'type':0
          },
          
        ]
      },
      {
        'title':'华语',
        'area':7,
        'list':[
          {
            'title':'华语男歌手',
            'type':1,
            'url':''
          },
          {
            'title':'华语女歌手',
            'type':2,
            'url':''
          },
          {
            'title':'华语组合/乐队',
            'type':3,
            'url':''
          }
        ]
      },
      {
        'title':'欧美',
        'area':96,
        'list':[
          {
            'title':'欧美男歌手',
            'type':1,
            'url':''
          },
          {
            'title':'欧美女歌手',
            'type':2,
            'url':''
          },
          {
            'title':'欧美组合/乐队',
            'type':3,
            'url':''
          }
        ]
      },
      {
        'title':'日本',
        'area':8,
        'list':[
          {
            'title':'日本男歌手',
            'type':1,
            'url':''
          },
          {
            'title':'日本女歌手',
            'type':2,
            'url':''
          },
          {
            'title':'日本组合/乐队',
            'type':3,
            'url':''
          }
        ]
      },
      {
        'title':'韩国',
        'area':16,
        'list':[
          {
            'title':'韩国男歌手',
            'type':1,
            'url':''
          },
          {
            'title':'韩国女歌手',
            'type':2,
            'url':''
          },
          {
            'title':'韩国组合/乐队',
            'type':3,
            'url':''
          }
        ]
      },
      {
        'title':'其他',
        'area':0,
        'list':[
          {
            'title':'其他男歌手',
            'type':1,
            'url':''
          },
          {
            'title':'其他女歌手',
            'type':2,
            'url':''
          },
          {
            'title':'其他组合/乐队',
            'type':3,
            'url':''
          }
        ]
      },

    ]
    let active_category = ref(0)
    let now_title = ref('热门歌手')
    let change_category = (index:number,title:string)=>{
      active_category.value = index
      now_title.value = title
      if(active_category.value!=0){
        get_data().get('/artist/list',{params:{
          'type':categories[Math.floor(index/1000)].list[index%1000].type,
          'area':categories[Math.floor(index/1000)].area
        }}).then(res=>{
          console.log(res.data);
          artists_data.value = res.data.artists
        })
      }else{
        get_data().get(categories[0].list[0].url).then(res=>{
          artists_data.value = res.data.artists
        })
      }
      
    }
    let artists_data = ref()
    get_data().get('/top/artists').then(res=>{
      console.log(res.data);
      
      artists_data.value = res.data.artists
    })
    
    return {
      categories,
      active_category,
      change_category,
      now_title,
      artists_data,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .singer{
    display: flex;
    justify-content: center;
    background: #f5f5f5;
    flex-wrap: wrap;
    .left{
      padding-top: 30px;
      background: #f5f5f5;
      width: 12.6rem;
      border-left: 1px solid #ccc;
      ul{
        list-style: none;
        padding:4px 10px;
        &:nth-child(1){
          h2{
            border-top: none;
          }
            
        }
        h2{
          border-top: 1px solid #d3d3d3;
          
          padding: 14px;
          padding-top: 14px;
          padding-bottom: 6px;
          font-size: 16px;
          font-family: "Microsoft Yahei";
          color: #333;
          margin: 0;
          
        }
        li{
          width: 133px;
          padding-left: 27px;
          color: #333;
          background: url('https://s2.music.126.net/style/web2/img/singer.png?57541d2fd0a6c3d831dc7907afb90a0d') 0 0 no-repeat;
          background-position: 0 -30px;
          height: 29px;
          line-height: 29px;
          font-size: 12px;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
        .active{
          color: #c20c0c;
          background-position: 0 0;
        }
      }
    }
    .right{
      padding: 40px 0;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      background: rgb(255, 255, 255);
      width: 57rem;
      ul{
        list-style: none;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li{
          width: 130px;
          height: 154px;
          overflow: hidden;
          padding: 0 20px;
          line-height: 1.4;
          .cover{
            width: 130px;
            height: 130px;
            position: relative;
            .mask{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: url('https://s2.music.126.net/style/web2/img/coverall.png?943446a025520203ae9ff9c4671edabd') 0 -680px no-repeat;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
          p{
            font-size: 12px;
            margin: 3px 0;
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