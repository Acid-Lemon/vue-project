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
    <ul>
      <li v-for="page in pages">
        <router-link :to="page.link"
          ><img :src="page.svg" class="lie"
        /></router-link>
      </li>
    </ul>
  </div>
  <RouterView />
</template>

<style>
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

.lie {
  width: 30px;
}

li {
  list-style: none;
  display: inline;
}
</style>

<script>
</script>

<template>
    <RouterView />
</template>

<style>
</style>
