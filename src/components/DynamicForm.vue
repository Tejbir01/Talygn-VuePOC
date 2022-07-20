<template>
  <Form @submit="onSubmit">
    <div v-for="field in schema" :key="field.name">
      <label :for="field.name" v-if="field.form_field_visibility=='YES'">{{ field.label }}</label>
      <Field v-if="field.astype=='input' && field.form_field_visibility=='YES'" :as="field.astype" :type="field.inputtype" :id="field.name" :rules="field.rules"  :name="field.name"  :value="field.value"/>
      <!-- <Field v-if="field.astype=='select' && field.form_field_visibility=='YES'" :as="field.astype" :id="field.name" :rules="field.rules"  :name="field.name"  :value="field.value"> 
        <option v-for="item in field.select_options==''?undefined: JSON.parse(field.select_options)" :key="item" :value="item.value">{{item.name}}</option>
      </Field> -->
      <Field v-if="field.astype=='select' && field.form_field_visibility=='YES'" :as="field.astype" :id="field.name" :rules="field.rules"  :name="field.name"  :value="field.value"> 
        <option v-for="item in field.select_options==''?undefined: JSON.parse(field.select_options)" :key="item" :value="item.value">{{item.name}}</option>
      </Field>
      <ErrorMessage :name="field.name" />
    </div>
    <button>Submit</button>
  </Form>
</template>
<script>
import { Form, Field,ErrorMessage } from 'vee-validate';
import * as yup from "yup";
export default {
  name: 'DynamicForm',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
  methods:{
    onSubmit(values) {
      console.log(values);
    },
  }
};
</script>