<script setup>
    import { storeToRefs } from "pinia";
    import axios from 'axios';
    import { useRoute } from 'vue-router'
    import Pager from '@/components/Common/Pager.vue'
    import { loggedUserInfo, moduleStore } from "@/stores/UserInfo";
    import { RouterLink } from "vue-router";
    const { GetUserInfo } = storeToRefs(loggedUserInfo());
    const { GetModuleId } = storeToRefs(moduleStore());
    const { SetModuleId } = moduleStore();

    const route = useRoute();
    //console.log(GetName);

</script>
<template>
    <!--<div class="about">
        <h1>This is an about page</h1>
        <p> {{ $t('ACCOUNT_NAME') }}</p><br />
        <p> {{ $t('AccountAddress') }}</p>
    </div>-->
    <section>
        <div class="container-fluid padding-t_10">
            <div class="left-menu-tab">
                <left-search v-bind:header="'@Resources.Leads'" v-bind:fields="leftSearchFields" v-bind:callbackfunction="FetchData" modulename="CRM"></left-search>
            </div>
            <div class="right-content">
                <div class="col-md-12 p-0">
                    <div class="theme-primary partition p-actions-expand">
                        <span class="p-actions float-end">
                            <a href="javascript:;" class="p-action-btn text-white" :title='$t("PageTour")' v-on:click="PageTourStart()"><i class="fa fa-road" aria-hidden="true"></i><br>{{$t("PageTour")}}</a>
                            <a class="p-action-btn text-white" v-on:click="removeFilter();" v-if="searchCondition == ''" title='$t("Reset")' href="javascript:;">
                                <i class="fa fa-filter text-danger"></i><br /><span>{{ $t("Reset") }} {{ $t("Filter") }}</span>
                            </a>
                            <a class="p-action-btn text-white" v-on:click="openFilterPopUp();" :title='$t("Filter")' href="javascript:;">
                                <i v-bind:class="{'fa fa-filter' : true , 'text-success': searchCondition==''}"></i><br /><span>{{ $t("Filter") }}</span>
                            </a>
                            <a href="javascript:;" class="p-action-btn text-white" v-on:click="ManageView()" title="@Resources.ManageView">
                                <i class="fa fa-list-alt"></i><br /><span>{{ $t("ManageView") }}</span>
                            </a>
                            <RouterLink to="/CRM/ManageLead" class="p-action-btn text-white dash" checkPrivilege="Yes">
                                <i class="fa fa-plus"><br /></i><br /><span> {{$t('Add')}} {{$t('Lead')}}</span>
                            </RouterLink>
                            <a class="p-action-btn text-white" title="@Resources.ExportToExcel" href="javascript:;" v-on:click="DownloadExcelData()">
                                <i class="fa fa-file-excel-o"></i><br /><span>{{ $t("ExportToExcel") }}</span>
                            </a>
                            <a href="javascript:;" class="p-action-btn text-white" title="@Resources.ImportLeads" v-on:click="checkPrivilegeImport($event)">
                                <i class="fa fa-users"></i><br /><span>{{ $t("ImportLeads") }}</span>
                            </a>
                            <a class="p-action-btn text-white iconenable disabled" href="javascript:;" title="@Resources.CrmChangeLeadOwner" id="ChangeOwnerId" v-on:click="ChangeLeadOwner">
                                <i class="fa fa-user"></i><br /><span>{{ $t("ChangeLeadOwner") }}</span>
                            </a>
                            <a class="p-action-btn text-white iconenable disabled" href="javascript:;" title="@Resources.AdditionalOwner" id="AdditionalOwnerId" v-on:click="checkPrivilegeDetailsForOwner($event, null);">
                                <i class="fa fa-user-plus"></i><br /><span>{{ $t("AdditionalOwner") }}</span>
                            </a>
                            <a href="javascript:;" title="@Resources.SendEmail" class="p-action-btn text-white  disabled" id="Sendbulkmail" v-on:click="SendBulkEmail">
                                <i class="fa fa-envelope"></i><br /><span>{{ $t("SendEmail") }}</span>
                            </a>
                            <a href="javascript:;" class="p-action-btn text-white  disabled " id="CloseLeadId" v-on:click="closeLead" title="@Resources.CrmCloseLeads">
                                <i class="fa fa-close"></i><br /><span>{{ $t("CloseLeads") }}</span>
                            </a>
                            <a class="p-action-btn text-white  disabled" title="@Resources.CrmDelete" id="DeleteMultiple" v-on:click="commonDeleteData" href="javascript:;">
                                <i class="fa fa-trash-o"></i><br /><span>{{ $t("Delete") }}</span>
                            </a>
                        </span>
                        <span class="collapse-head-btns">
                            <a href="javascript:;" class="collapse-btns"><i class="fa fa-angle-up text-white"></i></a>
                        </span>
                    </div>
                </div>
                <div class="py-2 d-inline-block">
                    <span class="legend-pending colorboxsquare"></span>{{ $t('CloseLeadLegend', ['Lead']) }}
                </div>
                <div class="mr-2 d-inline-block">
                    <span class="legend-pending colorboxsquare1"></span>{{ $t("sampleData") }}
                </div>
                <div class="listing">
                    <div class="expand-list">
                        <a href="javascript:;" v-bind:class="{'filter-selected':conditionForInstantSearch != ''}" class="expand-list-btn justify-content-center align-items-center">
                            <i class="icon-solid arrow-solid-left text-white" style="font-size:9pt"></i>
                        </a>
                    </div>
                    <div class="table-responsive table-fix-header">
                        <table id="tablelistingdata" class="table table-bordered mt-0" style="width:100%">
                            <thead class="thead-bg">
                                <tr>
                                    <th style="width:50px !important;" class="text-center"><input id="chkAll" class="chkitems" value="" type="checkbox" v-on:change="onChange()"></th>
                                    <template v-for="item in Headers">
                                        <th v-if="item.VISIBLE" style="text-transform:capitalize;" v-bind:id="item.COLUMN_NAME" v-bind:style="[(item.COLUMN_NAME=='status_name') ? {'width':'10%'} : {'width':''}]">
                                            <span>{{GetLocalizedValue(item.COLUMN_NAME,item.DISPLAY_NAME)}}</span>
                                        </th>
                                    </template>
                                    <th class="nonresize text-center"><span>{{ $t("Action") }}</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in LeadData" v-bind:class="{'warning-bar':item.status_id=='Closed'}">
                                    <td class="text-center"><input class="chkItems" v-bind:disabled="item.status_id=='Closed' || item.is_additional_lead_owner != 'NO'" v-bind:value="item.lead_id" type="checkbox" v-on:change="onChange()"></td>
                                    <template v-for="key in Headers">
                                        <td v-if="key.VISIBLE" v-bind:class="{'text-center':key.COLUMN_NAME=='status_name', 'text-right':key.DATA_TYPE=='decimal'}">
                                            <span v-if="(key.DATA_TYPE=='date' || key.DATA_TYPE=='datetime') && (key.DATA_TYPE !='decimal')" class="text-overflow-dynamic-container">{{$filters.formatDate(item[key.COLUMN_NAME])}}</span>
                                            <span v-bind:title="item[key.COLUMN_NAME]" v-if="(key.DATA_TYPE!='date' && key.DATA_TYPE!='datetime' && key.DATA_TYPE !='decimal' && key.COLUMN_NAME != 'client_first_name'  && key.COLUMN_NAME !='status_id')" class="text-overflow-dynamic-container">{{TruncateStr(item[key.COLUMN_NAME],30)}}</span>
                                            <span v-bind:title="item[key.COLUMN_NAME]" v-if="(key.DATA_TYPE!='date' && key.DATA_TYPE!='datetime' && key.DATA_TYPE !='decimal' && key.COLUMN_NAME == 'client_first_name')"><a v-bind:data-tour="index==0?'step: 4; title: @Resources.ViewDetail; content: @Resources.ViewLeadContent':null" v-bind:href="'/CRM/ViewLeadDetails?id='+item.lead_id+'&moduleName=CRM&subModuleCode=CRM_LEADS&reqfrom=/CRM/Index'" style="color:dodgerblue;" class="text-overflow-dynamic-container">{{TruncateStr(item[key.COLUMN_NAME],30)}}</a></span>
                                            <span v-bind:title="item[key.COLUMN_NAME]" v-if="(key.DATA_TYPE =='decimal' && key.COLUMN_NAME !='status_id')">{{item[key.COLUMN_NAME]}}</span>
                                            
                                          
                                        </td>
                                    </template>
                                    <td class="text-center mobile-action">
                                        <span class="actions mobileaction">
                                            <i class="fa fa-ellipsis-h action_icon" aria-hidden="true"></i>
                                            <span class="action-list-box">
                                                <span class="list-actions" id="action-list">
                                                    <a class="actions-onclick" v-on:click="openQuickLeadViewModal(item.lead_id)" href="javascript:;" typetitle="@Resources.QuickView" typefor="@Resources.QuickView" v-bind:value="item.lead_id" title="@Resources.View">
                                                        <i class="fa fa-eye text-info action-icon"></i>
                                                        <span class="text">@Resources.QuickView</span>
                                                    </a>
                                                    <a class="actions-onclick" v-on:click="checkPrivilegeView($event)" v-bind:href="'/CRM/ViewLeadDetails?id='+item.lead_id+'&moduleName=CRM&subModuleCode=CRM_LEADS&reqfrom=/CRM/Index'" typetitle="@Resources.View" typefor="Edit" v-bind:value="item.lead_id" title="@Resources.View">
                                                        <i class="fa fa-eye action-icon"></i>
                                                        <span class="text">@Resources.View</span>
                                                    </a>
                                                    <a class="actions-onclick" v-on:click="checkPrivilegeDetails($event, item);" v-if="(((item.existing_client_id) || (item.project_id))  && (item.status_id!='Closed' && item.status_id!='Cancelled') )" v-bind:href="'/CRM/ManageLead?id='+item.lead_id+'&isEdit=YES&moduleName=CRM&subModuleCode=CRM_LEADS&reqfrom=/CRM/Index'" typetitle="@Resources.Edit" typefor="Edit" v-bind:value="item.lead_id" title="@Resources.Edit">
                                                        <i class="fa fa-pencil text-success action-icon"></i>
                                                        <span class="text">@Resources.Edit</span>
                                                    </a>
                                                    <a class="actions-onclick" href="javascript:;" v-on:click="openNoteListPopUp(item,index)" v-bind:value="item.lead_id" title="@Resources.Notes" data-original-title="@Resources.Notes">
                                                        <i class="fa fa-sticky-note-o text-primary action-icon"></i>
                                                        <span class="text">@Resources.Notes <span class="text-primary">{{"(" + item.note_count + ")"}}</span></span>
                                                    </a>
                                                    <a href="javascript:;" class="actions-onclick" typetitle="@Resources.FollowUps" v-if="item.status_id!='Closed'" typefor="FollowUps" v-on:click="openAddNewEvent(item.lead_id, item)" v-bind:value="item.lead_id" title="@Resources.FollowUps">
                                                        <i class="fa fa-flag text-muted action-icon"></i>
                                                        <span class="text">@Resources.FollowUps</span>
                                                    </a>
                                                    <a href="javascript:;" class="actions-onclick" typetitle="@Resources.Reopen" data-original-title="@Resources.Reopen" v-if="item.status_id == 'Closed'" typefor="Reopen" v-on:click="ReopenLead(item.lead_id)" v-bind:value="item.lead_id" title="@Resources.Reopen">
                                                        <i class="fa fa-refresh text-danger action-icon"></i>
                                                        <span class="text">@Resources.Reopen</span>
                                                    </a>
                                                    <a href="javascript:;" v-if="(((item.existing_client_id) || (item.project_id))  && (item.status_id!='Closed' && item.status_id!='Inactive' && item.status_id!='Draft' && item.status_id!='Cancelled')  )" class="actions-onclick" typefor="ConvertLead" typetitle="@Resources.ConvertLead" value="item.lead_id" title="@Resources.ConvertLead" v-on:click="openConvertLeadModel(item.lead_id, ((item.client_first_name!=null)?item.client_first_name:'')+ ' ' + ((item.client_last_name!=null)?item.client_last_name:''))">
                                                        <i class="fa fa-retweet text-warning action-icon"></i>
                                                        <span class="text">@Resources.ConvertLead</span>
                                                    </a>
                                                    <i class="fa fa-times close close-action" aria-hidden="true"></i>
                                                </span>
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="noRecord">
                                    <td class="text-center text-danger no-record" colspan="17">{{ $t("NoRecordfound") }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--<pager-control v-bind:numberofrecords="TotalRecords" prev-text="@Resources.Prev" first-text="@Resources.First" last-text="@Resources.Last" next-text="@Resources.Next" v-bind:callbackfunction="FetchData"></pager-control>-->
                    <Pager v-bind:numberofrecords="TotalRecords" prev-text="Prev" first-text="First" last-text="Last" next-text="Next" v-bind:callbackfunction="FetchData"></Pager>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    var baseUrl = "http://localhost:35924/";
    function showLoader() {

    }
    function hideLoader() {

    }

    function TruncateStr(str, len) {
        var convertstring = '' + str;
        if (convertstring != null)
            if (convertstring.length <= len) return str;
            else return convertstring.substring(0, len) + "...";
    }
    export default {
        data() {
            return {
                LeadData: null,
                clientemail: '',
                NameSearch: '',
                CompanyName: '',
                hdnOwnerId: '',
                Headers: null,
                souceID: 0,
                showAddEventModal: false,
                showLeadOwnerModal: false,
                TotalRecords: 0,
                PageNumber: 1,
                PageSize: 10,
                SortBy: '',
                SortExp: '',
                PageSizeOption: null,
                CurrentPage: 1,
                TotalPages: 0,
                GroupStart: 1,
                GroupEnd: 3,
                Status: '',
                OwnerId: '',
                OwnerIds: [],
                SearchClient: '',
                leadDateFrom: '',
                leadDateTo: '',
                SearchCompay: '',
                Channel: '',
                showImportModal: false,
                showConvertLead: false,
                showAddEmailTemplate: false,
                convertLeadValue: {
                    value: null,
                    name: ''
                },
                modalItem: [],
                showExportModal: false,
                showModal: false,
                ApiURL: baseUrl + "api/LeadListing",
                noRecord: false,
                showFilter: false,
                searchCondition: '',
                showQuickLeadViewModal: false,
                showNoteModal: false,
                isShowLeadNoteDialogue: false,
                idForViewRecord: null,
                NoRecordForTabNotes: false,
                LeadIdForViewNote: null,
                LeadOwnerList: null,
                LeadStatusList: null,
                selectedLeadOwner: [],
                IsAnySearch: false,
                CurIndex: 0,
                BaseUrlForManageView: "http://localhost:35924/",
                commonAPIUrl: "http://localhost:12597/",
                conditionForInstantSearch: "",
                showAdditionalOwnerPopup: false,
                leftSearchFields: [{
                    fieldName: '@Resources.Email',
                    fieldType: "text",
                    fieldIcon: "fa-envelope",
                    fieldSearchConditionName: ['LEAD.CLIENT_EMAIL'],
                    isSearch: false,
                    value: "",
                    listOptions: []
                }, {
                    fieldName: '@Resources.LEAD_NAME',
                    fieldType: "text",
                    fieldIcon: "fa-file",
                    fieldSearchConditionName: ['LEAD.CLIENT_FIRST_NAME', 'LEAD.CLIENT_LAST_NAME'],
                    isSearch: false,
                    value: "",
                    listOptions: []
                }, {
                    fieldName: 'Lead Owner',
                    fieldType: "ddl-check",
                    fieldIcon: "fa-user",
                    fieldSearchConditionName: ['LEAD.LEAD_OWNER_ID'],
                    isSearch: false,
                    value: "",
                    listOptions: []
                }, {
                    fieldName: '@Resources.Status',
                    fieldType: "ddl-check",
                    fieldIcon: "fa fa-file-text-o",
                    fieldSearchConditionName: ['LEAD.STATUS_ID'],
                    isSearch: false,
                    value: "",
                    listOptions: []
                }
                ]

            }
        },
        created: function () {
            this.SetModuleId(20340);
            var ths = this;
            //ths.getStatuslistForListing(ths.commonAPIUrl, 'CRM', 'en', "@tokenid");
            //ths.GetLeadOwnerlist();
            //ths.GetSearchStatusList();
            ths.FetchData();
        },
        //mixins: [listingMixin, commonMixin],
        methods: {
            isBlank: function (str) {
                return (!str || /^\s*$/.test(str));
            },
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
            FetchData: function () {
                showLoader();
                var vueObj = this;
                vueObj.TotalRecords = 0;
                var url = vueObj.ApiURL + "?isPaged=1&pageSize=" + vueObj.PageSize + "&pageNum=" + vueObj.PageNumber + "&sortBy=" + vueObj.SortBy + "&sortExp=" + vueObj.SortExp;
                var srchCondition = "";
                /*if (!this.isBlank(this.searchCondition)) {
                    srchCondition = srchCondition + this.searchCondition;
                }
                if (!this.isBlank(this.conditionForInstantSearch)) {
                    srchCondition = srchCondition + ((!this.isBlank(this.searchCondition)) ? (" AND " + this.conditionForInstantSearch) : this.conditionForInstantSearch);
                }*/
                if (srchCondition != "") {
                    url = url + "&searchCondition=" + srchCondition;
                }
                //alert(url);
                axios.get(url, {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                }).then(function (response) {
                    hideLoader();
                    //debugger;
                    if (response.data != "" && response.data != null) {
                        //debugger;
                        vueObj.Headers = response.data.schema;
                        if (response.data.data.length > 0) {
                            vueObj.LeadData = response.data.data;
                            vueObj.TotalRecords = response.data.data[0].total_records;
                            vueObj.TotalPages = Math.ceil(vueObj.TotalRecords / vueObj.PageSize);
                            //debugger;
                            vueObj.CurrentPage = vueObj.PageNumber;

                            vueObj.noRecord = false;
                        } else {
                            vueObj.noRecord = true;
                            vueObj.LeadData = [];
                            vueObj.TotalRecords = 0
                        }
                    }
                    else {
                        vueObj.noRecord = true;
                        vueObj.LeadData = [];
                        vueObj.Headers = [];
                        vueObj.TotalRecords = 0
                    }
                    setTimeout("ResponsiveDataTable('tablelistingdata')", 500);
                    //GetWalkThrough(baseUrl + "api/Common/GetWalkThroughViewOrNot", current_Url, "", 0);
                });
            },

        },
    }

</script>
