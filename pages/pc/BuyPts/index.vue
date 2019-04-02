<template>
    <a-layout id="components-layout-pc-top" class="layout">
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
  import FsHead from '~/components/pc/FangseaHeader'
  import fonter from '~/components/pc/Footer'

  export default {
    data () {
      return {
        key: '3'
      }
    },
    methods: {
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
