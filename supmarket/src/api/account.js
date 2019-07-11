




//引入request.js
import req from '@/utils/request'

//暴漏一个函数

//账号增加
export function accountadd(params){
    return req.post('/account/accountadd',params)
}
//批量删除
export function batchdelete(params){
    return req.get('/account/batchdelete',params)
}

//编辑
export function accountedit(params) {
    return  req.get('/account/accountedit',params)
}

//修改
export function saveaccount(params) {
    return  req.post('/account/saveaccount',params)
}

//删除
export function accountdel(params){
    return req.get('/account/accountdel',params)
}

//分页跟新
export function accountlistByPage(params) {
    return req.get('/account/accountlistByPage',params)
}

//验证原密码是否跟登陆的密码相同
export function checkoldPass(params) {
    return req.get('/account/checkpass',params)
}



//修改密码
export function passwordModify(params){
    return req.post('/account/passwordmodify',params)
}

//拿去用户信息
export function getUserinfo(){
    return req.get('/account/getUserinfo')
}

//菜单权限
export function getRole(){
    return req.get('/account/role')
}



