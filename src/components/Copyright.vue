<script>
export default {
  name: "Copyright",
  data() {
    return {};
  },
};
</script>

<template>
  <div class="jiewei juzhong">
    <bq>Copyright © 2023 lemon的个人网站</bq>
  </div>
</template>

<style scoped>
.juzhong {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.jiewei {
  width: 100%;
  height: 75px;
}

bq {
  color: #d3d3d3;
}
</style>
