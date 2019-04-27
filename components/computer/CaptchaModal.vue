<template>
    <a-modal
            class="captcha-modal"
            v-model="visible"
            :title="CaptchaTitle"
            :centered="true"
            :keyboard="false"
            :maskClosable="false"
            :width="320"
            :footer="null"
            style="max-height: 320px">
        <a-form
                :form="form"
                :layout="formLayout"
                class="login-form"
                @submit="handleSubmit">
            <a-form-item>
                    <span slot="label">
                            验证码已发送至：
                             <span class="ant-form-text">
                            sto****@fangsea.io
                          </span>
                        </span>
                <a-row :gutter="16">
                    <a-col :span="14">
                        <a-input placeholder="验证码"
                                 v-decorator="['captcha',{rules: [{ validator:checkForm }]}]"/>
                    </a-col>
                    <a-col :span="8">
                        <a-button class="captcha-bt">获取验证码</a-button>
                    </a-col>
                </a-row>
            </a-form-item>
            <a-form-item
                    v-if="password"
                    has-feedback>
                <a-input v-decorator="['password',
                                      { rules: [{ validator: checkForm}] }]"
                         type="password"
                         placeholder="交易密码">
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button
                        type="primary"
                        html-type="submit"
                        class="login-form-button">
                    确定
                </a-button>
                <div class="login-form-forgot">
                    <a-popover
                            class="captcha-popover"
                            placement="topRight"
                            trigger="click"
                            :visible="clicked"
                            @visibleChange="handleClickChange">
                        <div slot="content">
                            <p class="content-p">由于你还未绑定手机</p>
                            <p class="content-p">号码，此功能不可用。</p>
                            <p class="content-p"><a @click="hide">去绑定</a></p>
                        </div>
                        <a class="" href="javascript:;">使用手机获取验证码</a>
                    </a-popover>
                </div>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
    // <captcha-modal :password="password" :CaptchaTitle="CaptchaTitle"></captcha-modal> 使用方法

    export default {
        props: ['password', 'CaptchaTitle'],
        data () {
            return {
                // 表单排版方式
                formLayout: 'vertical',
                // 默认显示窗口
                visible: true,
                // 显示跳转绑定按钮
                clicked: false
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
                    }
                })
            },
            /**
             * form 检测
             * @param rule 检测对象
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
                case 'password' :
                    if (value && value.replace(/(^\s*)|(\s*$)/g, '') !== '') {
                        callback()
                    }
                    // eslint-disable-next-line
                        callback('请填写你的密码！')
                    break
                default:
                    callback()
                }
            },
            /**
             * 跳转绑定界面
             */
            hide () {
                this.clicked = false
                this.$router.push({path: '/computer/user/login'})
            },
            /**
             * 切换提示
             */
            handleClickChange (visible) {
                this.clicked = visible
            }
        }
    }
</script>

<style lang="less">
    .captcha-modal {
        .ant-modal-header {
            border-bottom: none;
        }

        .ant-modal-title {
            font-size: 18px;
        }

        .ant-modal-body {
            padding-bottom: 0;
            padding-top: 0;
        }

        .ant-popover-title {
            display: none !important;
        }
    }

    .captcha-popover {
        .ant-popover-title {
            display: none;
        }

        .ant-popover-inner {
            border-radius: 8px;
        }
    }
</style>

<style lang="less" scoped>
    .captcha-bt {
        color: #2EA9DF;
        border: 1px solid rgba(217, 217, 217, 1);
    }

    .ant-form-text {
        font-size: 14px;
        color: #FF542B;
    }

    .ant-input, .ant-btn {
        height: 40px;
    }

    .ant-form-vertical .ant-form-item {
        padding-bottom: 0;
    }

    a, a:hover, a:focus, a:visited {
        color: #2EA9DF;
        font-size: 14px;
    }

    .ant-form-item-label {
        color: rgba(0, 0, 0, 0.85);
    }

    .login-form-button {
        font-size: 16px;
        width: 100%;
    }

    .login-form-forgot {
        float: right;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .content-p {
        margin-bottom: 0;
    }

</style>
