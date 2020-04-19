<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" center>
    <el-form :model="form" :rules="rules" ref="regForm">
        <el-form-item label="头像" :label-width="formLabelWidth">
       <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop='username'>
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop='phone'>
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
    <el-form-item label="图像码" :label-width="formLabelWidth" class="el-form-tu">
        <el-row>
            <el-col :span='16'>
            <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-col>
        <el-col :span='8'>
            <img src="../../../assets/下载.jpg" alt="" class="image-tu">
        </el-col>
        </el-row>
    </el-form-item>
     <el-form-item label="验证码" :label-width="formLabelWidth" class="el-form-button" prop='rcode'>
        <el-row>
            <el-col :span='16'>
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span='8'>
            <el-button class="elButton">获取验证码</el-button>
        </el-col>
        </el-row>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {checkMobile,checkEmail} from '@/utils/validator.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        phone:"",
        email:'',
        avatar:"",
        password:"",
        rcode:""
      },
      formLabelWidth: "120px",
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            { validator:checkEmail }
          ],
            phone:[
               { required: true, message: '请输入手机号', trigger: 'change' },
               { validator:checkMobile}
            ],
             password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 12, message: '长度最小为6', trigger: 'blur' }
          ],
          rcode:[
              { required: true, message: '请输入验证码', trigger: 'change' },
            { min: 4, max: 4, message: '长度为4', trigger: 'change' }
          ]

        }
    };
  },
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .el-dialog__title{
      color: white;
      font-size: 17px;
  }
}
.el-form-tu{
    .image-tu{
        width: 143px;
        height: 41px;
        margin-left: 10px;
    }
}
.el-form-button{
    .elButton{
        margin-left: 10px;
    }
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 120px;
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
