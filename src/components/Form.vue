
<script>
import axios from "axios";
import schema from "../schema.json";
import DynamicForm from "../components/DynamicForm.vue";
import * as yup from "yup";
export default {
  components: { DynamicForm },
  data: () => {
    const formSchema = {};
    return {
      formSchema,
    };
  },
  methods: {
    FetchData: function () {
      var self = this;
      axios
        .get(
          "http://localhost:35924/api/FormLayout?id=&moduleName=CRM&subModuleCode=CRM_LEADS&langCode=en",
          {
            headers: {
              Authorization:
                "bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkEwN0Q4MDM0Rjg3RUMxNTc4MTlEMjUyNTdFN0VERjk0IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTgyOTM1MzEsImV4cCI6MTY1ODMxMTUzMSwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMC4yMDA6OTA5NiIsImF1ZCI6WyJDUk1BUEkiLCJUaWNrZXRpbmciXSwiY2xpZW50X2lkIjoiTVZDSHlicmlkIiwic3ViIjoiNzY5MDgzIiwiYXV0aF90aW1lIjoxNjU4MjkzNTMxLCJpZHAiOiJsb2NhbCIsInByZWZlcnJlZF91c2VybmFtZSI6Ijc2OTA4MyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImphbWVzc21pdGhAeW9wbWFpbC5jb20iLCJ1c2VydHlwZSI6IkNBIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkphbWVzIE9TbWl0aCIsImlzZGVmYXVsdCI6dHJ1ZSwiZ2VuZGVyIjoiIiwiY29tcGFueUlkIjoyNzA5MzYsInRva2VuaWQiOiIiLCJpZCI6NzY5MDgzLCJjb21wYW55TmFtZSI6IkRyaXNoIEluZm8gVGVjaCIsImNvbnRhaW5lck5hbWUiOiJjZy1kcmlzaC1pbmZvLXRlY2gtMjcwOTM2IiwibG9naW5TdGF0dXMiOiIwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ0EiLCJpc0VuYWJsZUxvZ2luIjoiVHJ1ZSIsImFjdGl2ZUxpY2Vuc2VDb3VudCI6IjEzNyIsIndvcmtpbmdMYW5ndWFnZSI6ImVuIiwidGltZUZvcm1hdCI6IjEyIiwidHJpYWxNZXNzYWdlIjoiIiwiaW5pdGlhbFNldHVwIjoiVHJ1ZSIsImlzU2VhcmNoQmFyT2ZmIjoiRmFsc2UiLCJpc01lbnVTbGlkZXJPZmYiOiJUcnVlIiwiY29tcGFueVN0YXR1c0NvZGUiOiJBQ1QiLCJyZXNldF9QYXNzd29yZCI6IkZhbHNlIiwibWVudXR5cGUiOiJUb3AiLCJ0aW1lem9uZSI6IiswMTowMCIsInRoZW1lIjoiTGlnaHQiLCJjb21wYW55bG9nbyI6ImNvbXBhbnktbG9nby5qcGciLCJhdmF0YXIiOiJIb292ZWZIRExiSUxUUXEucG5nIiwiZGF0ZUZvcm1hdCI6IiIsIklzSW5UcmlhbCI6IkZhbHNlIiwiQ3VycmVuY3kiOiIoVFpTKSIsIlBhZ2VTaXplIjoiMTUiLCJJc1ZlbmRvciI6Im5vIiwiSXNDbGllbnRDQSI6IkNBIiwiVGltZVpvbmVTdGF0dXMiOiJGYWxzZSIsIklzV2l0aENDIjoiVHJ1ZSIsIkRvTm90U2hvd0RpcnR5Q2hlY2siOiJUcnVlIiwiRW5hYmxlTXlEYXNoYm9hcmQiOiJUcnVlIiwiRmxhZ05vdGlmaWNhdGlvbkNoZWNrIjoiRmFsc2UiLCJPcmdDb21hcGFueUlkIjoiMCIsInNpZCI6IjMzMTVFNzc1OTdBRDkwMzY0NUZDREFDRjNBODhENDVDIiwiaWF0IjoxNjU4MjkzNTMxLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.QuTPdZmgfgWzpxC_OYd1CM6Sx-iNDnCkkzTipUJrTNYElLS1fZSgyAKqz0p2cxGAFI-NaUMjgeccbBJb_Z10E71DC9ioBMGJUapoDA3Hq0pM_6ULOURdz3gChaZzL_SAFqids9inbjOZDGt2ISe7Q5woYEb5YJB3MMEjVIoTIjgqUxJukN6yXOjR5NfbWq1HUp5vPjSY1abg284kqB5K_0PVpAWo0b39jWPy_0yq5eZ9Onzt7DIMJV8ycl3by_x0vlg27yF9FJTtqHYwMRJuLWD7biJsDdUaE8EaKTlWuI0ZLbowzXppft2_J42jiM7xDTjZdibqKk2lpwchaK_TdA",
            },
          }
        )
        .then(function (response) {          
           if (response.data != "" && response.data != null) {              
            response.data.data.forEach((element) => {              
              element.rules =element.rules==null?'':element.rules=='yup.string().required()'?yup.string().required():element.rules=='yup.string().required().email()'?yup.string().required().email():'';
            });
          }
          console.log(response.data.data);
          self.formSchema = response.data;
        });
    },
  },
  created: function () {
    this.FetchData();
  },
  // data () {
  //   return {
  //   }
  // },
  //   setup() {
  // const schemaValidation = yup.object().shape({
  //       client_email: yup.string().required().email(),
  //       client_first_name: yup.string().required().min(8),
  //     });
  //     return{
  // schemaValidation,
  //     };
  //   },
};
</script>
<template>
  <DynamicForm :schema="formSchema.data" />
</template>