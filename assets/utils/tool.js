/**
 * 常用工具
 */
export default class Tool {
    /**
   * 存储localStorage
   */
    static setStore (name, content) {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    }

    /**
   * 获取localStorage
   */
    static getStore (name) {
        if (!name) return
        return window.localStorage.getItem(name)
    }

    /**
   * 删除localStorage
   */
    static removeStore (name) {
        if (!name) return
        window.localStorage.removeItem(name)
    }

    /**
     * 生成唯一ID
     */
    static UUID () {
        return Number(Math.random().toString().substr(3, Math.floor(Math.random() * 10 + 1)) + Date.now()).toString(36)
    }
}
