import { get_data } from './request'


let audio = new Audio()

let playList = []

let getMusic = (store: any) => {
  return get_data().get('/song/url', { params: { 'id': store.state.current_play_music } })
}


export function playMusic(store: any) {  //需手动传入store对象，ts文件无法单独使用vuex的api

  audio.load()

  getMusic(store).then(res => {
    store.state.musicList.push(res.data.data[0].url)

    let url: string = store.state.musicList[0]


    audio = new Audio(url)

    audio.play()
    console.log(store.state.musicList.length - 1);

    store.state.musicList.splice(0, 1)
    console.log("删除后的列表");
    console.log(store.state.musicList);

    if(store.state.musicList.length>0){
      setInterval(() => {
        audio.load()
        console.log(store.state.musicList[0]);
        let url: string = store.state.musicList[0]
        audio = new Audio(url)
        audio.play()
        store.state.musicList.splice(0, 1)
        
      },5000)
    }
    

  })

}
export function afterPlay(store: any) {
  getMusic(store).then(res => {
    store.state.musicList.push(res.data.data[0].url)
    console.log(store.state.musicList);


  })
}