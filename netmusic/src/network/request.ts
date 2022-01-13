import axios from 'axios'

export function get_data(){
  let instance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:20000
  })
  instance.interceptors.request.use(config=>config,err=>{
    console.log(err);
    
  })
  return instance
}