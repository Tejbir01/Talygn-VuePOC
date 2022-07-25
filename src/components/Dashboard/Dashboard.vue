<script setup>
    import { storeToRefs } from "pinia";
    import axios from 'axios';
    import { loggedUserInfo, moduleStore } from "@/stores/UserInfo";
    const { GetUserInfo } = storeToRefs(loggedUserInfo());
    const { SetModuleId } = moduleStore();
    defineProps({
        msg: {
            type: String,
            required: true,
        },
    });
</script>

<template>
    <!--<div class="greetings">
        Hello Radhay
        <p>{{ $t("hello") }}</p>
        <p>{{ $t('Welcome', { msg: 'TALYGEN' }) }}</p>
        <p>{{ $t('AcceptRejectMessage', ['delete','Task']) }}</p>
        <p>email: {{ $t('Address', { account: 'info', domain: 'talygen.com' }) }}</p>
        <p>{{ $t('linked') }}</p>
    </div>-->
    <section class="page-action">
        <div class="container-fluid p-0">
            <div class="row">
                <div class="col-md-12 padding-t_8">
                    <div class="theme-primary partition-full">
                        <span class="p-name text-white">{{ $t("MyShortcuts") }}</span>
                        <span class="p-actions float-end mydbsize">
                            <RouterLink v-if="GetUserInfo.UserType=='CL'" to="/User/Dashboard" class="p-action-btn text-white dash" checkPrivilege="Yes">
                                <i class="fa fa-home"></i><br />{{ $t("Home") }}
                            </RouterLink>
                            <RouterLink v-else to="/Dashboard" class="p-action-btn text-white dash" checkPrivilege="Yes">
                                <i class="fa fa-home"></i><br />{{ $t("Home") }}
                            </RouterLink>
                            <a href="javascript:;" id="ancAddGroupMyDashboard" class="p-action-btn text-white d-none" title="@Resources.AddNew @Resources.Group"><i class="fa fa-plus" aria-hidden="true"></i><br>@Resources.AddNew @Resources.Group</a>
                            <a href="javascript:;" id="ancSaveMyDashboard" v-if="IsEdit"  class="p-action-btn text-white" title="@Resources.Save"><i class="fa fa-save" aria-hidden="true"></i><br>@Resources.Save</a>
                            <a href="javascript:;" id="ancCancelMyDashboard" @click="CancelEditDashBoardData()"  v-if="IsEdit" class="p-action-btn text-white" title="@Resources.Cancel"><i class="fa fa-times" aria-hidden="true"></i><br>@Resources.Cancel</a>
                            <a href="javascript:;" @click="EditDashBoardData()" v-if="IsEdit==false" class="p-action-btn text-white" checkPrivilege="Yes">
                                <i class="fa fa-pencil"></i><br />{{ $t("Edit") }}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end page heading -->
    <section class="main-content">
        <div class="container-fluid p-0">
            <div class="border p-3 form-minheight d-flex iPadcontroldiv">
                <div class="w-100 float-left leftsideicon">
                    <div class="row">
                        <div class="w-100 clsdashboardgroup p-0" v-for="(parentItem, parentIndex) in MenuDataGroupBy">
                            <div class="clearfix"></div>
                            <div class="col-lg-12 mb-0 float-left px-3">
                                <div class="heading-border">
                                    <h5 class="h5">
                                        <span class="spngropuname">
                                            {{parentItem.GroupName}}
                                            <a title="@Resources.Edit" href="javascript:;" class="editgroupname d-none"><i class="fa fa-pencil pl-2 text-success"></i></a>
                                        </span>
                                        <input type="text" maxlength="100" class="form-control mb-1 txtgropuname" :value="parentItem.GroupName" style="display:none;" />

                                        <a class="delete-group d-none" v-if="parentIndex>0" data-id="@group.First().FAV_DASHBOARD_GROUP_ID" title="@Resources.Delete">
                                            <i class="text-secondary fa fa-times-circle"></i>
                                        </a>

                                    </h5>
                                </div>

                            </div>
                            <div class="clearfix"></div>
                            <ul class="shortcuts-menu pb-3 connectedSortable">
                                <li class="position-relative" v-for="item in parentItem.GroupData">
                                    <a href="javascript:;" class="delete-dashboard d-none" title="@Resources.Delete"><i class="text-secondary fa fa-times-circle"></i></a>
                                    <a onmousedown="return false;" data-id="@item.PRIVILEGE_ID" data-fav_id="@item.FAV_DASHBOARD_ID" data-order="@item.DISPLAY_ORDER" data-displayName="@item.DISPLAY_NAME" data-toggle="tooltip" title="@Resources.ResourceManager.GetString(item.DISPLAY_NAME)" data-placement="bottom" class="short-menu-item d-none">
                                        <span class="left-icon-m">
                                            <i :class="'fa '+item.PRIVILEGE_ICON"></i>
                                        </span>
                                        <span class="short-item-name">{{ $t(item.DISPLAY_NAME) }}</span>
                                    </a>
                                    <RouterLink :to="`/${item.MODULE_NAME}/${item.PRIVILEGE_NAME}?reqhFrom=${item.MODULE_MASTER_ID}`" class="short-menu-item" checkPrivilege="Yes">
                                        <span class="left-icon-m">
                                            <i :class="'fa '+item.PRIVILEGE_ICON"></i>
                                        </span>
                                        <span class="short-item-name">{{ $t(item.DISPLAY_NAME) }}</span>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="w-25 float-left d-none rightsideicon">
                    <div class="left-menu-tab ml-3 mr-3" style="max-width:96%;">
                        <div class="col-md-12 p-0 ">
                            <div class="theme-primary partition">
                                <span class="p-name text-white">Customize Shortcuts</span>
                            </div>
                        </div>
                        <div class="w-100 p-3 bg-grey common-height">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                MenuData: [],
                MenuDataList: [],
                MaxLoop: 5,
                ModuleName: '',
                MenuDataGroupBy: [],
                MenuCountmodule: 0,
                TotalCount: 0,
                TotalMenuCount: 0,
                Languages: [],
                SelectedLanguage: 'English',
                SelectedMenuType: 'Top',
                IsEdit: false,
            }
        },
        created: function () {
            this.SetModuleId(0);
            this.GetFavDashBoardData();
        },
        methods: {  
            CancelEditDashBoardData() {
                this.IsEdit = false;
            },
            EditDashBoardData() {
                this.IsEdit = true;
                $(".leftsideicon").find(".txtgropuname").closest(".heading-border").addClass("editgroup");
                $(".leftsideicon").addClass("w-75").removeClass("w-100");
                $(".rightsideicon").removeClass("d-none");
                $("#ancSaveMyDashboard, #ancCancelMyDashboard, #ancAddGroupMyDashboard").removeClass("d-none");                
                $('.spngropuname').attr("contenteditable", true).hide();
                $('.txtgropuname').show();
                $('.spngropuname').off('keypress').on("keypress", function () {
                    return (this.innerText.length <= 100)
                });
                $(".left-icon-m").addClass("cursor-move").off('click').on('click', function () {
                    return false;
                });
                $('.shortcuts-menu a:not(.delete-dashboard)').off('click').on('click', function () {
                    return false;
                });
                $('.shortcuts-menu a:not(.delete-group)').off('click').on('click', function () {
                    return false;
                });
            },
            async GetFavDashBoardData() {
                //debugger;
                var vm = this;
                const headers = {                    
                    'Authorization': 'Bearer ' + this.GetUserInfo.Token
                };
                axios.get('http://localhost:12597/api/Common/GetFavDashboard', { headers }).then((response) => {

                    if (response.data.status == "Success") {
                        vm.MenuData = response.data.result.DATA;
                        //debugger;
                        var MenuGroupData = [];
                        if (vm.MenuData != null && vm.MenuData.length > 0) {
                            var groupId = vm.MenuData[0].FAV_DASHBOARD_GROUP_ID;
                            $.each(vm.MenuData, $.proxy(function (index, item) {
                                groupId = item.FAV_DASHBOARD_GROUP_ID;
                                var chkGroup = $.grep(MenuGroupData, function (element, index) {
                                    return element.GroupId == groupId;
                                });
                                //debugger;
                                if (chkGroup.length == 0) {
                                    var returnedData = $.grep(vm.MenuData, function (element, index) {
                                        return element.FAV_DASHBOARD_GROUP_ID == groupId;
                                    });
                                    if (returnedData.length > 0) {
                                        var objGroup = {
                                            GroupId: groupId,
                                            GroupName: returnedData[0].GROUP_NAME,
                                            GroupData: returnedData
                                        };
                                        MenuGroupData.push(objGroup);
                                    }
                                }
                            }, this));
                            this.MenuDataGroupBy = MenuGroupData;
                        }
                        //vm.$toast.open('Data get successfully');
                        this.$toast.success('Data get successfully');
                    }
                });
            }       
        }
    }
   
</script>

