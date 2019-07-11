
var express = require('express');
var router = express.Router();

const connection=require('./js/conn')

//引入express-jwt模块，此模块主要用于安装验证token的合法性
const expressJwt=require('express-jwt')
//定制密钥
const secret = 'itsource';

	// 验证token合法性（检查用户携带的token是否正确）
router.use(expressJwt ({
    secret 
}).unless({
    path: ['/login/checklogin']  // 不需要验证的url
}))

// 如果token不正确，就会抛出错误，如果错误的名字是“UnauthorizedError” 可以断定就是token无效的错误
router.use(function (err, req, res, next) {
if (err.name === 'UnauthorizedError') {  
  // token无效 就给前端浏览器响应401状态码 且响应错误提示信息 
    res.status(401).send('无效的token，前端发送的请求，必须在请求头上携带token，才能拿到数据哦！');
}
})

//统一设置相应头解决跨域问题
router.all('*',(req,res,next) =>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
  next() //放行
})

//商品添加
router.get('/goodsadd',(req,res) =>{
    //解构
    let {region,goodsName,shapeCode,purchasingPrice,marketPrice,goodsPrice,goodsUnivalence}=req.query;
    //准备sql
    let sqlStr=`insert into goods(region,goodsName,shapeCode,purchasingPrice,marketPrice,goodsPrice,goodsUnivalence) values(?,?,?,?,?,?,?)`;
    let sqlParams=[region,goodsName,shapeCode,purchasingPrice,marketPrice,goodsPrice,goodsUnivalence]

    //执行sql
    connection.query(sqlStr,sqlParams,(err,data) =>{
          if(err) throw err;
          if(data.affectedRows> 0){
            res.send({code:0,reason:'商品添加成功'})
          }else{
            res.send({code:1,reason:'商品添加失败'})
          }

    })
    
})

//拿去所有数据
router.get('/getgoods',(req,res) =>{

    let {pageSize,currentPage,region,keyword}=req.query;
    //定义一个变量保存总数
    let total

  //准备sql
     //构造sql     //这是拿去所有数据
     let sqlStr=`select * from goods where 1=1`

     //判断   非空的时候和全部的时候
     if(region !== '' && region !== '全部'){
       sqlStr+=` and region ='${region}'`
     }
     
     if(keyword !== ''){
       sqlStr+=` and(goodsName like '%${keyword}%' or shapeCode like '%${keyword}%')`
     }
     sqlStr+=` order by ctime desc`


  //执行sql
  connection.query(sqlStr,(err,data) => {
    if(err) throw err
    total=data.length
    
  })
  
  let n=(currentPage-1)*pageSize

  sqlStr+=` limit ${n},${pageSize}`
  
  //执行sql
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    res.send({total,data})
  })

})

//删除
router.get('/goodsdel',(req,res)=>{
    let {id} = req.query
    //准备sql
    let sqlStr=`delete from goods where id=${id}`
    //执行sql
    connection.query(sqlStr,(err,data)=> {
      if(err) throw err;
      if(data.affectedRows>0){
        res.send({code:0,reason:'删除成功'})
      }else{
        res.send({code:1,reason:'删除失败'})
      }

    })
    
})

// //商品管理搜索
// router.get('/searchform',(req,res) =>{
//       //拿去前端传的数据
//       let {region,keyword}=req.query

//       //构造sql     //这是拿去所有数据
//       let sqlStr=`select * from goods where 1=1`

//       //判断   非空的时候和全部的时候
//       if(region !== '' && region !== '全部'){
//         sqlStr+=` and region ='${region}'`
//       }
      
//       if(keyword !== ''){
//         sqlStr+=` and(goodsName like '%${keyword}%' or shapeCode like '%${keyword}%')`
//       }
      
//       //执行sql
//       connection.query(sqlStr,(err,data) =>{
//         if(err) throw err;
//         res.send({data})
//       })
      
// })





module.exports = router;