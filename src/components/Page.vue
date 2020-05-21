<template>
  <main class="page">
    <slot name="top" />
    <Toc />
    <Content class="theme-antdesign-content" />
    <PageEdit />
    <PageNav v-bind="{ sidebarItems }" />
    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import Toc from '@theme/components/Toc.vue'

export default {
  components: { PageEdit, PageNav, Toc },
  props: ['sidebarItems']
}
</script>

<style lang="less">
@import '../styles/palette.less';
@import "../styles/wrapper.less";
.page {
  padding-bottom: 2rem;
  word-break: break-all;
  overflow-x: auto;
}
@media (max-width: @MQMobile) {
  .page {
    margin-top: -@navbarHeight;
  }
}
</style>
