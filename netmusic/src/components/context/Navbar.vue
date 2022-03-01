<template>
<div class="navbar">
  <a class="logo" @click="to('recommend')"><img src="../../assets/img/logo.png"></a>
  <ul class="btn_list">
    
    <li v-for="(item,index) in btn_list" :key="index" :class="{active:currentIndex==index}" @click='btn_click(index)'><a :href="item.url">{{item.name}}</a></li>
  </ul>
  <el-input v-model='input_text'  placeholder='音乐/视频/电台/用户' :prefix-icon='Search'></el-input>
  <div class="creater_center" @click="store.state.isShowLoginBox=true">创作者中心</div>
  <div class="login" @click="store.state.isShowLoginBox=true" v-if="!store.state.isLogin">登录</div>
  <div class="avatar" v-else>
    
    <img :src="store.state.current_profile.avatarUrl" @click="isShowUserBox=!isShowUserBox">
    <div class="user_info" v-show="isShowUserBox">
      <p><span :style="{backgroundPosition:'0 -80px'}"></span>我的主页</p>
      <p><span :style="{backgroundPosition:'-20px -120px'}"></span>我的消息</p>
      <p><span :style="{backgroundPosition:'0 -100px'}"></span>我的等级</p>
      <p><span :style="{backgroundPosition:'0 -140px'}"></span>个人设置</p>
      <p @click="logout"><span :style="{backgroundPosition:'0 -200px'}"></span>退出</p>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref,
  
} from 'vue';
import {useRouter} from 'vue-router'
import {Search} from '@element-plus/icons-vue'
import {useStore} from 'vuex'
import { get_data } from '../../network/request';
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: '',
  components:{  },
  props: {
  },
  
  setup(){

    const btn_list = [
      {
        name:'发现音乐',
        path:'discover'
      },
      {
        name:'我的音乐',
        path:'mine_music'
      },
      {
        name:'关注',
        path:'follow'
      },
      {
        name:'商城',
        url:'https://music.163.com/store/product'
      },
      {
        name:'音乐人',
        url:'https://music.163.com/st/musician'
      },
      {
        name:'下载客户端',
        path:'download'
      },
    ];
    let input_text = ref('');
    let currentIndex = ref(0);
    
    const router = useRouter();
    const to = (url:string)=>{
      router.push(url)
    }
    const btn_click = (index:number)=>{

      
      if(btn_list[index].path){
       
        router.push(btn_list[index].path as string)
        currentIndex.value = index
      }
      
    }

    const store = useStore()
    

    let isShowUserBox = ref(false)

    let logout = ()=>{
      get_data().get('/logout').then(res=>{
        localStorage.clear()
        location.reload()
        ElMessage({
          message: '退出成功!',
          type: 'success',
        })
      })
    }

    return {
      btn_list,
      input_text,
      currentIndex,
      btn_click,
      Search,
      store,
      to,
      isShowUserBox,
      logout,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .navbar{
    
    display: flex;
    justify-content:center;
    align-items: center;
    flex-wrap: nowrap;
    background: #242424;
    height: 5rem;
    border-bottom:.4rem solid #C20C0C;
    .logo{
      cursor: pointer;
    }
    .btn_list{

      display: flex;
      justify-content: flex-start;
      padding-right: 5rem;
      padding-left: 2rem;
      height: 100%;
      
      li{
        display: flex;
        align-items: center;
        list-style: none;
        color: #ccc;
        
        cursor: pointer;
        a{
          padding: 0 1.5rem;
          width: 100%;
          height: 5rem;
          line-height: 5rem;
          text-decoration: none;
          &:visited{
            color: #ccc;
          }
          
        }
        &:hover{
          a{
            color: white;
          }
          background: black;
          transition: .4s;
        }
      }
      .active{
        position: relative;
        color: white;
        background: black;
        overflow: hidden;
        &::after{
          content:'';
          position: absolute;
          width: .5rem;
          height: .5rem;
          background: #C20C0C;
          bottom: -.25rem;
          left: 50%;
          transform: translateX(-50%) rotate(-45deg);
          
        }
      }
      
      &::after{
        content: 'HOT';
        font-size: 8px;
        width: 2rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: rgb(206, 0, 0);
        color: white;
        border-radius: 20px;
        transform: translate(-.5rem,1.5rem);
      }
    }
    .el-input{
      width: 158px;
      height: 32px;
    }
    .creater_center{
      color: #ccc;
      padding: .4rem .8rem;
      border: 1px solid rgb(110, 110, 110);
      border-radius: 20px;
      margin: 0 1rem;
      cursor: pointer;
      &:hover{
        color: white;
        border-color: white;
        transition: .2s;
      }
    }
    .login{
      color: #787878;
      cursor: pointer;
      &:hover{
        color: #9e9e9e;
        text-decoration: underline;

      }
      
    }
    .avatar{
      width: 30px;
      height: 30px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        cursor: pointer;
      }
      .user_info{
        position: absolute;
        top: 38px;
        right: 50%;
        transform: translateX(50%);
        width: 148px;
        background: #2b2b2b;
        border: 1px solid #202020;
        box-shadow: 0 8px 24px 0 rgba(0,0,0,50%);
        border-radius: 4px;
        z-index: 10;
        p{
          height: 34px;
          line-height: 34px;
          padding-left: 24px;
          color: #ccc;
          span{
            display: inline-block;
            margin: 7px 10px 0 0;
            width: 18px;
            height: 18px;
            background: url('https://s2.music.126.net/style/web2/img/frame/toplist.png?a11365a247e7e16d1f6c23ab2ea0d0b4') 0 0 no-repeat;
          }
          cursor: pointer;
          transition: .3s;
          &:hover{
            background: rgba(255, 255, 255, 0.13);
            
          }
        }
        
      }
    }
   
  }

</style>