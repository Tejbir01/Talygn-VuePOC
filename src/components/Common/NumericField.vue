<script>
    export default {
        name: 'number-input',
        props: {
            name: {
                type: String,
                required: false
            },
            min: {
                type: Number,
                required:false
            },
            max: {
                type: Number,
                required: false
            },
            type: {
                type: String,
                required: false
            },
            isDecimal: {
                type: Boolean,
                required: false,
                default:false
            },
            isRequired: {
                type: Boolean,
                required: false,
                default: false
            },
            decimalPoints: {
                type: Number,
                required: false,
                default:2
            }
        },
        data: function () {
            return {
                value:''
            }
        },
        methods: {
            checkKey: function (e) {
                var vm = this;
                if (String.fromCharCode(e.which) == '-' || (!vm.isDecimal && String.fromCharCode(e.which) == '.') || vm.value.length <= 0 && String.fromCharCode(e.which) == '.') {
                    e.preventDefault();
                    return false;
                }
                if (vm.isDecimal && vm.value.split('.')[1]) {
                    if (vm.value.split('.')[1].length >= vm.decimalPoints) {
                        e.preventDefault();
                        return false;
                    }
                }
            }
        }
    }
</script>
<template>
    <Field :name="name" mode="aggressive" :rules="{'required':isRequired}" :label="name"  v-model="value" v-slot="{ field, errorMessage, meta}" :placeholder="'enter '+name">
        <input v-bind="field" type="number" v-bind:class="{'form-control' : true,'is-invalid': meta.touched && !meta.valid}" @keypress="checkKey"/>
        <span v-if="meta.touched && !meta.valid" :name="name" class="invalid-feedback">{{errorMessage}}</span>
    </Field>
</template>