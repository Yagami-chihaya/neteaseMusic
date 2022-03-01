<template>
  <div class="loginBox" v-show="store.state.isShowLoginBox">
    <div id="page1" v-show="page==1">
      <div class="navbar">
        <span>登录</span><img @click="close" src="../../assets/img/叉.png" />
      </div>
      <div class="content">
        <div class="left">
          <img
            src="https://s2.music.126.net/style/web2/img/platform.png?d4dbf46730fe4c116db744617616a915"
          />
          <div class="login" @click="page=2">手机号登录</div>
          <div class="register" @click="page=4">注册</div>
        </div>
        <div class="right">
          <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wxe280063f5fb2528a&response_type=code&redirect_uri=https://music.163.com/back/weichat&forcelogin=true&scope=snsapi_login&state=JVLYbCJrQC&checkToken=9ca17ae2e6ffcda170e2e6eed9ee349bb49f89e63dadac8eb2d54a869b8eaaaa25f3babdd9fb479baba0daf12af0feaec3b92a918e8b94c24882a7afb6c44a829f9aa3d54ba1f1f988ef4e92ace184c573e9a9ee9e&lang=zh_CN#wechat_redirect">
            <div class="wechat"></div>
            <span>微信登录</span>
          </a>
          <a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100495085&response_type=code&redirect_uri=https://music.163.com/back/qq&forcelogin=true&state=DXnJpfVBSV&checkToken=9ca17ae2e6ffcda170e2e6eed9ee349bb49f89e63dadac8eb2d54a869b8eaaaa25f3babdd9fb479baba0daf12af0feaec3b92af48a9992e56fe9eafad5c44e839f9bb6c15a8aafbe98e65b92f581b7bb5cb6baee9e">
            <div class="qq"></div>
            <span>QQ登录</span>
          </a>
          <a href="https://api.weibo.com/oauth2/authorize?client_id=301575942&response_type=code&redirect_uri=http://music.163.com/back/weibo&forcelogin=true&scope=friendships_groups_read,statuses_to_me_read,follow_app_official_microblog&state=bxnCSVcSIT&checkToken=9ca17ae2e6ffcda170e2e6eed9ee349bb49f89e63dadac8eb2d54a869b8eaaaa25f3babdd9fb479baba0daf12af0feaec3b92a95bd9ed6c653fb91a1b1f64a879f9fa2d14e8eeae5d2eb4e96e9848cae5a96bbee9e###">
            <div class="weibo"></div>
            <span>微博登录</span>
          </a>
          <a>
            <div class="netease"></div>
            <span>网易邮箱账号登录</span>
          </a>
        </div>
      </div>
      <img
        class="QR"
        src="https://s2.music.126.net/style/web2/img/qr_login_icon.png?d4dd07837f9fa9fd154f1d654bf45fd9"
      />
    </div>
    <div id="page2" v-show="page==2">
      <div class="navbar">
        <span>手机号登录</span><img @click="close" src="../../assets/img/叉.png" />
      </div>
      <div class="content">
        <el-input placeholder="请输入手机号" class="phone" v-model="phone"></el-input>
        <el-input placeholder="请输入验证码" class="captcha" v-model="captcha"></el-input>
        <div class="get_captcha" @click="send_captcha">获取验证码</div>
        <p class="warning" v-show="isShowPhoneWarning"><span></span>请输入正确的手机号</p>
        <span @click="page=3">密码登录</span>
        <span>自动登录</span>
        <div class="login" @click="login2">登录</div>
      </div>
      <div class="bottom">
        <span class="left" @click="page=1">&lt 其他登录方式</span>
        <span class="right" @click="page=4">没有账号? 免费注册 &gt</span>
      </div>
    </div>
    <div id="page3" v-show="page==3">
      <div class="navbar">
        <span>手机号登录</span><img @click="close" src="../../assets/img/叉.png" />
      </div>
      <div class="content">
        <el-input placeholder="请输入手机号" class="phone" v-model="phone"></el-input>
        <el-input placeholder="请输入密码" type="password" class="password" v-model="password"></el-input>
        
        <p class="warning" v-show="isShowPhoneWarning"><span></span>请输入正确的手机号</p>
        <span>密码登录</span>
        <span>自动登录</span>
        <div class="login" @click="login2">登录</div>
      </div>
    </div>
    <div id="page4" v-show="page==4">
      <div class="navbar">
        <span>注册</span><img @click="close" src="../../assets/img/叉.png" />
      </div>
      <div class="content">
        <p>手机号：</p>
        <el-input placeholder="请输入手机号" class="phone" v-model="phone"></el-input>
        <p>密码：</p>
        <el-input placeholder="设置登录密码，不少于8位" class="password" v-model="password"></el-input>

        <div class="register" @click="send_captcha();page=5">下一步</div>
      </div>
      <div class="bottom">
        <span class="left" @click="page=1">&lt 返回登录</span>
        
      </div>
    </div>
    <div id="page5" v-show="page==5">
      <div class="navbar">
        <span>注册</span><img @click="close" src="../../assets/img/叉.png" />
      </div>
      <div class="content">
        <p>验证码：</p>
        <el-input class="captcha" placeholder="请输入验证码" v-model="captcha"></el-input>
        <p>昵称：</p>
        <el-input class="name" placeholder="昵称不少于4个字母或2个汉字" v-model="nickname"></el-input>
        <div class="register" @click="register(phone,password,captcha,nickname)">完成注册</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import {get_captcha,login,register} from '../../network/login'

