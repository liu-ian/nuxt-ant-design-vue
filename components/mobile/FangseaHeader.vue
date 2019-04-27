<template>
    <a-layout-header class="header">
        <div class="header-content">
            <nuxt-link to="/mobile">
                <div class="logo">
                </div>
            </nuxt-link>
            <a-button :ghost="true" @click="showDrawer" class="hamb-bt hamburger">
                <span class="hamb hamb-top"></span>
                <span class="hamb hamb-middle"></span>
                <span class="hamb hamb-bottom"></span>
            </a-button>
            <a-drawer
                    placement="right"
                    :closable="false"
                    @close="onClose"
                    :visible="visible"
                    width="85vw">
                <template slot="title">
                    <ul class="drawer-title">
                        <nuxt-link to="/mobile">
                            <li :class="SelectedKey === 1 ? 'drawer-title-li-active' : ''" @click="onClose">
                                {{$t('header.item-1')}}&nbsp<span v-show="localeLange !== 'English'">(Home)</span>
                            </li>
                        </nuxt-link>
                        <li :class="SelectedKey === 2 ? 'drawer-title-li-active' : ''" @click="onClose">
                            {{$t('header.item-2')}}&nbsp<span v-show="localeLange !== 'English'">(Buy)</span>
                        </li>
                        <li :class="SelectedKey === 3 ? 'drawer-title-li-active' : ''" @click="onClose">
                            {{$t('header.item-3')}}&nbsp<span v-show="localeLange !== 'English'">(Buy PTs)</span>
                        </li>
                        <li :class="SelectedKey === 4 ? 'drawer-title-li-active' : ''" @click="onClose">
                            {{$t('header.item-4')}}&nbsp<span v-show="localeLange !== 'English'">(Trade PTs)</span>
                        </li>
                        <li :class="SelectedKey === 5 ? 'drawer-title-li-active' : ''" @click="onClose">
                            {{$t('header.item-5')}}&nbsp<span v-show="localeLange !== 'English'">(Apply PTO)</span>
                        </li>
                        <li :class="SelectedKey === 6 ? 'drawer-title-li-active' : ''" @click="onClose">
                            {{$t('header.item-6')}}&nbsp<span v-show="localeLange !== 'English'">(Services)</span>
                        </li>
                        <li :class="SelectedKey === 7 ? 'drawer-title-li-active' : ''" @click="onClose">
                            {{$t('header.item-7')}}&nbsp<span v-show="localeLange !== 'English'">(Media)</span>
                        </li>
                    </ul>
                    <div class="slide-item">
                        <section v-show="!isLogin">
                            <nuxt-link to="/mobile/user/login">
                                <span class="loginbtn link_btn" @click="onClose"
                                      :class="SelectedType === 1 ? 'drawer-title-li-active' :''">
                                    {{$t('header.item-8')}}
                                </span>
                            </nuxt-link>
                            <nuxt-link to="/mobile/user/register">
                                <span class="loginbtn link_btn" @click="onClose"
                                      :class="SelectedType === 2 ? 'drawer-title-li-active' :''">
                                    {{$t('header.item-9')}}
                                </span>
                            </nuxt-link>
                        </section>
                        <ul class="drawer-title" v-show="isLogin">
                            <li :class="centerKey === 1 ? 'drawer-title-li-active' : ''" @click="onClose">
                                {{$t('sider.item-1')}}
                            </li>
                            <li :class="centerKey === 2 ? 'drawer-title-li-active' : ''" @click="onClose">
                                {{$t('sider.item-2')}}
                            </li>
                            <li :class="centerKey === 3 ? 'drawer-title-li-active' : ''" @click="onClose">
                                {{$t('sider.item-3')}}
                            </li>
                            <li :class="centerKey === 4 ? 'drawer-title-li-active' : ''" @click="onClose">
                                {{$t('sider.item-4')}}
                            </li>
                            <li :class="centerKey === 5 ? 'drawer-title-li-active' : ''" @click="onClose">
                                <nuxt-link to="/mobile/user/UserCenter/MyMessage">
                                    {{$t('sider.item-5')}}
                                </nuxt-link>
                            </li>
                            <li :class="centerKey === 6 ? 'drawer-title-li-active' : ''" @click="onClose">
                                {{$t('sider.item-6')}}
                            </li>
                            <li :class="centerKey === 7 ? 'drawer-title-li-active' : ''" @click="loginOut">
                                {{$t('sider.item-7')}}
                            </li>
                        </ul>
                    </div>
                </template>
                <div class="slide-boby" :class="isLogin ? 'slide-boby-change' : ''">
                    <a class="link" href="javascript:;" id="setting_btn">
                        {{$t('sider.item-8')}}
                    </a>
                    <!--暂时屏蔽白皮书-->
                    <!--<a class="link showmore" href="javascript:;">白皮书 <span class="caret"></span></a>-->
                    <!--<ul class="more">-->
                    <!--<li class="link_btn">简体中文<a href="javascript:;"></a></li>-->
                    <!--<li class="link_btn">English<a href="javascript:;"></a></li>-->
                    <!--</ul>-->
                    <input type="hidden" name="nowlang" value="tw">
                    <a class="link showmore lang_btn" href="javascript:;">{{localeLange}} <span
                            class="caret"></span></a>
                    <ul class="more lang_menu">
                        <li class="link_btn" @click="setLocale('繁體中文')">繁體中文
                        </li>
                        <li class="link_btn" @click="setLocale('English')">English
                        </li>
                        <li class="link_btn" @click="setLocale('简体中文')">简体中文
                        </li>
                    </ul>
                </div>
            </a-drawer>
        </div>
    </a-layout-header>
