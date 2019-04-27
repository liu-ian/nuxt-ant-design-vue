<template>
    <a-layout id="components-layout-computer-top" class="layout">
        <fs-head :SelectedKey="key" :SelectedType="type"/>
        <a-layout class="user-center-content">
            <a-layout-sider width="200" style="background: #fff">
                <a-menu
                        mode="inline"
                        :selectedKeys=siderKey
                        :defaultSelectedKeys="['1']"
                        :defaultOpenKeys="['sub1']"
                        @select="selectItem"
                        :style="{ height: '100%', borderRight: 0 }">
                    <a-menu-item key="1">
                        {{$t('sider.item-1')}}
                    </a-menu-item>
                    <a-menu-item key="2">
                        {{$t('sider.item-2')}}
                    </a-menu-item>
                    <a-menu-item key="3">
                        {{$t('sider.item-3')}}
                    </a-menu-item>
                    <a-menu-item key="4">
                        {{$t('sider.item-4')}}
                    </a-menu-item>
                    <a-menu-item key="5">
                        {{$t('sider.item-5')}}
                    </a-menu-item>
                    <a-menu-item key="6">
                        {{$t('sider.item-6')}}
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout style="padding-left:24px">
                <a-layout-content class="a-layout-content">
                    <message-info v-show="siderIndex === '5'"></message-info>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <fonter/>
    </a-layout>
</template>

<script>
    import FsHead from '~/components/computer/FangseaHeader'
    import fonter from '~/components/computer/Footer'
    import MessageInfo from '~/pages/computer/user/UserCenter/MyMessage/index'

    export default {
        /**
         * 返回对应的组件
         */
        asyncData ({query}) {
            return query.getKey ? {
                siderKey: [query.getKey],
                siderIndex: query.getKey
            } : {
                siderKey: ['1'],
                siderIndex: '1'
            }
        },
        data () {
            return {
                // 首页导航下标
                key: '0',
                // 登录、注册导航下标
                type: 0,
                // 用户中心下标
                siderKey: ['1'],
                // 组件下标
                siderIndex: '1'
            }
        },
        watch: {
            '$route': 'changeView'
        },
        methods: {
            /**
             * @param item
             * @param key sider选中的item
             * @param selectedKeys
             */
            selectItem ({item, key, selectedKeys}) {
                this.siderKey = [key]
                this.siderIndex = key
            },
            /**
             * 监听路由改变视图
             */
            changeView () {
                if (this.$route.query.getKey) {
                    this.siderKey = [this.$route.query.getKey]
                    this.siderIndex = this.$route.query.getKey
                } else {
                    this.siderKey = ['1']
                    this.siderIndex = '1'
                }
            }
        },
        components: {
            FsHead,
            MessageInfo,
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

    .content {
        margin-left: 30px;
        background-color: #ffffff;
    }

    .user-center-content {
        flex-direction: row;
        margin: 0 auto;
        min-height: e("calc(100vh - 126px)");
    }

    .a-layout-content {
        background: none;
        padding: 0;
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
        padding-left: 24px !important;
    }

    .ant-menu-item-selected {
        color: #2EA9DF;
    }

    .ant-menu-vertical .ant-menu-item:after, .ant-menu-vertical-left .ant-menu-item:after, .ant-menu-vertical-right .ant-menu-item:after, .ant-menu-inline .ant-menu-item:after {
        border-right: 2px solid #2EA9DF
    }

    .a-layout-content {
        background: none;
    }
</style>
