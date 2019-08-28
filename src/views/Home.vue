<template>
  <div class="home">
    <router-link to="/vueEdit">Vue版本</router-link>
    <a-icon type="info" />
    <router-link to="/vueEdit">原生版本</router-link>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped lang="less">
.home{
  text-align: center;
  font-size: 20px;
  margin-top: 50px;
}
</style>
