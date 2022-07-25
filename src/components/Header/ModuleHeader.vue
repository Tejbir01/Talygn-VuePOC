<script setup>
    import { storeToRefs } from "pinia";
    import { useRoute } from 'vue-router'
    import axios from 'axios';
    import { loggedUserInfo, moduleStore } from "@/stores/UserInfo";
    import { RouterLink } from "vue-router";
    const { GetUserInfo } = storeToRefs(loggedUserInfo());
    const { SetUserInfo } = loggedUserInfo();
    const { GetModuleId } = storeToRefs(moduleStore());
    defineProps({
        modulemasterid: {
            type: String,
            required: true,
        },
    });
    const route = useRoute();
    //console.log(GetName);

</script>

<template>
  <div class="container-fluid" id="divjuda_menu">
    <div class="row">
      <div class="col-lg-4 col-xl-4" id="SiteMapLink">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <i class="fa fa-home"></i><a href="/User/Home">Home</a>
          </li>
          <li class="breadcrumb-item active">My Dashboard</li>
        </ol>
      </div>
      <div class="col-lg-4 col-xl-4"  v-if="route.path != '/Dashboardss'">
          <a class="juda-btn"
             data-bs-target="#juda-menu"
             data-bs-toggle="collapse"
             aria-expanded="false"
             aria-controls="juda-menu" v-on:click="ToggleContextMenu()">
              <span id="showHideMenuParent">{{ModuleName}}</span>
              <i :class="{'fa':true, 'fa-minus': GetUserInfo.IsContextMenuClosed == false,'fa-plus': GetUserInfo.IsContextMenuClosed }"></i>
          </a>
      </div>
      <div class="col-lg-4 col-xl-4 text-right"  v-if="route.path != '/Dashboardss'">
        <span class="login-vandor d-none">
          <a
            id="alogin_as_different_user"
            href="javascript:;"
            class="text-logon"
            checkprivilege="no"
            title=""
            data-toggle-tooltip="tooltip"
            data-original-title="Login as different user">Login as different user</a>
          <a
            id="alogin_to_Org_company"
            class="text-logon"
            checkprivilege="no"
            href="/Account/LoginToOrgCompany"
            title=""
            data-toggle-tooltip="tooltip"
            data-original-title="Login to Org. Company">Login to Org. Company</a>
        </span>
        <span class="user-guide ml-3" style="display: none">
          <a class="ancuserguide">User Guide</a>          
        </span>
      </div>
      <div class="col-lg-12" v-if="route.path != '/Dashboardsss'">
          <div class="main-container">
              <div id="juda-menu" :class="{'collapse': true, 'show': GetUserInfo.IsContextMenuClosed== false }">
                  <div class="juda-menu-container p-2">
                      <div class="menu-box" v-for="(item,index) in MenuHeaderData">
                          <div class="heading text-center text-capitalize">{{item}}</div>
                          <ul>
                              <li v-for="childItem in GetMenuData(index)">
                                  <RouterLink class="text-capitalize" title="Radhay" :id="childItem.PRIVILEGE_ID" :to="'/'+childItem.CONTROLLER_NAME+'/'+childItem.ACTION_NAME+'?reqhFrom='+childItem.MODULE_MASTER_ID">
                                      {{childItem.DISPLAY_NAME}}
                                  </RouterLink>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                MenuData: [],
                MenuHeaderData: [],
                MaxLoop: 5,
                ModuleName: '',
                ModuleMasterId: 0
            }
        },
        created: function () {            
            this.ModuleMasterId = (this.route.params.reqhFrom == undefined ? 0 : this.route.params.reqhFrom);
            this.GetContextMenuData();            
        },
        watch: {
            modulemasterid: function (value) {                
                this.ModuleMasterId = this.GetModuleId;
                this.GetContextMenuData();
            }
        },
        methods: {
            GetModuleId() {
                //alert("1");
                this.ModuleMasterId = this.GetModuleId;
            },
            ToggleContextMenu() {                
                this.GetUserInfo.IsContextMenuClosed = !this.GetUserInfo.IsContextMenuClosed;
                this.SetUserInfo('contextmenuclosed', this.GetUserInfo.IsContextMenuClosed);
                this.SetUserInfo('name', 'Radhay Chauhan');
            },
            GetMenuData(index) {
                var data = $.grep(this.MenuData, function (element, key) {
                    return (element.DISPLAY_ORDER == index + 1 || element.DISPLAY_ORDER == index + 6 || element.DISPLAY_ORDER == index + 11)
                });
                return data;
            },
            async GetContextMenuData() {
                //debugger;
                const headers = {
                    'Authorization': 'Bearer ' + this.GetUserInfo.Token
                };
                this.MenuData = [];
                this.MenuHeaderData = [];
                axios.get('http://localhost:12597/api/Common/GetContextMenu?id=' + this.ModuleMasterId, { headers }).then((response) => {
                    
                    if (response.data.status == "Success") {
                        this.MenuData = response.data.result.MENU_DATA;
                        var headerData = response.data.result.MENU_HEADER_DATA;
                        this.ModuleName = this.MenuData[0].MODULE_NAME;
                        this.MenuHeaderData = [];
                        for (var i = 1; i <= this.MaxLoop; i++) {
                            var headerName = "";
                            switch (i) {
                                case 1:
                                    headerName = headerData[0].HEADER1;
                                    break;
                                case 2:
                                    headerName = headerData[0].HEADER2;
                                    break;
                                case 3:
                                    headerName = headerData[0].HEADER3;
                                    break;
                                case 4:
                                    headerName = headerData[0].HEADER4;
                                    break;
                                case 5:
                                    headerName = headerData[0].HEADER5;
                                    break;
                                default:
                                    headerName = "";
                                    break;
                            }
                            //debugger;
                            this.MenuHeaderData.push(headerName);
                        }
                    }
                });
            }
        }
    }
</script>