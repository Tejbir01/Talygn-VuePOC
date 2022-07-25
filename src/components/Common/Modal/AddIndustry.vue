<script setup>
    import { storeToRefs } from "pinia";
    import { loggedUserInfo, moduleStore } from "@/stores/UserInfo";
    import axios from 'axios';
    const { GetUserInfo } = storeToRefs(loggedUserInfo());
</script>

<script>
    export default {
        name: "modal-add-industry",
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
                industryname: '',
                industrydesc: '',
                tokenId: this.GetUserInfo.Token
            }
        },
        created: function () {
        },
        methods: {
            SaveIndustry: function () {
                var vm = this;

                var jsonobj = {
                    industryname: vm.industryname,
                    industrydesc: vm.industrydesc
                }

                
                //vm.$validator.validateAll("addindustry").then(function (valid) {
                    //if (valid) {
                axios.post(vm.baseUrl + 'api/Form/SaveIndustryType', { postString: jsonobj, type: 'Industry' }, {
                    headers: {
                        'Authorization': 'bearer ' + vm.tokenId,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                        }).then(function (response) {
                            //response.headers.get('Expires');
                            if (response.data.Status.toUpperCase() == "SUCCESS") {
                                vm.$toast.success("Industry has been saved successfully.");
                                vm.$emit('close');
                                vm.parent.showaddindustryModal = false;
                                var url = vm.baseUrl + "api/Form/GetDDLData?id=&moduleName=CRM&type=INDUSRTY_TYPE";
                                showLoader();
                                axios.get(url, {
                                    headers: { 'Authorization': 'bearer ' + vm.tokenId}
                                })
                                    .then(function (response) {
                                        var json = [];
                                        if (response.data != null) {
                                            json = response.data.DATA;
                                        }
                                        $.each(vm.parent.GroupBy, function (index, item) {
                                            $.each(item.LeadData, function (index, element) {
                                                if (element.name == 'industry_type_id') {
                                                    element.select_options = json;
                                                }
                                            });
                                        });
                                        hideLoader();
                                    });
                            }
                            else if (response.data.Status.toUpperCase() == "EXIST") {
                                vm.$toast.error("Industry name already exist.");
                            }
                            hideLoader();
                        }, function (response) {
                            hideLoader();
                        });
                    //}
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
                            <h4 class="modal-title">Add Industry</h4>
                            <button type="button" class="close" v-on:click="$emit('close');parent.showaddindustryModal=false;"><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                        <div class="modal-body">
                            <form data-vv-scope="addindustry">
                                <div class="col-md-12 float-left px-0">
                                    <div class="row" style="max-height: 450px; overflow-y: auto;">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Industry:<span class="text-danger">*</span></label>
                                                <input v-bind:class="{'form-control':true, 'is-invalid':true}" data-vv-as="Industry" id="Name" maxlength="200" name="Name" v-model="industryname">
                                                <span class="invalid-feedback"></span>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Description:</label>
                                                <textarea v-bind:class="{'form-control':true, 'is-invalid':true}" maxlength="1000" id="description" name="Description" v-model="industrydesc" type="text" style="max-height:300px!important;min-height:100px!important"></textarea>
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
                                        <a href="javascript:;" v-on:click="SaveIndustry();" title="Save" class="btn btn-success formbtn widthhalf text-white">
                                            <i class="fa fa-save pr-2"></i> Save
                                        </a>
                                        <a href="javascript:;" v-on:click="$emit('close');parent.showaddindustryModal=false;" class="btn btn-danger formbtn">
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