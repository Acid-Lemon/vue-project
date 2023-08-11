<script>
export default {
    mounted() {
      window.tonightMode = this.tonightMode;
    },
    methods: {
        tonightMode() {
            console.log("tonightMode")
        }
    },
}
</script>

<template>
    <RouterView />
</template>

<style>
</style>
