<template>
  <el-container class="index">
    <el-header class="my-header">
      <!-- 左边 -->
      <div class="left">
          <!-- 取反 -->
        <i :class="bol?'el-icon-s-unfold' : 'el-icon-s-fold'" @click='bol=!bol'></i>
        <img
          src="./images/矢量智能对象 拷贝 9@2x.png"
          alt=""
          class="login-img"
        />
        <span class="header-title">后台</span>
      </div>
      <!-- 右边 -->
      <div class="right">
        <img
          :src="avatar"
          alt=""
          class="right-img"
        />
        <span class="right-title">{{username}}</span>
        <button class="right-button" @click='toLogin'>退出</button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my-aside" width='auto'>
           <el-menu
           router
           :collapse='bol'
      default-active="1"
      class="el-menu-vertical-demo"
      >
       <el-menu-item index="/index/shuju">
        <i class="el-icon-time"></i>
        <span slot="title">数据概况</span>
      </el-menu-item>
       <el-menu-item index="/index/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
        <el-menu-item index="/index/tiku">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">题库列表</span>
      </el-menu-item>
        <el-menu-item index="/index/qiye">
        <i class="el-icon-office-building"></i>
        <span slot="title">企业列表</span>
      </el-menu-item>
        <el-menu-item index="/index/xueke">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">学科列表</span>
      </el-menu-item>
    </el-menu>
      </el-aside>
      <el-main class="my-main">
          <!-- 子路由 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getInfo,loginOut} from '@/api/index.js'
//导入token删除方法
import {remToken} from '@/utils/token.js'
export default {
    data() {
        return {
            username:'',
            avatar:'',
            bol:false
        }
    },
    created() {
        this.ha()
    },
    methods: {
        
        toLogin(){
            loginOut().then(res=>{
                // console.log(res)
                if(res.data.code==200){
                    remToken()
                    this.$message.success('退出成功')
                    this.$router.push('/login')
                }
            })
        },
        ha(){
               getInfo().then(res=>{
            // console.log(res)
            if(res.data.code==200){
                this.username=res.data.data.username
                this.avatar=process.env.VUE_APP_BASEURL+"/"+res.data.data.avatar
            }
        })
        }
    },
};
</script>

<style lang="less">
.index {
  height: 100%;
  .my-header {
    background-color: red;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
      i {
        display: inline-block;
        font-size: 20px;
      }
      .login-img {
        width: 33px;
        height: 28px;
        margin-left: 15px;
      }
      .header-title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
        margin-left: 15px;
      }
    }
    .right {
        display: flex;
        align-items: center;
      .right-img {
        display: inline-block;
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      .right-title {
        font-size: 15px;
        margin-left: 10px;
      }
      .right-button {
        width: 57px;
        height: 28px;
        background: rgba(64, 158, 255, 1);
        border: 1px solid rgba(54, 156, 255, 1);
        border-radius: 4px;
        color: white;
        margin-left: 20px;
      }
    }
  }
  .my-aside {
     .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  }
  .my-main {
    //   width: 100%;
    background-color: green;
  }
}
</style>
