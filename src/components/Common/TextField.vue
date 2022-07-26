<script>
    export default {
        name: 'text-input',
        props: {
            name: {
                type: String,
                required: false
            },            
            type: {
                type: String,
                required: false
            },           
            isRequired: {
                type: Boolean,
                required: false,
                default: false
            }               
        },
        data: function () {
            return {                
            }
        },
        methods: {            
        }
    }
</script>
<template>
    <Field :name="name"  :rules="{'required':isRequired?true:false}" :label="name" v-slot="{ field, errorMessage, meta}" :placeholder="'enter '+name">
        <input v-bind="field" type="text" v-bind:class="{'form-control' : true,'is-invalid': meta.touched && !meta.valid}"/>
        <span v-if="meta.touched && !meta.valid" :name="name" class="invalid-feedback">{{errorMessage}}</span>
    </Field>
</template>