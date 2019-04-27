module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: 'babel-eslint',
    //此项是用来指定javaScript语言类型和风格
    parserOptions: {
        "ecmaVersion": 6, //指定ECMAScript支持的版本，6为ES6
        "sourceType": "module", //指定来源的类型，有两种”script”或”module”
        "ecmaFeatures": {
            "jsx": false//检测JSX
        },
    },
    //此项指定环境的全局变量
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    // 此项是用来配置标准的js风格
    extends: 'standard',
    // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
    plugins: [
        'html'
    ],
    /**
     * 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
     * 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
     * "off" -> 0 关闭规则
     * "warn" -> 1 开启警告规则
     * "error" -> 2 开启错误规则
     */
    rules: {
        // 缩进
        "indent": [
            "error",
            4
        ],
        // 使用es6语法定义变量
        "no-var": 2,
        // 定义过的变量必须使用
        'no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'none',
                caughtErrors: 'none',
                ignoreRestSiblings: true
            }
        ],
    },
    globals: {}
}