</template>

<script>
    export default {
        name: 'fshead',
        props: ['SelectedKey', 'SelectedType', 'centerKey'],
        data () {
            return {
                // 显示抽屉
                visible: false,
                // 国际化下拉框
                locales: ['繁體中文', 'English', '简体中文'],
                // 默认语言
                localeLange: '繁體中文',
                // 国际化为英文，切换显示效果
                isEnglish: false,
                // 是否登录
                isLogin: false
            }
        },
        mounted () {
            // 设置同时出现消息个数
            this.$message.config({
                maxCount: 1
            })
            // 设置默认值或获取用户选择的国际化
            let sessionStorage = window.sessionStorage
            if (sessionStorage.getItem('locale') === null) {
                sessionStorage.setItem('locale', 'tw')
            }
            // 获取用户登录状态
            if (sessionStorage.getItem('token') !== null) {
                this.$store.dispatch('updateToken', sessionStorage.getItem('token'))
                this.isLogin = true
            } else {
                this.isLogin = false
            }
            // 同步国际化
            switch (sessionStorage.getItem('locale')) {
            case 'tw' :
                this.localeLange = '繁體中文'
                this.$i18n.locale = 'tw'
                this.$store.dispatch('updateLang', 'tw')
                break
            case 'cn' :
                this.localeLange = '简体中文'
                this.$i18n.locale = 'cn'
                this.$store.dispatch('updateLang', 'cn')
                break
            case 'en' :
                this.localeLange = 'English'
                this.$i18n.locale = 'en'
                this.$store.dispatch('updateLang', 'en')
                break
            }
        },
        methods: {
            // 触发父组件显示右侧抽屉导航
            showDrawer () {
                this.$emit('openDrawer')
                this.visible = true
            },
            // 触发父组件关闭右侧抽屉导航
            onClose () {
                this.$emit('closeDrawer')
                this.visible = false
            },
            /**
             * 国际化切换
             * @param key 国际化标识
             */
            setLocale (key) {
                let locale = ''
                switch (key) {
                case '繁體中文' :
                    locale = 'tw'
                    break
                case '简体中文' :
                    locale = 'cn'
                    break
                case 'English' :
                    locale = 'en'
                    break
                }
                this.onClose()
                this.localeLange = key
                this.$i18n.locale = locale
                window.sessionStorage.setItem('locale', locale)
            },
            /**
             * 退出登录
             */
            loginOut () {
                this.onClose()
                this.$router.push({path: '/mobile'})
                this.$store.dispatch('updateToken', '')
                sessionStorage.removeItem('token')
                this.isLogin = false
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/css/mobile/main.less';

    .hamburger {
        background: transparent;
        border: none;
        display: block;
        height: 0.28rem;
        width: 0.28rem;
        z-index: 1000;
        float: right;
        margin-right: -0.02rem;
    }

    .ant-drawer-content-wrapper {

        .ant-drawer-header {
            padding: 0.05rem 0 0 0.2rem;
        }

        .ant-drawer-body {
            padding-bottom: 0;
        }

        .drawer-title {
            margin-bottom: 0.05rem;
            list-style: none;
            padding: 0;

            li {
                height: auto;
                line-height: 0.16rem;
                font-size: 16px;
                color: #333333;
                padding: 0.12rem 0.2rem;

                span {
                    font-size: 14px;
                }

            }
        }

        .slide-item {
            border-top: 1px solid #E9E9E9;
            padding: 0.05rem 0.2rem;
            margin-left: -0.2rem;
            min-height: 0.51rem;

            span {
                width: 50%;
                text-align: center;
                float: left;
                text-decoration: none;
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 16px;
                color: #666666;
                display: block;
            }

        }

        .ant-drawer-body {

            .slide-boby {
                margin-left: -0.24rem;
                margin-top: -0.24rem;
                border-bottom: 1px solid #E9E9E9;
                padding: 0.05rem 0.2rem 0.01rem;

                .link {
                    height: auto;
                    width: 100%;
                    line-height: 0.16rem;
                    font-size: 16px;
                    color: #333333;
                    padding: 0.12rem 0.2rem;
                    text-decoration: none;
                    display: inline-block;

                    .caret {
                        display: inline-block;
                        width: 0;
                        height: 0;
                        margin-left: 0.2rem;
                        vertical-align: middle;
                        border-top: 4px dashed;
                        border-top: 4px solid \9;
                        border-right: 4px solid transparent;
                        border-left: 4px solid transparent;
                    }

                }

                li {
                    list-style: none;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    font-size: 14px;
                    color: #333;
                }

            }
        }
    }

    .drawer-title-li-active {
        color: #2EA9DF !important;
        a {
            color: #2EA9DF !important;
        }
    }

    .slide-boby-change {
        border-bottom: none !important;
    }

</style>
