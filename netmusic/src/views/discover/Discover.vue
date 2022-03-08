<template>
  <div class="discover">
    <div class="navbar">
      <ul>
        <li v-for="(item,index) in navbar_list" :key="index" @click="navbar_click(index)" :class="{active:navbar_list[index].path==store.state.current_route}">{{item.name}}</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref } from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: "Home",
  components: {

  },
  setup() {
    const store = useStore()
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
        path:'musicList'
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
        path:'newDVD'
      },
    ];
    let current_index = ref(0);
    
    const navbar_click =(index:number)=>{
 
      if(navbar_list[index].path){
        console.log(navbar_list[index].path);
        
        store.state.current_route = navbar_list[index].path;
        router.push(navbar_list[index].path)
      }
      
     
      
    }
    const router = useRouter();
    return { 
      store,
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