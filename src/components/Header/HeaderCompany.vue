<script setup>
    import { storeToRefs } from "pinia";
    import axios from 'axios';
    import { RouterLink, RouterView } from "vue-router";
    import { loggedUserInfo } from "@/stores/UserInfo";
    const { GetUserInfo } = storeToRefs(loggedUserInfo());
    import '/Content/Responsive/flags/flag-icon.min.css'
</script>
<template>
    <input type="hidden" id="hdnSortExp" value="" />
    <input type="hidden" id="hdnSortBy" value="" />
    <input type="hidden" id="hdnChkMobile" value="no" />
    <div class="container-fluid">
        <RouterLink to="/Home" class="navbar-brand" checkPrivilege="Yes">
            <img src="/Content/images/DefaultImages/company-logo.jpg"
                 loading="lazy"
                 id="imghdrCompanyLogo"
                 class="img-fluid" />
        </RouterLink>
        <button class="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item m-n-item wizardnew">
                    <a class="nav-link"
                       data-toggle="modal"
                       href="#choosewizards"
                       title="Wizard"><span class="text-lmenu">@Resources.Wizard</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"
                       title="@Resources.FullScreen"
                       id="btnFullscreen"
                       href="javascript:;">
                        <i class="zoom-screen" aria-hidden="true">
                            <img class="dark-full-screen"
                                 style="height: 1rem; width: 1rem"
                                 src="/Content/Responsive/images/iconfinder_fullscreen.png" />
                            <img class="light-full-screen"
                                 style="height: 1rem; width: 1rem; display: none"
                                 src="/Content/Responsive/images/iconfinder_fullscreen-light.png" />
                        </i>
                        <span class="text-lmenu">FullScreen</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="popChatLink"
                       class="nav-link"
                       title="@Resources.Communication"
                       href="javascript:;">
                        <i class="fa fa-commenting-o actionicon_20">
                            <small id="popChatCount"
                                   class="notification_bell"
                                   style="display: none"></small>
                        </i><span class="bookmark text-lmenu">Communication</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="popNotificationLink"
                       class="nav-link"
                       title="@Resources.Notifications"
                       href="javascript:;">
                        <i class="fa fa-bell position-relative" style="font-size: 18px">
                            <small id="popNotificationCount"
                                   class="noti-circle noti-green px-1 position-absolute d-none"
                                   style="left: 20px; top: -4px"></small>
                        </i><span class="bookmark text-lmenu ml-1">Notifications</span>
                    </a>
                    <div id="divPopNotificationData"
                         style="display: none"
                         class="position-absolute border themecontrol"></div>
                </li>
                <li class="nav-item">
                    <a class="nav-link ancbookmark"
                       title="@Resources.Bookmark"
                       href="javascript:;">
                        <i class="fa fa-star"></i><span class="bookmark text-lmenu">Bookmark</span>
                    </a>
                </li>
                <li class="nav-item d-none">
                    <a class="nav-link" title="@Resources.Socialize" href="javascript:;">
                        <i class="fa fa-comments"></i>
                        <span class="socialize">Socialize</span>
                    </a>
                </li>
                <li>
                    <RouterLink to="/Dashboard"
                                class="nav-link sidebaricon"
                                checkPrivilege="Yes">
                        <span>{{ $t("dashboard") }}</span>
                    </RouterLink>
                </li>
                <li class="nav-item dropdown position-unset">
                    <a class="nav-link dropdown-toggle sidebaricon position-relative"
                       title="@Resources.FullMenu"
                       href="javascript:;"
                       id="navbarDropdownPortfolio"
                       data-bs-toggle="dropdown"
                       aria-haspopup="true"
                       aria-expanded="false">
                        <i class="fa fa-th-large i-lmenu"></i><span>{{ $t("FullMenu") }}</span>
                    </a>
                    <div v-bind:class="{'custom-width-menu':TotalCount<=5}" class="dropdown-menu dropdown-menu-right full-menu-new overflow-visible mt-0" id="fullMenuUl" aria-labelledby="navbarDropdownPortfolio" style="max-height:1000px;">
                        <div class="menu-search-panel">
                            <input type="text" name="search" value="" @keyup="SeacrchMenuItem($event)" class="menusearchitem" placeholder="TypetoSearchMenuitems" />
                            <a class="clear-search" href="javascript:;" title="@Resources.Clear"><i class="fa fa-times"></i></a>
                        </div>
                        <div class="navigation-panel w-100">
                            <div class="nav-heading" style="display:none;">
                                <span><i class="fa fa-home cursor-pointer text-dark pr-2 ancbacktomenu"></i></span>
                                <span><i class="fa  fa-angle-right text-dark pr-2"></i></span>
                                <span id="spntext"><i class="fa fa-th-list d-none"></i></span>
                                <span class="back ml-auto"><a class="cursor-pointer ancbacktomenu" title="@Resources.Back"><i class="fa fa-chevron-left"></i>Back</a></span>
                            </div>
                            <div id="scrollbar" style="max-height:290px!important;">
                                <ul v-for="parent in MenuDataGroupBy">
                                    <li v-for="item in parent.Menu" :data-id="item.ModuleMasterId" :data-name="item.ModuleName" :data-url="item.ShowDashboardLink == 0 ? '' : '/'+item.ControllerName+'/'+item.ActionName">
                                        <RouterLink :to="'/'+item.ControllerName+'/'+item.ActionName"
                                                    class="mainmenu menuitemsover cursor-pointer"
                                                    :checkPrivilege="item.RoleApplicable" v-if="item.ShowDashboardLink == 1">
                                            <i :class="'fa '+item.ModuleIcon"></i>{{item.ModuleName}}
                                            <span class="fa  fa-angle-right gotosub" @click="GoToSubCategory($event,item.ModuleMasterId)"></span>
                                        </RouterLink>
                                        <a class="mainmenu menuitemsover cursor-pointer menudashboard" href="javascript:;"
                                           v-if="item.ShowDashboardLink == 0">
                                            <i :class="'fa '+item.ModuleIcon"></i>{{item.ModuleName}}
                                            <span class="fa  fa-angle-right gotosub" @click="GoToSubCategory($event,item.ModuleMasterId)"></span>
                                        </a>
                                    </li>
                                </ul>
                                <div class="w-100 float-left" v-for="parent in MenuDataList">
                                    <ul :class="'submenu d-none clschild_'+parent.ModuleMasterId" :data-p-id="parent.ModuleMasterId" :data-p-name="parent.ModuleName" v-for="url in parent.UrlList">
                                        <li v-for="item in url.URL" class="menuitem">
                                            <RouterLink :to="'/'+item.CONTROLER_NAME+'/'+item.ACTION_NAME+'?reqhFrom='+parent.ModuleMasterId">
                                                <i class="fa fa-circle"></i>{{item.DISPLAY_NAME}}
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle sidebaricon"
                       title=""
                       href="/MyProfile/Index?companyid=100125"
                       id="navbarDropdownMenuLink"
                       data-bs-toggle="dropdown"
                       data-bs-auto-close="outside"
                       aria-haspopup="true"
                       aria-expanded="false"
                       data-toggle-tooltip="tooltip"
                       data-original-title="My Profile">
                        <span class="my-image d-none d-lg-block img-lmenu"
                              style="line-height: normal">
                            <img src="https://cogniterblob.blob.core.windows.net/cg-renegade-122423/Upload/UserProfileImage/tIpufaZZEajulian-wan-WNoLnJo7tS8-unsplash.jpg"
                                 alt="Image"
                                 onerror="this.src = '/Content/images/DefaultImages/avatar-icon.jpg'"
                                 loading="lazy" />
                        </span>
                        <i class="fa fa-user i-lmenu"></i><span>{{ GetUserInfo.Name }}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right my-account"
                        aria-labelledby="navbarDropdownMenuLink" data-parent="#navbarDropdownMenuLink">
                        <li>
                            <a class="dropdown-item"
                               href="/MyProfile/Index?companyid=100125"
                               title=""
                               data-toggle-tooltip="tooltip"
                               data-original-title="My Profile"><i class="fa fa-id-card"></i>My Profile</a>
                        </li>
                        <li>
                            <input type="hidden" id="hdnUserLanguage" value="en">
                            <a class="dropdown-item dropdown-toggle" id="dropdownMenuButtonLanguage" data-bs-toggle="dropdown" aria-expanded="false" href="javascript:;"><i class="fa fa-globe"></i>{{SelectedLanguage}}</a>
                            <perfect-scrollbar class="dropdown-menu selectlanguage" aria-labelledby="dropdownMenuButtonLanguage">
                                <ul>
                                    <li v-for="(lang, i) in Languages"><a class="dropdown-item" href="javascript:;" @click="SetLanguage(lang.LANGCODE)" :typefor="lang.LANGCODE"><span :class="'flag-icon flag-icon-squared mr-1 flag-icon-'+lang.LANG_ICON"></span>{{ lang.LANG_NAME }}</a></li>
                                </ul>
                            </perfect-scrollbar>
                        </li>
                        <li>
                            <a class="dropdown-item dropdown-toggle" id="dropdownMenuButtonMenuType" href="javascript:;" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-bars"></i>Menu :<span id="spnMenuType">{{SelectedMenuType}}</span>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonMenuType">
                                <li>
                                    <a class="dropdown-item sidebarCollapse"
                                       href="javascript:;" @click="SetMenuType('T')">Top</a>
                                </li>
                                <li>
                                    <a class="dropdown-item sidebarCollapse"
                                       href="javascript:;" @click="SetMenuType('L')">Left</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="dropdown-item dropdown-toggle" href="javascript:;">
                                <i class="fa fa-table"></i>Theme :
                                <span id="spnTheme" valuefor="CssGreen">Default</span>
                            </a>
                            <ul class="dropdown-menu themeselect">
                                <li>
                                    <a class="dropdown-item"
                                       href="javascript:;"
                                       title=""
                                       valuefor="Colored"
                                       data-toggle-tooltip="tooltip"
                                       data-original-title="Colored">Colored</a>
                                </li>
                                <li>
                                    <a class="dropdown-item"
                                       href="javascript:;"
                                       title=""
                                       valuefor="Dark"
                                       data-toggle-tooltip="tooltip"
                                       data-original-title="Dark">Dark</a>
                                </li>
                                <li>
                                    <a class="dropdown-item"
                                       href="javascript:;"
                                       title=""
                                       valuefor="Default"
                                       data-toggle-tooltip="tooltip"
                                       data-original-title="Default">Default</a>
                                </li>
                                <li>
                                    <a class="dropdown-item"
                                       href="javascript:;"
                                       title=""
                                       valuefor="Light"
                                       data-toggle-tooltip="tooltip"
                                       data-original-title="Light">Light</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a class="dropdown-item"
                               href="/Notification/Index"
                               title=""
                               data-toggle-tooltip="tooltip"
                               data-original-title="Notifications"><i class="fa fa-bell"></i>Notifications</a>
                        </li>
                        <li>
                            <a class="dropdown-item"
                               href="/Help/TalygenHelp"
                               title=""
                               data-toggle-tooltip="tooltip"
                               data-original-title="Help"><i class="fa fa-question"></i>Help</a>
                        </li>
                        <li>
                            <a class="dropdown-item"
                               id="DashboardPolicy"
                               href="javascript:;"
                               title=""
                               data-toggle-tooltip="tooltip"
                               data-original-title="Policy"><i class="fa fa-wpforms"></i>Policy</a>
                        </li>
                        <li>
                            <a class="dropdown-item"
                               href="/Account/LogOff"
                               title=""
                               data-toggle-tooltip="tooltip"
                               data-original-title="Logout"><i class="fa fa-power-off"></i>Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <input type="hidden" id="hdnischildsearch" value="0" />
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
            }
        },
        created: function () {
            this.GetFULLMenuData();
            this.GetLanguageList();
        },
        methods: {
            SetMenuType(type) {
                if (type == "L") {
                    this.SelectedMenuType = "Left";                   
                    $('body').addClass('menu-left-wrapper wrapper-shrink')
                }
                else {
                    this.SelectedMenuType = "Top";
                    let bodyElement = document.body;
                    $('body').removeClass('menu-left-wrapper wrapper-shrink')                   
                }
            },
            SetLanguage(code) {
                //v-model="$i18n.locale"
                this.$i18n.locale = code;
                var chkGroup = $.grep(this.Languages, function (element, index) {
                    return element.LANGCODE == code;
                });
                this.SelectedLanguage = chkGroup[0].LANGNAME;
            },
            async GetLanguageList() {
                var vm = this;
                const headers = {
                    'Authorization': 'Bearer ' + this.GetUserInfo.Token
                };
                axios.get('http://localhost:12597/api/Common/GetLanguageList', { headers }).then((response) => {
                    if (response.data.status == "Success") {
                        vm.Languages = response.data.result.DATA;
                    }
                })
            },
            async GetFULLMenuData() {
                //debugger;
                var vm = this;
                const headers = {
                    'Authorization': 'Bearer ' + this.GetUserInfo.Token
                };
                axios.get('http://localhost:12597/api/Common/GetFullMenu', { headers }).then((response) => {

                    if (response.data.status == "Success") {
                        vm.MenuData = response.data.result.DATA;
                        //debugger;
                        var MenuGroupData = [];
                        if (vm.MenuData != null && vm.MenuData.length > 0) {
                            var groupId = vm.MenuData[0].MODULE_MASTER_ID;
                            $.each(vm.MenuData, $.proxy(function (index, item) {
                                groupId = item.MODULE_MASTER_ID;
                                var chkGroup = $.grep(MenuGroupData, function (element, index) {
                                    return element.ModuleMasterId == groupId;
                                });
                                //debugger;
                                if (chkGroup.length == 0) {
                                    var returnedData = $.grep(vm.MenuData, function (element, index) {
                                        return element.MODULE_MASTER_ID == groupId;
                                    });
                                    var chkDashBoard = $.grep(returnedData, function (element, index) {
                                        return String(element.ACTION_NAME).toLowerCase() == "dashboard";
                                    });

                                    var urlCount = returnedData.length;
                                    var groupCount = Math.ceil(urlCount / 3);

                                    var urlListData = [];
                                    var urlIndex = 0;
                                    $.each(returnedData, function (idx, url) {
                                        var chkInsert = false;
                                        //debugger;
                                        if (urlIndex == groupCount) {
                                            //debugger;
                                            urlIndex = 0;
                                            chkInsert = true;
                                            var obj = {
                                                URL: []
                                            };
                                            obj.URL.push(url);
                                            urlListData.push(obj);
                                        }
                                        if (chkInsert == false) {
                                            //debugger;
                                            var length = urlListData.length;
                                            if (length == 0) {
                                                var obj = {
                                                    URL: []
                                                };
                                                obj.URL.push(url);
                                                urlListData.push(obj);
                                            }
                                            else {
                                                urlListData[length - 1].URL.push(url);
                                            }
                                        }
                                        urlIndex += 1;
                                    });

                                    if (returnedData.length > 0) {
                                        var objGroup = {
                                            ModuleMasterId: groupId,
                                            ModuleName: returnedData[0].MODULE_HEADER_NAME,
                                            ModuleIcon: returnedData[0].ATTACHMENT_PATH == '' ? "fa-cog" : returnedData[0].ATTACHMENT_PATH,
                                            ShowDashboardLink: chkDashBoard.length > 0 ? 1 : 0,
                                            ControllerName: chkDashBoard.length > 0 ? chkDashBoard[0].CONTROLER_NAME : '',
                                            ActionName: chkDashBoard.length > 0 ? chkDashBoard[0].ACTION_NAME : '',
                                            RoleApplicable: chkDashBoard.length > 0 ? chkDashBoard[0].ROLE_APPLICABLE : '',
                                            UrlList: urlListData
                                        };
                                        MenuGroupData.push(objGroup);
                                    }
                                }
                            }, this));
                            this.TotalCount = MenuGroupData.length;
                            this.TotalMenuCount = Math.ceil(this.TotalCount / 3);
                            this.MenuCountmodule = this.TotalCount % 3;
                            //debugger;
                            this.MenuDataList = MenuGroupData;
                            var chkMenuCount = 1;
                            var count = 1;
                            this.MenuDataGroupBy = [];
                            $.each(MenuGroupData, function (index, item) {
                                var countMenu = vm.TotalMenuCount;
                                if ((vm.MenuCountmodule <= 2 && chkMenuCount == 1) || (vm.MenuCountmodule == 2 && chkMenuCount == 2)) {
                                    countMenu = countMenu + 1;
                                }
                                var chkInsert = false;
                                if (count == countMenu) {
                                    //debugger;
                                    count = 0;
                                    chkMenuCount += 1;
                                    if (chkMenuCount <= 3) {
                                        chkInsert = true;
                                        var obj = {
                                            Menu: []
                                        };
                                        
                                        obj.Menu.push(item);
                                        vm.MenuDataGroupBy.push(obj);
                                    }
                                }
                                if (chkInsert == false) {
                                    //debugger;
                                    var length = vm.MenuDataGroupBy.length;
                                    if (length == 0) {
                                        var obj = {
                                            Menu: []
                                        };
                                        obj.Menu.push(item);
                                        vm.MenuDataGroupBy.push(obj);
                                    }
                                    else {
                                        vm.MenuDataGroupBy[length - 1].Menu.push(item);
                                    }
                                }
                                count += 1;
                            });
                            //debugger;
                        }
                    }
                });
            },
            GoToSubCategory(event,id) {
                //debugger;
                var $this = $(event.target);
                $("#hdnischildsearch").val("1");
                ShowChild($this, false, id);
                $("#fullMenuUl").addClass("show");
            },
            SeacrchMenuItem(event) {
                var val = event.target.value;
                if (val != "") {
                    $("a.clear-search").show();
                }
                else {
                    $("a.clear-search").hide();
                }
                SearchMenuItem(val);
            }
        }
    }
    $("body").on("click", ".gotosub", function (event) {
        event.stopImmediatePropagation();
        $("#hdnischildsearch").val("1");
        ShowChild($(this));
    });
    $(".menudashboard").click(function (event) {
        event.stopImmediatePropagation();
        $("#hdnischildsearch").val("1");
        ShowChild($(this));
    });
    function ShowChild(ctrl, isSearch,moduleId) {
        var id = ctrl.closest("li").attr("data-id");
        if (moduleId) {
            id = moduleId;
        }
        if (typeof (id) != 'undefined') {
            if (isSearch != true) {
                var dataUrl = ctrl.closest("li").attr("data-url") === undefined ? "javascript:;" : ctrl.closest("li").attr("data-url");
                var dataPrivilege = ctrl.closest("li").attr("data-privilege") === undefined ? "0" : ctrl.closest("li").attr("data-privilege");
                var dataUrlcheck = ctrl.closest("li").attr("data-url");
                //debugger;
                if (dataUrlcheck !== undefined) {
                    $("div.navigation-panel").find('.nav-heading').show().find("#spntext").html('<span><i class="fa fa-th-list d-none"></i>' + ctrl.closest("li").attr("data-name") + '<a href="' + dataUrl + '" checkPrivilege="' + dataPrivilege + '" class="text-info indl">|<i class="fa fa-laptop"></i>Dashboard</a></span>');
                }
                else {
                    $("div.navigation-panel").find('.nav-heading').show().find("#spntext").html('<span><i class="fa fa-th-list d-none"></i>' + ctrl.closest("li").attr("data-name") + '</span>');
                }
            }
            $("div.navigation-panel").find('a.mainmenu').closest("li").hide();
            $("div.navigation-panel").find('ul.submenu').addClass('d-none').removeClass('d-flex');
            $("div.navigation-panel").find('ul.clschild_' + id).addClass('d-flex').removeClass("d-none");
            $("div.navigation-panel").find('ul.clschild_' + id).find("li").show();
            $("div.navigation-panel").find('.hdrGroupName').addClass('d-none');
            $("div.navigation-panel").find('.hdrGroupName_' + id).addClass('d-flex').removeClass("d-none");
        }
    }
    $("body").on("click", ".ancbacktomenu", function (event) {
        event.stopImmediatePropagation();
        $("#hdnischildsearch").val("0");
        $("div.navigation-panel").find('.nav-heading').hide();
        $("div.navigation-panel").find('.hdrGroupName').addClass('d-none').removeClass("d-flex");
        $("div.navigation-panel").find('ul.submenu').addClass('d-none').removeClass('d-flex');
        $("div.navigation-panel").find('a.mainmenu').closest("li").show();
        $("input.menusearchitem").val('');
        //SearchMenuItems($("input.menusearchitem").val());
        $("#fullMenuUl").find("ul:not(.submenu)").find("li.menuitem").show();
    });
   
    $("a.clear-search").click(function (event) {
        event.stopImmediatePropagation();
        $("input.menusearchitem").val('');
        $("input.menusearchitem").keyup();
    });
    
    function SearchMenuItem(val) {
        $("#fullMenuUl ul.submenu").find("li.menuitem a").each(function () {
            val = String(val).toLowerCase();
            var text = String($(this).text()).toLowerCase();
            if (text.includes(val)) {
                $(this).closest("li.menuitem").show();
            }
            else {
                $(this).closest("li.menuitem").hide();
            }
            $("div.navigation-panel").find('a.mainmenu').closest("li").hide();
            var chk = false;
            $(this).closest('.submenu').find("li.menuitem").each(function () {
                if ($(this).css('display') != 'none') {
                    chk = true;
                }
            });
            if (chk) {
                $(this).closest('.submenu').removeClass('d-none').addClass('d-flex');
            }
            else {
                $(this).closest('.submenu').addClass('d-none').removeClass('d-flex');
            }
        });
        if ($("input.menusearchitem").val() == '' && $("#hdnischildsearch").val("0")) {
            $(".ancbacktomenu").trigger('click');
        }
    }
</script>
<style scoped>
    .ps {
        height: 200px;
    }
</style>