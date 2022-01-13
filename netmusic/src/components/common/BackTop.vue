<template>
<div class="backtop" @click="backTop">
  
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref ,
  watch,
} from 'vue';



export default defineComponent({
  name: '',
  components:{  },
  props: {
  },
  
  setup(){

    const backTop = () =>{

      document.documentElement.scrollTop=0
    }

    return {
      
      backTop,
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .backtop{
    position: fixed;
    left: 50%;
    margin-left: 500px;
    bottom: 160px;
    width: 49px;
    height: 44px;
    background: url('../../assets/img/sprite.png');
    background-position: -265px -47px;
    cursor: pointer;
  
  }
</style>