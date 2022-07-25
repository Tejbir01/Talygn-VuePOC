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
                        <span class="p-actions float-right">
                            <a href="javascript:;" class="p-action-btn text-white" :title="$t('PageTour')" v-on:click="PageTourStart()"><i class="fa fa-road" aria-hidden="true"></i><br>{{$t('PageTour')}}</a>
                            <a class="p-action-btn text-white" v-on:click="cancelOrRefresh();" v-if="!this.isBlank(searchCondition)" title="@Resources.Reset @Resources.Filter" href="javascript:;">
                                <i class="fa fa-filter text-danger"></i><br /><span> {{$t('Reset')}} {{$t('Filter')}}</span>
                            </a>
                            <a class="p-action-btn text-white" v-on:click="openFilterPopUp();" :title="$t('Filter')" href="javascript:;">
                                <i v-bind:class="{'fa fa-filter' : true , 'text-success': !this.isBlank(searchCondition)}"></i><br /><span> {{$t('Filter')}}</span>
                            </a>
                            <a href="javascript:;" class="p-action-btn text-white" v-on:click="ManageView()" title="$t('ManageView')">
                                <i class="fa fa-list-alt"></i><br /><span>{{$t('ManageView')}}</span>
                            </a>
                            <RouterLink to="/CRM/ManageDeal" class="p-action-btn text-white dash" checkPrivilege="Yes">
                                <i class="fa fa-plus"><br /></i><br /><span> {{$t('Add')}} {{$t('Deal')}}</span>
                            </RouterLink>
                            <a class="p-action-btn text-white iconenable disabled" href="javascript:;" title="@Resources.Change @Resources.DEAL_OWNER" id="ChangeOwnerId" v-on:click="ChangeDealOwner">
                                <i class="fa fa-user"></i><br /><span>{{$t('Change')}} {{$t('DEAL_OWNER')}}</span>
                            </a>
                            <a class="p-action-btn text-white iconenable disabled" href="javascript:;" title="@Resources.AdditionalOwner" id="AdditionalOwnerId" v-on:click="checkPrivilegeDetailsForOwner($event, null);">
                                <i class="fa fa-user-plus"></i><br /><span>{{$t('AdditionalOwner')}}</span>
                            </a>
                            <a class="p-action-btn text-white" title="@Resources.ExportToExcel" href="javascript:;" v-on:click="DownloadExcelData()">
                                <i class="fa fa-file-excel-o"></i><br /><span>{{$t('ExportToExcel')}}</span>
                            </a>
                            <a class="p-action-btn text-white  disabled" :title="$t('CrmDelete')" id="DeleteMultiple" v-on:click="commonDeleteData" href="javascript:;">
                                <i class="fa fa-trash-o"></i><br /><span>{{$t('CrmDelete')}}</span>
                            </a>
                        </span>
                        <span class="collapse-head-btns">
                            <a href="javascript:;" class="collapse-btns"><i class="fa fa-angle-up text-white"></i></a>
                        </span>
                    </div>
                </div>
                <div class="py-2 d-inline-block">
                    <span class="legend-pending colorboxsquare"></span>{{ $t('CloseLeadLegend', ['Deal']) }}
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
                                            <span v-on:click="sortdata(item.COLUMN_NAME)" v-bind:class="{sort: item.SORTABLE==true, tb_headerSortUp :  SortExp=='ASC' && SortBy==item.COLUMN_NAME, tb_headerSortDown :  SortExp=='DESC' && SortBy==item.COLUMN_NAME}" v-if="item.VISIBLE && item.SORTABLE == true">{{GetLocalizedValue(item.COLUMN_NAME,item.DISPLAY_NAME)}}</span>
                                            <span v-if="item.SORTABLE == false">{{GetLocalizedValue(item.COLUMN_NAME,item.DISPLAY_NAME)}}</span>
                                        </th>
                                    </template>
                                    <th class="nonresize text-center"><span>{{ $t("Action") }}</span></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(item,index) in DealData" v-bind:class="{'warning-bar':item.status_id=='Closed'}">
                                    <td class="text-center"><input class="chkItems" v-bind:disabled="item.status_id=='Closed'" v-bind:value="item.deal_id" type="checkbox" v-on:change="onChange()"></td>
                                    <template v-for="key in Headers">
                                        <td v-if="key.VISIBLE" v-bind:class="{'text-center':key.COLUMN_NAME=='status_id', 'text-right':key.DATA_TYPE=='decimal'}">
                                            <span v-if="(key.DATA_TYPE=='date' || key.DATA_TYPE=='datetime') && (key.DATA_TYPE !='decimal')"
                                                  class="text-overflow-dynamic-container">{{item[key.COLUMN_NAME] | formatDate}}</span>
                                            <span v-bind:title="item[key.COLUMN_NAME]" v-if="(key.DATA_TYPE!='date' && key.DATA_TYPE!='datetime' && key.DATA_TYPE !='decimal' && key.COLUMN_NAME != 'deal_name'  && key.COLUMN_NAME !='status_id')" class="text-overflow-dynamic-container">{{TruncateStr(item[key.COLUMN_NAME],30)}}</span>
                                            <span v-bind:title="item[key.COLUMN_NAME]" v-if="(key.DATA_TYPE =='decimal')">{{convertDecimalValueInFormat(item[key.COLUMN_NAME])}}</span>
                                            <span v-bind:title="item[key.COLUMN_NAME]" v-if="(key.DATA_TYPE!='date' && key.DATA_TYPE!='datetime' && key.DATA_TYPE !='decimal' && key.COLUMN_NAME == 'deal_name')"><a v-bind:data-tour="index==0?'step: 4; title: @Resources.ViewDetail; content: @Resources.ViewDealDetailContent':null" v-bind:href="'/CRM/ViewDealDetails?id='+item.deal_id+'&moduleName=CRM&subModuleCode=CRM_DEALS&reqfrom=/CRM/DealListing'" style="color:dodgerblue;" class="text-overflow-dynamic-container" v-on:click="checkPrivilegeView($event)">{{TruncateStr(item[key.COLUMN_NAME],50)}}</a></span>
                                            <span v-if="(key.COLUMN_NAME =='status_id' && isCRMShowStausDrop(item.status_id, 'CRM_DEALS') == true)" v-bind:data-tour="index==0?'step: 2; title: @Resources.Status @Resources.Update; content: @Resources.UpdateDealStatusContent':null">
                                                <listing-status isfor="CRM_DEALS" ref="updatestatus" v-bind:apiurl="commonAPIUrl" v-bind:dataid="item.deal_id" data-controller="Crm" v-bind:statuslist="StatusListForListing" v-bind:item="item" data-action="DealListing" tokeid="@tokenid" v-bind:dataselected="item.status_id" v-bind:callbackfunction="FetchData" v-bind:isselectedvaluestring="true">
                                                </listing-status>
                                            </span>
                                            <a class="inactive-disabled" v-if="key.COLUMN_NAME =='status_id' && isCRMShowStausDrop(item.status_id, 'CRM_DEALS') == false">
                                                <span v-bind:class="getStatusClass(item.status_id,key.COLUMN_NAME)">
                                                    {{item[key.COLUMN_NAME]}}
                                                </span>
                                            </a>
                                        </td>
                                    </template>
                                    <td class="text-center mobile-action">
                                        <span class="actions mobileaction">
                                            <i class="fa fa-ellipsis-h action_icon" aria-hidden="true" v-on:click="editDeal(item.deal_id)"></i>
                                            <span class="action-list-box">
                                                <span class="list-actions" id="action-list">
                                                    <a class="actions-onclick" v-on:click="checkPrivilegeView($event)" v-bind:href="'/CRM/ViewDealDetails?id='+item.deal_id+'&moduleName=CRM&subModuleCode=CRM_DEALS&reqfrom=@(Url.Action(actionName,controllerName))'" typetitle="@Resources.View" typefor="Edit" v-bind:value="item.deal_id" title="@Resources.View">
                                                        <i class="fa fa-eye text-info action-icon"></i>
                                                        <span class="text">@Resources.View</span>
                                                    </a>
                                                    <a class="actions-onclick" v-on:click="checkPrivilegeDetails($event)" v-bind:href="'/CRM/ManageDeal?id='+item.deal_id+'&isEdit=YES&moduleName=CRM&subModuleCode=CRM_DEALS&reqfrom=@(Url.Action(actionName,controllerName))'" typetitle="@Resources.Edit" typefor="Edit" v-bind:value="item.deal_id" title="@Resources.Edit">
                                                        <i class="fa fa-pencil text-success action-icon"></i>
                                                        <span class="text">@Resources.Edit</span>
                                                    </a>
                                                    <a href="javascript:;" class="actions-onclick" typetitle="@Resources.FollowUps" typefor="FollowUps" v-bind:value="item.Deal_id" title="@Resources.FollowUps" v-on:click="openAddNewEvent(item, item.deal_id)">
                                                        <i class="fa fa-flag text-muted action-icon"></i>
                                                        <span class="text">@Resources.FollowUps</span>
                                                    </a>
                                                    @*<a class="actions-onclick" v-if="((isBlank(item.existing_client_id) || isBlank(item.project_id)) && item.is_completed==0 )" href="'/CRM/DealDetails?DealId='+item.Deal_id+'&isEdit=YES'" typetitle="@Resources.Edit" typefor="Edit" v-bind:value="item.Deal_id" title="@Resources.Edit">
                                                        <i class="fa fa-pencil text-success action-icon"></i>
                                                        <span class="text">@Resources.Edit</span>
                                                    </a>*@
                                                    <a class="actions-onclick" href="javascript:;" v-if="((isBlank(item.existing_client_id) || isBlank(item.project_id)) && item.is_completed==1 )" typefor="ConvertDeal" typetitle="@Resources.ConvertDeal" value="item.Deal_id" title="@Resources.ConvertDeal">
                                                        <i class="fa fa-file-text-o text-success action-icon"></i>
                                                        <span class="text">@Resources.ConvertDeal</span>
                                                    </a>
                                                    <a href="javascript:;" class="actions-onclick" v-if="item.status_id =='Active' && item.Lead_ID!=0 && item.Quot_id ==0" typetitle="Revert to Lead" typefor="RevertLead" v-bind:value="item.Deal_id" title="Revert to Lead" v-on:click="RevertToLead(item)">
                                                        <i class="fa fa-reply text-danger action-icon"></i>
                                                        <span class="text">Revert to Lead</span>
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
                DealData: null,
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
                ApiURL: baseUrl + "api/DealListing?",
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
            this.getStatuslistForListing(this.commonAPIUrl, 'CRM', 'en', "@tokenid");
            this.GetPageSizeOption();
            this.GetDealDDLData("DEAL_OWNER_SEARCH");
            this.GetDealStageData("CRM_STAGE");
            this.GetSearchStatusList();
            this.FetchData();
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
                var vueObj=this;
                showLoader();
                var url = this.ApiURL + "pagesize=" + this.PageSize + "&pagenumber=" + this.PageNumber + "&sortBy=" + this.SortBy + "&sortExp=" + this.SortExp;
                var srchCondition = "";
                if (!this.isBlank(this.searchCondition)) {
                    url = url + "&searchCondition=" + this.searchCondition
                }
                if (!this.isBlank(this.conditionForInstantSearch)) {
                    srchCondition = srchCondition + ((!this.isBlank(this.searchCondition)) ? (" AND " + this.conditionForInstantSearch) : this.conditionForInstantSearch);
                }
                if (srchCondition != "") {
                    url = url + "&searchCondition=" + srchCondition;
                }
                axios.get(url, {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                }).then(function (response) {
                    hideLoader();
                    //debugger;
                    if (response.data != "" && response.data != null) {
                        //debugger;
                        vueObj.Headers = response.data.schema;
                        if (response.data.data.length > 0) {
                            vueObj.DealData = response.data.data;
                            vueObj.TotalRecords = response.data.data[0].totalrecords;
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
                    //setTimeout("ResponsiveDataTable('tablelistingdata')", 500);
                    //GetWalkThrough(baseUrl + "api/Common/GetWalkThroughViewOrNot", current_Url, "", 0);
                });
            },
            sortdata: function (sortBy) {
                this.SortBy = sortBy;
                var sortExp = 'ASC';
                if (this.SortExp == 'ASC') {
                    sortExp = 'DESC';
                }
                this.SortExp = sortExp;
                this.PageNumber = 1;
                this.GroupStart = this.PageNumber;
                this.GroupEnd = this.PageNumber + 2;
                this.FetchData();
            },
            isCRMShowStausDrop: function (status, moduleName) {
                if (status == 'Draft' || status == 'Partially Received' || status == 'Approved' || status == 'Rejected' || status == 'Received' || status == 'Partially Approved' || status == 'Partially Rejected' || status == 'Approval Pending' || status == 'In Stock' || status == 'Cancelled' || (status == "Closed" && moduleName != "CRM_LEADS")) {
                    return false;
                }
                return true;
            },
            convertDecimalValueInFormat: function (value) {
                try {
                    value = parseFloat(value, 10);
                    value = value.toFixed(2);
                    value = parseFloat(value, 10);
                    value = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    return value;
                } catch (ex) {
                    return value
                }
            },
            getStatusClass: function (status, columnName, module = '') {
                var returnClass = ''
                if (columnName == 'status_id' || columnName == 'status_name' || columnName == 'gin_status') {
                    var CommonClss = 'btn';
                    if (module = 'fsm') {
                        CommonClss = 'px-2';
                    }
                    switch (status) {
                        case 'Active': case 'Approved': case 'Open':
                            returnClass = CommonClss + ' bg-success text-center text-white d-block';
                            break;
                        case 'Inactive': case 'Closed': case 'Cancelled': case 'Rejected': case 'Closed and Locked':
                            returnClass = CommonClss + ' bg-danger text-center text-white d-block';
                            break;
                        case 'Internal':
                            returnClass = CommonClss + ' bg-primary text-center text-white d-block';
                            break;
                        case 'Private':
                            returnClass = CommonClss + ' bg-danger text-center text-white d-block';
                            break;
                        case 'Publish':
                            returnClass = CommonClss + ' bg-info text-center text-white d-block';
                            break;
                        case 'Publish on Carrier Portal and Employee Portal':
                            returnClass = CommonClss + ' bg-dark text-center text-white d-block';
                            break;
                        case 'Approval Pending': case 'Partially Approved':
                            returnClass = CommonClss + ' bg-info text-center text-white d-block';
                            break;
                        case 'Received': case 'Partially Received':
                            returnClass = CommonClss + ' bg-secondary text-white text-center d-block';
                            break;
                        case 'Draft': case 'Waiting': case 'On Hold':
                            returnClass = CommonClss + ' bg-warning text-center text-white d-block';
                            break;
                        case 'No Gin': case 'Reopen':
                            returnClass = CommonClss + ' bg-primary text-center text-white d-block';
                            break;
                        default:
                            // returnClass = 'btn bg-light text-center text-dark d-block';
                            returnClass = CommonClss + ' bg-secondary text-center text-white d-block';
                    }
                }
                return returnClass;
            },
            GetPageSizeOption: function () {
                var list = [];
                var defaultPageSize = 10;
                for (var i = defaultPageSize; i < defaultPageSize + 95; i += 5) {
                    list.push(i);
                }
                this.PageSizeOption = list;
            },
            GetDealDDLData: function (type) {
                var vm = this;
                var appendingUrl = "?id=&moduleName=CRM&type=" + type;
                var url = baseUrl + "api/Form/GetDDLData" + appendingUrl;
                showLoader();
                axios.get(url, {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                }).then(response => {
                    var json = response.data;
                    hideLoader();
                    if (json != null) {
                        vm.leftSearchFields[1].listOptions = json.DATA;
                        return this.DealOwnerList = json.DATA;
                    }
                    hideLoader();
                });
            },
            GetDealStageData: function (type) {
                var vm = this;
                var appendingUrl = "?id=&moduleName=CRM&type=" + type;
                var url = baseUrl + "api/Form/GetDDLData" + appendingUrl;
                showLoader();
                axios.get(url, {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                })
                    .then(response => {
                        var json = response.data;
                        hideLoader();
                        if (json != null) {
                            vm.leftSearchFields[2].listOptions = json.DATA;
                            return this.DealStageList = json.DATA;
                        }
                        hideLoader();
                    });
            },
            GetSearchStatusList: function () {
                var vm = this;
                var url = baseUrl + "api/Form/GetDDLData?moduleName=CRM&type=LEAD_DEAL_STATUS";
                showLoader();
                axios.get(url, {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                })
                    .then(function (response) {
                        var json = response.data;
                        hideLoader();
                        if (json != null) {
                            vm.leftSearchFields[3].listOptions = json.DATA;
                            return vm.DealStatusList = json.DATA;
                            //vm.leftSearchFields[3].listOptions = [];
                            //$.each(json.DATA, function (index, element) {
                            //    if (element.name == "Active" || element.name == "Cancelled" || element.name == "Closed" || element.name == "Inactive") {
                            //        vm.leftSearchFields[3].listOptions.push(element);
                            //    }
                            //})
                            //return vm.DealStatusList = vm.leftSearchFields[3].listOptions;
                        }
                        hideLoader();
                    });
            },
            getStatuslistForListing: function (commonApiUrl, StatusType, lang, tokenId) {
                // debugger;
                var vm = this;
                var url = commonApiUrl + "api/Common/GetStatusDDLData?langCode=" + lang + "&statusType=" + StatusType + "&hasglobal=true";
                showLoader();
                axios.get(url, {
                    headers: { 'Authorization': 'bearer ' + this.GetUserInfo.Token }
                }).then(function (response) {
                    if (response.data.status == "Success") {
                        var json = response.data.result;
                        vm.StatusListForListing = json.data;
                    }
                });
            },
            editDeal: function (dealId) {
                let data = JSON.stringify({
                    id: dealId,
                    moduleName: 'CRM',
                    subModuleCode:'CRM_DEALS',
                    reqfrom: '/CRM/DealListing',
                    isEdit:'YES'
                });
                this.$router.push({
                    name: "CRMManageDeal",
                    params: { data }
                });
            }
        }
    }

</script>
