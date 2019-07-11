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
//映入模块
const jwt= require('jsonwebtoken');


//登陆验证
router.post('/checklogin',(req,res) =>{
    //拿到前端传的参数
     let {account,password}=req.body;
    //准备sql
    let sqlStr=`select * from accounts where account='${account}' and password='${password}'`

     //执行sql
     connection.query(sqlStr,(err,data) =>{
         if(err) throw err;
         if(data.length){
            //生成token
            const token = jwt.sign(Object.assign({},data[0]), secret, {
                expiresIn:  60 * 60 * 2//秒到期时间
            });
            
             res.send({code:0,reason:'登陆成功',token})
         }else{
            res.send({code:1,reason:'登陆失败'})
         }
     })   
     
})




module.exports = router;