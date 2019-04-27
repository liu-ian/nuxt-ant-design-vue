<template>
    <a-layout id="components-layout-mobile-top" class="layout" ref="mobile-top" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer" @closeDrawer="closeDrawer"/>
        <section class="container">
            <a-layout-content>
                <div class="content-login content">
                    这是首页
                </div>
            </a-layout-content>
        </section>
    </a-layout>
</template>

<script>
    import FsHead from '~/components/mobile/FangseaHeader'

    export default {
        data () {
            return {
                key: 1,
                type: 0,
                centerKey: 0,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false}
            }
        },
        methods: {
            // 开启右侧抽屉导航
            openDrawer () {
                this.drawer = {'drawer-containel-left': true, 'drawer-containel-right': false}
            },
            // 关闭右侧抽屉导航
            closeDrawer () {
                this.drawer = {'drawer-containel-left': false, 'drawer-containel-right': true}
            }
        },
        components: {
            FsHead
        }
    }
</script>

<style lang="less" scoped>
    .content-login {
        min-height: calc(100vh - 0.50rem) !important;
    }
</style>
