
import { get_data } from './request'
import { ElMessage } from 'element-plus'


export function get_captcha(phone:Number){
  console.log('login');
  
  get_data().get('/captcha/sent',{params:{'phone':phone}}).then(res=>{
    console.log(res.data);
    if(res.data.code==200){
      ElMessage({
        message: '验证码发送成功，注意查收',
        type: 'success',
      })
    }else{
      ElMessage({
        message: res.data.message,
        type: 'error',
      })
    }
  })
}

let check_login = (store:any)=>{
  get_data().get('/login/status',{params:{'cookie':localStorage.getItem('cookie')}}).then(res=>{
    console.log(res.data);
    
    if(res.data.data.account!=null){
      console.log('not null');
      
      
      store.state.isLogin = true
      store.state.user_info = res.data.data
      store.state.current_account = res.data.data.account
      store.state.current_profile = res.data.data.profile
    }else{
      
      console.log('null');
      store.state.isLogin = false
    }
  })
}

export function login(phone:Number,captcha:Number|undefined,password:String|undefined,store:any){
  if(captcha){
    get_data().get('/login/cellphone',{params:{
      'phone':phone,
      'captcha':captcha
    }}).then(res=>{
      localStorage.setItem('cookie',res.data.cookie)
      store.state.cookie = res.data.cookie
      console.log(res.data);
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      
      check_login(store)
      location.reload()
    }).catch(err=>{
      console.log(err);
      ElMessage({
        message: '登录失败，请检查手机号和验证码',
        type: 'error',
      })
    })
  }else if(password){
    get_data().get('/login/cellphone',{params:{
      'phone':phone,
      'password':password
    }}).then(res=>{
      localStorage.setItem('cookie',res.data.cookie)

      store.state.cookie = res.data.cookie
      
      console.log(res.data);
      
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      check_login(store)
      location.reload()
    }).catch(err=>{
      console.log(err);
      ElMessage({
        message: '登录失败，请检查手机号和密码',
        type: 'error',
      })
    })
  }
  
}

export function register(phone:Number,password:String,captcha:Number,nickname:String){
  get_data().get('/register/cellphone',{params:{
    'phone':phone,
    'password':password,
    'captcha':captcha,
    'nickname':nickname
  }}).then(res=>{
    console.log(res.data);
    ElMessage({
      message:"注册成功",
      type:'success'
    })
  }).catch(err=>{
    console.log(err);
    ElMessage({
      message:'注册失败',
      type:'error'
    })
    
  })
}