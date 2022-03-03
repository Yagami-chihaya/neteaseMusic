import { createStore } from 'vuex'

export default createStore({
  state: {
    current_play_music:33894312,
    musicList:[],
   
    current_index:0,
    current_music_now_time:0,
    current_music_max_time:0,
    
    name_list:[],
    artist_list:[],
    cover_list:[],
    input_text:'',
    isShowLoginBox:false,       //显示登录界面
    isPlaying:false,
    isLogin:false,
    user_info:{
      code:0,
      account:{},
      profile:{},
    },
    current_account:{},
    current_profile:{},
    cookie:'',
  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
