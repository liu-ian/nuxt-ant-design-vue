<template>
    <a-layout id="components-layout-pc-top" class="layout">
        <fs-head :SelectedKey="key"/>
        <section class="container">
            <a-layout-content>
                <div class="content">
                    <div id="components-form-normal-login">
                        <a-form
                                :form="form"
                                :layout="formLayout"
                                class="login-form"
                                @submit="handleSubmit">
                            <p class="components-form-login-title">欢迎登录</p>
                            <a-form-item
                                    label="账号"
                                    has-feedback>
                                <a-input v-decorator="['userName',
                                    { rules: [{ validator: checkUserName}] }]"
                                         placeholder="手机号/电子邮箱">
                                </a-input>
                            </a-form-item>
                            <a-form-item
                                    label="密码"
                                    has-feedback>
                                <a-input v-decorator="['password',
                                      { rules: [{ validator: checkPassword}] }]"
                                         type="password"
                                         placeholder="密码">
                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        type="primary"
                                        html-type="submit"
                                        class="login-form-button">
                                    登录
                                </a-button>
                                <div class="login-form-forgot">
                                    <a href="javascript:;" style="margin-right: 20px">
                                        忘记密码
                                    </a>
                                    没有账号？
                                    <nuxt-link to="/pc/register">
                                        <a href="javascript:;">立即注册</a>
                                    </nuxt-link>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
            </a-layout-content>
        </section>
        <fonter/>
    </a-layout>
</template>
<script>
    import FsHead from '~/components/pc/FangseaHeader'
    import fonter from '~/components/pc/Footer'

    export default {
        data() {
            return {
                key: '1',
                formLayout: 'vertical'
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                    }
                })
            },
            checkUserName(rule, value, callback) {
                if (value && value.replace(/(^\s*)|(\s*$)/g, "") !== '') {
                    callback()
                    return
                }
                callback('请填写你的账号！')
            },
            checkPassword(rule, value, callback) {
                if (value) {
                    callback()
                    return
                }
                callback('请填写你的密码！')
            }
        },
        components: {
            FsHead,
            fonter
        }
    }
</script>

<style lang="less" scoped>
    .content {
        padding-top: 65px;
        min-height: calc(100vh - 126px);
    }

    #components-form-normal-login {
        .ant-form-item-required:before {
            content: ''
        }

        .login-form {
            margin: 0 auto;
            max-width: 552px;
        }

        .login-form-forgot {
            float: right;
            margin-top: 14px;
        }

        .login-form-button {
            width: 100%;
        }

        .components-form-login-title {
            margin-bottom: 13px;
            font-size: 24px;
            color: rgba(0, 0, 0, 0.85);
        }

        a, a:hover, a:focus, a:visited {
            color: #2EA9DF;
            font-size: 14px;
        }

        .ant-form-item-label {
            line-height: 24px;
        }

        .ant-input, .ant-btn {
            height: 40px;
        }
    }
</style>
