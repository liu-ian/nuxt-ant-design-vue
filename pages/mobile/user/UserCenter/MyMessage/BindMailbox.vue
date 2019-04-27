<template>
    <a-layout id="components-layout-mobile-top" class="layout"
              :class="(drawer ? 'drawer-containel': '')">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer" @closeDrawer="closeDrawer"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-register">
                    <div id="components-form-BindMailbox">
                        <p class="components-form-BindMailbox"> {{$t('BindMailbox.item-1')}} </p>
                        <a-form
                                :form="form"
                                :layout="formLayout">
                            <a-form-item has-feedback
                                         colon>
                                <span slot="label"> {{$t('BindMailbox.item-2')}} </span>
                                <a-input
                                        v-model="form.mailboxAccount"
                                        :placeholder="$t('BindMailbox.item-3')"
                                        type="email">
                                </a-input>
                            </a-form-item>
                            <a-form-item
                                    :label="$t('BindMailbox.item-4')">
                                <a-row class="BindMailbox-check">
                                    <a-input
                                            v-model="form.verificationCode"
                                            :placeholder="$t('BindMailbox.item-4')"/>
                                    <a-button
                                            :disabled="form.disabled"
                                            @click="checkingAccount"
                                            class="captcha-bt">
                                        {{ getMobileCode() }}
                                    </a-button>
                                </a-row>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        @click="handleSubmit"
                                        type="primary"
                                        html-type="submit"
                                        class="BindMailbox-button">
                                    {{$t('BindMailbox.item-7')}}
                                </a-button>
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
    import FsHead from '~/components/mobile/FangseaHeader'
    import fonter from '~/components/mobile/Footer'
    import validate from '~/assets/utils/validate'
    import tool from '~/assets/utils/tool'
    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                // 首页高亮
                key: '1',
                type: 2,
                centerKey: 0,
                drawer: false,
                formLayout: 'vertical',
                // 定时器
                waitTimer: false,
                // 验证码按钮点击状态
                isSendCaptcha: false,
                // 表单数据
                form: {
                    // 邮箱账号
                    email: '',
                    // 按钮状态
                    disabled: false,
                    // 邮箱账号
                    mailboxAccount: '',
                    // 验证码
                    verificationCode: '',
                    // 邮箱验证的状态码
                    statusMail: '',
                    // 验证码验证的提示文字
                    helpMail: ''
                }
            }
        },
        // 初始化form
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        methods: {
            /**
             * 本地校验表单数据的合法性，在点击发送验证码
             */
            checkingAccount () {
                if (validate.email(this.form.mailboxAccount)) {
                    // 通过本地验证,设置状态图标
                    this.form.statusMail = 'success'
                    this.form.helpMail = ''
                    // 后台验证
                    this.checkFun(this.form.mailboxAccount)
                } else {
                    console.log('hello')
                    // 没有验证通过
                    this.form.statusMail = 'error'
                    this.form.helpMail = '邮箱格式不正确'
                }
            },
            /**
             * 初始化form状态
             */
            changeTabs (e) {
                this.form.resetFields()
            },
            /**
             *  发送请求后端检验数据
             */
            checkFun () {
                // 发送请求
                axios.post('/api/v2/user/account/bind/check', {
                    traceId: tool.UUID(),
                    data: this.form.mailboxAccount
                })
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            // 校验成功 ( 需要接受账号 )邮箱账号验证成功并发送验证码
                            this.captchaGet(this.form.mailboxAccount)
                        } else {
                            this.$message.error(this.translation(res.data.code.toString()))
                        }
                    }).catch(err => {
                        this.$message.error(err === undefined ? '验证码发送失败' : '验证码发送失败')
                    })
            },
            /**
             * 发送验证码
             */
            captchaGet (account) {
                // 防止重复点击
                if (this.waitTimer > 0) {
                    return false
                }
                // 定时器
                this.waitTimer = 60
                let that = this
                let timerInterval = setInterval(function () {
                    if (that.waitTimer > 0) {
                        that.waitTimer--
                    } else {
                        clearInterval(timerInterval)
                    }
                }, 1000)
                //  发送请求
                axios.post('/api/v2/user/verifiycode/get', {
                    traceId: tool.UUID(),
                    data: {account: account, business: 'BIND'}
                })
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            this.$message.success(res.data.msg)
                        }
                    })
                    .catch(err => {
                        this.$message.error(err.message)
                    })
                // 修改按钮的文字
                this.getMobileCode()
                // 改变按钮状态
                this.form.disabled = true
                // 修改验证码状态
                this.isSendCaptcha = true
            },
            /**
             * 修改按钮的文字
             */
            getMobileCode () {
                if (this.waitTimer > 0) {
                    return this.waitTimer + '秒后获取'
                }
                if (this.waitTimer === 0) {
                    this.form.disabled = false
                    return '重新获取'
                }
                if (this.waitTimer === false) {
                    return '获取验证码'
                }
            },
            /**
             *  确认
             */
            handleSubmit () {
                // 非空校验
                if (
                    (this.form.mailboxAccount.replace(/(^\s*)|(\s*$)/g, '')) !== '' &&
                    (this.form.verificationCode.replace(/(^\s*)|(\s*$)/g, '') !== '')) {
                    /**
                     *  点击确认只需要校验验证码成功则绑定成功，失败则提示验证码校验失败
                     *  提交邮箱账号
                     *  检测验证码是否正确
                     *  @type {{data: {verifyCode: 验证码, account: 验证的账号}}}
                     */
                    if (this.isSendCaptcha) {
                        const params = {
                            data: {
                                account: this.form.mailboxAccount,
                                verifyCode: this.form.verificationCode
                            }
                        }
                        this.$axios.post('/api/v2/user/account/bind', {params})
                            .then(res => {
                                if (res.data.code.toString() === '0000') {
                                    this.$message.success(res.data.msg)
                                    this.nextStep()
                                } else {
                                    this.$message.error(this.translation(res.code.toString()))
                                }
                            }).catch(err => {
                                this.$message.error(err.message)
                            })
                    } else {
                        this.$message.error('请点击发送验证码')
                    }
                } else {
                    this.$message.error('邮箱或验证码不能为空')
                }
            },
            /**
             * 转译
             * @param code  接口返回的状态码
             */
            translation (code) {
                switch (code) {
                case '9999' :
                    return '验证码不正确'
                    // eslint-disable-next-line
                        break
                case '1120' :
                    return '此手机号已绑定到其他账号，无法完成绑定操作，你可以使用此手机号直接登录'
                    // eslint-disable-next-line
                        break
                case '1121' :
                    return '手机号格式不正确'
                    // eslint-disable-next-line
                        break
                }
            },
            /**
             *  下一步事件
             * **/
            nextStep () {
                this.$router.push({name: 'mobile-user-UserCenter-MyMessage'})
            },
            /**
             * 开启右侧抽屉导航
             */
            openDrawer () {
                this.drawer = true
            },
            /**
             * 关闭右侧抽屉导航
             */
            closeDrawer () {
                this.drawer = false
            }
        },
        components: {
            FsHead,
            fonter
        }
    }
