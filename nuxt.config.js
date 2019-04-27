module.exports = {
    /*
      ** Headers of the page
      */
    head: {
        title: 'FangSea',
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content: 'maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0'
            },
            {hid: 'description', name: 'description', content: 'Nuxt.js project'},
            {'http-equiv': 'pragma', content: 'no-cache'},
            {'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate'},
            {'http-equiv': 'expires', content: '0'},
            {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}, // 让IE使用最新的浏览器渲染
            {name: 'apple-mobile-web-app-capable', 'content': 'yes'} // 删除默认的苹果工具栏和菜单栏
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
     ** Global CSS 公共样式
     */
    css: ['~/assets/css/common.less', 'ant-design-vue/dist/antd.less'],
    vue: {
        config: {
            productionTip: true,
            devtools: true
        }
    },
    /**
     * 编译配置
     */
    build: {
        vendor: ['axios'],
        cache: true,
        parallel: true,
        extend (config, ctx) {
            /*
             ** Run ESLINT on save
             */
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules|.nuxt)/
                })
            }
            /**
             * // 自定义 ant-design-vue 主题颜色
             */
            config.module.rules.push({
                test: /\.less$/,
                use: [{
                    loader: 'less-loader',
                    options: {
                        modifyVars: {
                            'primary-color': '#2EA9DF',
                            'link-color': '#2EA9DF',
                            'border-radius-base': '4px'
                        },
                        javascriptEnabled: true
                    }
                }]
            })
        }
    },
    /**
     * API middleware 中间件
     */
    serverMiddleware: [
        '~/api/index.js'
    ],
    /**
     * 第三方插件
     */
    plugins: [
        {src: '~/plugins/antd.js', ssr: true},
        {src: '~/plugins/i18n.js', ssr: true}
    ],
    /**
     * 全局拦截配置
     */
    router: {
        middleware: ['i18n', 'route']
    },
    /**
     * 加载风格
     */
    loading: {
        color: '#41B883'
    },
    /**
     * 请求地址
     */
    env: {
        HOST: '192.168.91.203',
        PORT: '80'
    },
    /**
     * 启动端口
     * 默认: 3000
     */
    server: {
        port: 80,
        host: '0.0.0.0'
    },
    /**
     * 跨域代理
     */
    modules: ['@nuxtjs/axios'],
    axios: {
        proxy: process.env.NODE_ENV === 'development', // 是否使用代理
        // prefix: '',
        credentials: true
    },
    proxy: {
        // 免责条款
        '/api/v2/cms/config/query': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cbe6fd00c98ef644e7f8e36/register' : 'http://192.168.91.84:8080',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 手机区号
        '/api/v2/user/areacode/query': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cbe6fe60c98ef644e7f8e43/userLogin' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 注册验证码
        '/api/v2/user/verifiycode/get': {
            target: (process.env.NODE_ENV === 'development') ? ' https://www.easy-mock.com/mock/5cbea42394b5467c127394d6/userCenter-2' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 用户注册
        '/api/v2/user/register': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cbe6fd00c98ef644e7f8e36/register' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 用户登录
        '/api/v2/user/login': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cbe6fe60c98ef644e7f8e43/userLogin' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 用户基本信息
        '/api/v2/user/info/query': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cbe6fd00c98ef644e7f8e36/register' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 用户登录历史
        '/api/v2/user/login/histroy/query': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cbe6fe60c98ef644e7f8e43/userLogin' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 绑定账号，输入号码（手机/邮箱）后，发送验证码前的数据验证
        '/api/v2/user/account/bind/check': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cbea42394b5467c127394d6/userCenter-2' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 绑定手机/邮箱账号，发送验证码后的数据验证
        '/api/v2/user/account/bind': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cbea42394b5467c127394d6/userCenter-2' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 验证账号是否是本人的
        '/api/v2/user/check/me': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cb43460bc1dcb694ade2b76/register' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 验证账号是否被使用
        '/api/v2/user/check/use': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cb43460bc1dcb694ade2b76/register' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 换绑账号
        '/api/v2/user/account/bind/change': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cb43460bc1dcb694ade2b76/register' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 检查密码
        '/api/v2/user/modifiy_password': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cb71c1c1a800d6337800087/updatePsw' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        // 三级联动
        '/api/v2/getData': {
            target: (process.env.NODE_ENV === 'development') ? 'https://www.easy-mock.com/mock/5cb85831d123f60eac85d616' : '/api/v2',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        }
    }
}
