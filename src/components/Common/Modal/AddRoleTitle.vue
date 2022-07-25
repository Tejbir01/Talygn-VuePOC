<script setup>
    import { storeToRefs } from "pinia";
    import { loggedUserInfo, moduleStore } from "@/stores/UserInfo";
    import axios from 'axios';
    const { GetUserInfo } = storeToRefs(loggedUserInfo());
</script>
<script>
    export default {
        name: 'modal-add-role-title',
        props: {
            parent: {
                type: Object,
                required: true
            },
            baseUrl: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                RoleName: '',
                RoleDesc: '',
                tokenId: this.GetUserInfo.Token
            }
        },
        created: function () {
            //this.$validator.reset();
        },
        methods: {
            SaveRole: function () {
                var vm = this;
                var jsonobj = {
                    RoleName: vm.RoleName,
                    RoleDesc: vm.RoleDesc
                }
                var jobj = JSON.stringify(jsonobj);
                //vm.$validator.validateAll("addroletitle").then(function (valid) {
                //    if (valid) {
                axios.post(vm.baseUrl + 'api/SaveContactRoleTitle', { postString: jobj }, {
                            headers: {
                                'Authorization': 'bearer ' + vm.tokenId,
                                'Content-Type': 'application/json; charset=UTF-8'
                            }
                        }).then(function (response) {
                            if (response.data.Status.toUpperCase() == "SUCCESS") {
                                vm.$toast.success("Role title has been saved successfully.");
                                vm.$emit('close');
                                vm.parent.showaddroletitleModal = false;
                                var url = vm.baseUrl + "api/Form/GetDDLData?id=&moduleName=CRM&type=CONTACT_JOB_TITLE";
                                showLoader();
                                axios.get(url, {
                                    headers: { 'Authorization': 'bearer ' + vm.tokenId }
                                })
                                    .then(function (response) {
                                        var json = [];
                                        if (response.data != null) {
                                            json = response.data.DATA;
                                        }
                                        $.each(vm.parent.GroupBy, function (index, item) {
                                            $.each(item.LeadData, function (index, element) {
                                                if (element.name == 'role_title_id') {
                                                    element.select_options = json;
                                                }
                                            });
                                        });
                                        hideLoader();
                                    });
                            }
                            else if (response.data.Status.toUpperCase() == "EXIST") {
                                vm.$toast.error("Role title already exist.");
                            }
                            hideLoader();
                        }, function (response) {
                            hideLoader();
                        });
                //    }
                //});
            }
        }
    }
</script>
<template>
    <transition name="modal">
        <div class="my-popups">
            <div class="modal d-block">
                <div class="modal-dialog modal-dialog-centered" style="max-width:900px !important">
                    <div class="modal-content">
                        <div class="modal-header theme-primary partition-full">
                            <h4 class="modal-title">Add Role Title</h4>
                            <button type="button" class="close" v-on:click="$emit('close');parent.showaddroletitleModal=false;"><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                        <div class="modal-body">
                            <form data-vv-scope="addroletitle">
                                <div class="col-md-12 float-left px-0">
                                    <div class="row" style="max-height: 450px; overflow-y: auto;">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Role Title:<span class="text-danger">*</span></label>
                                                <input v-bind:class="{'form-control':true}" data-vv-as="Title" name="Title" maxlength="100" v-model.trim="RoleName" type="text"  />
                                                <!--<span v-show="errors.has('addroletitle.Title')" class="invalid-feedback">{{ errors.first('addroletitle.Title') }}</span>-->
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Description:</label>
                                                <textarea v-bind:class="{'form-control':true}" maxlength="1000" v-model="RoleDesc" style="max-height:300px!important;min-height:100px!important"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div class="col-md-12 p-0">
                                <div class="row flex-row-reverse">
                                    <div class="col-lg-6 text-right">
                                        <a href="javascript:;" v-on:click="SaveRole();" title="Save" class="btn btn-success formbtn widthhalf text-white">
                                            <i class="fa fa-save pr-2"></i> Save
                                        </a>
                                        <a href="javascript:;" v-on:click="$emit('close');parent.showaddroletitleModal=false;" class="btn btn-danger formbtn">
                                            <i class="fa fa-times"></i> Cancel
                                        </a>
                                    </div>
                                    <div class="col-lg-6"><div class="py-2"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>