export default {
  state() {
    return {
      snackbar: {
        visibility: false,
        color: 'primary',
        text: '',
      },
    }
  },
  mutations: {
    SHOW_SNACKBAR(state, payload) {
      state.snackbar.visibility = true
      state.snackbar.color = payload.color
      state.snackbar.text = payload.text
    },
    HIDE_SNACKBAR(state) {
      state.snackbar.visibility = false
    },
  },
  actions: {
    showSnackbar({ commit }, payload) {
      commit('SHOW_SNACKBAR', payload)
      setTimeout(() => {
        commit('HIDE_SNACKBAR')
      }, 2000)
    },
  },
}
