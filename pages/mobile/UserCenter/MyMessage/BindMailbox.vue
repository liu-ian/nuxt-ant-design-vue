<template>
    <a-layout id="components-layout-mobile-top" class="layout"
              :class="(drawer ? 'drawer-containel': '')">
        <fs-head :SelectedKey="key" :SelectedType="type" @openDrawer="openDrawer" @closeDrawer="closeDrawer"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-register">
                    <div id="components-form-BindMailbox">
                        <p class="components-form-BindMailbox"> {{$t('BindMailbox.item-1')}} </p>
                        <a-form
                                :form="form"
                                :layout="formLayout"
                                class=""
                                @submit="handleSubmit">
                            <a-form-item has-feedback
                                         colon>
                                <span slot="label"> {{$t('BindMailbox.item-2')}} </span>
                                <a-input
                                       :placeholder="$t('BindMailbox.item-3')"
                                        type="email"
                                        v-decorator="['email', {rules: [{ validator:checkForm }],}]">
                                </a-input>
                            </a-form-item>
                            <a-form-item
                                    :label="$t('BindMailbox.item-4')"
                                    >
                                <a-row class="BindMailbox-check">
                                    <a-input :placeholder="$t('BindMailbox.item-4')"
                                             v-decorator="['captcha',{rules: [{ validator:checkForm }]}]"/>
                                    <a-button
                                            :disabled="disabled"
                                            @click="checkFun"
                                            v-bind:class="{ gray:wait_timer > 0 }"
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
    import detector from '~/assets/utils/validate'
    import tool from '~/assets/utils/tool'

    export default {
        data () {
            return {
                key: '1',
                type: 2,
                drawer: false,
                formLayout: 'vertical',
                // 验证码
                captcha: '',
                // 定时器
                wait_timer: false,
                disabled: false
            }
        },
        // 初始化form
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        methods: {
            /**
             * @param rule 检测对象
             * @param value 检测的值
             * @param callback 回调
             */
            checkForm (rule, value, callback) {
                switch (rule.fullField) {
                case 'email' :
                    if (detector.email(value)) {
                        callback()
                    }
                    // eslint-disable-next-line
                        callback('请填写你的邮箱号码！')
                    break
                case 'captcha' :
                    if (value && value.replace(/(^\s*)|(\s*$)/, '') !== '') {
                        callback()
                    }
                    // eslint-disable-next-line
                        callback('请填写你的验证码！')
                    break
                default:
                    callback()
                }
            },
            /**
             * 初始化form状态
             * **/
            changeTabs (e) {
                this.form.resetFields()
            },
            /**
             *  校验邮箱账号以及发送验证码
             * **/
            checkFun () {
                if (detector.email(this.form.getFieldValue('email'))) {
                    this.$axios.post('/v2/user/bind/check', {
                        traceId: tool.UUID(),
                        data: this.form.getFieldValue('email')
                    })
                        .then(res => {
                            if (res.data.code.toString() === '0000') {
                                console.log('ok')
                                // 校验成功
                                // ( 需要接受账号 )邮箱账号验证成功并发送验证码
                                this.captchaGet(this.form.getFieldValue('email'))
                            } else {
                                this.$message.error(this.translation(res.code.toString()))
                            }
                        }).catch(err => {
                            this.$message.error(err)
                        })
                }
            },
            /**
             * 发送验证码
             * */
            captchaGet (account) {
                // 防止重复点击
                if (this.wait_timer > 0) {
                    return false
                }
                // 定时器
                this.wait_timer = 10
                let that = this
                let timerInterval = setInterval(function () {
                    if (that.wait_timer > 0) {
                        that.wait_timer--
                    } else {
                        clearInterval(timerInterval)
                    }
                }, 1000)
                //  发送请求
                this.$axios.post('/v2/user/get_validate', {
                    traceId: tool.UUID(),
                    data: {account: account, business: 'user'}
                })
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            this.$message.success(res.data.msg)
                        }
                    })
                    .catch(err => {
                        this.$message.error(err)
                    })
                // 修改按钮的文字
                this.getMobileCode()
                // 改变按钮状态
                this.disabled = true
            },
            /**
             * 修改按钮的文字
             * */
            getMobileCode () {
                if (this.wait_timer > 0) {
                    return this.wait_timer + ' 秒后获取'
                }
                if (this.wait_timer === 0) {
                    // 改变按钮状态
                    this.disabled = false
                    return '重新获取'
                }
                if (this.wait_timer === false) {
                    return '获取验证码'
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
                        // 点击确认只需要校验验证码成功则绑定成功，失败则提示验证码校验失败
                        // 提交邮箱账号
                        // 检测验证码是否正确
                        console.log(values)
                        const params = {
                            data: {
                                account: this.form.getFieldValue('email'),
                                verifyCode: this.form.getFieldValue('captcha')
                            }
                        }
                        this.$axios.post('/v2/user/bind', {params})
                            .then(res => {
                                if (res.data.code.toString() === '0000') {
                                    this.$message.success(res.data.msg)
                                    this.nextStep()
                                } else {
                                    this.$message.error(this.translation(res.code.toString()))
                                }
                            }).catch(err => {
                                this.$message.error(err)
                            })
                    }
                })
            },
            /**
             * 转译
             * @param code  接口返回的状态码
             * **/
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
                this.$router.push({name: 'pc-UserCenter'})
            },
            // 开启右侧抽屉导航
            openDrawer () {
                this.drawer = true
            },
            // 关闭右侧抽屉导航
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
