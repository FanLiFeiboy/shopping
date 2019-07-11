<template>
    <div class="personal">
       
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>这是个人中心</h1>
            </div>
            <div>
               <h2>用户id:{{userinfo.id}}</h2>
               <h2>账号:{{userinfo.account}}</h2>
               <h2>用户组:{{userinfo.userGroup}}</h2>
               <h2>创建时间:{{userinfo.ctime | filteCtime}}</h2>
            </div>
            <div>
            <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request="uploadAvatar"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> 


            </div>


         </el-card>

    </div>
</template>

<script>
    import {getUserinfo} from '@/api/account'
    import moment from 'moment'
    //引入axios
    import axios from 'axios'
    export default {
        data(){
            return{
                userinfo:{},
                imageUrl:'',
            }
        },
        methods:{
            getUserInfo(){
                //发送ajax
                getUserinfo()
                .then(res =>{
                    let {data} =res;
                    this.userinfo=data[0];
                })
                .catch(err =>{
                    console.log(err)
                })


            },
            //头像上传成功
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            //头像上传限制条件
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //上传函数
            uploadAvatar(file){
                console.log(file)
                //创建fordata实例对象
                let formData=new FormData();
                //把文件信息添加进对象
                formData.append('file',file.file)
                axios.post('/account/uploadavatar',formData)
                .then(response =>{
                    //获取地址
                    let {avatarUrl} =response.data
                    //回填
                     this.imageUrl = 'http://127.0.0.1:666' + avatarUrl;
                    //传递给父组件
                    this.$emit('fn') 


                })
                .catch(err =>{
                    console.log(err)
                })
            }
        


        },
        created(){
            this.getUserInfo()
        },
        filters:{
            filteCtime(ctime){
                return moment(ctime).format('YYYY-MM-DD')
            }
        }


    }
</script>

<style lang="less">
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }



</style>