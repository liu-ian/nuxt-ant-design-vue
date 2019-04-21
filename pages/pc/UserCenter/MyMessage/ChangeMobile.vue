<template>
    <a-layout id="components-layout-pc-top" class="layout">
        <fs-head :SelectedKey="key"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-bind-mailbox">
                    <div id="components-form-bind-mailbox">
                        <p class="components-form-bind-mailbox"> {{$t('ChangeMobile.item-1')}} </p>
                        <a-form
                                :form="form"
                                :layout="formLayout"
                                class=""
                                @submit="handleSubmit">
                            <a-form-item has-feedback
                                         colon>
                                <span slot="label"> {{$t('ChangeMobile.item-2')}} </span>
                                <a-input
                                        :placeholder="$t('ChangeMobile.item-3')"
                                        type="tel"
                                        v-decorator="['phoneOld', {rules: [{ validator:checkForm }],}]"
                                        style="width: 100%">
                                </a-input>
                            </a-form-item>
                            <a-form-item has-feedback
                                         colon>
                                <span slot="label"> {{$t('ChangeMobile.item-4')}} </span>
                                <a-input
                                        :placeholder="$t('ChangeMobile.item-3')"
                                        type="tel"
                                        v-decorator="['phoneNew', {rules: [{ validator:checkForm }],}]"
                                        style="width: 100%">
                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        @click="handleSubmit"
                                        type="primary"
                                        html-type="submit"
                                        class="bind-mailbox-button">
                                    {{$t('ChangeMobile.item-5')}}
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
    import FsHead from '~/components/pc/FangseaHeader'
    import fonter from '~/components/pc/Footer'
    import detector from '~/assets/utils/validate'

    export default {
        data () {
            return {
                key: '1',
                visible: true,
                disabled: false,
                formLayout: 'vertical'
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
                case 'phoneOld' :
                    if (detector.phone(value)) {
                        callback()
                    }
                    // eslint-disable-next-line
                        callback('请填写你的原手机号！')
                    break
                case 'phoneNew' :
                    if (detector.phone(value)) {
                        callback()
                    }
                    // eslint-disable-next-line
                        callback('请填写你的新手机号！')
                    break
                default:
                    callback()
                }
            },
            // 初始化form状态
            changeTabs (e) {
                this.form.resetFields()
            },
            /**
             * form 表单提交
             * @param e 提交事件
             */
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.verifyOriginalMobile()
                    }
                })
            },
            /**
             *  下一步事件
             * **/
            nextStep () {
                this.$router.push({
                    name: 'pc-UserCenter-MyMessage-ChangeMailboxStepTwo',
                    query: {account: this.form.getFieldValue('phoneNew')}})
            },
            /**
             * 验证原手机号
             * **/
            verifyOriginalMobile () {
                const params = {
                    data: {
                        // 后期替换
                        userId: '1',
                        account: this.form.getFieldValue('phoneOld')
                    }
                }
                this.$axios.post('/v2/user/check/me', {params})
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            // this.$message.success(res.data.msg)
                            // ( 成功 )则去验证
                            this.verifyNewMobile()
                        } else {
                            this.$message.error(this.translation(res.code.toString()))
                        }
                    }).catch(err => {
                        this.$message.error(err)
                    })
            },
            /**
             * 验证新的手机号
             * **/
            verifyNewMobile () {
                const params = {
                    data: {
                        userId: '1',
                        account: this.form.getFieldValue('phoneNew')
                    }
                }
                this.$axios.post('/v2/user/check/use', {params})
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            this.$message.success(res.data.msg)
                            // 跳转
                            this.nextStep()
                        } else {
                            this.$message.error(this.translation(res.code.toString()))
                        }
                    }).catch(err => {
                        this.$message.error(err)
                    })
            }
        },
        components: {
            FsHead,
            fonter
        }
    }
</script>

<style lang="less">
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
            margin-top: -1px;
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
    }
</style>
