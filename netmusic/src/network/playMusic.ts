
import { get_data } from './request'


let audio = new Audio()

let playList = []

let getMusic = (store: any) => {
  return get_data().get('/song/url', { params: { 'id': store.state.current_play_music } })
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



export function playMusic(store: any,isSingle=false) {  //需手动传入store对象，ts文件无法单独使用vuex的api  isSingle判断是否单独播放歌曲
  
  audio.load()

  getMusic(store).then(res => {             //为了防止以后看不懂，这段代码意思是先将要播放的歌曲url推进数组当中，播放数组最后一个元素并删除。然后判断数组长度是否大于0，若大于则从数组中第一个元素开始播放并删除。直到队列清空
    
    console.log(res.data);
    
    store.state.musicList.push(res.data.data[0].url)

    console.log(store.state.musicList);
    let url: string
    if(isSingle){
      url = store.state.musicList[store.state.musicList.length-1]
      
    }else {
      url= store.state.musicList[0]
    }
    

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
      if(isSingle){       
        store.state.musicList.splice(store.state.musicList.length-1, 1)
      }else{
        store.state.musicList.splice(0, 1)
      }
      
      
      setInterval(()=>{
        if(store.state.musicList.length>0&&store.state.current_music_now_time>=store.state.current_music_max_time){
        
        
        
          console.log(">>>");
   
          audio.load()
          console.log(store.state.musicList[0]);
          let url: string = store.state.musicList[0]
          audio.src = url
          //等待audio对象加载
          setTimeout(()=>{     
            console.log(audio.duration);
            store.state.current_music_now_time = 0
            let time2 = audio.duration;  //获取歌曲播放时长
            store.state.current_music_max_time = Math.floor(time)
            store.state.isPlaying = true
            audio.play()
            auto_increment_nowTime(store)
            store.state.musicList.splice(0, 1)
            store.state.name_list.splice(0, 1)
            store.state.artist_list.splice(0, 1)
          },300)
           
          
        
        
        
      }
        
      },500)
      
    },300)

    
    

  })

}
export function afterPlay(store: any) {
  getMusic(store).then(res => {
    store.state.musicList.push(res.data.data[0].url)

  })
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