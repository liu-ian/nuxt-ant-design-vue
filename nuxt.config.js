module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'FangSea',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'},
            {'http-equiv': 'pragma', content: 'no-cache'},
            {'http-equiv': 'cache-control', content: 'no-cache'},
            {'http-equiv': 'expires', content: '0'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            { src: 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js', type: 'text/javascript', charset: 'utf-8'}
        ],
        // 不对<script>标签中内容做转义处理
        __dangerouslyDisableSanitizers: ['script']
    },
    /*
    ** Global CSS
    */
    css: ['~/assets/css/main.less'],
    vue: {
        config: {
            productionTip: true,
            devtools: true
        }
    },
    build: {
        vendor: ['axios'],
        cache: true,
        parallel: true,
        postcss: [
            require('postcss-px2rem')({
                remUnit: 75
            })
        ],
        extend(config, {isDev, isClient}) {
            config.module.rules.push({
                test: /\.less$/,
                use: [{
                    loader: 'less-loader',
                    options: {
                        modifyVars: {
                            'primary-color': '#2EA9DF', // 自定义 ant-design-vue 主题颜色
                            'link-color': '#2EA9DF',
                            'border-radius-base': '4px'
                        },
                        javascriptEnabled: true
                    }
                }]
            })
        }
        /*,
        ** Run ESLINT on save
        */
        // extend (config, ctx) {
        //   if (ctx.isDev && ctx.isClient) {
        //     config.module.rules.push({
        //       enforce: 'pre',
        //       test: /\.(js|vue)$/,
        //       loader: 'eslint-loader',
        //       exclude: /(node_modules)/
        //     })
        //   }
        // }
    },
    /**
     * API middleware
     */
    serverMiddleware: [
        '~/api/index.js'
    ],
    /**
     * plugins
     */
    plugins: [
        {src: '~/plugins/antd.js', ssr: true},
        {src: '~/plugins/i18n.js', ssr: true},
        {src: '~/plugins/route.js', ssr: true}
    ],
    /**
     * i18n
     */
    router: {
        middleware: 'i18n'
    },
    /**
     * loading
     */
    loading: {
        color: '#41B883'
    },
    /**
     * proxy
     */
    modules: ['@nuxtjs/axios'],
    axios: {
        proxy: true,
        prefix: '/api',
        credentials: true
    },
    proxy: {
        '/api/proxy': {
            target: 'http://localhost:3000/api/users',
            changeOrigin: true,
            pathRewrite: {'^/api/proxy': ''}
        }
    }
}