</script>

<style lang="less" scoped>
    .ant-form-vertical .ant-form-item {
        padding-bottom: 0;
    }

    .content-register {
        padding-top: 0.65rem;
        min-height: calc(100vh - 1.26rem);
    }

    .ant-modal-footer {
        padding: 0.20rem 0.24rem;
    }

    .ant-modal-body {
        max-height: 3.30rem;
        overflow-y: auto;
    }

    #components-form-BindMailbox {
        max-width: 5.52rem;
        margin: 0 auto;

        .ant-tabs-bar {
            border: none;
        }

        .ant-tabs-tab {
            font-size:16px;
        }

        .login-form-forgot {
            float: right;
            margin-top: 0.14rem;
        }

        .BindMailbox-check {
            display: flex;
            justify-content: space-between;
            input {
                margin-right: 0.24rem;
            }
        }
        .BindMailbox-button {
            width: 100%;
            font-size: 16px;
            color:rgba(255,255,255,1)!important;
        }

        .components-form-BindMailbox {
            margin-bottom: 0.32rem;
            font-size: 0.24rem;
            color: rgba(0, 0, 0, 0.85);
        }
        .ant-input-group-addon {
            font-size: 16px;
            padding: 0.08rem 0.12rem;
        }

        a, a:hover, a:focus, a:visited {
            color: #2EA9DF;
            font-size: 14px;
        }

        .ant-form-item-label {
            color: rgba(0, 0, 0, 0.85);
        }

        .ant-input{
            font-size: 16px;
            padding: 0.08rem 0.12rem;
            height: 0.4rem;
            color:#000000;
        }
        .ant-btn {
            padding: 0.08rem 0.16rem;
            height: 0.4rem;
            font-size: 16px;
        }

        .ant-form-text {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.45);
        }

        .gray {
            color: rgba(0, 0, 0, 0.25);
            border-color: rgba(0, 0, 0, 0.25);
        }

        .captcha-bt {
            font-size: 16px;
            color: #2EA9DF;
            border: 1px solid rgba(46, 169, 223, 1);;
        }
        input::-webkit-input-placeholder {
            color: #D9D9D9;
        }
    }

</style>
