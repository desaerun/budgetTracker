<template>
    <div class="content">
        <bills-list></bills-list>
    </div>
</template>

<script>
    import BillsList from './bills/BillsList'
    export default {
        name: "ContentWindow",
        components: {
            BillsList
        }
    }
</script>

<style scoped>

</style>
