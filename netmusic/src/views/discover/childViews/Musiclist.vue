<template>
<div class="musicList">
  <div class="content">
    <div class="title">
      <div class="left">
        <h2>全部</h2>
        <div class="choose_category"><span>选择分类</span><p class="down"></p></div>
      </div>
      <div class="right">热门</div>
    </div>
    <div class="list_box">
      
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
import Discover from '../Discover.vue';



export default defineComponent({
  name: '',
  components:{  },

  
  setup(){
    return {

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
      .title{
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