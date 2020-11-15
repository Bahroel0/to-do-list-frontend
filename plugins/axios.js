export default function ({ $axios, store }) {
  $axios.onResponse((res) => {
    if (res.data.hasOwnProperty('success')) {
      store.dispatch('showSnackbar', {
        color: res.data.success ? 'success' : 'error',
        text: res.data.message,
      })
    }
  })
}
