export default ({app, redirect, req}) => {
    if (process.server) {
        let flag = req.headers['user-agent'].match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        let path,
            mobileFlag = req.url.indexOf('/mobile') !== -1 ? true : false,
            pcFlag = req.url.indexOf('/pc') !== -1 ? true : false
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
    if (process.client) {
        app.router.beforeEach((to, from, next) => {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            let path, mobileFlag = to.path.indexOf('/mobile') !== -1 ? true : false,
                pcFlag = to.path.indexOf('/pc') !== -1 ? true : false
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
