<template>
    <a-layout id="components-layout-mobile-top" class="layout" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" @openDrawer="openDrawer" @closeDrawer="closeDrawer"/>
        <section class="container">
            <a-layout-content>
                <div class="flex-column">
                    <div class="message-info-item item-basic">
                        <p class="item-title">{{$t('MyMessage.item-1')}}</p>
                        <p class="item-body">
                            <a-avatar :size="48" icon="user"/>
                            <span class="user-name">{{nikeName}}</span>
                            <a-tag color="#FFF3D8">
                                <a-icon type="exclamation-circle" theme="filled"
                                        style="color: #FFC32B"/>
                                &nbsp<span class="user-status">{{$t('MyMessage.item-3')}}</span></a-tag>
                            <a-tag color="#D8FFE1" style="display: none">
                                <a-icon type="check-circle" theme="filled"
                                        style="color: #27E774"/>
                                &nbsp<span class="user-status">{{$t('MyMessage.item-4')}}</span></a-tag>
                        </p>
                    </div>
                    <div class="message-info-item item-bind">
                        <p class="item-title">{{$t('MyMessage.item-5')}}</p>
                        <p class="item-body">
                            <a-row type="flex" justify="space-between">
                                <a-col :span="6" class="body-key">{{$t('MyMessage.item-6')}}：</a-col>
                                <a-col :span="15" class="body-value">{{mobile}}</a-col>
                                <a-col :span="3" class="change-mobile" v-if="mobile !== ''">{{$t('MyMessage.item-7')}}
                                </a-col>
                                <a-col :span="3" class="change-mobile" v-if="mobile === ''">{{$t('MyMessage.item-20')}}
                                </a-col>
                            </a-row>
                            <a-divider class="divider"></a-divider>
                            <a-row type="flex" justify="space-around" align="middle">
                                <a-col :span="6" class="body-key">{{$t('MyMessage.item-8')}}：</a-col>
                                <a-col :span="15" class="body-value">{{email}}</a-col>
                                <a-col :span="3" class="change-mobile" v-if="email !== ''">{{$t('MyMessage.item-7')}}
                                </a-col>
                                <a-col :span="3" class="change-mobile" v-if="email === ''">{{$t('MyMessage.item-20')}}
                                </a-col>
                            </a-row>
                        </p>
                    </div>
                    <div class="message-info-item item-password">
                        <p class="item-title">{{$t('MyMessage.item-9')}}</p>
                        <p class="item-body">
                            <a-row type="flex" justify="space-between">
                                <a-col :span="6" class="body-key">{{$t('MyMessage.item-10')}}：</a-col>
                                <a-col :span="15" class="body-value">*******</a-col>
                                <a-col :span="3" class="change-mobile">{{$t('MyMessage.item-11')}}</a-col>
                            </a-row>
                        </p>
                    </div>
                    <div class="item-login">
                        <p class="item-title">{{$t('MyMessage.item-12')}}</p>
                        <p class="item-body">
                            <a-tabs defaultActiveKey="1">
                                <a-tab-pane :tab="$t('MyMessage.item-13')" key="1">
                                    <a-table :scroll="{ x: 670 }" :columns="columns" :dataSource="data" :pagination="{ pageSize: 3 }">
                                        <a-pagination  @change="onChange" :current="current" :total="total"/>
                                    </a-table>
                                </a-tab-pane>
                                <!--<a-tab-pane :tab="$t('MyMessage.item-14')" key="2">-->
                                    <!--<a-table :scroll="{ x: 670 }" :columns="columns" :dataSource="data" :pagination="{ pageSize: 3 }">-->
                                        <!--<a-pagination  @change="onChange" :current="current" :total="total"/>-->
                                    <!--</a-table>-->
                                <!--</a-tab-pane>-->
                            </a-tabs>
                        </p>
                    </div>
                </div>
            </a-layout-content>
        </section>
    </a-layout>
</template>
<script>
    import FsHead from '~/components/mobile/FangseaHeader'
    import tool from '~/assets/utils/tool'

    export default {
        data () {
            return {
                type: 0,
                key: '1',
                data: [],
                columns: [
                    {title: this.$t('MyMessage.item-15'), width: 175, dataIndex: 'loginTime', key: 'loginTime'},
                    {title: this.$t('MyMessage.item-16'), width: 90, dataIndex: 'loginType', key: 'loginType'},
                    {title: this.$t('MyMessage.item-17'), dataIndex: 'loginLocal', key: 'loginLocal', width: 175},
                    {title: this.$t('MyMessage.item-18'), dataIndex: 'loginIp', key: 'loginIp', width: 150},
                    {title: this.$t('MyMessage.item-19'), dataIndex: 'loginStatus', key: 'loginStatus'}
                ],
                nikeName: '',
                mobile: '',
                email: '',
                current: 1,
                total: 0,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false}
            }
        },
        /**
         *  用户基本信息
         */
        mounted () {
            this.userInfo()
            this.loginHistory()
        },
        methods: {
            /**
             * 当前页码
             */
            onChange (current) {
                this.current = current
                this.loginHistory()
            },
            /**
             * 用户基本信息
             */
            userInfo () {
                let data = {traceId: tool.UUID(), data: this.$store.state.userId}
                this.$axios.post('/v2/user/query/info', data)
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            this.nikeName = res.data.data.nikeName
                            this.mobile = res.data.data.mobile
                            this.email = res.data.data.email
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            /**
             * 用户登录历史
             */
            loginHistory () {
                let pageData = {traceId: tool.UUID(), data: {userID: this.$store.state.userId, pageNo: this.current, pageSize: this.pageSize}}
                this.$axios.post('/v2/user/query_login_his', pageData)
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            this.data = []
                            this.total = res.data.data.totalCount
                            for (let item of res.data.data.list) {
                                this.data.push({
                                    key: item['id'],
                                    loginTime: item['loginTime'],
                                    loginType: item['loginType'],
                                    loginLocal: item['loginLocal'],
                                    loginIp: item['loginIp'],
                                    loginStatus: item['loginStatus']
                                })
                            }
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            },
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
    @background: #ffffff;

    .content {
        padding-top: 0.65rem;
        min-height: calc(100vh - 1.26rem);
    }

    .flex-column {
        display: flex;
        flex-direction: column;

        > div {
            background: @background;
        }

        .message-info-item {
            margin-bottom: 0.12rem;
        }

        .item-basic {
            height: 1.37rem;

            .user-name {
                margin: 0 0.08rem;
                font-size: 14px;
                font-family: PingFangSC-Medium;
                color: rgba(0, 0, 0, 0.85);
                line-height: 0.22rem;
            }

            .user-status {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.65);
            }
        }

        .item-bind {
            height: 1.66rem;
        }

        .change-mobile {
            color: #2EA9DF;
            font-size: 14px;;
        }

        .item-password {
            height: 1.11rem;
        }

        .item-login {
            height: 4rem;

            .item-body {
                padding-top: 0;
            }
        }

        .item-title {
            padding: 0.12rem 0.16rem;
            font-size: 16px;
            font-family: PingFangSC-Medium;
            color: rgba(0, 0, 0, 0.85);
            border-bottom: 1px solid rgba(0, 0, 0, 0.09);
            margin-bottom: 0;
        }

        .divider {
            margin: 0.16rem 0;
        }

        .item-body {
            padding: 0.12rem 0.16rem;

            .body-key {
                color: rgba(0, 0, 0, 0.85);
                font-size: 14px;
            }

            .body-value {
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
            }

            /deep/ .ant-tabs-nav-container {
                font-size: 14px;
            }
        }
    }
</style>
