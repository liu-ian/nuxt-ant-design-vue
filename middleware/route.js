export default ({app, redirect, req}) => {
    // eslint-disable-next-line
    let path , clientType = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    // 服务端渲染时判断客户端类型
    if (process.server) {
        // 根据request消息头，动态改变路由的跳转
        let flag = req.headers['user-agent'].match(clientType)
        // eslint-disable-next-line
        let mobileFlag = req.url.indexOf('/mobile') !== -1,
            pcFlag = req.url.indexOf('/pc') !== -1
        if (flag) {
            if (pcFlag) {
                path = `/mobile${req.url.substr(3, req.url.length)}`
            } else {
                path = mobileFlag ? req.url : `/mobile${req.url}`
            }
        } else {
            if (mobileFlag) {
                path = `/pc${req.url.substr(7, req.url.length)}`
            } else {
                path = pcFlag ? req.url : `/pc${req.url}`
            }
        }
        if (path !== req.url) {
            redirect({path: path})
        }
    }
    // 客户端渲染时判断客户端类型
    if (process.client) {
        // 添加路由守卫，动态改变路由的跳转
        app.router.beforeEach((to, from, next) => {
            let flag = navigator.userAgent.match(clientType)
            // eslint-disable-next-line
            let mobileFlag = to.path.indexOf('/mobile') !== -1,
                pcFlag = to.path.indexOf('/pc') !== -1
            if (flag) {
                if (pcFlag) {
                    path = `/mobile/${to.path.substr(3, to.path.length)}`
                } else {
                    path = mobileFlag ? to.path : `/mobile${to.path}`
                }
            } else {
                if (mobileFlag) {
                    path = `/pc/${to.path.substr(8, to.path.length)}`
                } else {
                    path = pcFlag ? to.path : `/pc${to.path}`
                }
            }
            if (path !== to.path) {
                next({path: path})
            } else {
                next()
            }
        })
    }
}
