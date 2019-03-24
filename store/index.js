import Locale from '~/locales'

export const state = () => ({
  Jwt: 'base64#data',
  locales: Locale(),
  locale: Locale()[0]
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_JWT (state, val) {
    state.Jwt = val
  }
}

export const actions = {
  updateJwt ({state, commit}, val) {
    commit('SET_JWT', val)
  },
  updateLang ({state, commit}, val) {
    commit('SET_LANG', val)
  }
}
