<script>
import axios from "axios";

export default {
  data() {
    return {
      tx: "",
      isfocu: false,
      value: "",
    };
  },
  methods: {
    focu() {
      this.isfocu = true;
    },

    blur() {
      if (this.value === "") {
        this.isfocu = false;
      } else {
        this.isfocu = true;
      }
    },
  },
};
</script>

<template>
  <div class="background juzhong"><p class="title">留言板</p></div>
  <div class="zhuti juzhong">
    <div class="poem">
      <div class="wzbj"><p class="sbt">网易云音乐热评</p></div>
      <div class="wyy">
        <p class="wa">
          希望你别像风，在我这里掀起了万般波澜，却又跟云去了远方。
        </p>
        <p class="zz">——网易云音乐热评《如风过境》</p>
      </div>
    </div>
    <p>
      很感谢你能访问该页面，如果你有什么和我说的，或者有什么问题想问的，可以随时在下面评论噢~！我看见了会第一时间回复你的。
    </p>
    <div class="cobt">
      <span class="plbt">comment</span><span>n条评论</span>
    </div>
    <div class="comment">
      <div class="pl">
        <div class="wz">
          <img src="/头像.jpg" class="tx" />
          <div class="nc">
            <p>lemon</p>
            <p class="fbxx">发布于xxxx年xx月xx日 xx:xx</p>
          </div>
        </div>
        <p class="plnr">这是一条评论.</p>
      </div>
    </div>
    <div class="wpl pl">
      <p id="ph" class="ph" :class="{ focu: isfocu, blur: !isfocu }">
        你是我一生只会遇见一次的惊喜...
      </p>
      <textarea v-model="value" @focus="focu" @blur="blur" />
      <div>
        <img :src="tx" />
        <input />
        <input />
      </div>
    </div>
  </div>
</template>
<style scoped>
.background {
  width: 100%;
  aspect-ratio: 10 / 3;
  background: url("/background/11.jpg");
  background-size: cover;
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
  top: -18px;
  background-color: #ffffff;
}

.zz {
  margin: 10px;
  font-size: 14px;
}

.wa {
  height: 80px;
}

.wyy {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.plbt {
  font-size: 25px;
  margin-right: 10px;
  font-weight: 1000;
}

.cobt {
  width: 70%;
  margin-top: 40px;
  border-bottom: 1px solid #000000;
}

.comment {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pl {
  width: 70%;
  border-radius: 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

.tx {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 20px;
}

.wz {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 20px;
}

.plnr {
  margin: 20px;
}

.fbxx {
  font-size: 13px;
}

.wpl {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

textarea {
  caret-color: auto;
  border: 1px solid #000000;
  resize: vertical;
  min-height: 100px;
  max-height: 400px;
  height: 200px;
  outline: none;
  padding: 15px;
  font-size: 18px;
  width: calc(100% - 70px);
}

.ph {
  position: relative;
  pointer-events: none;
  transition: all 0.6s;
}

.focu {
  left: calc(130px - 50%);
  top: 8px;
  color: #ffffff;
  font-size: 13px;
  background-color: #000000;
}

.blur {
  left: calc(145px - 50%);
  top: 30px;
  color: #000000;
  font-size: 15px;
  background-color: #ffffff;
}
</style>