export default defineComponent({
  name: "",
  components: {},
  props: {},

  setup() {
    let store = useStore();
    let page = ref(1)
    let close = () => {
      store.state.isShowLoginBox = false;
      page.value = 1
    };
    let phone = ref()
    let isShowPhoneWarning = ref(false)
    let send_captcha = ()=>{
      let reg_phone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

      if(reg_phone.test(phone.value)){
        get_captcha(phone.value)
        isShowPhoneWarning.value = false
      }else{
        console.log('error');
        
        isShowPhoneWarning.value = true
      }
      
    }
    let captcha = ref()

    let login2 = ()=>{
      login(phone.value,captcha.value,password.value,store)
      
      store.state.isShowLoginBox = false;
    }

    let password = ref()
    let nickname = ref()
    return {
      store,
      close,
      page,
      
      phone,
      isShowPhoneWarning,
      send_captcha,
      captcha,
      login2,
      password,
      register,
      nickname,
    };
  },
});
</script>

<style lang="scss" scoped>
.loginBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 530px;
  height: 372px;
  border-radius: 5px;
  background: white;
  overflow: hidden;
  box-shadow: 0 5px 16px black;
  z-index: 10;
  .navbar {
    border-bottom: 1px solid #191919;
    background: #2d2d2d;
    padding: 0 20px;
    height: 38px;
    line-height: 38px;
    position: relative;
    span {
      font-weight: bold;
      font-size: 14px;
      color: #fff;
    }
    img {
      width: 16px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  #page1>.content {
    padding: 0px 30px;
    margin-top: 20px;
    display: flex;

    .left {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      img {
        width: 219px;
        padding: 20px 0;
      }
      .login {
        width: 219px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?157ac67288748126c413acdb88763d60")
          no-repeat 0 9999px;
        border-radius: 5px;
        background-position: right -387px;
        color: white;
        cursor: pointer;
        transition: .2s;
        &:hover{
          opacity: .8;
        }
      }

      .register {
        width: 219px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        background: url("https://s2.music.126.net/style/web2/img/button2.png?157ac67288748126c413acdb88763d60")
          no-repeat 0 9999px;
        border-radius: 5px;
        background-position: right -304px;
        cursor: pointer;
        transition: .2s;
        &:hover{
          opacity: .8;
        }
      }
    }
    .right {
      padding: 10px;
      width: 500px;
      & > a {
        display: flex;
        align-items: center;
        &:visited{
          color: black;
        }
      }

      .wechat {
        width: 38px;
        height: 38px;
        margin: 10px;
        display: inline-block;
        overflow: hidden;
        background: url("https://s2.music.126.net/style/web2/img/logo.png?363af6d40ae8690cb61d4eea8c73231d") -150px -670px
          no-repeat;
        cursor: pointer;
      }
      .qq {
        width: 38px;
        height: 38px;
        margin: 10px;
        display: inline-block;
        overflow: hidden;
        background: url("https://s2.music.126.net/style/web2/img/logo.png?363af6d40ae8690cb61d4eea8c73231d") -190px -670px
          no-repeat;
        cursor: pointer;
      }
      .weibo {
        width: 38px;
        height: 38px;
        margin: 10px;
        display: inline-block;
        overflow: hidden;
        background: url("https://s2.music.126.net/style/web2/img/logo.png?363af6d40ae8690cb61d4eea8c73231d") -231px -670px
          no-repeat;
        cursor: pointer;
      }
      .netease {
        width: 38px;
        height: 38px;
        margin: 10px;
        display: inline-block;
        overflow: hidden;
        background: url("https://s2.music.126.net/style/web2/img/logo.png?363af6d40ae8690cb61d4eea8c73231d") -271px -670px
          no-repeat;
        cursor: pointer;
      }
      span{
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
  #page2>.content{
    width: 215px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .phone{
      width: 100%;
      margin-bottom: 10px;
    }
    .captcha{
      width:130px;
    }
    .get_captcha{
      
      width: 75px;
      height: 29px;
      line-height: 29px;
      text-align: center;
      background: url("https://s2.music.126.net/style/web2/img/button2.png?157ac67288748126c413acdb88763d60")
        no-repeat 0 -60px;
      border-radius: 5px;
      border: 1px solid rgb(184, 184, 184);
      font-size: 12px;
      cursor: pointer;
      transition: .2s;
        &:hover{
          opacity: .8;
        }
    }
    .warning{
      margin: 10px 0;
      width: 100%;
      color: rgb(218, 0, 0);
      font-size: 12px;
      display: flex;
      align-items: center;
      span{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 10px;
        background: url('https://s2.music.126.net/style/web2/img/icon.png?02831de867c879fefdaa2d94c64df65a') -50px -270px no-repeat;
      }
    }
    span{
      color: #666;
      font-size: 12px;
      cursor: pointer;
    }
    .login{
      margin-top: 20px;
      font-size: 14px;
      letter-spacing: 10px;
      width: 219px;
      height: 31px;
      line-height: 31px;
      text-align: center;
      background: url("https://s2.music.126.net/style/web2/img/button2.png?157ac67288748126c413acdb88763d60")
        no-repeat 0 9999px;
      border-radius: 5px;
      background-position: right -387px;
      color: white;
      cursor: pointer;
      transition: .2s;
      &:hover{
        opacity: .8;
      }
    }
  }
  .bottom{
    position: absolute;
    bottom: 0;
    
    width: 94%;
    display: flex;
    justify-content: space-between;
    padding: 0 3%;
    height: 48px;
    border-top: 1px solid #c6c6c6;
    border-radius: 0 0 4px 4px;
    line-height: 48px;
    background-color: #f7f7f7;
    font-size: 12px;
    color: #666;
    span{
      cursor: pointer;
    }
    .left{
      color: rgb(34, 130, 255);
    }
  }
  #page3>.content{
    width: 215px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .phone{
      width: 100%;
      margin-bottom: 10px;
    }
    .password{
      width:100%;
    }
    .warning{
      margin: 10px 0;
      width: 100%;
      color: rgb(218, 0, 0);
      font-size: 12px;
      display: flex;
      align-items: center;
      span{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 10px;
        background: url('https://s2.music.126.net/style/web2/img/icon.png?02831de867c879fefdaa2d94c64df65a') -50px -270px no-repeat;
      }
    }
    span{
      color: #666;
      font-size: 12px;
      cursor: pointer;
    }
    .login{
      margin-top: 20px;
      font-size: 14px;
      letter-spacing: 10px;
      width: 219px;
      height: 31px;
      line-height: 31px;
      text-align: center;
      background: url("https://s2.music.126.net/style/web2/img/button2.png?157ac67288748126c413acdb88763d60")
        no-repeat 0 9999px;
      border-radius: 5px;
      background-position: right -387px;
      color: white;
      cursor: pointer;
      transition: .2s;
      &:hover{
        opacity: .8;
      }
    }
  }
  #page4>.content{
    width: 215px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    color: #666;
    font-size: 12px;
    p{
      margin: 10px 0;
    }
    .phone{
      width: 100%;
      
    }
    .password{
      width:100%;
      margin-bottom: 20px;
    }
    
    
    .register{
      width: 219px;
      height: 29px;
      line-height: 29px;
      text-align: center;
      background: url("https://s2.music.126.net/style/web2/img/button2.png?157ac67288748126c413acdb88763d60")
        no-repeat right -387px;
      border-radius: 5px;
      border: 1px solid rgb(184, 184, 184);
      font-size: 12px;
      color: white;
      cursor: pointer;
      transition: .2s;
      &:hover{
        opacity: .8;
      }
    }
    
  }
  
  #page5>.content{
    width: 215px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    color: #666;
    font-size: 12px;
    p{
      margin: 10px 0;
    }
    .captcha{
      width: 100%;
      
    }
    .name{
      width:100%;
      margin-bottom: 20px;
    }
    
    
    .register{
      width: 219px;
      height: 29px;
      line-height: 29px;
      text-align: center;
      background: url("https://s2.music.126.net/style/web2/img/button2.png?157ac67288748126c413acdb88763d60")
        no-repeat right -387px;
      border-radius: 5px;
      border: 1px solid rgb(184, 184, 184);
      font-size: 12px;
      color: white;
      cursor: pointer;
      transition: .2s;
      &:hover{
        opacity: .8;
      }
    }
  }
  .QR {
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
}
</style>