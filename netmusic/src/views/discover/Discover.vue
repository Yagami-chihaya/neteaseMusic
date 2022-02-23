<template>
  <div class="discover">
    <div class="navbar">
      <ul>
        <li v-for="(item,index) in navbar_list" :key="index" @click="navbar_click(index)" :class="{active:index==current_index}">{{item.name}}</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref } from "vue";

import {useRouter} from 'vue-router'

export default defineComponent({
  name: "Home",
  components: {

  },
  setup() {
    const navbar_list = [
      {
        name:'推荐',
        path:'recommend'
      },
      {
        name:'排行榜',
        path:'top'
      },
      {
        name:'歌单',
        path:'musiclist'
      },
      {
        name:'主播电台',
        path:'radio'
      },
      {
        name:'歌手',
        path:'singer'
      },
      {
        name:'新碟上架',
        path:'newdvd'
      },
    ];
    let current_index = ref(0);
    
    const navbar_click =(index:number)=>{
 
      if(navbar_list[index].path){
        current_index.value = index;
        router.push(navbar_list[index].path)
      }
      
     
      
    }
    const router = useRouter();
    return { 
      navbar_list,
      current_index,
      navbar_click,
    };
  },
});
</script>

<style lang="scss" scoped>
  .discover{
    width: 100%;
    .navbar{
      width: 100%;
      height: 1.8rem;
      background: #C20C0C;
      ul{
        display: flex;
        justify-content:flex-start;
        align-items: center;
        margin-left: 26%;
        
        li{
          margin: 0 1rem;
          padding: .1rem 1rem;
          list-style: none;
          color: white;
          cursor: pointer;
          &:hover{
            border-radius: 20px;
            background: #960000;
            transition: .2s;
          }
          
        }
      .active{
          border-radius: 20px;
          background: #960000;
        }
        
      }
    }
  }
</style>