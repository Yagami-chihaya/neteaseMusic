<template>
<div class="download">
    <div class="top">
      <div class="box">
        <div class="other_way"><span></span>其他操作系统客户端
          <div class="download_box">
            
          </div>
        </div>
        <div class="download_way">
          <h2>在电脑上听</h2>
          <div class="d2">
            <img src="https://p1.music.126.net/PGNd0EAtUgA7iRCWXPnUuA==/109951164207162781.png?param=800x0" alt="">
          </div>
          <div class="d3">
            <span :style="{background:'url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_mac_black_new.bbaa33f484108e702bc365c250b74e79.png) 0 0 no-repeat',backgroundSize: 'contain'}"></span>
            <span :style="{background:'url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/windows.3e335fd6d5078918ef80f7e54d0bd4b8.png) 0 0 no-repeat',backgroundSize: 'contain'}"></span>
          </div>
          <div class="down_btn"><a href="https://music.163.com/api/pc/package/download/latest">下载电脑端</a></div>
        </div>
        <div class="download_way">
          <h2>在手机上听</h2>
          <div class="d2">
            <img src="https://p1.music.126.net/sLtya87wVHWn-HWJ33oN4g==/109951164207180884.png?param=450x0" alt="">
          </div>
          <div class="d3">
            <span :style="{background:'url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_iphone_black_new.3c51a3730124d2d8d662aa4393572914.png) 0 0 no-repeat',backgroundSize: 'contain'}"></span>
            <span :style="{background:'url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/android.f73995b4ecd8636ecb3819906598ec13.png) 0 0 no-repeat',backgroundSize: 'contain'}"></span>
          </div>
          <div class="down_btn" @click="side2_active=!side2_active">下载手机端</div>
          <div class="side2" :class="{active:side2_active}">
            <img src="https://p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png">
            <p>扫描二维码下载</p>
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="showlist">
      <div class="info">
        <h2>千万曲库 首首CD音质</h2>
        <p>囊括百万无损SQ音乐，你在用手机听歌时，也能感受到纤毫毕现的CD音质，更能免费离线收听</p>
      </div>
      <div class="cover">
        <img src="https://p1.music.126.net/KP4aN9umGMNnCS8iCgiV9w==/109951164206415504.jpg" alt="">
      </div>
    </div>
    <div class="showlist">
      <div class="cover">
        <img src="https://p1.music.126.net/rpwYXqZt_UpO_de46JyYwQ==/109951164488922626.jpg" alt="">
      </div>
      <div class="info">
        <h2>千位明星 亲自推荐音乐</h2>
        <p>韩红，戴佩妮等千位明星已入驻，亲自创建私房歌单，录制独家DJ节目，推荐他们心中的好音乐</p>
      </div>
    </div>
    <div class="showlist">
      <div class="info">
        <h2>社交关系 发现全新音乐</h2>
        <p>你可以关注明星、DJ和好友，通过浏览他们的动态、收藏和分享，发现更多全新好音乐</p>
      </div>
      <div class="cover">
        <img src="https://p1.music.126.net/9CQFSDAZN7TcOWz7UNEqmQ==/109951164488924083.jpg" alt="">
      </div>
    </div>
    <div class="showlist">
      <div class="cover">
        <img src="https://p1.music.126.net/IZIgZjpBv9WkyMZ53i043w==/109951164206417003.jpg" alt="">
      </div>
      <div class="info">
        <h2>手机电脑 歌单实时同步</h2>
        <p>只要一个帐号，你就可以同步在手机、电脑上创建、收藏的歌单，随时随地畅享好音乐</p>
      </div>
    </div>
    <div class="showlist">
      <div class="info">
        <h2>听歌识曲 助你疯狂猜歌</h2>
        <p>歌曲很动听却不知道歌名，歌名在嘴边却想不起来……用听歌识曲功能，几秒钟就知道歌名</p>
      </div>
      <div class="cover">
        <img src="https://p1.music.126.net/MGGp3L7AerIVlskMkAk1HA==/109951164488904737.jpg" alt="">
      </div>
    </div>
    <div class="side">
      <img src="https://p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png">
      <p>扫描二维码下载</p>
    </div>
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
  
  setup(){
    let side2_active = ref(false)
    return {
      side2_active
    }
  },
  

});
</script>

