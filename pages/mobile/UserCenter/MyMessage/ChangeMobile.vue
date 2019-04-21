<template>
    <a-layout id="components-layout-mobile-top" class="layout"
              :class="(drawer ? 'drawer-containel': '')">
        <fs-head :SelectedKey="key" :SelectedType="type" @openDrawer="openDrawer" @closeDrawer="closeDrawer"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-register">
                    <div id="components-form-BindMailbox">
                        <p class="components-form-BindMailbox"> {{$t('ChangeMobile.item-1')}} </p>
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
                                        v-decorator="['phoneOld', {rules: [{ validator:checkForm }],}]">
                                </a-input>
                            </a-form-item>
                            <a-form-item has-feedback
                                         colon>
                                <span slot="label"> {{$t('ChangeMobile.item-4')}} </span>
                                <a-input
                                        :placeholder="$t('ChangeMobile.item-3')"
                                        type="tel"
                                        v-decorator="['phoneNew', {rules: [{ validator:checkForm }],}]">
                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        @click="handleSubmit"
                                        type="primary"
                                        html-type="submit"
                                        class="BindMailbox-button">
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
    import FsHead from '~/components/mobile/FangseaHeader'
    import fonter from '~/components/mobile/Footer'
    import detector from '~/assets/utils/validate'

    export default {
        data () {
            return {
                key: '1',
                type: 2,
                drawer: false,
                visible: true,
                disabled: true,
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
                    name: 'mobile-UserCenter-MyMessage-ChangeMobileStepTwo',
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
            font-size: 0.16rem;
            color:rgba(255,255,255,1)!important;
        }

        .components-form-BindMailbox {
            margin-bottom: 0.32rem;
            font-size: 24px;
            color: rgba(0, 0, 0, 0.85);
        }
        .ant-input-group-addon {
            font-size: 16px;
            padding: 0.8rem 0.12rem;
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
            height: 0.40rem;
            color:#000000;
        }
        .ant-btn {
            padding: 0.08rem 0.16rem;
            height: 0.40rem;
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

        .ant-form-vertical .ant-form-explain {
            margin-top: -0.01rem;
            margin-bottom: -0.01rem;
        }

        input::-webkit-input-placeholder {
            color: #D9D9D9;
        }
    }

</style>
