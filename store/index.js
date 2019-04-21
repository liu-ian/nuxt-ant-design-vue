import Locale from '~/locales'

export const state = () => ({
    locales: Locale(),
    locale: Locale()[0],
    userId: ''
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
     * @param userId 登录用户ID
     * @constructor
     */
    SET_USER_ID (state, userId) {
        state.userId = userId
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
     * @param userId 用户ID
     */
    updateUserId ({commit}, userId) {
        commit('SET_USER_ID', userId)
    }
}
