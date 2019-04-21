<template>
    <a-layout-header class="header">
        <div class="header-content">
            <nuxt-link to="/pc">
                <div class="logo">
                </div>
            </nuxt-link>
            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :selectedKeys="[SelectedKey]"
                    :defaultSelectedKeys="['1']"
                    :style="{ lineHeight: '64px',maxWidth: '750px' }">
                <a-menu-item key="1">
                    <nuxt-link to="/pc">
                        <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                            <span>{{$t('header.item-1')}}</span><span class="item-en" v-show="!isEnglish">Home</span>
                        </div>
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <nuxt-link to="/pc">
                        <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                            <span>{{$t('header.item-2')}}</span><span class="item-en" v-show="!isEnglish">Buy</span>
                        </div>
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <nuxt-link to="/pc">
                        <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                            <span>{{$t('header.item-3')}}</span><span class="item-en" v-show="!isEnglish">Buy PTs</span>
                        </div>
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="4">
                    <nuxt-link to="/pc">
                        <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                            <span>{{$t('header.item-4')}}</span><span class="item-en"
                                                                      v-show="!isEnglish">Trade PTs</span>
                        </div>
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="5">
                    <nuxt-link to="/pc">
                        <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                            <span>{{$t('header.item-5')}}</span><span class="item-en"
                                                                      v-show="!isEnglish">Apply PTO</span>
                        </div>
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="6">
                    <nuxt-link to="/pc">
                        <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                            <span>{{$t('header.item-6')}}</span><span class="item-en"
                                                                      v-show="!isEnglish">Services</span>
                        </div>
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="7">
                    <nuxt-link to="/pc">
                        <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                            <span>{{$t('header.item-7')}}</span><span class="item-en" v-show="!isEnglish">Media</span>
                        </div>
                    </nuxt-link>
                </a-menu-item>
            </a-menu>
            <div class="menu-right">
                <section v-show="!isLogin">
                    <nuxt-link to="/pc/login">
                        <a-button ghost class="menu-bt" :class="SelectedType === 1 ? 'drawer-title-li-active' :''">
                            {{$t('header.item-8')}}
                        </a-button>
                    </nuxt-link>
                    <span class="line">|</span>
                    <nuxt-link to="/pc/register">
                        <a-button ghost class="menu-bt" :class="SelectedType === 2 ? 'drawer-title-li-active' :''">
                            {{$t('header.item-9')}}
                        </a-button>
                    </nuxt-link>
                </section>
                <section>
                    <a-dropdown v-show="isLogin" placement="bottomRight">
                        <a-avatar :size="22" icon="user"/>
                        <a-menu slot="overlay">
                            <a-menu-item key="1">
                                <nuxt-link :to="{path:'/pc/UserCenter',query: {getKey: '1'}}">
                                    {{$t('sider.item-1')}}
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item key="2">
                                <nuxt-link :to="{path:'/pc/UserCenter',query: {getKey: '2'}}">
                                    {{$t('sider.item-2')}}
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item key="3">
                                <nuxt-link :to="{path:'/pc/UserCenter',query: {getKey: '3'}}">
                                    {{$t('sider.item-3')}}
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item key="4">
                                <nuxt-link :to="{path:'/pc/UserCenter',query: {getKey: '4'}}">
                                    {{$t('sider.item-4')}}
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item key="5">
                                <nuxt-link :to="{path:'/pc/UserCenter',query: {getKey: '5'}}">
                                    {{$t('sider.item-5')}}
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item key="6">
                                <nuxt-link :to="{path:'/pc/UserCenter',query: {getKey: '6'}}">
                                    {{$t('sider.item-6')}}
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item key="7" @click="loginOut">
                                {{$t('sider.item-7')}}
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </section>
                <section>
                    <img src="~/assets/img/setting.png" class="setting">
                </section>
                <a-dropdown>
                    <a class="ant-dropdown-link" href="javascript:;">
                        {{localeLange}}
                        <a-icon type="down"/>
                    </a>
                    <a-menu slot="overlay" @click="setLocale">
                        <a-menu-item v-for="locale in locales" :key="locale">
                            <a href="javascript:;">{{locale}}</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </div>
    </a-layout-header>
</template>

<script>
    export default {
        name: 'fshead',
        props: ['SelectedKey', 'SelectedType'],
        data () {
            return {
                locales: ['繁體中文', 'English', '简体中文'],
                localeLange: '繁體中文',
                isEnglish: false,
                isLogin: false
            }
        },
        mounted () {
            this.$message.config({
                maxCount: 1
            })
            // 设置默认值或获取用户选择的国际化
            let sessionStorage = window.sessionStorage
            if (sessionStorage.getItem('locale') === null) {
                sessionStorage.setItem('locale', 'tw')
            }
            // 获取用户登录状态
            if (sessionStorage.getItem('userId') !== null) {
                this.$store.dispatch('updateUserId', sessionStorage.getItem('userId'))
                this.isLogin = true
            } else {
                this.$store.dispatch('updateUserId', '')
                this.isLogin = false
            }
            switch (sessionStorage.getItem('locale')) {
            case 'tw' :
                this.isEnglish = false
                this.localeLange = '繁體中文'
                this.$i18n.locale = 'tw'
                this.$store.dispatch('updateLang', 'tw')
                break
            case 'cn' :
                this.isEnglish = false
                this.localeLange = '简体中文'
                this.$i18n.locale = 'cn'
                this.$store.dispatch('updateLang', 'cn')
                break
            case 'en' :
                this.isEnglish = true
                this.localeLange = 'English'
                this.$i18n.locale = 'en'
                this.$store.dispatch('updateLang', 'en')
                break
            }
        },
        methods: {
            /**
             * 国际化切换
             * @param item.key 国际化标识
             */
            setLocale (item) {
                let locale = ''
                switch (item.key) {
                case '繁體中文' :
                    this.isEnglish = false
                    locale = 'tw'
                    break
                case '简体中文' :
                    this.isEnglish = false
                    locale = 'cn'
                    break
                case 'English' :
                    this.isEnglish = true
                    locale = 'en'
                    break
                }
                this.localeLange = item.key
                this.$i18n.locale = locale
                window.sessionStorage.setItem('locale', locale)
            },
            /**
             * 退出登录
             */
            loginOut () {
                this.$router.push({path: '/pc'})
                this.$store.dispatch('updateUserId', '')
                sessionStorage.removeItem('userId')
                this.isLogin = false
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/css/pc/main.less';

    .drawer-title-li-active {
        color: #2EA9DF !important;
    }

    .item-flex {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 64px;
        line-height: 64px;
        padding-top: 15px;

        span {
            line-height: 20px;
        }

        .item-en {
            font-size: 12px;
        }
    }

    .item-flex-padding {
        padding-top: 22px;
    }


</style>
