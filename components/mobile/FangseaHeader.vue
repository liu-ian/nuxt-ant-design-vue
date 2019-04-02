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
                        <li :class="key === 1 ? 'drawer-title-li-active' : ''">
                            首页&nbsp<span>(Home)</span>
                        </li>
                        <li :class="key === 2 ? 'drawer-title-li-active' : ''">
                            房产购买&nbsp<span>(Buy)</span>
                        </li>
                        <li :class="key === 3 ? 'drawer-title-li-active' : ''">
                            房产通证购买&nbsp<span>(Buy PTs)</span>
                        </li>
                        <li :class="key === 4 ? 'drawer-title-li-active' : ''">
                            房产通证交易&nbsp<span>(Trade PTs)</span>
                        </li>
                        <li :class="key === 5 ? 'drawer-title-li-active' : ''">
                            申请通证发行&nbsp<span>(Apply PTO)</span>
                        </li>
                        <li :class="key === 6 ? 'drawer-title-li-active' : ''">
                            客户服务&nbsp<span>(Services)</span>
                        </li>
                        <li :class="key === 7 ? 'drawer-title-li-active' : ''">
                            资讯&nbsp<span>(Media)</span>
                        </li>
                    </ul>
                    <div class="slide-item">
                        <nuxt-link to="/mobile/login"><span class="loginbtn link_btn" @click="onClose"
                                                            :class="SelectedType === 1 ? 'drawer-title-li-active' :''">登录</span>
                        </nuxt-link>
                        <nuxt-link to="/mobile/register"><span class="loginbtn link_btn" @click="onClose"
                                                               :class="SelectedType === 2 ? 'drawer-title-li-active' :''">注册</span>
                        </nuxt-link>
                        <ul class="layui-nav layui-nav-tree" style="display:none">
                            <li class="layui-nav-item link_btn">我的房产
                            </li>
                            <li class="layui-nav-item link_btn">我的钱包
                            </li>
                            <li class="layui-nav-item link_btn">地址管理
                            </li>
                            <li class="layui-nav-item link_btn">交易记录
                            </li>
                            <li class="layui-nav-item link_btn">我的信息
                            </li>
                            <li class="layui-nav-item link_btn">身份认证
                            </li>
                            <li class="layui-nav-item link_btn">退出登录</li>
                        </ul>
                    </div>
                </template>
                <div class="slide-boby">
                    <a class="link" href="javascript:;" id="setting_btn">
                        设置
                    </a>
                    <!--暂时屏蔽白皮书-->
                    <!--<a class="link showmore" href="javascript:;">白皮书 <span class="caret"></span></a>-->
                    <!--<ul class="more">-->
                    <!--<li class="link_btn">简体中文<a href="javascript:;"></a></li>-->
                    <!--<li class="link_btn">English<a href="javascript:;"></a></li>-->
                    <!--</ul>-->
                    <input type="hidden" name="nowlang" value="zh_CN">
                    <a class="link showmore lang_btn" href="javascript:;">简体中文 <span class="caret"></span></a>
                    <ul class="more lang_menu">
                        <li class="link_btn">繁體中文
                        </li>
                        <li class="link_btn">English
                        </li>
                        <li class="link_btn">简体中文
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
        props: ['SelectedKey', 'SelectedType'],
        data() {
            return {
                key: '',
                visible: false,
                locales: ['简体中文', 'English'],
                localeLange: ''
            }
        },
        mounted() {
            let sessionStorage = window.sessionStorage
            if (sessionStorage.getItem('locale') === null) {
                sessionStorage.setItem('locale', 'cn')
            }
            switch (sessionStorage.getItem('locale')) {
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
            showDrawer() {
                this.$emit('openDrawer')
                this.visible = true
            },
            onClose() {
                this.$emit('closeDrawer')
                this.visible = false
            },
            setLocale({key}) {
                let locale = ''
                switch (key) {
                    case '简体中文' :
                        locale = 'cn'
                        break
                    case 'English' :
                        locale = 'en'
                        break
                }
                this.localeLange = key
                this.$i18n.locale = locale
                window.sessionStorage.setItem('locale', locale)
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
        height: 28px;
        margin-right: 15px;
        width: 28px;
        z-index: 1000;
        position: absolute;
        right: 0;
        top: 10px;
    }

    .ant-drawer-content-wrapper {

        .ant-drawer-header {
            padding: 0.05rem 0 0 0.2rem;
        }

        .drawer-title {
            margin-bottom: 0.05rem;
            list-style: none;
            padding: 0;

            &
            li {
                height: auto;
                line-height: 0.16rem;
                font-size: 16px;
                color: #333333;
                padding: 0.12rem 0.2rem;

                &
                span {
                    font-size: 14px;
                }

            }
        }

        .slide-item {
            border-top: 1px solid #E9E9E9;
            padding: 5px 20px;
            margin-left: -0.2rem;
            height: 51px;

            span {
                width: 50%;
                text-align: center;
                float: left;
                text-decoration: none;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                color: #666666;
                display: block;
            }

        }

        .ant-drawer-body {

            .slide-boby {
                margin-left: -0.24rem;
                margin-top: -0.24rem;
                width: 3.42rem;
                border-bottom: 1px solid #E9E9E9;
                padding: 0.05rem 0.2rem 0.01rem;

                .link {
                    height: auto;
                    width: 100%;
                    line-height: 16px;
                    font-size: 16px;
                    color: #333333;
                    padding: 12px 20px;
                    text-decoration: none;
                    display: inline-block;

                    .caret {
                        display: inline-block;
                        width: 0;
                        height: 0;
                        margin-left: 2px;
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
    }

</style>
