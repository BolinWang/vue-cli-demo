<template>
  <section>
    <template v-if="url">
      <pdf :url="url" />
    </template>
  </section>
</template>
<script>
import { get_api_url } from '@/common'
import pdf from '@/components/pdf/pdf'
export default {
  components: {
    pdf
  },
  data () {
    return {
      url: ''
    }
  },
  created () {
    if (this.phoneIsIOS) {
      window.location.replace(this.getPdfUrl())
      return
    }
    this.initUrl()
  },
  methods: {
    initUrl () {
      this.url = this.getPdfUrl()
    },
    getPdfUrl () {
      let { userId } = this
      return get_api_url(`/dist/withdraw/searchContract?userId=${userId}`)
    }
  }
}
</script>

<style lang="less" scoped>
    section {

    }
</style>
