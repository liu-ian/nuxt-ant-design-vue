<template>
    <a-layout id="components-layout-pc-top" class="layout">
        <fs-head :SelectedKey="key"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-register">
                    <div id="components-form-normal-register">
                        <p class="components-form-login-title">欢迎注册</p>
                        <a-tabs defaultActiveKey="1" @change="changeTabs">
                            <a-tab-pane tab="手机注册" key="1" class="ant-tabs-nav-register">
                                <a-form
                                        :form="form"
                                        :layout="formLayout"
                                        class="login-form"
                                        @submit="handleSubmit">
                                    <a-form-item has-feedback
                                                 colon>
                                        <span slot="label">
                                            手机号码
                                             <span class="ant-form-text">
                                            中国大陆和美国手机号暂不支持注册
                                          </span>
                                        </span>
                                        <a-input
                                                placeholder="请输入手机号码"
                                                v-decorator="[
                                                  'phone',
                                                  {rules: [
                                                    { validator:checkForm }],
                                                  }]"
                                                style="width: 100%">
                                            <a-select
                                                    slot="addonBefore"
                                                    v-decorator="[
                                                    'prefix',
                                                    { initialValue: '86' }]"
                                                    style="width: 70px">
                                                <a-select-option value="86">
                                                    +86
                                                </a-select-option>
                                                <a-select-option value="87">
                                                    +87
                                                </a-select-option>
                                            </a-select>
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            has-feedback>
                                        <span slot="label">
                                           密码&nbsp;
                                            <a-tooltip placement="right"
                                                       title="请妥善保管您的FANGSEA.IO账号及登录密码。请勿和其他网站使用相同的登录密码。">
                                              <a-icon type="info-circle" style="color: #FFC32B"/>
                                            </a-tooltip>
                                          </span>
                                        <a-input v-decorator="['password',
                                      { rules: [{ validator: checkForm}] }]"
                                                 type="password"
                                                 placeholder="输入密码">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            label="确认密码"
                                            has-feedback>
                                        <a-input v-decorator="['re-password',
                                      { rules: [{ validator: checkForm}] }]"
                                                 type="password"
                                                 placeholder="确认密码">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            label="验证码"
                                            has-feedback>
                                        <a-row :gutter="24">
                                            <a-col :span="18">
                                                <a-input placeholder="验证码"
                                                         v-decorator="[
                                                          'captcha',
                                                          {rules: [{ validator:checkForm }]}
                                                        ]"
                                                />
                                            </a-col>
                                            <a-col :span="6">
                                                <a-button class="captcha-bt">获取验证码</a-button>
                                            </a-col>
                                        </a-row>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-checkbox
                                                v-decorator="['agreement', {valuePropName: 'checked'}]"
                                        >
                                            我已阅读并同意 <a href="javascript:;">
                                            《用户协议》
                                        </a>
                                        </a-checkbox>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-button
                                                type="primary"
                                                html-type="submit"
                                                class="login-form-button">
                                            注册
                                        </a-button>
                                        <div class="login-form-forgot">
                                            已经注册？
                                            <nuxt-link to="/pc/login">
                                                <a href="javascript:;">请登录</a>
                                            </nuxt-link>
                                        </div>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>
                            <a-tab-pane tab="邮箱注册" key="2" forceRender class="ant-tabs-nav-register">
                                <a-form
                                        :form="form"
                                        :layout="formLayout"
                                        class="login-form"
                                        @submit="handleSubmit">
                                    <a-form-item
                                            has-feedback>
                                        <span slot="label">
                                           电子邮箱&nbsp;
                                            <a-tooltip placement="right"
                                                       title="验证邮件可能会被误判为垃圾邮件，请注意查收。">
                                              <a-icon type="info-circle" style="color: #FFC32B"/>
                                            </a-tooltip>
                                          </span>
                                        <a-input v-decorator="['email',
                                      { rules: [{
                                      type: 'email', message: '请输入正确的电子邮箱!',
                                    },{ validator: checkForm}] }]"
                                                 type="email"
                                                 placeholder="输入邮箱">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            has-feedback>
                                        <span slot="label">
                                           密码&nbsp;
                                            <a-tooltip placement="right"
                                                       title="请妥善保管您的FANGSEA.IO账号及登录密码。请勿和其他网站使用相同的登录密码。">
                                              <a-icon type="info-circle" style="color: #FFC32B"/>
                                            </a-tooltip>
                                          </span>
                                        <a-input v-decorator="['password-email',
                                      { rules: [{ validator: checkForm}] }]"
                                                 type="password"
                                                 placeholder="输入密码">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            label="确认密码"
                                            has-feedback>
                                        <a-input v-decorator="['re-password-email',
                                      { rules: [{ validator: checkForm}] }]"
                                                 type="password"
                                                 placeholder="确认密码">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            label="验证码"
                                            has-feedback>
                                        <a-row :gutter="24">
                                            <a-col :span="18">
                                                <a-input placeholder="验证码"
                                                         v-decorator="[
                                                          'captcha-email',
                                                          {rules: [{ validator:checkForm }]}
                                                        ]"
                                                />
                                            </a-col>
                                            <a-col :span="6">
                                                <a-button class="captcha-bt">获取验证码</a-button>
                                            </a-col>
                                        </a-row>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-checkbox
                                                v-decorator="['agreement-email', {valuePropName: 'checked'}]"
                                        >
                                            我已阅读并同意 <a href="javascript:;">
                                            《用户协议》
                                        </a>
                                        </a-checkbox>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-button
                                                type="primary"
                                                html-type="submit"
                                                class="login-form-button">
                                            注册
                                        </a-button>
                                        <div class="login-form-forgot">
                                            已经注册？
                                            <nuxt-link to="/pc/login">
                                                <a href="javascript:;">请登录</a>
                                            </nuxt-link>
                                        </div>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                    <a-modal
                            v-model="visible"
                            title="免责条款"
                            :centered="true"
                            :closable="false"
                            :keyboard="false"
                            :maskClosable="false"
                            :width="640"
                            :height="480"
                            style="max-height: 480px"
                    >
                        <template slot="footer">
                            <a-checkbox @change="change" style="float: left;"
                                        v-decorator="['agreement-modal', {valuePropName: 'checked'}]">
                                我已阅读并同意
                            </a-checkbox>
                            <a-button type="primary" @click="handleClose" :disabled="disabled">
                                接受
                            </a-button>
                        </template>
                        <p>{{context}}</p>
                    </a-modal>
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
                visible: true,
                disabled: true,
                formLayout: 'vertical',
                context: `这是免责内容这是免责内容 `
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
            checkForm(rule, value, callback) {
                switch (rule.fullField) {
                    case 'phone' :
                        if (value && value.replace(/(^\s*)|(\s*$)/g, "") !== '') {
                            callback()
                        }
                        callback('请填写你的手机号码！')
                        break;
                    case 'password' :
                        if (value && value.replace(/(^\s*)|(\s*$)/g, "") !== '') {
                            callback()
                        }
                        callback('请填写你的密码！')
                        break;
                    case 're-password' :
                        if (value && value.replace(/(^\s*)|(\s*$)/g, "") !== '') {
                            callback()
                        }
                        callback('请确认你的密码！')
                        break;
                    case 'email' :
                        if (value && value.replace(/(^\s*)|(\s*$)/g, "") !== '') {
                            callback()
                        }
                        callback('请填写你的电子邮箱！')
                        break;
                    case 'captcha' :
                        if (value && value.replace(/(^\s*)|(\s*$)/g, "") !== '') {
                            callback()
                        }
                        callback('请填写你的验证码！')
                        break;
                    default:
                        callback()
                }

            },
            handleClose() {
                this.visible = false
            },
            change(e) {
                this.disabled = e.target.checked ? false : true
            },
            changeTabs(e){
                this.form.resetFields()
            }
        },
        components: {
            FsHead,
            fonter
        }
    }
</script>

<style lang="less">
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

    #components-form-normal-register {
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
            color: rgba(0, 0, 0, 0.85);
        }

        .ant-input, .ant-btn {
            height: 40px;
        }

        .ant-form-text {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.45);
        }

        .captcha-bt {
            width: 120px;
            color: #2EA9DF;
            border: 1px solid rgba(46, 169, 223, 1);;
        }
    }
</style>
