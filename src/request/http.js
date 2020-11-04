import axios from 'axios';
import router from './../router';
import { Loading,Message } from 'element-ui'

let  loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
})
}
function endLoading() {
  loading.close()
}

axios.interceptors.request.use(
  (config)=>{
    startLoading();
    if(sessionStorage.getItem('token')){
      config.headers.Authorization = sessionStorage.getItem('token')
    }else{
      router.replace('/login')
    }
    return config
  },
  (error)=>{
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (response)=>{
    endLoading();
    // console.log(response)
    return response.data;
  },
  (error) => {
    Message.error(error.response.data)
    endLoading()
    // 获取状态码
    const { status } = error.response
    if (status === 401) {
        Message.error('请重新登录')
            //跳转到登录页面
        router.push('/login')
        sessionStorage.setItem('token','')
    }
    return Promise.reject(error)
}
)
export default axios