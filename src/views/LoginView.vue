<template>
  <div class="box">
    <div class="content">
      <span class="title">登录</span>
      <div class="username form-item">
        <span class="br">用户名：</span>
        <input
          type="text"
          class="input-item"
          v-model="username"
          placeholder-style="color:red"
          :placeholder="username_tip"
        />
      </div>
      <div class="password form-item">
        <span class="br">密码：</span>
        <input
          type="password"
          class="input-item"
          v-model="password"
          placeholder-style="color:red"
          :placeholder="password_tip"
        />
      </div>
      <div class="confirm_password form-item" v-show="state === 'register'">
        <span class="br">确认密码：</span>
        <input
          type="password"
          class="input-item"
          v-model="confirm_password"
          placeholder-style="color:red"
          :placeholder="confirm_password_tip"
        />
      </div>
      <button class="login-btn" @click="login">{{ button_name }}</button>
      <div class="register" v-show="state === 'login'">
        <span class="blue" @click="register">还没有账号？点击注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { call_api } from "@/utils/cloud.js";
import {ElLoading, ElMessageBox} from "element-plus";

export default {
  data() {
    return {
      button_name: "登录",
      username: "",
      password: "",
      confirm_password: "",
      username_tip: "",
      password_tip: "",
      confirm_password_tip: "",
      state: "login",
    };
  },
  onLoad() {},
  methods: {
    register() {
      this.state = "register";
      this.button_name = "注册";
    },
    check() {
      if (this.username.length < 1 || this.username.length > 15) {
        this.username_tip = "用户名不符合要求";
        return false;
      }

      if (this.password.length < 5 || this.password.length > 25) {
        this.password_tip = "密码不符合要求";
        this.confirm_password = "";
        return false;
      }

      return true;
    },
    login() {
      if (!this.check()) {
          return;
      }

      if (this.state === "register") {
        if (this.password !== this.confirm_password) {
          this.password = "";
          this.confirm_password_tip = "前后密码不一致";
          return;
        }
      }

      let loading = ElLoading.service();
      call_api("loginWithUser", {
        username: this.username,
        password: this.password,
        type: this.state,
      }).then((res) => {
        loading.close();

        if (res.success === false) {
            // 显示错误
            ElMessageBox({
                type: "error",
                message: res.error_message,
                confirmButtonText: "确定",
                autofocus: false
            });

            if (res.api_call_success) {
                this.username = "";
                this.password = "";
                this.confirm_password = "";
            }

            return;
        }

        ElMessageBox({
            type: "success",
            message: "登录成功",
            showCancelButton: false,
            confirmButtonText: "确定",
            callback: () => {
                this.$router.back();
            }
        }).catch();
      });
    },
  },
};
</script>

<style scoped>
.box {
  background: no-repeat center/cover url("/background/10.jpg");
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.title {
  font-size: 30px;
}

.input-item {
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #000000;
  flex: 1;
  font-size: 20px;
}

.input-item:focus {
  outline: none;
  caret-color: auto;
}

.form-item {
  display: flex;
}

.login-btn {
  width: 100%;
  height: 40px;
}

.br {
  text-align: center;
  width: 100px;
  font-size: 20px;
}

.blue {
  color: #000000;
  transition: all 0.6s;
}

.blue:hover {
  color: #44cef6;
}

.register {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
}

@media screen and (max-width: 700px) {
  .box {
    background: no-repeat center/cover url("/background/10.jpg");
  }

  .content {
    width: 80vw;
    height: 300px;
  }
}
</style>
