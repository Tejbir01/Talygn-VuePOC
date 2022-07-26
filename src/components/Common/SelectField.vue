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
            }
        },
        methods: {
            
            }
    }
</script>
<template>
<Field :name="field.name" as="select" :rules="{'required':field.is_required}" :label="field.select"
v-bind:class="{'form-control' : true}">
  <option value="" disabled>Select a value</option>
  <option v-for="item in field.select_options=='' ||field.select_options==null ?undefined: JSON.parse(field.select_options)" :key="item" :value="item.value">{{ item.name }}</option>
</Field>
<ErrorMessage :name="field.name" />   
</template>