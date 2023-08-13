<script>
import NavigationBar from "@/components/NavigationBar.vue";
import Copyright from "@/components/Copyright.vue";

export default {
  components: {
    NavigationBar,
    Copyright,
  },
};
</script>

<template>
  <NavigationBar></NavigationBar>
  <RouterView />
  <Copyright></Copyright>
</template>

<style>
@import "/text/text.css";

a {
  text-decoration: none;
  color: #000000;
}

* {
  caret-color: transparent;
}
</style>
