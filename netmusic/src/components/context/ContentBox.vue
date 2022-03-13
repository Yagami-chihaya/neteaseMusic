<template>
  <div class="contentBox">
    <div class="top">
      
      <p><img :src="titleImg" v-if="titleImg!=''">{{title}}</p>
      <span v-for="item in otherTitle" :key="item">{{item}}</span>
      <span class="more" @click="go(url)">{{rightText}}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default defineComponent({
  name: "",
  components: {},
  props: {
    title:{
      type:String,
      default:''
    },
    titleImg:{
      type:String,
      default:''
    },
    otherTitle:{
      
      
    },
    rightText:{
      type:String,
      default:[],
    },
    url:{
      type:String,
      default:''
    }
  },

  setup() {
    const router = useRouter()
    const store = useStore()
    const go = (url:string)=>{
      store.state.current_route = url
      router.push(url)
      console.log(store.state.current_route);
      
    }

    return {go};
  },
});
</script>

<style lang="scss" scoped>
.contentBox{
  height: 100%;
}
.top {
  width: 94%;
  margin: 0 3%;
  height: 3rem;

  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: nowrap;
  position: relative;
  padding-bottom: 6px;
  border-bottom: 2px solid #c10d0c;
  p{
    font-size: 20px;
    font-weight: 500;
    
    img {
      margin: 0 1rem;
    }
  }
  span {
    padding: 0 1rem;
    color: #666;
    border-right: 1px solid #ccc;
    font-size: 12px;
  }
  span:nth-last-child(2) {
    border: none;
  }
  .more {
    position: absolute;
    right: 0;
    border: none;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
}
.content {
  margin-top: 2rem;
  width: 94%;
  padding: 0 3%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  
  
}
</style>