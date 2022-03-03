
import { get_data } from './request'


let audio = new Audio()



let getMusic = (id:number) => {
  return get_data().get('/song/url', { params: { 'id': id } })
}
let l:any;
let auto_increment_nowTime = (store:any)=>{
  
  clearInterval(l);
  l = setInterval(()=>{
    console.log(store.state.isPlaying);
    
    if(store.state.isPlaying){
      store.state.current_music_now_time++
    }
    
    
  },1000)
}



export function playMusic(store: any,isSingle=false,id:number) {  //需手动传入store对象，ts文件无法单独使用vuex的api  isSingle判断是否单独播放歌曲
  
  // if(store.state.current_index==store.state.musicList.length-1){
  //   return 0
  // }


  audio.load()
  
  if(isSingle){
    store.state.current_index = 0
    store.state.musicList.unshift(id)
    store.state.current_play_music = store.state.musicList[store.state.current_index]
    
    
  }else {
    store.state.musicList.push(id)
    store.state.current_play_music= store.state.musicList[store.state.current_index]
  }

  getMusic(store.state.current_play_music).then(res => {             //这段代码意思是先将要播放的歌曲url推进数组当中，播放数组最后一个元素并删除。然后判断数组长度是否大于0，若大于则从数组中第一个元素开始播放并删除。直到队列清空
    
    console.log(res.data.data[0]);
    
    let url: string = res.data.data[0].url
    
    audio.src = url

    console.log(audio);
    

    setTimeout(()=>{
      store.state.current_music_now_time = 0
      let time = audio.duration
      store.state.current_music_max_time = Math.floor(time)
      console.log(store.state.current_music_max_time);
      store.state.isPlaying = true
      audio.play()
      auto_increment_nowTime(store)
      
      
      
      setInterval(()=>{
        if(store.state.current_index==store.state.musicList.length-1){
          console.log('qwe');
          
          return 0
        }
        if(store.state.musicList.length>0&&store.state.current_music_now_time>=store.state.current_music_max_time){
          store.state.current_index++
          store.state.current_play_music= store.state.musicList[store.state.current_index]
          getMusic(store.state.current_play_music).then(res => {
            console.log(">>>");
   
            audio.load()
          
            let url: string = res.data.data[0].url
            audio.src = url
            //等待audio对象加载
            setTimeout(()=>{     
              
              store.state.current_music_now_time = 0
              let time2 = audio.duration;  //获取歌曲播放时长
              store.state.current_music_max_time = Math.floor(time)
              store.state.isPlaying = true
              audio.play()
              auto_increment_nowTime(store)
              
    
            },200)
           
          })
          
          
        
        
        
        }
        
      },500)
      
    },300)

    
    

  })

}
export function afterPlay(store: any,id:number) {
  store.state.musicList.push(id)
  
}
export function changeNowTime(store:any){
  audio.currentTime = store.state.current_music_now_time
}
export function stopMusic(store:any){
  store.state.isPlaying = false
  audio.pause()
}
export function go_on_music(store:any){
  store.state.isPlaying = true
  audio.play()
}
export function change_voice(value:number){
  console.log(value);
  console.log(audio.volume);
  
  audio.volume = Number((value/100).toFixed(2))
}