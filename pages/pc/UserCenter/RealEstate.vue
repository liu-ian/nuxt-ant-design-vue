<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <fs-head :SelectedKey="key"/>
        <a-layout class="user-center-content">
            <a-layout-sider width="200" style="background: #fff">
                <a-menu
                        mode="inline"
                        :defaultSelectedKeys="['1']"
                        :defaultOpenKeys="['sub1']"
                        :style="{ height: '100%', borderRight: 0 }"
                >
                    <a-menu-item key="1">
                        <a-icon type="mail"/>
                        卖家房产管理
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="calendar"/>
                        我的房产
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a-icon type="calendar"/>
                        我的钱包
                    </a-menu-item>
                    <a-menu-item key="4">
                        <a-icon type="calendar"/>
                        转账地址管理
                    </a-menu-item>
                    <a-menu-item key="5">
                        <a-icon type="calendar"/>
                        交易记录
                    </a-menu-item>
                    <a-menu-item key="6">
                        <a-icon type="calendar"/>
                        我的信息
                    </a-menu-item>
                    <a-menu-item key="7">
                        <a-icon type="calendar"/>
                        身份认证
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout style="padding-left:24px">
                <a-layout-content class="a-layout-content">
                    Content
                </a-layout-content>
            </a-layout>
        </a-layout>
        <fonter/>
    </a-layout>
</template>

<script>
  import FsHead from '~/components/FangseaHeader'
  import fonter from '~/components/Footer'

  export default {
    data () {
      return {
        key: '1',
        collapsed: false
      }
    },
    methods: {
      updateNowLang () {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'cn' : 'en'
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

<style lang="less" scoped>
    .slider-left {
        width: 300px;
        background-color: #ffffff;
    }

    .layout-content-test {
        dispaly: flex;
        flex-direction: row
    }

    .content {
        margin-left: 30px;
        background-color: #ffffff;
    }

    .user-center-content {
        margin: 0 auto;
        min-height: e("calc(100vh - 126px)");
    }

    .a-layout-content {
        background: #fff;
        padding: 24px;
        margin: 0;
        max-width: 898px;
        width: 898px;
    }

    .ant-menu-vertical .ant-menu-item, .ant-menu-vertical-left .ant-menu-item, .ant-menu-vertical-right .ant-menu-item, .ant-menu-inline .ant-menu-item, .ant-menu-vertical .ant-menu-submenu-title, .ant-menu-vertical-left .ant-menu-submenu-title, .ant-menu-vertical-right .ant-menu-submenu-title, .ant-menu-inline .ant-menu-submenu-title {
        margin-top: 0;
    }

    .ant-menu-vertical .ant-menu-item:not(:last-child), .ant-menu-vertical-left .ant-menu-item:not(:last-child), .ant-menu-vertical-right .ant-menu-item:not(:last-child), .ant-menu-inline .ant-menu-item:not(:last-child) {
        margin-bottom: 0;
    }

    .ant-menu-vertical > .ant-menu-item, .ant-menu-vertical-left > .ant-menu-item, .ant-menu-vertical-right > .ant-menu-item, .ant-menu-inline > .ant-menu-item, .ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title, .ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title, .ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title, .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
        line-height: 54px;
        height: 54px;
    }

    .ant-menu-item-selected {
        color: #2EA9DF;
    }

    .ant-menu-vertical .ant-menu-item:after, .ant-menu-vertical-left .ant-menu-item:after, .ant-menu-vertical-right .ant-menu-item:after, .ant-menu-inline .ant-menu-item:after{
        border-right:2px solid #2EA9DF
    }
</style>
