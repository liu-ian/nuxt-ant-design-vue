<template>
    <a-layout id="components-layout-pc-top" class="layout">
        <fs-head :SelectedKey="key" :SelectedType="type"/>
        <section class="container">
            <a-layout-content style="padding: 0 50px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item class="ant-breadcrumb-link-befor">首页</a-breadcrumb-item>
                    <a-breadcrumb-item class="ant-breadcrumb-link-befor">测试</a-breadcrumb-item>
                    <a-breadcrumb-item>Demo</a-breadcrumb-item>
                </a-breadcrumb>
                <div class="content">
                    <a-tabs defaultActiveKey="1" @change="tabsCallback">
                        <a-tab-pane tab="Steps 步骤条" key="1">
                            <h2>步骤条</h2>
                            <a-steps direction="vertical" :current="1">
                                <a-step title="Finished" description="This is a description."/>
                                <a-step title="In Progress" description="This is a description."/>
                                <a-step title="Waiting" description="This is a description."/>
                            </a-steps>
                            <a-steps progressDot :current="1">
                                <a-step title="Finished" description="This is a description."/>
                                <a-step title="In Progress" description="This is a description."/>
                                <a-step title="Waiting" description="This is a description."/>
                            </a-steps>
                            <br/>
                            <h2>分页器</h2>
                            <a-pagination :defaultCurrent="5" :total="50"/>
                            <a-pagination :defaultCurrent="5" :total="500" style="margin: 10px 0"/>
                            <br/>
                            <h2>滑动输入条</h2>
                            <a-slider :defaultValue="30"/>
                        </a-tab-pane>
                        <a-tab-pane tab="From 表单" key="2">
                            <h2>From 表单</h2>
                            <a-form :form="form"
                                    @submit.prevent="handleSubmit">
                                <a-form-item v-bind="formItemLayout"
                                             label="E-mail">
                                    <a-input v-decorator="[
                                              'email',
                                              {
                                                rules: [{
                                                  type: 'email', message: 'The input is not valid E-mail!',
                                                }, {
                                                  required: false, message: 'Please input your E-mail!',
                                                }]
                                              }
                                            ]"></a-input>
                                </a-form-item>
                                <a-form-item v-bind="formItemLayout"
                                             label="Password">
                                    <a-input v-decorator="[
                                              'password',
                                              {
                                                rules: [{
                                                  required: false, message: 'Please input your password!',
                                                }, {
                                                  validator: validateToNextPassword,
                                                }],
                                              }
                                            ]"
                                             type="password"></a-input>
                                </a-form-item>
                                <a-form-item
                                        v-bind="formItemLayout"
                                        label="Select"
                                        has-feedback>
                                    <a-select
                                            v-decorator="[
                                              'select',
                                              {rules: [{ required: false, message: 'Please select your country!' }]}
                                            ]"
                                            placeholder="Please select a country">
                                        <a-select-option value="china">
                                            China
                                        </a-select-option>
                                        <a-select-option value="usa">
                                            U.S.A
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item v-bind="formItemLayout"
                                             label="Confirm Password">
                                    <a-input v-decorator="[
                                              'confirm',
                                              {
                                                rules: [{
                                                  required: false, message: 'Please confirm your password!',
                                                }, {
                                                  validator: compareToFirstPassword,
                                                }],
                                              }
                                            ]"
                                             type="password"
                                             @blur="handleConfirmBlur"></a-input>
                                </a-form-item>
                                <a-form-item
                                        v-bind="formItemLayout"
                                        label="DatePicker"
                                >
                                    <a-date-picker v-decorator="['date-picker', config]"/>
                                </a-form-item>
                                <a-form-item v-bind="formItemLayout">
                                      <span slot="label">
                                        Nickname&nbsp;
                                        <a-tooltip title="What do you want others to call you?">
                                          <a-icon type="question-circle-o"/>
                                        </a-tooltip>
                                      </span>
                                    <a-input v-decorator="['nickname',
                                              {
                                                rules: [{ required: false, message: 'Please input your nickname!', whitespace: true }]
                                              }]"></a-input>
                                </a-form-item>
                                <a-form-item v-bind="formItemLayout"
                                             label="Phone Number">
                                    <a-input v-decorator="[
                                              'phone',
                                              {
                                                rules: [{ required: false, message: 'Please input your phone number!' }],
                                              }]"
                                             style="width: 100%">
                                        <a-select slot="addonBefore"
                                                  v-decorator="['prefix',
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
                                <a-form-item v-bind="formItemLayout"
                                             label="Phone Number">
                                    <a-textarea placeholder="Basic usage" :rows="4"/>
                                </a-form-item>
                                <a-form-item v-bind="tailFormItemLayout">
                                    <a-checkbox v-decorator="['agreement', {valuePropName: 'checked'}]">
                                        我已阅读并同意 <a href="" style="color: #2EA9DF">
                                        《用户协议》
                                    </a>
                                    </a-checkbox>
                                </a-form-item>
                                <a-form-item v-bind="tailFormItemLayout">
                                    <a-button type="primary"
                                              html-type="submit">
                                        Register
                                    </a-button>
                                </a-form-item>
                            </a-form>
                        </a-tab-pane>
                        <a-tab-pane tab="Button 按钮" key="3">
                            <a-row>
                                <a-col :span="24">
                                    <a-button type="primary">
                                        Vuex - JWT
                                    </a-button>
                                    <a-button @click="error">Default</a-button>
                                    <a-button @click="warning" type="primary" icon="cloud-upload">图标按钮</a-button>
                                    <a-button icon="cloud-upload">图标按钮</a-button>
                                    <a-button type="primary" :loading="iconLoading" @click="enterIconLoading">
                                        加载按钮
                                    </a-button>
                                    <a-button type="primary" disabled>禁用状态</a-button>
                                </a-col>
                            </a-row>
                            <a-row style="margin: 20px 0">
                                <a-col>
                                    <a-upload
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            listType="picture-card"
                                            :fileList="fileList"
                                            @preview="handlePreview"
                                            @change="handleChange">
                                        <div v-if="fileList.length < 3">
                                            <a-icon type="plus"/>
                                            <div class="ant-upload-text">上传照片</div>
                                        </div>
                                    </a-upload>
                                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                        <img alt="example" style="width: 100%" :src="previewImage"/>
                                    </a-modal>
                                </a-col>
                            </a-row>
                            <a-row style="margin: 10px 0">
                                <a-col>
                                    <a-alert message="Success Tips" type="success" showIcon closable
                                             style="margin: 5px 0"/>
                                    <a-alert message="Informational Notes" type="info" showIcon closable
                                             style="margin: 5px 0"/>
                                    <a-alert message="Warning" type="warning" showIcon closable style="margin: 5px 0"/>
                                    <a-alert message="Error" type="error" showIcon closable style="margin: 5px 0"/>
                                    <a-alert message="Info Text" type="info" showIcon closeText="查看详情"
                                             style="margin: 5px 0"/>
                                    <a-alert message="Warning" type="warning" showIcon closeText="查看详情"
                                             style="margin: 5px 0"/>
                                </a-col>
                            </a-row>
                            <a-row style="margin: 10px 0">
                                <a-col>
                                    <a-popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No"
                                                  placement="topLeft">
                                        <a href="#">左气泡</a>
                                    </a-popconfirm>
                                    <a-popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
                                        <a href="#">在中间</a>
                                    </a-popconfirm>
                                    <a-popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No"
                                                  placement="right">
                                        <a href="#">右气泡</a>
                                    </a-popconfirm>
                                    <div style="margin: 15px 0">
                                        <a-tooltip placement="topLeft">
                                            <template slot="title">
                                                <span>prompt text</span>
                                            </template>
                                            <a-button>TL</a-button>
                                        </a-tooltip>
                                        <a-tooltip placement="top">
                                            <template slot="title">
                                                <span>prompt text</span>
                                            </template>
                                            <a-button>Top</a-button>
                                        </a-tooltip>
                                        <a-tooltip placement="topRight">
                                            <template slot="title">
                                                <span>prompt text</span>
                                            </template>
                                            <a-button>TR</a-button>
                                        </a-tooltip>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-tab-pane>
                        <a-tab-pane key="4" tab="Table 表格">
                            <a-table :columns="columns" :dataSource="data" :scroll="{ x: 1200, y: 500 }">
                                <template slot="action" slot-scope="text, record">
                                    <a-popconfirm
                                            v-if="data.length"
                                            title="Sure to delete?">
                                        <a href="javascript:;">Delete</a>
                                    </a-popconfirm>
                                </template>
                            </a-table>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </a-layout-content>
        </section>
        <fonter/>
    </a-layout>
