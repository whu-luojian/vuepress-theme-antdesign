<template>
  <div
    class="theme-container"
    :class="pageClasses"
  >
    <Navbar
      v-if="shouldShowNavbar"
    />

    <div class="main-wrapper">
      <Home v-if="$page.frontmatter.home" />
      <a-row v-else>
        <a-col :xs="0" :sm="0" :md="6" :lg="5" :xl="5" :xxl="4">
          <Sidebar
            :items="sidebarItems"
          >
            <template #top>
              <slot name="sidebar-top" />
            </template>
            <template #bottom>
              <slot name="sidebar-bottom" />
            </template>
          </Sidebar>
        </a-col>
        <a-col :xs="24" :sm="24" :md="18" :lg="19" :xl="19" :xxl="20">
          <Page
            :sidebar-items="sidebarItems"
          >
            <template #top>
              <slot name="page-top" />
            </template>
            <template #bottom>
              <slot name="page-bottom" />
            </template>
          </Page>
        </a-col>
      </a-row>
    </div>

    <a-back-top v-if="shouldShowBackTop"/>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems, isEmpty } from '../util'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
    Sidebar,
    Navbar
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    },

    shouldShowBackTop () {
      const backToTop = this.$themeConfig.backToTop
      return isEmpty(backToTop) || backToTop
    }
  }
}
</script>

<style lang='less' scoped>
.main-wrapper {
  position: relative;
  padding: 40px 0 0;
  background: #fff;
}
</style>
