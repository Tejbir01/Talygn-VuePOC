<script>
    export default {
        props: {          
             field: {
                type: Object,
                required: true
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
     <Field :name="field.name" mode="aggressive" :rules="{'required':field.is_required}" :label="field.name"  v-model="value" v-slot="{ field, errorMessage, meta}" :placeholder="'enter '+field.name">
        <input v-bind="field" type="number" v-bind:class="{'form-control' : true,'is-invalid': meta.touched && !meta.valid}" @keypress="checkKey"/>
        <span v-if="meta.touched && !meta.valid" :name="field.name" class="invalid-feedback">{{errorMessage}}</span>
    </Field>
</template>