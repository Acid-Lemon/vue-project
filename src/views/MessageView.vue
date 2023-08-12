<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  mounted() {},
};
</script>

<template>
  <div class="background juzhong"><p class="title">留言板</p></div>
  <div class="zhuti juzhong">
    <div class="poem">
      <div class="wzbj"><p class="sbt">网易云音乐热评</p></div>
    </div>
  </div>
</template>
<style scoped>
.background {
  width: 100%;
  aspect-ratio: 10 / 3;
  background: url("/background/11.jpg") no-repeat;
  flex-direction: row;
}

.juzhong {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 40px;
  font-family: SYST;
  color: #000000;
  transition: all 0.6s;
}

.title:hover {
  color: #44cef6;
}

.zhuti {
  flex-direction: column;
}

.sbt {
  font-size: 25px;
  margin-left: 20px;
  margin-right: 20px;
}
.poem {
  border: 1px solid #000000;
  width: 70%;
  height: 200px;
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wzbj {
  position: relative;
  top: -15px;
  background-color: #ffffff;
}

* {
  caret-color: transparent;
}
</style>
