//引入模块
import req from '@/utils/request'

export function goodsadd(params){
    return req.get('/goods/goodsadd',params)
}

export function goodsDel(params){
    return req.get('/goods/goodsdel',params)
}

export function searchform(params){
    return req.get('/goods/searchform',params)
}

export function getSellData(){
    return req.get('/goods/getsellData')
}