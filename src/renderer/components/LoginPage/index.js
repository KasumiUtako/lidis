export default {
  name: 'login-page',

  data () {
    return {
      address: ''
    }
  },

  methods: {
    handleLogin () {
      localStorage.setItem('address', this.address)
      this.redirectToMain()
    },
    redirectToMain () {
      this.$router.replace('./panel')
    }
  },

  created () {
    if (localStorage.getItem('address') !== void 0) this.redirectToMain()
  }
}
