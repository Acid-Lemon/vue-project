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
      let username = this.username;
      let password = this.password;
      let confirm_password = this.confirm_password;
      uniCloud
        .callFunction({
          name: "fun",
          data: {
            api: state,
            args: {
              username,
              password,
              confirm_password,
            },
          },
        })
        .then(({ result }) => {
          if (result.success === false) {
            if (result.api === "login") {
              if (result.errorMessage === "此账户不存在") {
                this.username = "";
                this.username_tip = result.errorMessage;
              }
              if (result.errorMessage === "密码错误") {
                this.password = "";
                this.password_tip = result.errorMessage;
              }
            }
            if (result.api === "register") {
              if (result.errorMessage === "当前用户名重复") {
                this.username = "";
                this.username_tip = result.errorMessage;
              }
              if (result.errorMessage === "用户名不符合规范") {
                this.username = "";
                this.username_tip = result.errorMessage;
              }
              if (result.errorMessage === "密码不符合规范") {
                this.password = "";
                this.confirm_password = "";
                this.password_tip = result.errorMessage;
              }
              if (result.errorMessage === "前后密码不一致") {
                this.password = "";
                this.confirm_password = "";
                this.confirm_password_tip = result.errorMessage;
              }
            }
          } else {
            if (result.api === "login") {
              console.log("登录成功");
            }
            if (result.api === "register") {
              console.log("注册成功");
              location.reload();
            }
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
