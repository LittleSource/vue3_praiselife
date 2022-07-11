<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view></router-view>
  </van-config-provider>
</template>
<script setup lang="ts">
const themeVars = {
  gridItemContentPadding: '3px'
}

</script>
<style lang="scss">
</style>
