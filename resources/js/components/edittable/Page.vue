<template>
    <div class="my-grid-table-container">
        <editable-table
            class="vue-table"
            ref="table"
            id="table_test"
            :column-defs="columnDefs"
            :row-data="rows"
            row-data-key="id"
            @cell-updated="cellUpdated"
            @row-selected="rowSelected"
            @context-menu="contextMenu"
        >
            <template v-slot:header>
                Table Header
                <a href="#" @click.prevent="removeCurrentRow" v-if="selectedRow" class="ml-1">Remove Row</a>
            </template>
            <template v-slot:header-r>
                Total rows: {{ rows.length }}
            </template>
        </editable-table>
    </div>
</template>

<script>
    import EditableTable from './EditableTable';

    import data from "./data";

    export const defaultDateFormat = 'MMM dd, yyyy';

    const numericFormatter = event => {
        if(event.reverse) {
            return event.value && +event.value.replace(' years');
        }
        return `${event.value} years`;
    };

    const columnDefinition = [
        { sortable: true, filter: true, field: 'name', headerName: 'Name', editable: true },
        { sortable: true, filter: true, field: 'description', headerName: 'Description', editable: true },
        { sortable: true, filter: true, field: 'amount', headerName: 'Amount', type: 'currency', editable: true },
        { sortable: true, filter: true, field: 'due', headerName: 'Next Due', format: defaultDateFormat, editable: true },
    ];

    export default {
        name: "Page",
        components: {
            EditableTable
        },
        data() {
            return {
                columnDefs: columnDefinition,
                rows: [],
                selectedRow: null,
            }
        },
        created() {
            this.formatData()
        },
        mounted() {

        },
        methods: {
            formatData() {
                data.forEach(row => {
                    this.formatRow(row);
                });
                this.rows = data;
            },
            formatRow(row) {
                const red = '#ffe5e5';
                const green = '#b6f7b6';
                //format definitions
            },
            cellUpdated($event) {
                console.log($event);
            },
            rowSelected($event) {
                this.selectedRow = $event.rowData
            },
            removeCurrentRow() {
                this.rows = this.rows.filter(row => row.id !== this.selectedRow.id)
            },
            contextMenu($event) {
                console.log($event)
            },
        }
    }
</script>

<style lang="scss">
.my-grid-table-container {
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
    height: 400px;
}
.grid {
    height: 100%;
}
.ml-1 {
    margin-left: 10px;
}
</style>
