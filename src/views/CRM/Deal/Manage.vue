
<script setup>
    import { storeToRefs } from "pinia";
    import axios from 'axios';
    import { useRoute } from 'vue-router'
    import { loggedUserInfo, moduleStore } from "@/stores/UserInfo";
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
                            <span class="p-name text-white">Manage Deal</span>
                            <span class="float-right">
                                <a href="javascript:;" class="p-action-btn text-white" title="PageTour" onclick="startTour(0)"><i class="fa fa-road" aria-hidden="true"></i><br>PageTour</a>
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
                    <Form @submit="onSubmit" v-slot="{ meta, validate }" ref="form">
                        <div class="row" v-for="(group,parentIndex) in GroupBy">
                            <div class="clearfix"></div>
                            <div v-bind:class="{'col-lg-12 mb-3 float-left': true, 'mt-3': parentIndex > 0}">
                                <div class="heading-border">
                                    <h5 class="h5">
                                        <span>{{GetLocalizedValue(group.group_name,group.group_display_name)}}</span>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 float-left p-0 d-flex flex-wrap">
                                <div v-bind:class="{'col-sm-12 col-md-12 float-left': true, 'd-none' : item.form_field_visibility == 'NO', 'referredby':item.name == 'referred_by','campaignname':item.name == 'campaign_id', 'col-lg-12 col-xl-12': item.layout_type =='single', 'col-lg-6 col-xl-6': item.layout_type =='double', 'col-lg-4 col-xl-4': item.layout_type =='triple', 'col-lg-3 col-xl-3': item.layout_type =='four' }" v-for="(item,index) in group.LeadData" v-show="item.dependent_show_type == 1">
                                    <input type="hidden" v-model="item.value" v-if="item.form_field_visibility == 'NO'" v-bind:id="item.name" />
                                    <div class="form-group" v-if="item.form_field_visibility == 'YES'">
                                        <label>{{GetLocalizedValue(item.label,item.display_name)}}:<span v-bind:class="{'text-danger':item.is_required== true}" v-if="item.is_required== true">*</span></label>
                                        <a href="javascript:;" v-if="!isBlank(item.user_guide)" v-bind:tabindex="-1" data-toggle="popoveruserguide" v-bind:data-content="GetLocalizedValue(item.user_guide)">
                                            <i class="fa fa-question-circle-o text-popover" style="font-size: 14px;"></i>
                                        </a>
                                        <div class="row">
                                            <div class="col-12 float-left">
                                                <div class="input-group">
                                                    <!--@*for date picker*@-->
                                                    <div class="input-group" v-if="item.dt_code=='date'">
                                                        <Field :name="item.name" class="" v-model="item.value" :rules="{'required':item.is_required}" :label="GetLocalizedValue(item.label,item.display_name)" v-slot="{ field, errorMessage, errors, meta}">
                                                            <date-picker v-bind="field" :format="format" :enableTimePicker="false" v-bind:class="{'is-invalid': item.dt_code == 'date' && errorMessage && meta.touched, 'form-control':true}" v-bind:name="item.name" v-bind:wrap="true" v-bind:value="$filters.formatDate(item.value)" v-bind:placeholder="GetFieldPlaceHolder(item.label,item.display_name)" v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)" style="--dp-border-color:none;" />
                                                            <!--<div class="input-group-append">
                                                                <span class="input-group-text datepickerbutton" title="SelectDate">
                                                                    <i class="fa fa-calendar"></i>
                                                                </span>
                                                            </div>-->
                                                            <span v-if="errorMessage && meta.touched" :name="item.name" class="invalid-feedback">{{errorMessage}}</span>
                                                        </Field>
                                                    </div>
                                                    <!--@*for text box*@-->
                                                    <Field :name="item.name" mode="aggressive" :rules="{'required':item.is_required, 'email':item.name == 'email_id'}" :label="GetLocalizedValue(item.label,item.display_name)" v-model="item.value" v-bind:id="item.name" v-if="item.picklist_options != 'Lookup' && item.dt_code !='date'  && item.dt_code !='radio'  && item.dt_code !='select' && item.dt_code !='textarea' && item.dt_code !='checkbox' && item.dt_code != 'phone'" v-slot="{ field, errorMessage, meta}" :validateOnChange="true" v-bind:placeholder="GetFieldPlaceHolder(item.label,item.display_name)" v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)">
                                                        <input v-bind="field" :name="item.name" v-bind:class="{'form-control' : true,'is-invalid': item.picklist_options != 'Lookup' && meta.touched && !meta.valid}" />
                                                        <span v-if="errorMessage" :name="item.name" class="invalid-feedback">{{errorMessage}}</span>
                                                    </Field>
                                                    <div class="col-md-12 col-sm-12 col-lg-12 p-0" v-if="item.dt_code == 'phone'">
                                                        <vue-tel-input  v-model="item.value" v-bind:name="item.name"></vue-tel-input>
                                                        <span style="display:none" v-bind:id="'spanPhone'+index" class="invalid-feedback">Enter valid number.</span>
                                                    </div>
                                                    <!--@*for text area*@-->
                                                    <textarea v-bind:class="{'form-control' : true,'is-invalid': item.dt_code == 'textarea' && false }" type="text" v-bind:placeholder="GetFieldPlaceHolder(item.label,item.display_name)" v-model.trim="item.value" v-bind:id="item.name" v-bind:name="item.name" v-if="item.dt_code=='textarea'" v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)"></textarea>
                                                    <!--@*for radio button*@-->
                                                    <div class="form-group" v-if="item.dt_code=='radio' && MakeArray(item.picklist_options,item.dt_code).length==2">

                                                        <label class="switch">
                                                            <input class="form-check-input rdoticketfor custom-control-input dynamic" type="checkbox" v-bind:name="item.name" v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)" v-bind:value="item.value" v-on:change="AssignToggleValues($event,item,MakeArray(item.picklist_options,item.dt_code),parentIndex,index)" v-bind:checked="item.value==1" v-bind:disabled="item.is_Disabled" tabindex="5">
                                                            <span class="slider round">
                                                                <span class="slider-yes">{{MakeArray(item.picklist_options,item.dt_code)[0].name}}</span>
                                                                <span class="slider-no">{{MakeArray(item.picklist_options,item.dt_code)[1].name}}</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div class="form-control pl-0 border-0 bg-transparent" v-if="item.dt_code=='radio' && MakeArray(item.picklist_options,item.dt_code).length>2">
                                                        <div class="form-check form-check-inline" v-for="option in MakeArray(item.picklist_options,item.dt_code)">
                                                            <!--@*<input type="radio" class="d-none" v-bind:id="option.name" v-bind:checked="option.value == 'No'" v-bind:value="option.value" v-model="option.name" v-bind:name="item.name" v-on:onclick="item.dependent_show_type=1" v-bind:data-resource="option.name" v-if="item.dt_code=='radio'">*@-->
                                                            <div class="form-check form-check-inline custom-control mx-2 p-0 custom-radio" v-bind:key="option.name">
                                                                <input v-bind:id="'rdo_'+ item.custom_field_id+ '_' + option.value" class="dynamic form-check-input custom-control-input" v-model="item.value" v-bind:name="item.name" v-validate="GetValidation(item)" v-on:change="showDependentItem(item,option.value,parentIndex,index)" v-bind:data-resource="option.name" v-bind:value="option.value" type="radio" v-bind:checked="option.value == item.value" v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)" v-bind:disabled="item.is_Disabled">
                                                                <label class="custom-control-label universalradio-custom-control-label pl-2 pt-1 dynamic" v-bind:for="'rdo_'+ item.custom_field_id+ '_' + option.value">{{option.name}}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!--@*for Checkbox*@-->
                                                    <div class="form-control pl-0 border-0 bg-transparent" v-if="item.dt_code=='checkbox'">
                                                        <div class="form-check form-check-inline" v-for="option in MakeArray(item.picklist_options,item.dt_code)">
                                                            <div class="custom-control custom-checkbox">
                                                                <input v-bind:id="'chk_'+ item.custom_field_id+ '_' + option.value" class="dynamic custom-control-input" v-model="item.select_value" v-bind:name="item.name" v-validate="GetValidation(item)" v-bind:data-resource-id="option.name" v-bind:value="option.value" type="checkbox" v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)">
                                                                <label class="custom-control-label universal-custom-control-label pl-2 pr-1 dynamic" v-bind:for="'chk_'+ item.custom_field_id+ '_' + option.value">{{option.name}}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!--@*or drop down list*@-->
                                                    <Field :name="item.name" :type="item.dt_code" rules="required" v-slot="{ field, errorMessage,meta}" v-if="item.picklist_options == 'Lookup' && item.dt_code=='select' && item.dropdown_type=='custom'">
                                                        <v-select v-bind="field" label="name" v-bind:filterable="false" v-bind:name="item.name" v-bind:class="{'custom-vselect':(vSelectValidate == true),'is-invalid': item.picklist_options == 'Lookup' && item.dt_code=='select' && item.dropdown_type=='custom'  && !meta.valid && meta.touched }" v-bind:placeholder="
                                                                  
                                                                  (item.label,item.display_name,item.dt_code)" v-model="item.select_value" v-bind:value="item.value" v-bind:options="item.select_options" v-on:search="onSearch($event,item)" @input="setSelectedValue(item,$event)"  v-bind:checkvalue="item.value" v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)" @mousedown.native="onKeyDown">
                                                            <template slot="no-options">
                                                                {{$t('TypeTosearch')}} {{GetLocalizedValue(item.label,item.display_name)}}
                                                            </template>
                                                            <template slot="option" slot-scope="option">
                                                                <div class="d-center">
                                                                    {{ option.name }}
                                                                </div>
                                                            </template>
                                                            <template slot="selected-option" slot-scope="option">
                                                                <div class="selected d-center">
                                                                    {{ option.name }}
                                                                </div>
                                                            </template>
                                                        </v-select>
                                                        <span v-if="!meta.valid && meta.touched" class="invalid-feedback">{{errorMessage}}</span>
                                                    </Field>
                                                    <Field :name="item.name" :rules="{'required':item.is_required}" v-if="item.picklist_options == 'Lookup' && item.dt_code=='select' && item.dropdown_type=='normal'" v-slot="{ field, errorMessage, meta}">
                                                        <select class="form-control" v-model="item.value" v-bind:name="item.name" v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)" v-on:change="onchangechannel(item,group.LeadData)">
                                                            <option value="">Select</option>
                                                            <option v-for="option in MakeNormalArray(item.select_options)" v-bind:selected="item.value==option.value" v-bind:value="option.value">{{option.name}}</option>
                                                        </select>
                                                        <span v-if="errorMessage && meta.touched" :name="item.name" class="invalid-feedback">{{errorMessage}}</span>
                                                    </Field>
                                                    <Field :name="item.name" :rules="{'required':item.is_required}" v-if="item.picklist_options != 'Lookup' && item.dt_code=='select'" v-slot="{ field, errorMessage, meta }">
                                                        <select class="form-control" v-model="item.value" v-bind:name="item.name"  v-bind:data-vv-as="GetLocalizedValue(item.name,item.display_name)">
                                                            <option value="">Select</option>
                                                            <option v-for="option in MakeArray(item.picklist_options)" v-bind:selected="item.value==option.value" v-bind:value="option.value">{{option.name}}</option>
                                                        </select>
                                                        <span v-if="errorMessage && meta.touched" :name="item.name" class="invalid-feedback">{{errorMessage}}</span>
                                                    </Field>
                                                    <!--@if (loggeduserinfo.usertype == "ca")
                                                    {-->
                                                    <div class="ms-2 mt-1">
                                                        <a class="round-icon-small btn-dark theme-primary" v-if="item.isPlusIcon == true">
                                                            <i class="fa fa-plus text-white pt-7 font-18" v-on:click="openaddIndustrypopup(item)" v-if="item.name=='industry_type_id'"></i>
                                                            <i class="fa fa-plus text-white pt-7 font-18" v-on:click="openaddLeadSourcepopup(item)" v-if="item.name=='lead_source_id'"></i>
                                                            <i class="fa fa-plus text-white pt-7 font-18" v-on:click="openaddRoleTitlepopup(item)" v-if="item.name=='role_title_id'"></i>
                                                        </a>
                                                    </div>
                                                    <!--}-->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3 float-left" v-if="isAccountSelected">
                                <div class="heading-border">
                                    <h5 class="h5">
                                        <span>Select Client</span>
                                    </h5>
                                </div>
                                <div class="listing p-0 mt-2">
                                    <div class="table-responsive">
                                        <table id="dealTable" class="table table-bordered dt-responsive nowrap mt-0" style="width:100%">
                                            <thead class="thead-bg">
                                                <tr class="text-capitalize">
                                                    <th>
                                                        <span>Select</span>
                                                    </th>
                                                    <th>
                                                        <span>FirstName <span class="text-danger d-inline-block">*</span></span>
                                                    </th>
                                                    <th>
                                                        <span>LastName <span class="text-danger d-inline-block">*</span></span>
                                                    </th>
                                                    <th>
                                                        <span>Email <span class="text-danger d-inline-block">*</span></span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in clientData">
                                                    <td class="text-center">
                                                        <input type="radio" class="chkitems" v-model="cutomerId" v-bind:value="item.user_id" name="radio_clients" v-bind:change="removeAriaInvalidFromElement()" v-bind:checked="(cutomerId==0 && cutomerId==item.user_id)" />
                                                    </td>
                                                    <td>
                                                        <span v-if="item.user_id!=0">{{item.first_name}}</span>
                                                        <input type="text" v-bind:class="{'form-control disableAria':true,'is-invalid':(errors.has('firstName'))}" v-model.trim="item.first_name" v-validate="cutomerId==0?'required':''" maxlength="100" placeholder="FirstName" v-bind:aria-invalid="(errors.has('firstName'))" v-if="item.user_id==0" name="firstName" data-vv-as="FirstName" />
                                                        <div v-if="errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div>
                                                    </td>
                                                    <td>
                                                        <span v-if="item.user_id!=0">{{item.last_name}}</span>
                                                        <input type="text" v-bind:class="{'form-control disableAria':true,'is-invalid':(errors.has('lastName'))}" v-model.trim="item.last_name" v-validate="cutomerId==0?'required':''" maxlength="100" placeholder="LastName" v-if="item.user_id==0" name="lastName" data-vv-as="LastName" v-bind:aria-invalid="(errors.has('lastName'))" />
                                                        <div v-if="errors.has('lastName')" class="invalid-feedback">{{ errors.first('lastName') }}</div>
                                                    </td>
                                                    <td>
                                                        <span v-if="item.user_id!=0">{{item.email_id}}</span>
                                                        <input type="text" v-bind:class="{'form-control disableAria':true,'is-invalid':(errors.has('discount'))}" v-model.trim="item.email_id" v-validate="cutomerId==0?'required|email':''" maxlength="100" placeholder="Email" v-if="item.user_id==0" name="discount" data-vv-as="Email" v-bind:aria-invalid="(errors.has('discount'))" />
                                                        <div v-if="errors.has('discount')" class="invalid-feedback">{{ errors.first('discount') }}</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row flex-row-reverse mt-2">
                            <div class="col-lg-6 text-end">
                                <a href="javascript:;" data-tour="step: 1; title: enter DealDetail; content: AddDealDetailContent" v-bind:class="{disabled: submited}" class="btn btn-success" v-on:click="onSubmit(meta)" title="Save"><i class="fa fa-save pr-2"></i> Save</a>&nbsp;
                                <a href="/CRM/DealListing/" class="btn btn-danger" title="Cancel"><i class="fa fa-close pr-2"></i> Cancel</a>
                            </div>
                            <div class="col-lg-6">
                                <div class="py-2"><!--@HtmlHelpers.MandatoryStringFull("R")--></div>
                            </div>
                        </div>
                        <modal-add-industry v-if="showaddindustryModal" :parent="this" :baseUrl="BaseUrl" @@close="showaddindustryModal=false"></modal-add-industry>
                        <modal-add-lead-source v-if="showaddleadsourceModal" :parent="this" :baseUrl="BaseUrl" @@close="showaddleadsourceModal=false"></modal-add-lead-source>
                        <modal-add-role-title v-if="showaddroletitleModal" :parent="this" :baseUrl="BaseUrl" @@close="showaddroletitleModal=false"></modal-add-role-title>
                    </Form>
                </div>
            </div>
        </section>
    </section>
