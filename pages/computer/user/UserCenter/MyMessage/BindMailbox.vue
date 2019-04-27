<template>
    <a-layout id="components-layout-computer-top" class="layout">
        <fs-head :SelectedKey="key"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-bind-mailbox">
                    <div id="components-form-bind-mailbox">
                        <p class="components-form-bind-mailbox"> {{$t('BindMailbox.item-1')}} </p>
                        <a-form
                                @submit="handleSubmit"
                                :form="form"
                                :layout="formLayout">
                            <a-form-item
                                    has-feedback
                                    colon>
                                <span slot="label"> {{$t('BindMailbox.item-2')}} </span>
                                <a-input
                                        :placeholder = "$t('BindMailbox.item-3')"
                                        v-decorator="['email',{validateTrigger: 'blur', rules: [{ validator: checkEmailCount}] }]"
                                        type="email"
                                        style="width: 100%">
                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <span slot="label"> {{$t('BindMailbox.item-4')}} </span>
                                <div class="space-btw">
                                    <a-input
                                            v-decorator="['captcha',{validateTrigger: 'blur', rules: [{ validator: checkEmailCount}] }]"
                                            class="input-capcha"/>
                                    <a-button
                                            :disabled="form.disabled"
                                            @click="checkFun"
                                            class="captcha-bt">
                                        {{ getMobileCode()}}
                                    </a-button>
                                </div>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        @click="handleSubmit"
                                        type="primary"
                                        html-type="submit"
                                        class="bind-mailbox-button">
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
    import FsHead from '~/components/computer/FangseaHeader'
    import fonter from '~/components/computer/Footer'
    import validate from '~/assets/utils/validate'
    import tool from '~/assets/utils/tool'
    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                key: '',
                formLayout: 'vertical',
                // 定时器
                waitTimer: false,
                // 验证码按钮点击状态
                isSendCaptcha: false,
                // 表单数据
                formObject: {
                    // 按钮状态
                    disabled: false,
                    // 是否点击验证码发送按钮
                    isSendCapchta: false
                }
            }
        },
        /**
         * 初始化form
         */
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        methods: {
            /**
             * 检测账号
             * @param rule 检测对象
             * @param value 检测的值
             * @param callback 回调
             */
            checkEmailCount (rule, value, callback) {
                switch (rule.fullField) {
                case 'email' :
                    validate.email(value) ? callback() : callback(this.$t('BindMailbox.item-5'))
                    break
                case 'captcha' :
                    validate.required(value) ? callback() : callback(this.$t('BindMailbox.item-8'))
                    break
                default:
                    callback()
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
                    data: this.form.getFieldValue('email')
                })
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            // 校验成功 ( 需要接受账号 ) 邮箱账号验证成功并发送验证码
                            this.captchaGet(this.form.getFieldValue('captcha'))
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
                this.formObject.disabled = true
                // 按钮修改状态
                this.formObject.isSendCapchta = true
            },
            /**
             * 修改按钮的文字
             */
            getMobileCode () {
                if (this.waitTimer > 0) {
                    return this.waitTimer + '秒后获取'
                }
                if (this.waitTimer === 0) {
                    this.formObject.disabled = false
                    return '重新获取'
                }
                if (this.waitTimer === false) {
                    return '获取验证码'
                }
            },
            /**
             *  @param 表单对象s
             */
            handleSubmit (e) {
                // 阻止表单默认事件
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        // 保证验证码的是点击状态
                        if (this.formObject.isSendCapchta) {
                            const params = {
                                data: {
                                    account: values['email'],
                                    verifyCode: values['deptcha']
                                }
                            }
                            axios.post('/api/v2/user/account/bind', {params})
                                .then(res => {
                                    if (res.data.code.toString() === '0000') {
                                        this.$message.success(res.data.msg)
                                        this.nextStep()
                                    } else {
                                        this.$message.error(this.translation(res.code.toString()))
                                    }
                                }).catch(err => {
                                    this.$message.error(err.msg)
                                })
                        } else {
                            this.$message.error('请点击发送验证码')
                        }
                    }
                })
            },
            /**
             * 转译
             * @param code  接口返回的状态码
             */
            translation (code) {
                let msg = ''
                switch (code) {
                case '9999' :
                    msg = '验证码不正确'
                    // eslint-disable-next-line
                    break
                case '1120' :
                    msg = '此手机号已绑定到其他账号，无法完成绑定操作，你可以使用此手机号直接登录'
                    // eslint-disable-next-line
                    break
                case '1121' :
                    msg = '手机号格式不正确'
                    // eslint-disable-next-line
                    break
                }
                return msg
            },
            /**
             *  下一步事件
             */
            nextStep () {
                this.$router.push({name: 'computer-user-UserCenter'})
            }
        },
        components: {
            FsHead,
            fonter
        }
    }
