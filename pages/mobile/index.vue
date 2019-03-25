<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <fs-head :SelectedKey="key"/>
        <section class="container">
            <a-layout-content style="padding: 0 50px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>首页</a-breadcrumb-item>
                    <a-breadcrumb-item>接口</a-breadcrumb-item>
                    <a-breadcrumb-item>Mobile</a-breadcrumb-item>
                </a-breadcrumb>
                <div class="content">
                    <a-dropdown>
                        <a-button style="margin-left: 8px">
                            后端数据
                            <a-icon type="down"/>
                        </a-button>
                        <a-menu slot="overlay" @click="onClick">
                            <a-menu-item v-for="(user, index) in users" :key="index">{{user.name}}</a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </a-layout-content>
        </section>
        <fonter/>
    </a-layout>
</template>

<script>
  // import axios from '~/plugins/axios'
  import FsHead from '~/components/FangseaHeader_m'
  import fonter from '~/components/Footer'

  export default {
    async asyncData ({app}) {
      let {data} = await app.$axios.get('/proxy')
      return {users: data}
    },
    async fetch ({store}) {
      await store.dispatch('updateJwt', '1008611')
    },
    data () {
      return {
        key: '1',
        nowLang: '中文',
        Jwt: ''
      }
    },
    methods: {
      updateNowLang () {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'cn' : 'en'
      },
      updateJwt () {
        this.$store.dispatch('updateJwt', 9527)
      },
      onClick ({key}) {
        console.log(`Click on item ${key}`)
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
