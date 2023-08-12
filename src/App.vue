<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
    components: {
        NavigationBar
    }
};
</script>

<template>
  <NavigationBar></NavigationBar>
  <RouterView />
</template>


<style>
@import "/text/text.css";

a {
    text-decoration: none;
    color: #000000;
}
</style>


