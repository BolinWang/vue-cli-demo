export default {
  created () {
    if (this.$route.path.indexOf('/distribution') === 0) {
      this.wxSetShareSign({
        hideShareMenu: true
      })
    }
  }
}
