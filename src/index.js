const path = require('path')

function isEmpty(v) {
  return v === undefined || v === null
}

// Theme API.
module.exports = (options, ctx) => {
  const { sep } = path
  const { themeConfig, sourceDir, siteConfig } = ctx

  if (isEmpty(siteConfig.markdown)) {
    siteConfig.markdown = {}
  }

  siteConfig.markdown.anchor = Object.assign({}, siteConfig.markdown.anchor || {}, {
    permalinkBefore: false, // anchor 统一放标题右边
    level: 2
  })

  if (isEmpty(themeConfig.sidebarDepth)) {
    themeConfig.sidebarDepth = 0 // 侧边栏默认只展示一级标题
  }

  const enableSmoothScroll = isEmpty(themeConfig.smoothScroll) || true

  return {
    chainWebpack: config => {
      const baseRule = config.module.rule('less');
      const normal = baseRule.oneOf('normal');
      const modules = baseRule.oneOf('modules');

      normal
        .use('less-loader')
        .options({
          lessOptions: {
            javascriptEnabled: true,
          },
        });
      
      normal
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            path.resolve(sourceDir, '../styles/*.less'),
          ],
        });

      modules
        .use('less-loader')
        .options({
          lessOptions: {
            javascriptEnabled: true,
          },
        });

      modules
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            path.resolve(sourceDir, '../styles/*.less'),
          ],
        });
    },
    alias () {
      return {
        '@docs': `${sourceDir}${sep}.vuepress${sep}styles`,
        '@@': path.resolve(sourceDir, '..'),
      }
    },
    plugins: [
      '@vuepress/back-to-top',
      '@vuepress/plugin-active-header-links',
      '@vuepress/plugin-nprogress',
      ['container', {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示'
        }
      }],
      ['container', {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '注意'
        }
      }],
      ['container', {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '警告'
        }
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      }],
      ['container', {
        type: 'md-table',
        defaultTitle: '',
      }],
      ['smooth-scroll', enableSmoothScroll]
    ]
  }
}
