
//引入axios
import axios from 'axios';

//引入qs
import qs from 'qs';


//默认服务器地址
axios.defaults.baseURL='http://127.0.0.1:666';

//请求拦截器
// axios.interceptors.request.use(config=>{
//     //获取token
//     let token=window.localStorage.getItem('lux_token')
//     //给头部带上一个token
//     config.headers.authorization=`Bearer ${token}`
//     return config
// })

axios.interceptors.request.use(config => {
    // 获取token
    let token = window.localStorage.getItem('lux_token')

    // 给头部携带token
    config.headers.authorization = `Bearer ${token}` 
    return config
})

//暴漏对象
export default {
    get(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params})
            .then(response =>{
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
         }) 
         
    },
    post(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(params))
            .then(response =>{
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
         }) 
    },
}