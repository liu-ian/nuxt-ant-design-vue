<template>
    <a-layout id="components-layout-mobile-top" class="layout" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" @openDrawer="openDrawer" @closeDrawer="closeDrawer"/>
        <section class="container">
            <a-layout-content>
                <div class="content-login content">
                    <div id="components-form-normal-login">
                        <a-form
                                :form="form"
                                :layout="formLayout"
                                class="login-form"
                                @submit="handleSubmit">
                            <p class="components-form-login-title">{{$t('login.item-1')}}</p>
                            <a-form-item
                                    :label="$t('login.item-2')"
                                    has-feedback>
                                <a-input v-decorator="['userName',
                                    {validateTrigger: 'blur',
                                     rules: [{ validator: checkUserName}] }]"
                                         :placeholder="$t('login.item-3')">
                                </a-input>
                            </a-form-item>
                            <a-form-item
                                    :label="$t('login.item-4')"
                                    has-feedback>
                                <a-input v-decorator="['password',
                                      {validateTrigger: 'blur',
                                       rules: [{ validator: checkPassword}] }]"
                                         type="password"
                                         :placeholder="$t('login.item-4')">
                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        type="primary"
                                        html-type="submit"
                                        class="login-form-button">
                                    {{$t('login.item-5')}}
                                </a-button>
                                <div class="login-form-forgot">
                                    <a href="javascript:;" style="margin-right: 0.1rem">
                                        {{$t('login.item-6')}}
                                    </a>
                                    {{$t('login.item-7')}}
                                    <nuxt-link to="/mobile/register">
                                        <a href="javascript:;">{{$t('login.item-8')}}</a>
                                    </nuxt-link>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
            </a-layout-content>
        </section>
    </a-layout>
</template>

<script>
    import FsHead from '~/components/mobile/FangseaHeader'
    import validate from '~/assets/utils/validate'

    export default {
        data () {
            return {
                key: 0,
                type: 1,
                formLayout: 'vertical',
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false}
            }
        },
        // 初始化form
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        methods: {
            /**
             * form 表单提交
             * @param e 提交事件
             */
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$axios.post('/v2/user/user_login', values)
                            .then(res => {
                                if (res.data.code.toString() === '0000') {
                                    // 持久化储存用户登录状态
                                    let sessionStorage = window.sessionStorage
                                    if (sessionStorage.getItem('userId') === null) {
                                        sessionStorage.setItem('userId', res.data.data.userId)
                                    }
                                    this.$store.dispatch('updateUserId', res.data.data.userId)
                                    this.$message.success(res.data.msg)
                                    this.$router.push({path: '/mobile'})
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            })
                            .catch(err => {
                                this.$message.error(err)
                            })
                    }
                })
            },
            /**
             * 检测账号
             * @param rule 检测对象
             * @param value 检测的值
             * @param callback 回调
             */
            checkUserName (rule, value, callback) {
                if (!validate.required(value)) {
                    callback(this.$t('login.item-9'))
                } else if (value.indexOf('@') === -1 && !validate.plus(value)) {
                    callback(this.$t('login.item-12'))
                } else if (value.indexOf('@') !== -1 && !validate.email(value)) {
                    callback(this.$t('login.item-11'))
                } else {
                    callback()
                }
            },
            /**
             * 检测密码
             * @param rule 检测对象
             * @param value 检测的值
             * @param callback 回调
             */
            checkPassword (rule, value, callback) {
                validate.required(value) ? callback() : callback(this.$t('login.item-10'))
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
    .content-login {
        min-height: calc(100vh - 0.50rem) !important;
    }

    #components-form-normal-login {
        .ant-form-item-required:before {
            content: ''
        }

        .ant-form-item {
            font-size: 12px;
        }

        .login-form {
            margin: 0 auto;
            max-width: 5.52rem;
        }

        .login-form-forgot {
            float: right;
            margin-top: 0.14rem;
        }

        .login-form-button {
            width: 100%;
        }

        .components-form-login-title {
            margin-bottom: 0.13rem;
            font-size: 18px;
            color: rgba(0, 0, 0, 0.85);
        }

        a, a:hover, a:focus, a:visited {
            color: #2EA9DF;
            font-size: 12px;
        }

        .ant-form-item-label {
            line-height: 0.24rem;
        }

        .ant-input, .ant-btn {
            height: 0.4rem;
        }
    }
</style>
