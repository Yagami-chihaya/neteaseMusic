<template>
  <div class="follow">
    <div class="content">
      <div class="t1">
        <div class="button" @click="store.state.isShowLoginBox=true"></div>
      </div>
    </div>
    <div class="bottom" style="overflow: hidden">
      <img src="../../assets/img/bottom.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore} from 'vuex'
export default defineComponent({
  name: "",
  components: {},
  props: {},

  setup() {
    let store = useStore()
    return {
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
.follow {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: #f5f5f5;

  .content {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background: white;
    width: 69.6rem;
    height: 700px;
    .t1 {
      width: 902px;
      height: 414px;
      margin: 0 auto 0;
      padding-top: 70px;
      background: url("https://s2.music.126.net/style/web2/img/notlogin.jpg?fa67ef8f74e81edb70b59a50a5cb9cac")
        0 0 no-repeat;
      background-position: 0 70px;
      position: relative;
      .button {
        width: 157px;
        height: 48px;
        background: white;
        opacity: 0;
        position: absolute;
        bottom: 106px;
        right: 210px;
        cursor: pointer;
        &:hover {
          opacity: 0.1;
        }
      }
    }
  }
  .bottom {
    img {
      width: 99vw;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>