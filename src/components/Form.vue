
<script>
import schema from '../schema.json'
import DynamicForm from '../components/DynamicForm.vue'
import * as yup from 'yup';
export default {
  components: { DynamicForm },
  data () {     
    return {      
      schema,
      form: {},
      status: null
    }
  },
  setup() {
const schemaValidation = yup.object().shape({
      client_email: yup.string().required().email(),
      client_first_name: yup.string().required().min(8),
    });
    return{
schemaValidation,
    };
  },
  created(){
console.log(this.schema.data);
  },
  methods: {    
    onSubmit(values) {
      debugger;
      console.log(this.$refs.dynamicForm);
      console.log(values, null, 2);
       this.$validator.validateAll().then((result)=>{
          if(!result){
            error();
          }
      })
    },
    saveStatus (status) {
      this.status = status
    }
  }
}
</script>
<template>
  <div id="dForm">
      <form @submit="onSubmit" :validation-schema="schemaValidation">
        <DynamicForm
          :schema="schema.data"
          v-model="form"
          @status="saveStatus"
          ref="dynamicForm"
        />
        <pre>{{ form }}</pre>
        <button>SEND!</button>
      </form>
  </div>
</template>