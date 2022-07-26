<script>
    export default {
        name: 'text-input',
        props: {
            
             field: {
                type: Object,
                required: true
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
    <Field :name="field.name" :rules="{'required':field.is_required}" :label="field.name" v-slot="{ field, errorMessage, meta}">
        <input v-bind="field" type="datetime" v-bind:class="{'form-control' : true,'is-invalid': meta.touched && !meta.valid}"/>
        <span v-if="meta.touched && !meta.valid" :name="field.name" class="invalid-feedback">{{errorMessage}}</span>
    </Field>
</template>