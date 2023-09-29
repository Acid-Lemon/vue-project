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
      <button class="login-btn" @click="login">{{ ButtonName }}</button>
      <div class="register" v-show="state === 'login'">
        <span class="blue" @click="register">还没有账号？点击注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { call_api } from "@/utils/cloud.js";

export default {
  data() {
    return {
      ButtonName: "登录",
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
      this.ButtonName = "注册";
    },
    login() {
      if (this.state === "register") {
        if (this.password !== this.confirm_password) {
          this.password = "";
          this.confirm_password_tip = "前后密码不一致";
          return;
        }
      }
      call_api("loginWithUser", {
        username: this.username,
        password: this.password,
        type: this.state,
      }).then((res) => {
        if (res.success === true) {
        }
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
