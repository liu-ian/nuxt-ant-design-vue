export default ({app, redirect}) => {
    if (process.client) {
        app.router.beforeEach((to, from, next) => {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            let path, subPath, mobileFlag = to.path.indexOf('/mobile') !== -1 ? true : false , pcFlag = to.path.indexOf('/pc') !== -1 ? true : false
            if (flag) {
                if (pcFlag) {
                    path = `/mobile${to.path.substr(3, to.path.length)}`
                } else {
                    if(mobileFlag){
                        path = to.path
                    }else{
                        path =  `/mobile${to.path}`
                    }
                }
            } else {
                if (mobileFlag) {
                    path = `/pc${to.path.substr(8, to.path.length)}`
                } else {
                    if(pcFlag){
                        path = to.path
                    }else{
                        path =  `/pc${to.path}`
                    }
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
