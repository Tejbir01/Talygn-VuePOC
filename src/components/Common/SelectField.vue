<script>
    export default {
        props: {
            name: {
                type: String,
                required: false
            },            
            isRequired: {
                type: Boolean,
                required: false,
                default: false
            },
            options: {
                type: Array,
                required: true,
                default: () => ([])
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
<Field v-slot="{ value }" :name="name" as="select" :rules="{'required':isRequired}" :label="name"
v-bind:class="{'form-control' : true}">
  <option value="" disabled>Select a value</option>
  <option v-for="item in options" :key="item" :value="item.value">{{ item.name }}</option>
</Field>
<ErrorMessage :name="name" />   
</template>