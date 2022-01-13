<template>
<div class="top">
  排行榜
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive, 
  ref 
} from 'vue';



export default defineComponent({
  name: '',
  components:{  },
  props: {
  },
  
  setup(props, {attrs, slots, emit, expose }){
    return {
      attrs,    // Attribute (非响应式对象，等同于 attrs)，有状态，会随组件本身的更新而更新
      slots,    // 插槽 (非响应式对象，等同于 slots)，有状态，会随组件本身的更新而更新
      emit,     // 触发事件 (方法，等同于 emit)
      expose,   // 暴露公共 property (函数)
    }
  },
  

});
</script>

<style lang="scss" scoped>
</style>