//连接 数据库

//引入mysql
const mysql=require('mysql')

//创建连接对象
const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'smms'

})

//执行连接
connection.connect()


console.log('数据库连接成功')

//暴漏连接对象
module.exports=connection;

