<template>
    <div>
        <nuxt/>
    </div>
</template>

<script>
    import "babel-polyfill"

    export default {
        mounted() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
                setTimeout(() => {
                    this.$nuxt.$loading.finish()
                }, 500)
            })
        }
    }
</script>

<style>

</style>
