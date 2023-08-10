<script>
import axios from "axios";
import { Text } from "vue";

export default {
  data() {
    return {
      contacts: [
        {
          name: "QQ",
          svg: "/QQ.svg",
          link: "https://wpa.qq.com/msgrd?v=3&uin=3573045100&site=qq&menu=yes",
        },
        {
          name: "bilibili",
          svg: "/哔哩哔哩.svg",
          link: "https://space.bilibili.com/400932209",
        },
      ],
    };
  },
  mounted() {},
  components: { Text },
};
</script>

<template>
  <view class="shouping">
    <view class="caidantop"></view>
    <img class="touxiang jiange gbyc" src="/头像.jpg" />
    <p class="jiange gbyc">Hello!欢迎来到lemon的个人网站~</p>
    <ul class="jiange gbyc">
      <li v-for="contact in contacts" class="jiange">
        <a :href="contact.link" target="_blank"
          ><img class="lie" :title="contact.name" :src="contact.svg"
        /></a>
      </li>
    </ul>
  </view>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
}

.shouping {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.caidantop {
  position: fixed;
  top: 2.5%;
  left: 2.5%;
  width: 95%;
  height: 75px;
  background-color: #000000;
  opacity: 0;
  border-radius: 20px;
  transition: all 0.6s;
}

.caidantop:hover {
  opacity: 0.5;
}

.touxiang {
  width: 130px;
  border-radius: 65px;
  transform: rotate(0);
  transition: all 0.6s;
}

.touxiang:hover {
  transform: rotate(360deg);
}

.jiange {
  margin: 10px;
}

p {
  font-family: "SYST";
  color: #000000;
  transition: all 0.6s;
}

p:hover {
  color: #44cef6;
}

.lie {
  width: 30px;
}

li {
  list-style: none;
  display: inline;
}

.gbyc {
  caret-color: transparent;
}
</style>
