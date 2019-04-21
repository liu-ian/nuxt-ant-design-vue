<template>
    <div style="margin: 250px auto;width: 500px">
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
    export default {
        data () {
            return {
                // 初始数据
                options: [],
                // 选中的值
                selectedValue: '',
                // 动态数据
                activeData: {
                    'value': '眉山',
                    'label': '眉山',
                    'isLeaf': false
                }
            }
        },
        mounted () {
            this.initCountry()
        },
        methods: {
            /**
             * 数据改变事件
             * @param value 选中的值
             */
            onChange (value) {
                this.selectedValue = value
            },
            /**
             * 加载数据事件
             * @param selectedOptions 选中的值对象
             */
            loadData (selectedOptions) {
                console.log(this.options)
                // 如果选中的数据的 isLeaf 的参数为 false 则加载数据，否则不加载数据
                const targetOption = selectedOptions[selectedOptions.length - 1]
                targetOption.loading = true
                // 请求数据
                this.initcity()
                // 格式化options
                this.initOptions(targetOption)
                console.log(this.activeData)
                targetOption.loading = false

                // setTimeout(() => {
                //     targetOption.loading = false
                //     console.log(targetOption)
                //     使用参数获取数据
                //     数据初始化
                //     targetOption.children = [
                //         {
                //             label: `${targetOption.label} 1`,
                //             value: '1'
                //         },
                //         {
                //             label: `${targetOption.label}  2`,
                //             value: '2'
                //         }
                //     ]
                //     this.options = [...this.options]
                // }, 1000)
            },
            /**
             * 初始化国家信息
             */
            initCountry () {
                this.$axios.$post('https://www.easy-mock.com/mock/5cac6a829168e91103388a42/fangsea/getCoutry').then((data) => {
                    this.options = data.res
                })
            },
            initcity () {
                this.$axios.$post('https://www.easy-mock.com/mock/5cac6a829168e91103388a42/fangsea/getPrince').then((data) => {
                    this.activeData = data.res
                })
            },
            /**
             * 初始化options
             * */
            initOptions (targetOption) {
                // 初始化数据 ( 数据结构为一致的所可以直接赋值 )
                targetOption.children = this.activeData
                console.log('OK')
                // 映射数据
                this.options = [...this.options]
            }
        }
    }
</script>