</script>

<style lang="less" >
    .content-bind-mailbox {
        padding-top: 65px;
        min-height: calc(100vh - 126px);
    }

    #components-form-bind-mailbox {
        padding-top: 48px;
        max-width: 552px;
        margin: 0 auto;

        .ant-tabs-bar {
            border: none;
        }

        .ant-tabs-tab {
            font-size: 16px;
        }

        .login-form-forgot {
            float: right;
            margin-top: 14px;
        }

        .bind-mailbox-button {
            width: 100%;
            font-size: 16px;
            color: rgba(255, 255, 255, 1) !important;
        }

        .components-form-bind-mailbox {
            margin-bottom: 32px;
            font-size: 24px;
            color: rgba(0, 0, 0, 0.85);
        }

        .ant-input-group-addon {
            font-size: 16px;
            padding: 8px 12px;
        }

        a, a:hover, a:focus, a:visited {
            color: #57C3EB;
            font-size: 14px;
        }

        .ant-form-item-label {
            color: rgba(0, 0, 0, 0.85);
        }

        .ant-form-item-children {
            width: 100%;
        }

        .ant-form-vertical .ant-form-item {
            padding-bottom: 0;
        }

        .ant-input {
            font-size: 16px;
            padding: 8px 12px;
            height: 40px;
            color: #000000;
        }

        .ant-btn {
            padding: 8px 16px;
            height: 40px;
            font-size: 16px;
            line-height: 24px;
        }

        .ant-form-text {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.45);
        }

        .ant-form-explain {
            font-size: 14px;
            line-height: 22px;
        }

        .ant-form-vertical .ant-form-explain {
            margin-top: 1px;
            margin-bottom: -1px;
        }

        .captcha-bt {
            font-size: 16px;
            color: #2EA9DF;
            border: 1px solid rgba(46, 169, 223, 1);;
        }

        .gray {
            color: rgba(0, 0, 0, 0.25);
            border-color: rgba(0, 0, 0, 0.25);
        }

        input::-webkit-input-placeholder {
            color: #D9D9D9;
        }
        .space-btw {
           display: flex;
            justify-content: space-between
        }
        .input-capcha {
            margin-right: 24px
        }
    }

    .bind-mailbox-modal {
        .ant-modal-content {
            .ant-modal-header {
                border-radius: 0;
                background-color: #FFFFFF ;
                border-bottom: none;
                line-height: 26px;
                .ant-modal-title {
                    font-family:PingFangSC-Medium;
                    font-size:18px;
                    font-weight:500;
                    color:rgba(0,0,0,0.85);
                    line-height:26px;
                }
            }
            .ant-modal-body {
                font-size: 18px;
                line-height: 22px;
                p {
                    margin-bottom: 0;
                }
            }
            .ant-modal-footer {
                border-top: none;
                padding: 0 24px 14px 24px;
                .ant-btn.ant-btn-default {
                    display: none;
                }
                .ant-btn.ant-btn-primary {
                    margin-left: 0;
                    padding: 1px 8px;
                }

            }
        }
    }
</style>
