<template>
  <a-affix :offset-top="20">
    <div class="table-of-contents-default">
      <ul class="toc">
        <li v-for="h in secondaryHeaders" :key="h.slug" :title="h.title">
          <a :href="`#${h.slug}`" class="toc-anchor" :class="{'current': h.slug === activeHash}">{{h.title}}</a>
        </li>
      </ul>
    </div>
  </a-affix>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data () {
    return {
      activeHash: ''
    }
  },
  computed: {
    secondaryHeaders () {
      return (this.$page.headers || []).filter(h => h.level === 2)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll: debounce(function () {
      this.setActiveHash()
    }, 300),

    setActiveHash () {
      const sidebarLinks = [].slice.call(document.querySelectorAll('.toc-anchor'))
      const anchors = [].slice.call(document.querySelectorAll('.header-anchor'))
        .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash))
      const scrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      )

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )

      const bottomY = window.innerHeight + scrollTop

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]
        const nextAnchor = anchors[i + 1]

        const isActive = i === 0 && scrollTop === 0
          || (scrollTop >= anchor.parentElement.offsetTop + 10
          && (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10))

        if (isActive) {
          const activeAnchor = anchor
          this.activeHash = decodeURIComponent(activeAnchor.hash).substring(1)
          return
        }
      }
    }
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
