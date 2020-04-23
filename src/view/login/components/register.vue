<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" center>
    <el-form :model="form" :rules="rules" ref="regForm">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="图像码"
        :label-width="formLabelWidth"
        class="el-form-tu"
        prop="code"
      >
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="8">
            <img
              :src="piccodeUrl"
              alt=""
              class="image-tu"
              @click="getNewcode"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="验证码"
        :label-width="formLabelWidth"
        class="el-form-button"
        prop="rcode"
      >
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button class="elButton" @click="getCode" :disabled="sec != 0">
              {{ sec === 0 ? "获取验证码" : "还有" + sec + "秒" }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="getRegister">取 消</el-button>
      <el-button type="primary" @click="doRegister">注册</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
import { checkMobile, checkEmail } from "@/utils/validator.js";
//导入接口
import { sendSMS, register } from "@/api/register.js";
export default {
  data() {
    return {
      //上传头像
      uploadURL: process.env.VUE_APP_BASEURL + "/uploads",
      //图形验证码
      piccodeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      dialogFormVisible: false,
      //倒计时
      sec: 0,
      imageUrl: "",
      form: {
        username: "",
        phone: "",
        email: "",
        avatar: "",
        password: "",
        rcode: "",
        code: "",
      },
      formLabelWidth: "120px",
      rules: {
        avatar: [
          { required: true, message: "没有上传头像", trigger: "change" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          { validator: checkEmail },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { validator: checkMobile },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "长度最小为6", trigger: "blur" },
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度为4", trigger: "change" },
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "长度为4", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //取消
    getRegister() {
      this.dialogFormVisible = false;
      //重置表单
      this.$refs.regForm.resetFields();
      //清空头像
      this.imageUrl = "";
    },
    doRegister() {
      this.$refs.regForm.validate((v) => {
        if (v) {
          // alert('submit!');
          register({
            username: this.form.username,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.code,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              //注册成功
              //关闭对话框
              this.$message.success("注册成功");
              //重置
              this.$refs.regForm.resetFields();
              //清空头像
              this.imageUrl = "";
              this.dialogFormVisible = false;
            } else {
              //提示用户
              this.$message.error(res.data.message);
            }
          });
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    //头像上传
    //上传之后
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data.file_path;
      this.imageUrl = URL.createObjectURL(file.raw);
      //对部分表单进行效验
      this.$refs.regForm.validateField("avatar");
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是图片格式");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    getNewcode() {
      //生成随机数
      this.piccodeUrl =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&t=" +
        Math.random();
    },
    getCode() {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.form.phone)) {
        this.$message.error("手机号不合法");
        return;
      }
      if (this.form.code.length !== 4) {
        this.$message.error("图形码要4");
        return;
      }
      //获取验证码
      this.sec = 60;
      //写一个计时器
      let timeID = setInterval(() => {
        this.sec--;
        if (this.sec === 0) {
          clearInterval(timeID);
        }
      }, 1000);
      //请求
      //   axios({
      //     url: process.env.VUE_APP_BASEURL + "/sendsms",
      //     method: "post",
      //     data: {
      //       phone: this.form.phone,
      //       code: this.form.code,
      //     },
      //     withCredentials: true,
      //   }).then((res) => {
      //       console.log(res)
      //     if (res.data.code == 200) {
      //       this.$message({
      //         showClose: true,
      //         message: "注册成功"+res.data.data.captcha,
      //         type: "success",
      //       });
      //     }else{
      //          this.$message({
      //       showClose: true,
      //       message: '注册失败'+res.data.message,
      //       type: 'error'
      //     });
      //     }
      //   });
      //请求
      sendSMS({
        phone: this.form.phone,
        code: this.form.code,
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("获取验证码" + res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
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
  .el-dialog__title {
    color: white;
    font-size: 17px;
  }
}
.el-form-tu {
  .image-tu {
    width: 143px;
    height: 41px;
    margin-left: 10px;
  }
}
.el-form-button {
  .elButton {
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
  border-color: #409eff;
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
