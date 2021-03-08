<template>
    <tr>
        <cell v-for="(column,index) in columns" :key="index" :column_name="column" :column_index="index" :row_id="row.id" :table_index="table_index"></cell>
    </tr>
</template>

<script>
    import Cell from "./Cell";

    export default {
        name: "Row",
        components: {
            Cell
        },
        data() {
            return {
                table_index: this.table_index,
                columns: this.$store.getters.getTableColumns(table_index),
            }
        }
    }
</script>

<style scoped>

</style>
