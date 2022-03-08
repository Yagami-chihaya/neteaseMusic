import { createStore } from 'vuex'
import {useRouter} from 'vue-router'

const router = useRouter()

export default createStore({
  state: {
    current_route:router.currentRoute.value,              //当前路由 
    current_play_music:33894312,   //当前播放歌曲id
    musicList:[],                  //播放id队列
    current_lyric:'',              //当前播放歌曲歌词
    current_index:0,               //当前播放歌曲的数组下标
    current_music_now_time:0,      //当前播放时长
    current_music_max_time:0,      //当前播放歌曲的最大时长
    
    name_list:[],                 //播放歌名队列
    artist_list:[],               //播放歌手队列
    cover_list:[],                //播放封面队列
    input_text:'',                 //搜索框输入内容
    isShowLoginBox:false,       //显示登录界面
    isPlaying:false,            //是否正在播放
    isLogin:false,              //用户是否登录
    user_info:{                  //用户基本信息
      code:0,
      account:{},
      profile:{},
    },
    current_account:{},          //
    current_profile:{},          //用户档案
    cookie:'',                  
  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
