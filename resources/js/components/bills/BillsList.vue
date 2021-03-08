<template>
    <div class="billsList col-md-8 align-center">
        <v-data-table
            :headers="headers"
            :items="this.$store.state.bills"
            show-select
            :items-per-page="5"
            class="elevation-1"
        >
            <template v-slot:item.name="props">
                <v-edit-dialog
                    :return-value.sync="props.item.name"
                    @save="save(item)"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                    >{{ props.item.name }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.name"
                            :rules="[max25chars]"
                            label="Edit"
                            single-line
                            counter
                            ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>
            <template v-slot:item.amount="props">
                <v-edit-dialog
                    :return-value.sync="props.item.amount"
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                >{{ props.item.amount }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.amount"
                            :rules="[max25chars]"
                            label="Edit"
                            single-line
                            counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import BillItem from "./BillItem";

    export default {
        name: "BillsList",
        components: {
            BillItem,
        },
        data() {
            return {
                max25chars: v => v.length <= 25 || 'Input too long!',
                pagination: {},
                headers: [
                    {
                        text: 'Name',
                        align: 'start',
                        sortable: true,
                        value: 'name',
                    },
                    { text: 'Description', value: 'description' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Next Due', value: 'due' },
                ],
            }
        },
        computed: {
            currencyDollars() {
                return this.amount / 100
            },
            daysRemaining() {
                return 1;
            }
        },
        methods: {
            formatCurrencyDollars(amount) {
                return amount /  100;
            },
            save (item) {
                this.$store.dispatch('updateBill',item);
            },
            cancel () {

            },
            open () {

            },
            close () {

            },
        },
    }
</script>

<style scoped>

</style>
