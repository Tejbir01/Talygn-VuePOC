
<script setup>
import { storeToRefs } from "pinia";
import axios from "axios";
import { useRoute } from "vue-router";
import { loggedUserInfo, moduleStore } from "@/stores/UserInfo";
import DynamicForm from "../../../components/Common/DynamicForm.vue";
const { GetUserInfo } = storeToRefs(loggedUserInfo());
const { GetModuleId } = storeToRefs(moduleStore());
const { SetModuleId } = moduleStore();

const route = useRoute();
</script>

<template>
  <section id="main-content" class="main-content">
    <!-- start page heading -->
    <section class="page-action">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 padding-t_8">
            <div class="theme-primary partition-full">
              <span class="p-name text-white">Manage Lead</span>
              <span class="float-right">
                <a href="javascript:;" class="p-action-btn text-white" title="PageTour">
                  <i class="fa fa-road" aria-hidden="true"></i>
                  <br />PageTour
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end page heading -->
    <section class="main-content">
      <div class="container-fluid" id="divMainLeadData" v-cloak>
        <div class="border p-3">
          <Form v-slot="{ values,meta}" ref="form">           
            <DynamicForm :schema="GroupBy" /> 
            <div class="row flex-row-reverse mt-2">
              <div class="col-lg-6 text-end">
                <a
                  href="javascript:;"
                  data-tour="step: 1; title: enter DealDetail; content: AddDealDetailContent"
                  v-bind:class="{ disabled: false }"
                  v-on:click="onSubmit(values,meta)"
                  class="btn btn-success"
                  title="Save"
                >
                  <i class="fa fa-save pr-2"></i> Save
                </a>&nbsp;
                <a href="javascript:;" class="btn btn-danger" title="Cancel">
                  <i class="fa fa-close pr-2"></i> Cancel
                </a>
                {{values}}
              </div>
              <div class="col-lg-6">
                <div class="py-2">
                  <!--@HtmlHelpers.MandatoryStringFull("R")-->
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  components: {
    DynamicForm,
  },
  data() {
    return {
      value: "",
      LeadData: null,   
      GroupBy:[]
    };
  },
  mounted: function () {},
  created: function () {
    this.FetchData();
  },
  methods: {
    FetchData: function () {
      var vm = this;
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
                        var Compphone = '';
                        var homephone = '';
                        var businessphone = '';
                        var Phones = [];
                        vm.LeadData = response.data.data;
              if (vm.LeadData != null && vm.LeadData.length > 0) {
                            var groupId = vm.LeadData[0].group_id;
                            vm.LeadData.forEach(item => {
                                groupId = item.group_id;                                                            
                                if (item.name == 'status_id' && item.value == '') {
                                    item.value = '1001';
                                }                                
                                if (item.name == "contact_number") {
                                    Compphone = item.value;
                                    if (Compphone == '' || Compphone == null || Compphone.indexOf("+") == -1)
                                        Phones.push(item.name);
                                }
                                if (item.name == "home_phone") {
                                    homephone = item.value;
                                    if (homephone == '' || homephone == null || homephone.indexOf("+") == -1)
                                        Phones.push(item.name);
                                }
                                if (item.name == "business_phone") {
                                    businessphone = item.value;
                                    if (businessphone == '' || businessphone == null || businessphone.indexOf("+") == -1)
                                        Phones.push(item.name);
                                }                               
                                var chkGroup = $.grep(vm.GroupBy, function (element, index) {
                                    return element.group_id == groupId;
                                });
                                if (chkGroup.length == 0) {
                                    var returnedData = $.grep(vm.LeadData, function (element, index) {
                                        return element.group_id == groupId;
                                    });                                                                    
                                    if (returnedData.length > 0) {
                                        var objGroup = {
                                            group_id: groupId,
                                            group_name: returnedData[0].group_name,
                                            group_display_name: returnedData[0].group_display_name,
                                            LeadData: returnedData
                                        };
                                        vm.GroupBy.push(objGroup);
                                    }
                                }
                            });
                                   console.log(vm.GroupBy);             
                        }
          }  
        });
    },
    onSubmit: function (values,meta) {
      console.log(values);
      alert(meta.valid);
     //alert(JSON.stringify(values, null, 2));
      // const { valid } = this.$refs.form.validate();
      // console.log(valid);
      // this.$refs.form.setFieldTouched("Amount", true);
      // this.$refs.form.setFieldTouched("Discount", true);
      // //meta.touched = true;
      // this.$refs.form.validate();
    },
  },
};
</script>