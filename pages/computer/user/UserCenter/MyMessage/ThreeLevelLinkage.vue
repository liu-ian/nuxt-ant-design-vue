<template>
    <div
            id="fangSeeCascader"
            style="margin: 250px auto;width: 550px;">
        <a-cascader
                style="width: 100%"
                :options="options"
                @change="onChange"
                :loadData="loadData"
                placeholder="请选择"
                changeOnSelect/>
    </div>
</template>
<script>
    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                // 初始化数据
                options: [{
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    isLeaf: false
                }, {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    isLeaf: false
                }]
            }
        },
        mounted () {
            // this.inintData()
        },
        methods: {
            /**
             * 选择改变事件
             * **/
            onChange (value) {
                console.log(value)
            },
            /**
             *  加载数据
             * **/
            loadData (selectedOptions) {
                const targetOption = selectedOptions[selectedOptions.length - 1]
                targetOption.loading = true

                // load options lazily
                setTimeout(() => {
                    targetOption.loading = false
                    targetOption.children = [{
                        label: `${targetOption.label} Dynamic 1`,
                        value: 'dynamic1'
                    }, {
                        label: `${targetOption.label} Dynamic 2`,
                        value: 'dynamic2'
                    }]
                    this.options = [...this.options]
                }, 1000)
            },
            /**
             *  请求数据
             * **/
            inintData (params) {
                axios.post('/api/v2/cms/region/query', {params})
                    .then(res => {
                        this.options = res.data
                    }).catch(err => {
                        this.$message.error(err.message)
                    })
            }
        }
    }
</script>
<style lang="less" >
   #fangSeeCascader {
        .ant-cascader-picker {
            .ant-input {
                height: 40px;
                &:focus {
                color: #2EA9DF;
                    }
               }
           }
   }
   .ant-cascader-menu-item-expand {
       padding-right: 83px;
   }
   .ant-cascader-menu-item:hover {
       background-color: #E6F7FF;
   }

</style>
