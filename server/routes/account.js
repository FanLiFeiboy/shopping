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

// router.get('/',(req,res) => {
//   res.send('通了')
// })

router.post('/accountadd',(req,res) => {
    let {account,password,userGroup} = req.body

    //接受默认头像
    let avatarUrl=`/upload/avatar.jpg`;

    //准备sql
    let sqlStr=`insert into accounts(account,password,userGroup,avatarUrl ) values('${account}','${password}','${userGroup}','${avatarUrl}');`
    
    //执行
    //添加账号
    connection.query(sqlStr,(err,data) => {
      if(err) throw err;
      
      console.log(data)

      //判断数据有增加
      if(data.affectedRows>0){
        res.send({
          code:0,reason:'添加账号成功'   //相应成功的数据给前端
        })
      }else{
        res.send({
          code:1,reason:'添加账号失败'    //相应失败的数据给前端
        })
      }

    })


   

    
})


//账号列表
// router.get('/accountlist',(req,res) =>{

//     //准备sql                          //这是按时间排序
//     let sqlStr=`select * from accounts order by ctime desc`;
//     //执行sql
//     connection.query(sqlStr,(err,data) =>{
//       if (err) throw err;


//       res.send({data})  //相应数据给前端
      
//     })

    
// })

//单挑删除
router.get('/accountdel',(req,res) =>{
  //接受id
  let {id} = req.query;
  
  //准备sql
  let sqlStr=`delete from accounts where id=${id}`
  
  //执行sql
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    if(data.affectedRows > 0){
      res.send({
        code:0,reason:'删除成功'
      })
    }else{
      res.send({
        code:1,reason:'删除失败'
      })
    }
  })


  
   
})


//单挑修改
router.get('/accountedit',(req,res) =>{
   let {id} =req.query;
    //准备sql
    let sqlStr=`select * from accounts where id=${id}`

    //执行sql
    connection.query(sqlStr,(err,data) => {
      if(err) throw err;
      res.send({data})

      
    })
    
})

//确定修改
router.post('/saveaccount',(req,res) =>{
    let {id,account,userGroup} =req.body;

    //准备sql   修改数据
    let sqlStr=`update accounts set account='${account}',userGroup='${userGroup}' where id=${id}`

    
    //执行sql
    connection.query(sqlStr,(err,data) => {
      if(err) throw err;
      if(data.affectedRows > 0 ){
          res.send({
            code:0,
            reason:'数据修改成功'
          })
      }else{
        res.send({
          code:1,
          reason:'数据修改失败'
        })
      }

    })


})


//批量删除
router.get('/batchdelete',(req,res) => {
    //接受 请求参数
    let {idArr} =req.query

    //准备sql
    let sqlStr=`delete from accounts where id in (${idArr})`
    
    //执行sql
    connection.query(sqlStr,(err,data) => {
      if(err) throw err;
      if(data.affectedRows >0){
        res.send({code:0,reason:'批量删除成功'})
      }else{
        res.send({code:1,reason:'删除失败'})
      }
    })


})


//分页渲染页面
router.get('/accountlistByPage',(req,res) => {
    //接受前端发过来的参数
    let {pageSize,currentPage} = req.query;

    //定义一个变量保存总数据
    let total;
     
    // //准备sql  查询所有数据
     let sqlStr=`select * from accounts order by ctime desc`;

     //执行sql
     connection.query(sqlStr,(err,data) => {
         if(err) throw err;
        console.log(data.length)//这里就是打印出来的data

         total=data.length; 
    })
    
     //构造sql 按照分页查询数据
     let n = (currentPage-1) * pageSize
     sqlStr+=` limit ${n},${pageSize}`

    // //执行sql
     connection.query(sqlStr,(err,data) => {
     if(err) throw err;

      res.send({total,data})
    })
 


})

//查询旧密码是否跟新密码一致
router.get('/checkpass',(req,res) => {
  //获取前端传过来的数据
  let {oldpass} =req.query;
  //拿去当前用户的id
  if(oldpass === req.user.password){
    res.send({code:0,reason:'原密码正确'})
  }else{
    res.send({code:1,reason:'旧密码错误'})
  }

  



})

//修改密码
router.post('/passwordmodify',(req,res)=>{
    let {newpassord} =req.body
    //拿取账户id
    let id=req.user.id
    //准备sql
    let sqlStr=`update accounts set password='${newpassord}' where id=${id}`
    //执行sql
    connection.query(sqlStr,(err,data)=> {
      if(err) throw err;
      //判断有没有这条数据 有的data会大于1
      if(data.affectedRows>0){
        res.send({code:0,reason:'密码修改成功'})
      }else{
        res.send({code:1,reason:'密码修改失败'})
      }
    })
   

})  

//拿去用户信息
router.get('/getUserinfo',(req,res) => {
  //获取用户的信息
  let id=req.user.id;
  //准备sql
  console.log(req.user)
   let sqlStr=`select * from accounts where id=${id}`

   //执行sql
   connection.query(sqlStr,(err,data) =>{
     if (err) throw err ;
     res.send({data})
   })
   



})



//头像上传
/* -----上传开始---- */ 
// 引入node上传模块
var multer = require('multer');

// 配置存储路径 和 重命名
var storage = multer.diskStorage({
    // 图片上传到服务器以后 要放置的路径
    destination: 'public/upload',

    // 图片重命名
    filename: function (req, file, cb) {
        var fileFormat =(file.originalname).split(".");
        // 获取时间戳
        var filename = new Date().getTime();  
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
});

// 上传对象
var upload = multer({
    storage,
});

// 接收上传请求
router.post('/uploadavatar', upload.single('file'), (req, res) => {
    // 接收到的文件信息
	var file = req.file;
	console.log(file)

	// 文件名
	let fileName = file.filename;
	// 拼接文件路径
	let avatarUrl = '/upload/' + fileName

	// 构造sql
	const sqlStr = `update accounts set avatarUrl = '${avatarUrl}' where id=${req.user.id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
			if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: "上传成功", avatarUrl})
		} else {
			res.send({code: 1, reason: "上传失败"})
		}
	})
})


//获取用户角色
router.get('/role',(req,res) =>{
  res.send({role:req.user.userGroup})
})


module.exports = router;
