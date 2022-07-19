<template>
  <div class="input">
    <label :for="name">{{ label }}</label>
    <Field 
      :value="value"
      :name="name"
      :id="name"
      v-on="{
        ...$listeners,
        input: event => $emit('input', event.target.value)
      }"
    />   
     <ErrorMessage :name="name" />
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number]
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
   
   
  }
}
</script>