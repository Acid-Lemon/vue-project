<script>
export default {
  name: "NavigationBar",
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
          link: "/comment",
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
        <router-link :to="page.link" class="link">
          <img :src="page.svg" class="tb" />
          <span>{{ page.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.caidantop {
  position: fixed;
  top: 2.5%;
  left: 2.5%;
  width: 95%;
  height: 75px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
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
  margin: 10px;
}

span {
  transition: all 0.6s;
}

span:hover {
  color: #44cef6;
}

.lie {
  margin: 10px;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
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

img,
span {
  margin: 3px;
}
</style>
