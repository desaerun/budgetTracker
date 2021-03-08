<template>
    <div class="bill-item" @dblclick="editBill(bill)">
        <div><input type="checkbox" /></div>
        <div>
            <div v-if="!editing" class="bill-label">{{ name }}</div>
            <input v-else v-model="name" class="bill-input"/>
        </div>
        <div>
            <div v-if="!editing" class="bill-label">{{ description }}</div>
            <input v-else v-model="description" class="bill-input"/>
        </div>
        <div>
            <div v-if="!editing" class="bill-label">{{ amount }}</div>
            <input v-else v-model="amount" class="bill-input"/>
        </div>
        <div>
            <div v-if="!editing" class="bill-label">{{ due }} ({{ daysRemaining }} days remaining.)</div>
            <div v-else>
                <input v-model="due" class="bill-input"/>  ({{ daysRemaining }} days remaining.)
            </div>
        </div>
        <div class="remove-bill" @click="removedBill(index)">&times;</div>
    </div>
</template>

<script>
    export default {
        name: "BillItem",
        props: {
            bill: {
                type: Object,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                'name': this.bill.id,
                'title': this.bill.name,
                'description': this.bill.description,
                'amount': this.bill.amount,
                'due': this.bill.due,
                'editing': this.bill.editing,
            }
        },
        computed: {
            daysRemaining() {
                return 1;
            }
        },
        methods: {
            editBill(bill) {
                this.editing = true;
            },
            doneEditingBill() {
                eventBus.$emit('doneEditingBill',{
                    'index': this.index,
                    'bill': {
                        'id': this.id,
                        'name': this.name,
                        'description': this.description,
                        'amount': this.amount,
                        'due': this.due,
                    }
                });
            },
            removedBill(index) {
                eventBus.$emit('removedBill',index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bill-item {
        margin-bottom: 10px;
        display:flex;
        align-items:center;
        justify-content: space-between;
    }
    .bill-label {
        padding:10px;
        border:1px solid white;
        margin-left:12px;
        width:100%;
        font-size: 14px;
        color: #2c3e50;
    }
    .bill-input {
        font-size: 14px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #CCCCCC;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }
    .remove-bill {
        cursor: pointer;
        margin-left:14px;
        &:hover {
            color:black;
        }
    }
</style>
