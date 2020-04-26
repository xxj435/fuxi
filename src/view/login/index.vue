<template>
  <div class="login">
    <!-- 登录 -->
    <div class="login-form">
      <div class="title-box">
        <img
          src="../login/images/矢量智能对象 拷贝 9@2x.png"
          alt=""
          class="login-img"
        />
        <span class="title">佳欣后台</span>
        <span class="title-1"></span>
        <span class="title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form class="login-form-item" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item  prop="phone">
          <el-input
          v-model="ruleForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
          v-model="ruleForm.password"
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="el-form-tu">
          <el-row>
            <el-col :span="16">
              <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.code">
              </el-input>
            </el-col>
            <el-col :span="8">
              <img :src="imageURL" alt="" @click="toImg"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="el-form-link" prop='checked'>
          <el-checkbox v-model="ruleForm.checked"></el-checkbox>
          <span>我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item class="el-form-button">
          <el-button class="btn" type="primary" @click="submitForm">登录</el-button>
          <el-button class="btn1" type="primary" @click="toRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 图片 -->
    <div class="login-box">
      <img src="./images/login_banner_ele@2x.png" alt="" />
    </div>
    <register ref="register"></register>
  </div>
</template>

<script>
//导入token设置
import {setToken} from '@/utils/token.js'
//导入接口
import {toLogin} from '@/api/login.js'
//导入对话框
import register from './components/register'
import {checkAgree,checkMobile} from '../../utils/validator'
export default {
  //注册
  components:{
    register
  },
  data() {
    return {
      imageURL:process.env.VUE_APP_BASEURL+"/captcha?type=login",
       ruleForm: {
          phone:'',
          password:'',
          code:'',
          checked:false
        },
          rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式不对', trigger: 'blur' },
            { validator: checkMobile }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 12, message: '长度最小为6', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'change' },
            { min: 4, max: 4, message: '长度为4', trigger: 'change' }
          ],
           checked: [{ validator: checkAgree }]
        }
    }
  },
  methods: {
    toImg(){
      //刷新图片
      this.imageURL=process.env.VUE_APP_BASEURL+"/captcha?type=login&t="+Date.now()
    },
    //判断
    submitForm(){
      this.$refs.ruleForm.validate((v)=>{
        //用户全部输入正确
        if (v) {
            // alert('submit!');
          toLogin({
            phone:this.ruleForm.phone,
            password:this.ruleForm.password,
            code:this.ruleForm.code
          })
          .then(res=>{
            console.log(res)
           if(res.data.code==200){
              setToken(res.data.data.token)
            this.$message.success('登录成功')
            setTimeout(()=>{
              this.$router.push('/index/shuju')
            },1000)
            // this.$router.push('/index')
           }else{
             this.$message.error(res.data.message)
           }
          })
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    },
  //弹出对话框
  toRegister(){
    //访问子组件this
    this.$refs.register.dialogFormVisible=true
  }
  },
  beforeCreate() {
      document.title = '登录'
    },
};
</script>

<style lang="less" >
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  //设置主轴居中
  justify-content: space-around;
  align-items: center;
  .login-box img {
    height: 435px;
    width: 633px;
  }
  .login-form {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 41px 86px 42px;
    box-sizing: border-box; //内减盒子
    .title-box {
      display: flex;
      align-items: center;
      .title {
        margin-left: 22px;
        font-size: 22px;
      }
      .title-1 {
        margin-left: 22px;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .login-img {
        width: 22px;
        height: 17px;
      }
    }
    .login-form-item {
      margin-top: 30px;
      .el-form-link{
        display: flex;
        align-items: center;
      }
      .el-form-button{
        .btn,.btn1{
          width: 100%;
        }
        .el-button+.el-button{
          margin-left: 0;
          margin-top: 26px;
        }
      }
      .el-form-tu{
        img{
           vertical-align:top;
          width: 110px;
          height: 42px;
        }
      }
    }
  }
}
</style>
