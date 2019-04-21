<template>
    <a-layout id="components-layout-pc-top" class="layout">
        <fs-head :SelectedKey="key" :SelectedType="type"/>
        <section class="container">
            <a-layout-content>
                <div class="content content-register">
                    <div id="components-form-normal-register">
                        <p class="components-form-login-title">{{$t('register.item-1')}}</p>
                        <a-tabs defaultActiveKey="1" @change="changeTabs">
                            <a-tab-pane :tab="$t('register.item-2')" key="1" class="ant-tabs-nav-register">
                                <a-form
                                        :form="form"
                                        :layout="formLayout"
                                        class="login-form"
                                        @submit="handleSubmit">
                                    <a-form-item has-feedback
                                                 colon>
                                        <span slot="label">
                                        {{$t('register.item-3')}}
                                             <span class="ant-form-text">
                                            {{$t('register.item-4')}}
                                          </span>
                                        </span>
                                        <a-input
                                                :placeholder="$t('register.item-5')"
                                                v-decorator="[
                                                  'phone',
                                                  {
                                                  rules: [{ validator:checkForm }],
                                                  validateTrigger: 'blur'
                                                  }]"
                                                style="width: 100%">
                                            <a-select
                                                    slot="addonBefore"
                                                    v-decorator="[
                                                    'areaCode',
                                                    { initialValue: '+86 美国1' }]">
                                                <a-select-option v-for="(val, index) in mobileZones"
                                                                 :key="index"
                                                                 :value="val.intelCode"
                                                                 :disabled="val.isRegiste === 'false'"
                                                                 :select="select">
                                                    +{{val.intelCode}}&nbsp{{val.localName}}
                                                </a-select-option>
                                            </a-select>
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            has-feedback>
                                          <span slot="label">
                                             {{$t('register.item-6')}}&nbsp;
                                              <a-tooltip placement="right"
                                                         :title="$t('register.item-7')">
                                                <a-icon type="info-circle" style="color: #FFC32B"/>
                                              </a-tooltip>
                                            </span>
                                        <a-input v-decorator="['password',
                                                 {
                                                  validateTrigger: 'blur',
                                                  rules: [{ validator: checkForm}] }]"
                                                 type="password"
                                                 :placeholder="$t('register.item-8')">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            :label="$t('register.item-9')"
                                            has-feedback>
                                        <a-input v-decorator="[
                                                  'confirmPassword',
                                                  {
                                                  validateTrigger: 'blur',
                                                  rules: [{ required: true, message: passwrodMessage },{ validator:checkForm }]}]"
                                                 type="password"
                                                 :placeholder="$t('register.item-9')">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            :label="$t('register.item-10')"
                                            has-feedback>
                                        <a-row :gutter="24">
                                            <a-col :span="18">
                                                <a-input :placeholder="$t('register.item-10')"
                                                         v-decorator="[
                                                          'captcha',
                                                          {
                                                          validateTrigger: 'blur',
                                                          rules: [{ validator:checkForm }]}
                                                        ]"/>
                                            </a-col>
                                            <a-col :span="6">
                                                <a-button @click="getCaptcha('phone')" class="captcha-bt">
                                                    {{$t('register.item-11')}}
                                                </a-button>
                                            </a-col>
                                        </a-row>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-checkbox
                                                @change="changeProtocol"
                                                v-decorator="['agreement', {valuePropName: 'checked', initialValue: true}]">
                                            {{$t('register.item-12')}} <a href="javascript:;">
                                            {{$t('register.item-13')}}
                                        </a>
                                        </a-checkbox>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-button
                                                :disabled="disabledProtocol"
                                                type="primary"
                                                html-type="submit"
                                                class="login-form-button">
                                            {{$t('register.item-14')}}
                                        </a-button>
                                        <div class="login-form-forgot">
                                            {{$t('register.item-15')}}
                                            <nuxt-link to="/pc/login">
                                                <a href="javascript:;">{{$t('register.item-16')}}</a>
                                            </nuxt-link>
                                        </div>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>
                            <a-tab-pane :tab="$t('register.item-17')" key="2" forceRender class="ant-tabs-nav-register">
                                <a-form
                                        :form="emailForm"
                                        :layout="formLayout"
                                        class="login-form"
                                        @submit="handleEamilSubmit">
                                    <a-form-item
                                            has-feedback>
                                        <span slot="label">
                                           {{$t('register.item-18')}}&nbsp;
                                            <a-tooltip placement="right"
                                                       :title="$t('register.item-19')">
                                              <a-icon type="info-circle" style="color: #FFC32B"/>
                                            </a-tooltip>
                                        </span>
                                        <a-input v-decorator="['email',
                                              {
                                              validateTrigger: 'blur',
                                              rules: [{ validator: checkForm}] }]"
                                                 type="email"
                                                 :placeholder="$t('register.item-21')">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            has-feedback>
                                        <span slot="label">
                                            {{$t('register.item-6')}}&nbsp;
                                            <a-tooltip placement="right"
                                                       :title="$t('register.item-7')">
                                              <a-icon type="info-circle" style="color: #FFC32B"/>
                                            </a-tooltip>
                                          </span>
                                        <a-input v-decorator="['password-email',
                                      {validateTrigger: 'blur',
                                       rules: [{ validator: checkForm}] }]"
                                                 type="password"
                                                 :placeholder="$t('register.item-8')">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            :label="$t('register.item-9')"
                                            has-feedback>
                                        <a-input v-decorator="['confirmPassword-email',
                                                 {validateTrigger: 'blur',
                                                  rules: [{required: true, message: passwrodMessage },{ validator:checkForm }]}]"
                                                 type="password"
                                                 :placeholder="$t('register.item-9')">
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item
                                            :label="$t('register.item-10')"
                                            has-feedback>
                                        <a-row :gutter="24">
                                            <a-col :span="18">
                                                <a-input :placeholder="$t('register.item-10')"
                                                         v-decorator="['captcha-email',
                                                          {validateTrigger: 'blur',
                                                          rules: [{ validator:checkForm }]}]"/>
                                            </a-col>
                                            <a-col :span="6">
                                                <a-button @click="getCaptcha('email')" class="captcha-bt">
                                                    {{$t('register.item-11')}}
                                                </a-button>
                                            </a-col>
                                        </a-row>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-checkbox
                                                @change="changeProtocolEmail"
                                                v-decorator="['agreement-email', {valuePropName: 'checked', initialValue: true}]">
                                            {{$t('register.item-12')}} <a href="javascript:;">
                                            {{$t('register.item-13')}}
                                        </a>
                                        </a-checkbox>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-button
                                                :disabled="disabledProtocolEmail"
                                                type="primary"
                                                html-type="submit"
                                                class="login-form-button">
                                            {{$t('register.item-14')}}
                                        </a-button>
                                        <div class="login-form-forgot">
                                            {{$t('register.item-15')}}
                                            <nuxt-link to="/pc/login">
                                                <a href="javascript:;">{{$t('register.item-16')}}</a>
                                            </nuxt-link>
                                        </div>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                    <a-modal
                            class="modal-register"
                            v-model="visible"
                            :title="$t('register.item-22')"
                            :centered="true"
                            :closable="false"
                            :keyboard="false"
                            :maskClosable="false"
                            :width="640"
                            :height="480">
                        <template slot="footer">
                            <a-checkbox @change="change" style="float: left;"
                                        v-decorator="['agreement-modal', {valuePropName: 'checked'}]">
                                {{$t('register.item-12')}}
                            </a-checkbox>
                            <a-button type="primary" @click="handleClose" :disabled="disabled">
                                {{$t('register.item-23')}}
                            </a-button>
                        </template>
                        <p>{{exemptionAgreement}}</p>
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
    import validate from '~/assets/utils/validate'
    import tool from '~/assets/utils/tool'

    export default {
        /**
         *  获取免责条款
         */
        async asyncData ({app}) {
            let data = {traceId: tool.UUID(), data: {app: 'user ', key: 'user.register.setting_member_exceptions'}}
            return app.$axios.post('/v2/cms/set/query/app', data)
                .then(res => {
                    if (res.data.code.toString() === '0000') {
                        return {exemptionAgreement: res.data.data.value}
                    }
                })
        },
        data () {
            return {
                key: '0',
                type: 2,
                visible: true,
                disabled: true,
                disabledProtocol: false,
                disabledProtocolEmail: false,
                formLayout: 'vertical',
                exemptionAgreement: '',
                passwrodMessage: '',
                mobileZones: []
            }
        },
        // 初始化form
        beforeCreate () {
            this.form = this.$form.createForm(this)
            this.emailForm = this.$form.createForm(this)
        },
        // 初始化数据
        mounted () {
            this.getmobileZones()
            this.passwrodMessage = this.$t('register.item-29')
        },
        methods: {
            /**
             * 登录操作
             */
            login (data) {
                this.$axios.post('/v2/user/user_login', data)
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                        // 持久化储存用户登录状态
                            let sessionStorage = window.sessionStorage
                            if (sessionStorage.getItem('userId') === null) {
                                sessionStorage.setItem('userId', res.data.data.userId)
                            }
                            this.$store.dispatch('updateUserId', res.data.data.userId)
                            this.$message.success(res.data.msg)
                            this.$router.push({path: '/pc'})
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                    .catch(err => {
                        this.$message.error(err)
                    })
            },
            /**
             * form 手机注册
             * @param e 提交事件
             */
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let data = {
                            traceId: tool.UUID(),
                            data: {
                                account: values['phone'],
                                password: values['password'],
                                confirmPassword: values['confirmPassword'],
                                verifyCode: values['captcha'],
                                areaCode: values['areaCode']
                            }
                        }
                        this.$axios.post('/v2/user/register', data)
                            .then(res => {
                                if (res.data.code.toString() === '0000') {
                                    this.login({userName: data['account'], password: data['password']})
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            })
                            .catch(err => {
                                this.$message.error(err)
                            })
                    }
                })
            },
            /**
             * form 邮箱注册
             * @param e 提交事件
             */
            handleEamilSubmit (e) {
                e.preventDefault()
                this.emailForm.validateFields((err, values) => {
                    if (!err) {
                        let data = {
                            traceId: tool.UUID(),
                            data: {
                                account: values['email'],
                                password: values['password-email'],
                                confirmPassword: values['confirmPassword-email'],
                                verifyCode: values['captcha-email'],
                                areaCode: ''
                            }
                        }
                        this.$axios.post('/v2/user/register', data)
                            .then(res => {
                                if (res.data.code.toString() === '0000') {
                                    this.$message.success(res.data.msg)
                                    this.$router.push({path: '/pc'})
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            })
                            .catch(err => {
                                this.$message.error(err)
                            })
                    }
                })
            },
            /**
             * @param rule 检测对象
             * @param value 检测的值
             * @param callback 回调
             */
            checkForm (rule, value, callback) {
                switch (rule.fullField) {
                case 'phone' :
                    if (!validate.required(value)) {
                        callback(this.$t('register.item-24'))
                    } else if (!validate.plus(value)) {
                        callback(this.$t('login.item-12'))
                    } else {
                        callback()
                    }
                    break
                case 'password' :
                    validate.required(value) ? callback() : callback(this.$t('login.item-10'))
                    if (this.form.getFieldValue('confirmPassword')) {
                        this.form.validateFields(['confirmPassword'], { force: true })
                    }
                    break
                case 'confirmPassword' :
                    validate.equalTo(value, this.form.getFieldValue('password')) ? callback() : callback(this.$t('register.item-26'))
                    break
                case 'captcha' :
                    validate.required(value) ? callback() : callback(this.$t('register.item-28'))
                    break
                case 'email' :
                    validate.email(value) ? callback() : callback(this.$t('register.item-20'))
                    break
                case 'password-email' :
                    validate.required(value) ? callback() : callback(this.$t('login.item-10'))
                    if (this.emailForm.getFieldValue('confirmPassword-email')) {
                        this.emailForm.validateFields(['confirmPassword-email'], { force: true })
                    }
                    break
                case 'confirmPassword-email' :
                    validate.equalTo(value, this.emailForm.getFieldValue('password-email')) ? callback() : callback(this.$t('register.item-26'))
                    break
                case 'captcha-email' :
                    validate.required(value) ? callback() : callback(this.$t('register.item-28'))
                    break
                default:
                    callback()
                }
            },
            // 获取验证码
            getCaptcha (type) {
                let account = type === 'phone' ? this.form.getFieldValue('phone') : this.emailForm.getFieldValue('email')
                if (!validate.required(account)) {
                    type === 'phone' ? this.$message.error(this.$t('register.item-24')) : this.$message.error(this.$t('register.item-27'))
                } else if (account.indexOf('@') === -1 && !validate.tel(account)) {
                    this.$message.error(this.$t('login.item-12'))
                } else if (account.indexOf('@') !== -1 && !validate.email(account)) {
                    this.$message.error(this.$t('login.item-11'))
                } else {
                    this.$axios.post('/v2/user/get_validate', {
                        traceId: tool.UUID(),
                        data: {account: account, business: 1}
                    })
                        .then(res => {
                            if (res.data.code.toString() === '0000') {
                                this.$message.success(res.data.msg)
                            }
                        })
                        .catch(err => {
                            this.$message.error(err)
                        })
                }
            },
            /**
             * 获取手机区号
             */
            getmobileZones () {
                let data = {traceId: tool.UUID()}
                this.$axios.post('/v2/user/query_intercode', data)
                    .then(res => {
                        if (res.data.code.toString() === '0000') {
                            for (let item of res.data.data) {
                                this.mobileZones.push({
                                    'localName': item['localName'],
                                    'intelCode': item['intelCode'],
                                    'isRegiste': item['isRegiste']
                                })
                            }
                        }
                    })
            },
            /**
             * 去除国家: +86
             */
            select (value) {
                this.form.setFieldValue('areaCode', value.splice(' ')[0])
            },
            // 关闭免责窗口
            handleClose () {
                this.visible = false
            },
            // 是否同意免责
            change (e) {
                this.disabled = !e.target.checked
            },
            // 是否同意协议：手机
            changeProtocol (e) {
                this.disabledProtocol = !e.target.checked
            },
            // 是否同意协议：邮件
            changeProtocolEmail (e) {
                this.disabledProtocolEmail = !e.target.checked
            },
            // 初始化form状态
            changeTabs (e) {
                this.disabledProtocol = false
                this.disabledProtocolEmail = false
                this.form.resetFields()
                this.emailForm.resetFields()
            }
        },
        components: {
            FsHead,
            fonter
        }
    }
</script>

<style lang="less">
    .modal-register {
        max-height: 480px;
        min-height: 480px;

        .ant-modal-body {
            min-height: 350px;
            max-height: 350px;
            overflow-y: auto;
        }

        .ant-modal-footer {
            padding: 20px 24px;
        }
    }
</style>

<style lang="less" scoped>


    .content-register {
        padding-top: 65px !important;
        min-height: calc(100vh - 126px) !important;
    }

    #components-form-normal-register {
        max-width: 552px;
        margin: 0 auto;

        /deep/ .ant-form-item-required:before {
            display: none;
        }

        /deep/ .ant-tabs-bar {
            border: none;
        }

        /deep/ .ant-tabs-tab {
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

        /deep/ .ant-input, .ant-btn {
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
