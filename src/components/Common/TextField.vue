<script>
    export default {
        name: 'text-input',
        props: {
              field: {
                type: Object,
                required: true
            }            
                 
            // name: {
            //     type: String,
            //     required: false
            // },            
            // type: {
            //     type: String,
            //     required: false
            // },           
            // isRequired: {
            //     type: Boolean,
            //     required: false,
            //     default: false
            // }  
             
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
    <Field :name="field.name" :rules="{'required':field.is_required,'email':field.validation_type=='email'?true:false,'url':field.dt_code=='url'?true:false}" :label="field.name" v-slot="{ field, errorMessage, meta}" :placeholder="'enter '+field.name">
        <input v-bind="field" type="text" v-bind:class="{'form-control' : true,'is-invalid': meta.touched && !meta.valid}"/>
        <span v-if="meta.touched && !meta.valid" :name="field.name" class="invalid-feedback">{{errorMessage}}</span>
    </Field>
</template>