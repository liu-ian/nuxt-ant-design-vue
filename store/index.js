import Locale from '~/locales'

/**
 * 全局变量
 * @returns {{locales, locale: *, token: string}}
 */
export const state = () => ({
    locales: Locale(),
    locale: Locale()[0],
    token: ''
})

export const mutations = {
    /**
     * @param locale 当前选中的国际化标识
     * @constructor
     */
    SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },
    /**
     * @param token 登录用户ID
     * @constructor
     */
    SET_TOKEN (state, token) {
        state.token = token
    }
}

export const actions = {
    /**
     * @param commit 国际化修改
     * @param val 国际化标识
     */
    updateLang ({commit}, val) {
        commit('SET_LANG', val)
    },
    /**
     * @param commit 用户ID修改
     * @param token 用户ID
     */
    updateToken ({commit}, token) {
        commit('SET_TOKEN', token)
    }
}
