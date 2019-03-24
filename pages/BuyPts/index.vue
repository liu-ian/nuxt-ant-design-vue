<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <fs-head :SelectedKey="key"/>
        <section class="container">
            <a-layout-content style="padding: 0 50px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>首页</a-breadcrumb-item>
                    <a-breadcrumb-item>测试</a-breadcrumb-item>
                    <a-breadcrumb-item>Demo</a-breadcrumb-item>
                </a-breadcrumb>
                <div class="content">

                </div>
            </a-layout-content>
        </section>
        <fonter/>
    </a-layout>
</template>

<script>
  import axios from '~/plugins/axios'
  import FsHead from '~/components/FangseaHeader'
  import fonter from '~/components/Footer'

  export default {
    async asyncData ({store}) {
      let {data} = await axios.get('/api/users')
      return {users: data}
    },
    async fetch ({store}) {
      await store.dispatch('updateJwt', '1008611')
    },
    data () {
      return {
        key: '3'
      }
    },
    methods: {
      updateNowLang () {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'cn' : 'en'
      },
      updateJwt () {
        this.$store.dispatch('updateJwt', 9527)
      }
    },
    components: {
      FsHead,
      fonter
    },
    head () {
      return {
        title: 'Fangsea.io 2.0'
      }
    }
  }
</script>

<style lang="less">

</style>