<style lang="scss" scoped>
  .download{
    width: 100%;
    position: relative;
    .top{
      height: 90vh;
      background: url('https://p1.music.126.net/LwY0PYMc2NVWwbIzvGFKcA==/109951164205104153.png') 0 0 no-repeat;
      background-color: #222;
      background-size: cover;
      font-family: PingFangSC-Regular;
      .box{
        width: 1100px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        position: relative;
        .other_way{
          position: absolute;
          right: 0;
          height: 60px;
          line-height: 60px;
          font-size: 14px;
          color: #fff;
          cursor: pointer;
          &:hover{
            opacity: .8;
          }
          span{
            margin-top: 20px;
            margin-right: 6px;
            vertical-align: text-bottom;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA5RJREFUWAnNmbtvE0EQh23zCFLsIoWlVEgIQXhTEMlVqECKAkkU/lEggSgFFalSpOARwAUFnaUUIJwUPM3v2+xd7s57593zBWek0e7tzsx+OxffPlKvlZTBYDAj1znprLQpbdlSRe1A2rdlT2W3Xq9/VRks9RAPQQFyTwpYO8RXtvvSrnRXsEzAS7wABTalaB2r570i5xv9VNcOKtAf+WZHPSMBBXdNpovS6VHBAvsPZb8lyE9FfrmAAqNvwWpRjHH7thVgW6ADVyAnoODOyXhZet3ldAJtHxVzQ5C/srHPZhts5lbUzqsNkc8y3rQOSyovBzibRGjsp9lMNhxBeK2hcITZVPDvKHUaAgVIxk5JClAzAGzIKOWR82DBTG+ynmOe17xgGeL+GFAdfEr4tU5aFi2L4YgB9cR3rupPSZnJwgCLEQMoYlaIuNH2TbLoWKZalMF50Yy7QlQ5IVhYUmPAq1VGrygW632toVSyKwld+CtiKAzTho1XbEgLTSfXOQcg+7nTKrMA8gs+rdJkLWYnXCRf1PlC+lv6UHpDOo7syfmVlLHZkFyU5knLJ4Ps2b5J2QU/l77Li+bR/oYYxCKm6lsjfJoAeouC/pUx2Xzv7XRs+FZVNhTOfd+xWboGIJkpkgf6uZ+JDCzkhp55Vb7ChF5aX+OjmLxi/mSK5ADAfpGF+tjXrTkg19X+YYQv3UyEzSjZN2JjPdHDJduUV/R9Mogz30oXJH+T7IbzhAmsO+DW1H4lzynRbjLYSzQUVYFcdWQSSNfBB3B+ENnMAee7OPTIIGdVX2HXuyJI/IwI4I8qz+xjsnDBrcrAF45Y3YYG4MTPodpX+A66IFP+Fty02Qlxzgk5hO3DFmUiJIsMelOagqTRJQm40A+8YYoAdxWcE3+IALmcfN1ZZ9vHaoFtiMAC09F+UKnkW7hDQ6Dckv0jF6Rte6x+bEKFaxHzfY4ySAAAD0Mjyf6OdElA8SWArXM2vl0iHgxxsmJAEXORM2ptzBvvrjr4BF1AqUtpKyOs/bAYiWcdNWiA+6qXOhtHMcYouaN5nfSPM5ho5DKnaHVImFZaZUzGTskQoGbAboPNwP+EZCzW66GdztArjvDtHzqv+qRfN1kLu36LICkFyn0NVyLTPFco/FrLX2AmQQQ5peeO1XEP+NVeAWdAOWDNSznot5N9HvV92bB8VX+J7hpcWZ1ROzsTjq2At2yporp/Q/wDYZIaqIRbHggAAAAASUVORK5CYII=') 0 0 no-repeat;
            background-size: contain;
          }
        }
        .download_way{
          margin-top: 60px;
          position: relative;
          h2{
            width: 100%;
            text-align: center;
            font-size: 22px;
            opacity: 0.8;
            color: #FFFFFF;
            font-weight: 500;
          }
          .d2{
            width: 464px;
            height: 273px;
            display: flex;
            justify-content: center;
            img{
              
              height: 100%;
            }
            
          }
          .d3{
            width: 100%;
            display: flex;
            justify-content: center;
            span{
              width: 154px;
              height: 44px;
              display: inline-block;
              margin: 20px;
            }
            
          }
          .down_btn{
            width: 300px;
            height: 65px;
            margin: 0 auto;
            border-radius: 65px;
            background-color: #fff;
            color: #D10000;
            font-size: 22px;
            line-height: 65px;
            text-align: center;
            cursor: pointer;
            box-sizing: content-box;
            transition: .2s;
            a{
              color: #D10000;
              text-decoration: none;
            }
            a:visited{
              color: #D10000;
            }
            &:hover{
              background: rgb(223, 223, 223);
            }
          }
          .side2{
            transition: .5s;
            opacity: 0;
            position: absolute;
            z-index: 10;
            bottom: 90px;
            right: 125px;
            padding: 20px 24px 9px;
            background: #fff;
            box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.507);
            border-radius: 10px;
            color: #333;
            font-size: 12px;
            text-align: center;
            img{
              width: 164px;
              height: 164px;
              margin-bottom: 10px;
            }
            .arrow{
              
              border-width: 10px 10px 0;
              border-top-color: #fff !important;
              position: absolute;
              width: 0;
              height: 0;
              bottom: -10px;
              left: 50%;
              transform: translateX(-50%);
              border-color: transparent;
              border-style: solid;
              
            }
          }
          .active{
            opacity: 1;
          }
        }
      }
    }
    .showlist{
      background: #fff;
      height: 437px;
      border-bottom: 1px solid #e3e3e3;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-bottom: 1px solid #e3e3e3;
      &:nth-child(2n-1){
        background: #f8f8f8;
      }
      &>div{
        width: 400px;
        height: 200px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        
      }
      .info{
        h2{
          font-size: 40px;
          font-weight: normal;
          padding: 0px 0 5px 0;
        }
        p{
          font-size: 16px;
          color: #666;
          line-height: 24px;
        }
      }
    }
    .side{
      position: fixed;
      z-index: 10;
      top: 395px;
      right: 25px;
      padding: 16px 18px 9px;
      background: #fff;
      box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.507);
      border-radius: 10px;
      color: #333;
      font-size: 12px;
      text-align: center;
      img{
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }
      
    }
  }
</style>