</template>

<script>
    import FsHead from '~/components/pc/FangseaHeader'
    import fonter from '~/components/pc/Footer'

    const columns = Object.freeze([
        {title: 'Full Name', width: 150, dataIndex: 'name', key: 'name', fixed: 'left'},
        {title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left'},
        {title: 'Column 1', dataIndex: 'address', key: '1', width: 150},
        {title: 'Column 2', dataIndex: 'address', key: '2', width: 150},
        {title: 'Column 3', dataIndex: 'address', key: '3', width: 150},
        {title: 'Column 4', dataIndex: 'address', key: '4', width: 150},
        {title: 'Column 5', dataIndex: 'address', key: '5', width: 150},
        {title: 'Column 6', dataIndex: 'address', key: '6', width: 150},
        {title: 'Column 7', dataIndex: 'address', key: '7', width: 150},
        {title: 'Column 8', dataIndex: 'address', key: '8'},
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: {customRender: 'action'}
        }
    ])

    const data = []
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`
        })
    }

    export default {
        data () {
            return {
                key: '1',
                type: 0,
                nowLang: '中文',
                Jwt: '',
                mode: 'inline',
                theme: 'light',
                form: this.$form.createForm(this),
                confirmDirty: false,
                autoCompleteResult: [],
                iconLoading: false,
                data,
                columns,
                config: {
                    rules: [{type: 'object', required: false, message: 'Please select time!'}]
                },
                formItemLayout: {
                    labelCol: {
                        xs: {span: 8},
                        sm: {span: 4}
                    },
                    wrapperCol: {
                        xs: {span: 8},
                        sm: {span: 12}
                    }
                },
                tailFormItemLayout: {
                    wrapperCol: {
                        xs: {
                            span: 24,
                            offset: 0
                        },
                        sm: {
                            span: 16,
                            offset: 8
                        }
                    }
                },
                previewVisible: false,
                previewImage: '',
                fileList: [{
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                }]
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        methods: {
            updateNowLang () {
                this.$i18n.locale = this.$i18n.locale === 'en' ? 'cn' : 'en'
            },
            changeMode (checked) {
                this.mode = checked ? 'vertical' : 'inline'
            },
            changeTheme (checked) {
                this.theme = checked ? 'dark' : 'light'
            },
            tabsCallback (key) {
                console.log(key)
            },
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values)
                    }
                })
            },
            handleConfirmBlur (e) {
                const value = e.target.value
                this.confirmDirty = this.confirmDirty || !!value
            },
            compareToFirstPassword (rule, value, callback) {
                const form = this.form
                if (value && value !== form.getFieldValue('password')) {
                    // callback('Two passwords that you enter is inconsistent!')
                } else {
                    callback()
                }
            },
            validateToNextPassword (rule, value, callback) {
                const form = this.form
                if (value && this.confirmDirty) {
                    form.validateFields(['confirm'], {force: true})
                }
                callback()
            },
            enterIconLoading () {
                this.iconLoading = {delay: 200}
                setTimeout(() => {
                    this.iconLoading = false
                }, 3000)
            },
            handleCancel () {
                this.previewVisible = false
            },
            handlePreview (file) {
                this.previewImage = file.url || file.thumbUrl
                this.previewVisible = true
            },
            handleChange ({fileList}) {
                this.fileList = fileList
            },
            error () {
                this.$message.error('This is a message of error')
            },
            warning () {
                this.$message.warning('This is message of warning')
            }
        },
        components: {
            FsHead,
            fonter
        },
        head () {
            return {
                title: 'Fangsea.io 2.0'
            }
        }
    }
</script>

<style lang="less">
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
</style>
