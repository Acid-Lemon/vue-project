<script>
export default {
  data() {
    return {
      pages: [
        {
          name: "首页",
          svg: "/svg/首页.svg",
          link: "/",
        },
        {
          name: "留言板",
          svg: "/svg/留言板.svg",
          link: "/message",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="caidantop">
    <span class="bt">lemon的个人网站</span>
    <div class="ym">
      <div v-for="page in pages" class="lie">
        <router-link :to="page.link">
          <img :src="page.svg" class="tb" />
          <span>{{ page.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
@import "/text/text.css";
.caidantop {
  position: fixed;
  top: 2.5%;
  left: 2.5%;
  width: 95%;
  height: 75px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: all 0.6s;
}

.caidantop:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.bt {
  font-family: ZKXW;
  font-size: 25px;
}

span {
  color: #000000;
  transition: all 0.6s;
}

span:hover {
  color: #44cef6;
}

.lie {
  margin: 10px;
}

.tb {
  width: 30px;
}

.ym {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

* {
  caret-color: transparent;
}
</style>
