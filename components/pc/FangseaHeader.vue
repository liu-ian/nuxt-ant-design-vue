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
                    <nuxt-link to="/pc">{{$t('index.menu_1')}}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <nuxt-link to="/pc/buy">{{$t('index.menu_2')}}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <nuxt-link to="/pc/BuyPts">{{$t('index.menu_3')}}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="4">
                    <nuxt-link to="/pc">{{$t('index.menu_4')}}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="5">
                    <nuxt-link to="/pc">{{$t('index.menu_5')}}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="6">
                    <nuxt-link to="/pc">{{$t('index.menu_6')}}</nuxt-link>
                </a-menu-item>
                <a-menu-item key="7">
                    <nuxt-link to="/pc">{{$t('index.menu_7')}}</nuxt-link>
                </a-menu-item>
            </a-menu>
            <div class="menu-right">
                <nuxt-link to="/pc/login">
                    <a-button ghost class="menu-bt">{{$t('index.menu_8')}}</a-button>
                </nuxt-link>
                <span class="line">|</span>
                <nuxt-link to="/pc/register">
                    <a-button ghost class="menu-bt">{{$t('index.menu_9')}}</a-button>
                </nuxt-link>
                <nuxt-link to="/pc/UserCenter/RealEstate"><img src="~/assets/img/setting.png" class="setting">
                </nuxt-link>
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
        props: ['SelectedKey'],
        data() {
            return {
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
    @import '../../assets/css/pc/main.less';

</style>
