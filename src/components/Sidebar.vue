<template>
  <a-affix :offset-top="10" style="width: 100%">
    <aside class="sidebar">
      <!-- Add ADs here -->
      <Ads v-if="this.$themeConfig.ads"/>
      <slot name="top" />
      <SidebarLinks :depth="0" :items="items" />
      <slot name="bottom" />
    </aside>
  </a-affix>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import Ads from '@theme/components/Ads.vue'

export default {
  name: 'Sidebar',
  components: { 
    SidebarLinks,
    Ads
  },
  props: ['items']
}
</script>

<style lang="less">
@import '../styles/palette.less';

.sidebar {
  font-size: 14px;
  background-color: #fff;
  box-sizing: border-box;
  border-right: 1px solid @borderColor;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 100vh;

  &:hover {
    overflow-y: auto;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
    position: relative;
  }

  & > .sidebar-links {
    padding-bottom: 1.5rem;

    & > li > a.sidebar-link {
      font-size: 0.875rem;
      line-height: 2;
      transition: color 0.25s ease-in-out, border-color 0.25s ease-in-out,
        background 0.25s ease-in-out;
    }
  }
}
</style>