</template>

<!--<script src="../../../components/Common/DateTimePicker/vue-bootstrap-datetimepicker.min.js"></script>
<link href="../../../components/Common/DateTimePicker/vue-bootstrap-datetimepicker.css" rel="stylesheet" />
<script src="../../../components/Common/DateTimePicker/vue-bootstrap-datetimepicker-component.js"></script>-->
<script>
    import ModalAddIndustry from '../../../components/Common/Modal/AddIndustry.vue'
    import ModalAddLeadSource from '../../../components/Common/Modal/AddLeadSource.vue'
    import ModalAddRoleTitle from '../../../components/Common/Modal/AddRoleTitle.vue'
    var baseUrl = 'http://localhost:35924/';
    var ajaxRequestComplete = false;
    export default {
        components: {
            'modal-add-industry': ModalAddIndustry,
            'modal-add-lead-source': ModalAddLeadSource,
            'modal-add-role-title': ModalAddRoleTitle
        },
        data() {
            return {
                LeadData: null,
                LeadOwner: null,
                GroupBy: [],
                Channel: null,
                IndustryType: null,
                Status: null,
                BaseUrl: baseUrl,
                ApiURL: baseUrl + "api/FormLayout?id=&moduleName=CRM&subModuleCode=CRM_DEALS&langCode=en",
                //options: datePickerConfig,
                selected: false,
                selectoptions: [],
                submited: false,
                vSelectValidate: false,
                clientData: [],
                cutomerId: 0,
                isAccountSelected: false,
                showaddindustryModal: false,
                IndustryItemObject: null,
                LeadSourceItemObject: null,
                RoleTitleItemObject: null,
                showaddleadsourceModal: false,
                showaddroletitleModal: false,
                phoneList: [],
                options: {
                    format: 'DD/MM/YYYY h:mm:ss',
                    useCurrent: false,
                    showClear: true,
                    showClose: true,
                }
            }
        },
        mounted: function () {
            $(document).on('change', function () {
                $('div.dp__overlay_container.dp__container_block').css({ 'position': '' });
            });
        },
        created: function () {
            this.FetchData();
            //setTimeout(() => { this.$refs.form.resetForm();}, 100);
            $('div.dp__overlay_container.dp__container_block').css({ 'position': '' });
        },
        methods: {
            GetLocalizedValue: function (fieldName, displayName) {
                try {
                    //debugger;
                    if (this.isBlank(displayName)) {
                        var chk = this.$t(String(fieldName).toUpperCase());
                        if (chk != String(fieldName).toUpperCase()) {
                            return chk;
                        }
                        chk = this.$t(String(fieldName));
                        if (chk || /^\s*$/.test(chk) == true) {
                            return chk;
                        }
                        return fieldName;
                    }
                    else {
                        var chk = this.$t(String(displayName).toUpperCase());
                        if (chk != String(displayName).toUpperCase()) {
                            return chk;
                        }
                        chk = this.$t(String(displayName));
                        if (chk || /^\s*$/.test(chk) == true) {
                            return chk;
                        }
                        return displayName;
                    }
                }
                catch (ex) { console.log(ex) }
            },
            GetPhoneNumber: function (item, ctrl, id) {
                var vm = this;
                if ($.trim(item.custom_field_id) != "") {
                    item.value = $.trim(ctrl.formattedNumber);
                    if ($.trim(item.custom_field_id) != "") {
                        var PhnData = {
                            field_id: item.custom_field_id,
                            value: $.trim(ctrl.formattedNumber),
                            isValid: ctrl.isValid
                        }
                        var newdata = vm.phoneList.filter(v => v.field_id != item.custom_field_id);
                        newdata.push(PhnData);
                        vm.phoneList = newdata;
                        if (ctrl.isValid == false) {
                            $("#" + id).show();
                        }
                        else {
                            $("#" + id).hide();
                        }
                    }
                    if ($.trim(ctrl.phoneNumber) == "")
                        $("#" + id).hide();
                }
            },
            removeAriaInvalidFromElement: function () {
                $("input[name='firstName']").attr("aria-invalid", "false");
                $("input[name='lastName']").attr("aria-invalid", "false");
                $("input[name='discount']").attr("aria-invalid", "false");
            },
            onKeyDown: function () {
                ajaxRequestComplete = true;
            },
            onSearch: function onSearch(search, objItem, selctedValue) {
                showLoader();
                this.searchSelectData(search, this, objItem, selctedValue);
            },
            searchSelectData: function (search, vm, objItem, selctedValue) {
                this.ShowSearchData(search, vm, objItem, selctedValue);
            },
            ShowSearchData(search, vm, objItem, selctedValue) {
                //debugger;
                if (typeof (selctedValue) == 'undefined') {
                    selctedValue = 0;
                }
                var url = baseUrl + "api/Form/GetDDLData?id=&moduleName=CRM&type=" + objItem.field_code;
                if (objItem.dependent_type == 'fill') {
                    url += "&refId=" + selctedValue;
                }
                showLoader();
                axios.get(url + "&search=" + escape(search), {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                }).then(response => {
                    var json = response.data;
                    hideLoader();
                    if (json != null) {
                        return objItem.select_options = json.DATA;
                    }
                    hideLoader();
                });
            },
            GetValidation: function (object) {
                var obj = {};
                if (object.is_required == true) {
                    obj['required'] = true;
                }
                if (object.length > 0) {
                    obj['max'] = object.length;
                }
                if (object.validation_type == "email") {
                    obj['email'] = true;
                }
                if (object.dt_code == "date") {
                    obj['date_format'] = String(Globalize.culture().calendar.patterns.d).toUpperCase();
                }
                if (object.dt_code == "datetime") {
                    obj['date_format'] = String(Globalize.culture().calendar.patterns.d).toUpperCase() + " " + String(Globalize.culture().calendar.patterns.t).replace("t", "A").replace("t", "");
                }
                if (object.dt_code == "decimal" || object.dt_code == "float") {
                    obj['decimal'] = 2;
                    if (object.name == "ORIGNAL_CONVERSION_RATE") {
                        obj['min_value'] = 0;
                    }
                    if (object.name == "estimated_hours" || object.name == "estimated_cost" || object.name == "base_rate") {
                        obj['min_value'] = 1;
                    }
                }
                if (object.dt_code == "int" || object.dt_code == "bigint") {
                    obj['numeric'] = true;
                }
                if (object.dt_code == "url") {
                    obj['url'] = 'require_protocol';
                }
                if (object.regular_expression != null && object.regular_expression != "") {
                    obj['regex'] = object.regular_expression;
                }
                if (object.name == "project_named" && object.value != "") {
                    var regexp = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
                    obj['regex'] = regexp;
                }
                return obj;
            },
            openaddIndustrypopup: function (item) {
                this.IndustryItemObject = item;
                this.showaddindustryModal = true;
            },
            openaddLeadSourcepopup: function (item) {
                this.LeadSourceItemObject = item;
                this.showaddleadsourceModal = true;
            },
            openaddRoleTitlepopup: function (item) {
                this.RoleTitleItemObject = item;
                this.showaddroletitleModal = true;
            },
            onchangechannel: function (item, items) {
                var refId = '';
                var typeCode = '';
                if (item.name == "lead_source_id") {
                    showLoader();
                    var selectedName = $('select[data-vv-as="Lead source"] option:selected').text();
                    if (selectedName == "Partner" || selectedName == "Consultant" || selectedName == "Customer" || selectedName == "Provider") {
                        $(".campaignname").hide();
                        $(".referredby").show();
                        $.each(items, function (indx, child) {
                            if (child.name == "referred_by")
                                child.value = "";
                            if (child.name == "campaign_id")
                                child.value = "";
                        });
                    }
                    else if (selectedName == "Campaign") {
                        $(".referredby").hide();
                        $(".campaignname").show();
                        $.each(items, function (indx, child) {
                            if (child.name == "referred_by")
                                child.value = "";
                        });
                    }
                    else {
                        $.each(items, function (indx, child) {
                            if (child.name == "referred_by")
                                child.value = "";
                            if (child.name == "campaign_id")
                                child.value = "";
                        });
                        $(".referred_by").hide();
                        $(".campaignname").hide();
                    }

                    var typename = $('select[data-vv-as="Lead source"] option:selected').text();

                    var params = '';
                    var url = baseUrl + "api/Form/GetDDLData?id=&moduleName=CRM&type=ACCOUNTS_LIST&search=" + typename;
                    if (this.$route.params.data) {
                        params = JSON.parse(this.$route.params.data);
                    }
                    showLoader();
                    var vm = this;
                    var apiURL = vm.ApiURL;
                    if (params.id) {
                        url = baseUrl + "api/Form/GetDDLData?id=" + params.id + "&moduleName=CRM&type=ACCOUNTS_LIST&search=" + typename;
                    }
                    axios.get(url, {
                        headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                    }).then(function (response) {
                        var json = [];
                        if (response.data != null) {
                            json = response.data.DATA;
                        }
                        $.each(vm.GroupBy, function (index, item) {
                            $.each(item.LeadData, function (index, element) {
                                if (element.name == 'referred_by') {
                                    if (ajaxRequestComplete == true) {
                                        element.value = '';
                                    }
                                    element.select_options = json;
                                }
                            });
                        });
                    })
                }
                else if (item.name == 'account_id') {
                    typeCode = 'ACCOUNT_CONTACTS';
                    refId = item.value;
                    if (refId != '') {
                        showLoader();
                        var url = baseUrl + "api/Form/GetDDLData?id=&moduleName=CRM&type=" + typeCode + "&refId=" + refId;
                        axios.get(url, {
                            headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                        }).then(response => {
                            var json = [];
                            if (response.data != null) {
                                json = response.data.DATA;
                            }
                            $.each(this.GroupBy, function (index, item) {
                                $.each(item.LeadData, function (index, element) {
                                    if (element.name == 'contact_name') {
                                        if (ajaxRequestComplete == true) {
                                            element.value = '';
                                        }
                                        element.select_options = json;
                                    }

                                });
                            });
                            hideLoader();
                        });
                    }
                }
                else if (item.name == 'deal_country') {
                    typeCode = 'STATE';
                    refId = item.value;
                    if (refId != '') {
                        showLoader();
                        var url = baseUrl + "api/Form/GetDDLData?id=&moduleName=CRM&type=" + typeCode + "&refId=" + refId;
                        axios.get(url, {
                            headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                        }).then(response => {
                            var json = [];
                            if (response.data != null) {
                                json = response.data.DATA;
                            }
                            $.each(this.GroupBy, function (index, item) {
                                $.each(item.LeadData, function (index, element) {
                                    if (element.name == 'deal_state') {
                                        if (ajaxRequestComplete == true) {
                                            element.value = '';
                                        }
                                        element.select_options = json;
                                    }
                                });
                            });
                            hideLoader();
                        });
                    }
                }
                hideLoader();
            },
            getclientAssociatedWithAccount: function (accountId) {
                var data = {
                    sourceId: '',
                    moduleName: 'CRM',
                    subModuleCode: 'CRM_DEALS',
                    accountName: '',
                    contactIds: [],
                    accountId: accountId
                };
                var objectPostString = JSON.stringify(data);
                axios.post(baseUrl + 'api/ConvertLead', { postString: objectPostString }, {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                }).then(response => {
                    response.headers.get('Expires');
                    if (response.body[0].Status == "Success") {
                        var json = this.MakeNormalArray(response.body[0].Value);
                        this.clientData = json.CLIENTS;
                        var textValue = {
                            user_id: 0,
                            first_name: '',
                            last_name: '',
                            email_id: '',
                            account_id: accountId
                        };
                        this.clientData.push(textValue);
                        this.isAccountSelected = true;
                    }
                    hideLoader();
                    setTimeout("RadioButtonBootstrap()", 500);
                }, response => {
                    hideLoader();
                });
            },
            setSelectedValue(item, val) {
                var vm = this;
                try {
                    if (Array.isArray(val)) {
                        item.value = (typeof val[0] === 'object' && val[0] !== null) ? val[0].value : val[0];
                    }
                    else {
                        //debugger;
                        if (item.has_dependent > 0) {
                            $.each(this.GroupBy, $.proxy(function (key, parentItem) {
                                $.each(parentItem.LeadData, function (childKey, childItem) {
                                    if (childItem.parent_id == item.custom_field_id && childItem.dependent_type == 'fill') {
                                        vm.ShowSearchData('', vm, childItem, val.value);
                                    }
                                });
                            }, this));
                            //this.ShowSearchData(null, this, item, val.value);
                        }
                        item.value = val.value;
                    }
                    if (item.name == 'account_id') {
                        vm.getclientAssociatedWithAccount(item.value);
                        //vm.FillDropdown('ACCOUNT_CONTACTS', item.value);
                    }
                }
                catch (ex) {
                }
            },
            FetchData: function () {
                var params = '';
                if (this.$route.params.data) {
                    params = JSON.parse(this.$route.params.data);
                }
                showLoader();
                var vm = this;
                var apiURL = vm.ApiURL;
                if (params.id) {
                    apiURL = baseUrl + "api/FormLayout?id=" + params.id + "&moduleName=CRM&subModuleCode=CRM_DEALS&langCode=en";
                }
                axios.get(apiURL, {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                }).then(function (response) {
                    //debugger;
                    var Compphone = '';
                    var homephone = '';
                    var businessphone = '';
                    var Phones = [];
                    hideLoader();
                    vm.LeadData = response.data.data;
                    //this.GroupBy = this.LeadData;
                    if (vm.LeadData != null && vm.LeadData.length > 0) {
                        var groupId = vm.LeadData[0].group_id;
                        $.each(vm.LeadData, function (index, item) {
                            if (item.name == 'industry_type_id' || item.name == "lead_source_id" || item.name == "role_title_id") {
                                item.isPlusIcon = true;
                            }
                            if (item.name == 'customer_id') {
                                vm.cutomerId = item.value == '' ? 0 : item.value;
                            }
                            if (item.dt_code == 'checkbox') {
                                item.select_value = item.value.split(',');
                            }
                            if (item.name == "mobile_phone") {
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
                            if (item.name == 'lead_source_id' && params.id) {
                                if (item.value != '') {
                                    setTimeout(function () {
                                        vm.onchangechannel(item, null);
                                    }, 500)
                                }
                            }
                            groupId = item.group_id;
                            var chkGroup = $.grep(vm.GroupBy, function (element, index) {
                                return element.group_id == groupId;
                            });
                            //debugger;
                            if (chkGroup.length == 0) {
                                var returnedData = $.grep(vm.LeadData, function (element, index) {
                                    return element.group_id == groupId;
                                });
                                if (params.id) {
                                    $.each(returnedData, function (filedIndex, fieldItem) {
                                        if (fieldItem.dt_code == "select") {
                                            try {
                                                fieldItem.value = fieldItem.value.trim();
                                            } catch (ex) { console.log("value is null while trimming") }
                                        }
                                        if (fieldItem.dropdown_type == "custom" && fieldItem.picklist_options == "Lookup") {
                                            fieldItem.select_options = vm.MakeNormalArray(fieldItem.select_options);
                                            fieldItem.select_value = fieldItem.select_options;
                                            if (fieldItem.select_options != null && fieldItem.select_options.length > 0) {
                                                fieldItem.value = fieldItem.select_options[0];
                                            }
                                        }
                                        else if (fieldItem.dt_code == "decimal" && fieldItem.form_field_visibility == "YES" && fieldItem.value > 0) {
                                            fieldItem.value = parseFloat(fieldItem.value, 10).toFixed(2);
                                        }
                                        else if (fieldItem.dt_code == "date") {
                                            //fieldItem.value = vm.formatDate(fieldItem.value);
                                            fieldItem.value = fieldItem.value.trim();
                                        }
                                    });
                                }
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
                        console.log('GroupBy:', vm.GroupBy);
                        //setTimeout(function () {
                        //    if (Phones.length > 0)
                        //        $.each(Phones, function (ind, phn) {
                        //            $.each(vm.$children, function (indx, elements) {
                        //                if (elements.$children.length > 0) {
                        //                    if (elements.$el._prevClass.indexOf("vue-phone-number-input") > -1 && elements.$el.id == phn)
                        //                        elements.countryCode = 'US';
                        //                    else if (elements.$el._prevClass.indexOf("vue-phone-number-input") > -1)
                        //                        elements.countryCode = 'US';
                        //                }
                        //            });
                        //        });
                        //    $('input[name="deal_name"]').focus();
                        //}, 300);

                        setTimeout(function () {
                            $(".referredby").hide();
                            $(".campaignname").hide();
                        }, 500);

                        if (params.id) {
                            setTimeout(function () {
                                var selectedName = $('select[data-vv-as="Lead source"] option:selected').text();
                                if (selectedName == "Partner" || selectedName == "Consultant" || selectedName == "Provider" || selectedName == "Customer") {
                                    $(".campaignname").hide();
                                    $.each(items, function (indx, child) {
                                        if (child.name == "referred_by")
                                            child.value = "";
                                        if (child.name == "campaign_id")
                                            child.value = "";
                                    });
                                }
                                else if (selectedName == "Campaign") {
                                    $(".campaignname").show();
                                    $(".referredby").hide();
                                }
                                else {
                                    $(".campaignname").hide();
                                    $(".referredby").hide();
                                    $.each(vm.GroupBy, function (indx, child) {
                                        $.each(child.LeadData, function (ind, child1) {
                                            if (child1.name == "referred_by")
                                                child1.value = "";
                                            if (child1.name == "campaign_id")
                                                child1.value = "";
                                        });
                                    });
                                }
                            }, 500);
                        }
                        else {
                            setTimeout(function () {
                                $(".referredby").hide();
                                $(".campaignname").hide();
                            }, 500);
                        }
                    }
                    setTimeout("CheckBoxBootstrap()", 100);
                    setTimeout("RadioButtonBootstrap()", 500);
                    setTimeout("ShowPopOver()", 500);
                });
            },
            isBlank: function (str) {
                return (!str || /^\s*$/.test(str));
            },
            MakeNormalArray: function (value) {
                if (value) {
                    try {
                        return JSON.parse(value);
                    }
                    catch (ex) {
                        return value;
                    }
                }
                else {
                    value = [];
                }
            },
            openaddLeadSourcepopup: function (item) {
                this.LeadSourceItemObject = item;
                this.showaddleadsourceModal = true;
            },
            isRequired(value) {
                if (value && value.trim()) {
                    return true;
                }
                return 'This is required';
            },
            GetFieldPlaceHolder: function (str, displayName, isfor) {
                var name = this.GetLocalizedValue(str, displayName);
                try {
                    if (isfor == "select") {
                        name = $t('SelectField', [name]);
                    }
                    else {
                        if (displayName == 'PONumber') {
                            name = name;
                        } else {
                            name = $t('EnterField', [name]);
                        }
                    }
                    return name;
                }
                catch (ex) {
                    return name;
                }
            },
            SubmitData(e) {
                var vm = this;
                vm.$validator.validate().then(function (valid) {
                    vm.vSelectValidate = true;
                    if (valid) {
                        //debugger;
                        vm.submited = true;
                        showLoader();
                        var fullJson = vm.LeadData;
                        var data = [];
                        var validation = [];
                        var Isvalidcnt = 0;
                        //var obj = jQuery.parseJSON(this.data);
                        var selectedRadioValue = $("input[name='radio_clients']:checked").val();
                        var selectedClient = $.grep(vm.clientData, function (element, index) {
                            return element.user_id == selectedRadioValue;
                        });
                        $.each(fullJson, function (key, item) {
                            //data[item.name] = item.value;
                            // data["custom_field_id"] = item.custom_field_id
                            var validationObject = {
                                field_name: item.name,
                                required: item.is_required,
                                length: item.length,
                                type: item.validation_type
                            };
                            var fieldValue = (item.name == "deal_id" ? "@id" : item.value);
                            if (item.dt_code == "date") {
                                fieldValue = item.value;
                            }
                            if (item.dt_code == "checkbox") {
                                var filtered = item.select_value.filter(function (el) {
                                    return (el != null && el != "");
                                });
                                fieldValue = filtered.join(',');
                            }
                            if (item.name == "mobile_phone" || item.name == "home_phone" || item.name == "business_phone") {
                                var datalist = vm.phoneList.filter(v => v.field_id == item.custom_field_id);
                                if (datalist.length > 0) {
                                    item.value = $.trim(datalist[0].value);
                                    fieldValue = $.trim(datalist[0].value);
                                    if (datalist[0].isValid == false && $.trim(item.value).length > 0) {
                                        Isvalidcnt++;
                                    }
                                }
                            }
                            if (item.dt_code == "select") {
                                try {
                                    fieldValue = (typeof fieldValue === 'object' && fieldValue !== null) ? fieldValue.value : fieldValue
                                } catch (ex) { }
                            }
                            var dataObject = {
                                field_name: item.name,
                                field_value: fieldValue,
                                custom_field_id: item.custom_field_id
                            };
                            data.push(dataObject);
                            validation.push(validationObject);
                        });
                        if (Isvalidcnt > 0) {
                            hideLoader();
                            vm.submited = false;
                            return false;
                        }
                        var postJSON = {
                            data: data,
                            validation: validation,
                            clientData: selectedClient
                        };
                        var objectPostString = JSON.stringify(postJSON);
                        vm.$http.post(baseUrl + 'api/PostDeal', { postString: objectPostString }, {
                            headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                        }).then(response => {
                            response.headers.get('Expires');
                            if (response.body[0].Code == "1") {
                                //debugger;
                                if (0 > 0) {
                                    //debugger;
                                    ShowAlert(String.Format(Globalize.localize('UpdatedSuccess'), Globalize.localize('Deal')), "success", true, Globalize.localize("Alert"));
                                }
                                else {
                                    ShowAlert(String.Format(Globalize.localize('AddedSuccess'), Globalize.localize('Deal')), "success", true, Globalize.localize("Alert"));
                                }
                                //window.location.href = "@Context.Request.Query["reqfrom"]";
                            }
                            else {
                                ShowAlert(String.Format(Globalize.localize('AddedError'), Globalize.localize('Deal')), "failure", true, Globalize.localize("Alert"));
                            }
                            hideLoader();
                            vm.submited = false;
                        }, response => {
                            hideLoader();
                        });
                    }
                });
            },
            onSubmit(meta) {
                alert(meta.valid);
                meta.touched = true;
                this.$refs.form.setFieldTouched('deal_name', true);
                this.$refs.form.setFieldTouched('email_id', true);
                this.$refs.form.validate();
            }
        },
        setup() {
            const format = (date) => {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                return `${month}/${day}/${year}`;
            }

            return {
                format,
            }
        }
    }
</script>