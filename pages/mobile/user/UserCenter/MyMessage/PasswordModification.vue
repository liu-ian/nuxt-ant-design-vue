<template>
    <a-layout id="components-layout-mobile-top" class="layout"
              :class="(drawer ? 'drawer-containel': '')">
        <fs-head
                :centerKey="centerKey"
                :SelectedKey="key"
                :SelectedType="type"
                @openDrawer="openDrawer"
                @closeDrawer="closeDrawer"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-register">
                    <div id="components-form-BindMailbox">
                        <p class="components-form-BindMailbox"> {{$t('PasswordModification.item-1')}} </p>
                        <a-form
                                :form="form"
                                :layout="formLayout"
                                class=""
                                @submit="handleSubmit">
                            <a-form-item has-feedback
                                         colon>
                                <span slot="label"> {{$t('PasswordModification.item-2')}} </span>
                                <a-input
                                        :placeholder="$t('PasswordModification.item-3')"
                                        type="password"
                                        v-decorator="['passwordOld', {rules: [{ validator:checkForm }],}]">
                                </a-input>
                            </a-form-item>
                            <a-form-item has-feedback
                                         colon>
                                <span slot="label"> {{$t('PasswordModification.item-4')}} </span>
                                <a-input
                                        :placeholder="$t('PasswordModification.item-3')"
                                        type="password"
                                        v-decorator="['passwordNew', {rules: [{ validator:checkForm }],}]">
                                </a-input>
                            </a-form-item>
                            <a-form-item has-feedback
                                         colon>
                                <span slot="label"> {{$t('PasswordModification.item-5')}} </span>
                                <a-input
                                        :placeholder="$t('PasswordModification.item-3')"
                                        type="password"
                                        v-decorator="['passwordConfirm', {rules: [{ validator:checkForm }],}]">
                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                        @click="handleSubmit"
                                        type="primary"
                                        html-type="submit"
                                        class="BindMailbox-button">
                                    {{$t('PasswordModification.item-6')}}
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
                centerKey: 0
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
                case 'passwordOld' :
                    if (value && value.replace(/(^\s*)|(\s*$)/g, '') !== '') {
                        callback()
                    }
                    // eslint-disable-next-line
                        callback('请输入你的原密码！')
                    break
                case 'passwordNew' :
                    if (value && value.replace(/(^\s*)| (\s*$)/g, '') !== '') {
                        callback()
                    }
                    // eslint-disable-next-line
                        callback('请输入你的新密码！')
                    break
                case 'passwordCofirm' :
                    if (value && value.replace(/(^\s*)|(\s*$)/g, '') !== '') {
                        callback()
                    }
                    // eslint-disable-next-line
                        callback('请确认你的密码！')
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
                        this.$message.success('检验成功！')
                        this.nextStep()
                        // this.confirmPassword(
                        //     this.form.getFieldValue('passwordOld'),
                        //     this.form.getFieldValue('passwordNew'),
                        //     this.form.getFieldValue('passwordCofirm')
                        // )
                    }
                })
            },
            /**
             * 检查密码
             * **/
            confirmPassword (originalPassword, newPassword, confirmPassword) {
                const params = {
                    userID: 1,
                    data: {
                        originalPassword: originalPassword,
                        newPassword: newPassword,
                        confirmPassword: confirmPassword
                    }
                }
                axios.post('/api/v2/user/modifiy_password', {params})
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            // 成功
                            this.$message.success(res.data.msg)
                            this.nextStep()
                        } else {
                            this.$message.error(this.translation(res.code.toString()))
                        }
                    }).catch(err => {
                        this.$message.error(err.message)
                    })
            },
            /**
             *  下一步事件
             * **/
            nextStep () {
                this.$router.push({name: 'mobile-user-UserCenter-MyMessage'})
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

<style lang="less" scoped>
    .ant-form-vertical .ant-form-item {
        padding-bottom: 0;
    }

    .content-register {
        padding-top: 65px;
        min-height: calc(100vh - 126px);
    }

    .ant-modal-footer {
        padding: 20px 24px;
    }

    .ant-modal-body {
        max-height: 330px;
        overflow-y: auto;
    }

    #components-form-BindMailbox {
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

        .BindMailbox-check {
            display: flex;
            justify-content: space-between;
            input {
                margin-right: 24px;
            }
        }
        .BindMailbox-button {
            width: 100%;
            font-size: 16px;
            color:rgba(255,255,255,1)!important;
        }

        .components-form-BindMailbox {
            margin-bottom: 32px;
            font-size: 24px;
            color: rgba(0, 0, 0, 0.85);
        }
        .ant-input-group-addon {
            font-size: 16px;
            padding: 8px 12px;
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
            padding: 8px 12px;
            height: 40px;
            color:#000000;
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

        .captcha-bt {
            font-size: 16px;
            color: #2EA9DF;
            border: 1px solid rgba(46, 169, 223, 1);;
        }

        .ant-form-vertical .ant-form-explain {
            margin-top: -0.01rem;
            margin-bottom: -0.02rem;
        }

        input::-webkit-input-placeholder {
            color: #D9D9D9;
        }
    }

</style>
