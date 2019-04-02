<template>
    <a-layout id="components-layout-pc-top" class="layout">
        <fs-head :SelectedKey="key"/>
        <section class="container">
            <a-layout-content style="padding: 0 50px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>首页</a-breadcrumb-item>
                    <a-breadcrumb-item>接口</a-breadcrumb-item>
                    <a-breadcrumb-item>测试</a-breadcrumb-item>
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
  import FsHead from '~/components/pc/FangseaHeader'
  import fonter from '~/components/pc/Footer'

  export default {
    async asyncData ({app}) {
      let {data} = await app.$axios.get('/proxy')
      return {users: data}
    },
    data () {
      return {
        key: '2',
        nowLang: '中文',
        Jwt: ''
      }
    },
    methods: {
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
