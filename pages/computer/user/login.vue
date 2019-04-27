<template>
    <a-layout id="components-layout-computer-top" class="layout">
        <fs-head :SelectedKey="key" :SelectedType="type"/>
        <section class="container">
            <a-layout-content>
                <div class="content">
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
                                <a-input v-decorator="['account',
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
                            <a-form-item
                                    v-show="base64Captcha !== ''"
                                    :label="$t('register.item-30')">
                                <a-row :gutter="27">
                                    <a-col :span="19" style="padding-right: 5px;">
                                        <a-input :placeholder="$t('register.item-30')"
                                                 v-decorator="['validataCode',
                                                          {validataCode: 'blur',
                                                          rules: [{ validator:checkCaptcha }]}]"/>
                                    </a-col>
                                    <a-col :span="5">
                                        <div class="base64Captcha-content" @click="getCaptcha()">
                                            <img :src="base64Captcha">
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        type="primary"
                                        html-type="submit"
                                        class="login-form-button">
                                    {{$t('login.item-5')}}
                                </a-button>
                                <div class="login-form-forgot">
                                    <a href="javascript:;" style="margin-right: 20px">
                                        {{$t('login.item-6')}}
                                    </a>
                                    {{$t('login.item-7')}}
                                    <nuxt-link to="/computer/user/register">
                                        <a href="javascript:;">{{$t('login.item-8')}}</a>
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
    import FsHead from '~/components/computer/FangseaHeader'
    import fonter from '~/components/computer/Footer'
    import validate from '~/assets/utils/validate'
    import tool from '~/assets/utils/tool'
    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                // 首页导航下标
                key: '0',
                // 登录、注册导航下标
                type: 1,
                // 表单排版风格
                formLayout: 'vertical',
                // 图片验证码
                base64Captcha: ''
            }
        },
        // 初始化form
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        methods: {
            // 获取图形验证码
            getCaptcha () {
                let account = this.form.getFieldValue('account')
                if (!validate.required(account) && account.indexOf('@') === -1) {
                    this.$message.error(this.$t('register.item-24'))
                } else if (!validate.required(account) && account.indexOf('@') !== -1) {
                    this.$message.error(this.$t('register.item-27'))
                } else if (account.indexOf('@') === -1 && !validate.plus(account)) {
                    this.$message.error(this.$t('login.item-12'))
                } else if (account.indexOf('@') !== -1 && !validate.email(account)) {
                    this.$message.error(this.$t('login.item-11'))
                } else {
                    let data = {
                        traceId: tool.UUID(),
                        data: {account: account}
                    }
                    axios.post('/api/v2/user/pictrue/code/get', data)
                        .then(res => {
                            res.data.code.toString() === '0000' ? this.base64Captcha = res.data.data.validataCode : this.$message.error(this.$t(`code.${res.data.code}`))
                        })
                        .catch(err => {
                            this.$message.error(err.message)
                        })
                }
            },
            /**
             * form 表单提交
             * @param e 提交事件
             */
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let data = {
                            traceId: tool.UUID(),
                            data: {
                                account: values['account'],
                                password: values['password'],
                                validataCode: values['validataCode']
                            }
                        }
                        axios.post('/api/v2/user/login', data)
                            .then(res => {
                                if (res.data.code.toString() === '0000') {
                                    // 设置默认消息头
                                    axios.defaults.headers['token'] = res.headers.token
                                    // 清空图片验证码
                                    this.base64Captcha = ''
                                    // 持久化储存用户登录状态
                                    let sessionStorage = window.sessionStorage
                                    if (sessionStorage.getItem('token') === null) {
                                        sessionStorage.setItem('token', res.headers.token)
                                    }
                                    // 全局管理token
                                    this.$store.dispatch('updateToken', res.headers.token)
                                    this.$router.push({path: '/computer'})
                                } else if (res.data.code.toString() === '1004') {
                                    this.base64Captcha = res.data.data.validataCode
                                } else {
                                    this.$message.error(this.$t(`code.${res.data.code}`))
                                }
                            })
                            .catch(err => {
                                this.$message.error(err.message)
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
            /**
             * 检测图形验证码
             * @param rule 检测对象
             * @param value 检测的值
             * @param callback 回调
             */
            checkCaptcha (rule, value, callback) {
                if (this.base64Captcha !== '') {
                    validate.required(value) ? callback() : callback(this.$t('register.item-31'))
                } else {
                    callback()
                }
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
        padding-top: 65px !important;
        min-height: calc(100vh - 126px) !important;
    }

    #components-form-normal-login {
        .base64Captcha-content{
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            img {
                width: 100%;
                height: 38px;
            }
        }

        /deep/ .ant-form-item-required:before {
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

        /deep/ .ant-form-item-label {
            line-height: 24px;
        }

        .ant-input, .ant-btn {
            height: 40px;
        }
    }
</style>
