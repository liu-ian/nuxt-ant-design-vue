<template>
    <a-layout id="components-layout-mobile-top" class="layout"
              :class="(drawer ? 'drawer-containel': '')">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer" @closeDrawer="closeDrawer"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-register">
                    <div id="components-form-BindMailbox">
                        <p class="components-form-BindMailbox"> {{$t('ChangeMailBoxStepTwo.item-1')}} </p>
                        <a-form
                                :form="form"
                                :layout="formLayout"
                                class=""
                                @submit="handleSubmit">
                            <a-form-item>
                                <span slot="label"> {{$t('ChangeMailBoxStepTwo.item-2')}} </span>
                                <a-row class="BindMailbox-check">
                                    <a-input
                                            :placeholder="$t('ChangeMailBoxStepTwo.item-2')"
                                            v-decorator="['captcha',{rules: [{ validator:checkForm }]}]"/>
                                    <a-button
                                            @click="captchaGet"
                                            class="captcha-bt"> {{getMobileCode()}} </a-button>
                                </a-row>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        @click="handleSubmit"
                                        type="primary"
                                        html-type="submit"
                                        class="BindMailbox-button">
                                    {{$t('ChangeMailBoxStepTwo.item-3')}}
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
    import tool from '~/assets/utils/tool'
    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                key: '1',
                type: 2,
                drawer: false,
                visible: true,
                disabled: true,
                formLayout: 'vertical',
                // 定时器
                wait_timer: false,
                // 接受参数
                count: this.$route.params.count,
                centerKey: 0
            }
        },
        /**
         * 初始化form
         * **/
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        mounted () {
            this.captchaGet(this.count)
        },
        methods: {
            /**
             * @param rule  检测对象
             * @param value 检测的值
             * @param callback 回调
             */
            checkForm (rule, value, callback) {
                switch (rule.fullField) {
                case 'captcha' :
                    if (value && value.replace(/(^\s*)|(\s*$)/g, '') !== '') {
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
             * 发送验证码
             * */
            captchaGet (account) {
                // 防止重复点击
                if (this.wait_timer > 0) {
                    return false
                }
                // 定时器
                this.wait_timer = 60
                let that = this
                let timerInterval = setInterval(function () {
                    if (that.wait_timer > 0) {
                        that.wait_timer--
                    } else {
                        clearInterval(timerInterval)
                    }
                }, 1000)
                //  发送请求
                axios.post('/api/v2/user/verifiycode/get', {
                    traceId: tool.UUID(),
                    data: {account: account, business: 'CHANGE_BIND'}
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
                    this.disabled = false
                    return '重新获取'
                }
                if (this.wait_timer === false) {
                    return '获取验证码'
                }
            },
            /**
             *  下一步事件
             * **/
            nextStep () {
                this.$router.push({name: 'mobile-user-UserCenter'})
            },
            /**
             * form 表单提交
             * @param e 提交事件
             */
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        // 提交动作
                        this.submitCheck()
                    }
                })
            },
            /**
             * 提交的验证动作
             * **/
            submitCheck () {
                const params = {
                    data: {
                        account: this.count,
                        verifyCode: this.form.getFieldValue('captcha')
                    }
                }
                axios.post('/api/v2/user/bind/change', {params})
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            this.$message.success(res.data.msg)
                            // 成功 => 跳转
                            this.nextStep()
                        } else {
                            this.$message.error(this.translation(res.code.toString()))
                        }
                    }).catch(err => {
                        this.$message.error(err.message)
                    })
            },
            /**
             * 开启右侧抽屉导航
             * **/
            openDrawer () {
                this.drawer = true
            },
            /**
             * 关闭右侧抽屉导航
             * **/
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

<style lang="less">
    .ant-form-vertical .ant-form-item {
        padding-bottom: 0;
    }

    .content-register {
        padding-top: 0.65rem;
        min-height: calc(100vh - 1.26rem);
    }

    .ant-modal-footer {
        padding: 0.2rem 0.24rem;
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
            font-size: 16px;
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
            margin-bottom: 0.16rem;
            font-size: 24px;
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
            font-size:16px;
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

        .captcha-bt {
            font-size: 16px;
            color: #2EA9DF;
            border: 0.01rem solid rgba(46, 169, 223, 1);;
        }
        input::-webkit-input-placeholder {
            color: #D9D9D9;
        }
    }

</style>
