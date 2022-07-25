<script>
    export default {
        name: 'listing-status',
        props: {
            dataid: {
                type: Number,
                required: true
            },
            dataselected: {
                type: Number,
                required: true
            },
            dataController: {
                type: String,
                required: true
            },
            dataAction: {
                type: String,
                required: true
            },
            tokeid: {
                type: String,
                required: true
            },
            apiurl: {
                type: String,
                required: true
            },
            isfor: {
                type: String,
                required: true
            },
            callbackfunction: {
                type: Function
            },
            statuslist: {
                type: Array,
                required: true
            },
            isselectedvaluestring: {
                type: Boolean
            },
            parentid: {
                type: Number,
            },
            haschild: {
                type: Boolean
            },
            hasglobal: {
                type: Boolean,
                required: false
            },
        },
        data: function () {
            // debugger
            return {
                StatusId: this.dataselected,
                StatusCode: "",
                PrevStatus: this.dataselected,
                IsReponsive: isReponsive,
                StatusList: this.statuslist,
                item: this.item,
                StatusColor: '#ffffff',
                StatusBgColor: '#525f65',
                isShowLoader: true
            }
        },
        created: function () {
            //debugger;
            var vueCom = this;
            if (vueCom.hasglobal == true || vueCom.hasglobal == "true") {
                vueCom.StatusList = this.GetStatusList();
            }
            $.each(vueCom.statuslist, function (filedIndex, fieldItem) {
                if (vueCom.statuslist[filedIndex].STATUS == "Closed") {
                    vueCom.StatusCode = vueCom.statuslist[filedIndex].STATUS_ID;
                }
            });
            //debugger;
            try {
                this.isShowLoader = !(this.statuslist.length > 0);
            }
            catch (ex) {
                this.isShowLoader = false;
            }
            var ths = this;
            if (this.isselectedvaluestring == true) {
                var itm = this.StatusList.filter(function (entry) { return entry.STATUS == ths.dataselected; });
                if (itm.length > 0) {
                    this.StatusId = itm[0].STATUS_ID;
                    this.PrevStatus = itm[0].STATUS_ID;
                    this.GetColor();
                } else {
                    this.StatusId = "";
                    this.PrevStatus = "";
                }
            } else {
                this.StatusId = this.dataselected;
                this.PrevStatus = this.dataselected
                this.GetColor();
            }
            this.GetColor();
        },
        mounted: function () {
            var vm = this;
            $("body").on("change", ".ddlchangestatus", function (event) {
                event.stopImmediatePropagation();
                vm.ChangeStatus($(this).attr("data-id"), event, event.target.value);
            });
        },
        watch: {
            dataselected: function (value) {

                if (this.isselectedvaluestring == true) {
                    var itm = this.StatusList.filter(function (entry) { return entry.STATUS == value; });
                    if (itm.length > 0) {
                        this.StatusId = itm[0].STATUS_ID;
                        this.PrevStatus = itm[0].STATUS_ID;
                        this.GetColor();
                    } else {
                        this.StatusId = "";
                        this.PrevStatus = "";
                    }
                } else {
                    this.StatusId = value;
                    this.PrevStatus = value;
                    this.GetColor();
                }
                this.GetColor();
            },
            statuslist: function (value) {
                this.isShowLoader = false;
                this.StatusList = value;
                var ths = this;
                if (ths.isselectedvaluestring == true) {
                    var itm = ths.StatusList.filter(function (entry) { return entry.STATUS == ths.dataselected; });
                    if (itm.length > 0) {
                        ths.StatusId = itm[0].STATUS_ID;
                        ths.PrevStatus = itm[0].STATUS_ID;
                        ths.GetColor();
                    } else {
                        ths.StatusId = "";
                        ths.PrevStatus = "";
                        this.GetColor();
                    }
                } else {
                    this.StatusId = value;
                    ths.PrevStatus = value;
                    this.GetColor();
                }
            }
        },
        methods: {
            GetColor: function () {

                var vm = this;
                //vm.$forceUpdate();
                if (vm.StatusList != null && vm.StatusList.length > 0) {
                    var returnedData = $.grep(vm.StatusList, function (element, index) {
                        return element.STATUS_ID == vm.StatusId;
                    });
                    if (returnedData != null && returnedData.length > 0) {
                        vm.StatusColor = returnedData[0].STATUS_COLOR;
                        vm.StatusBgColor = returnedData[0].STATUS_BG_COLOR;

                        if (vm.StatusColor == null || vm.StatusColor == '') {
                            vm.StatusColor = '#ffffff';
                            vm.StatusBgColor = '#525f65';
                        }
                        else {
                            vm.StatusId = returnedData[0].STATUS_ID;
                        }
                    }
                    //else {
                    //    var itm = vm.StatusList.filter(function (entry) { return entry.STATUS == vm.dataselected; });
                    //    ths.StatusId = itm[0].STATUS_ID;
                    //}
                }
            },
            GetStatusList: function () {
                var list = [];
                var obj = {
                    STATUS_ID: 1001,
                    STATUS: Globalize.localize("Active"),
                    STATUS_COLOR: '#ffffff',
                    STATUS_BG_COLOR: '#28a745',
                }
                list.push(obj);
                obj = {
                    STATUS_ID: 1002,
                    STATUS: Globalize.localize("Inactive"),
                    STATUS_COLOR: '#ffffff',
                    STATUS_BG_COLOR: '#d72435'
                }
                list.push(obj);
                return list;
            },
            ChangeStatus: function (id, event, statusId) {
                var StatusName = event.target.selectedOptions[0].text;
                var vm = this;
                //if (GetPrivilege("/Project/UpdateProjectStatus", true, false)) {
                if (1 == 1) {
                    var urlval = "";
                    if (StatusName == "Closed" && (vm.dataController + '/' + vm.isfor) == "Crm/CRM_LEADS") {
                        urlval = '/' + vm.dataController + '/CloseLeads';
                    }
                    else {
                        urlval = '/' + vm.dataController + '/' + vm.dataAction;
                    }
                    if (GetPrivilege(urlval, true, false)) {

                        if (vm.PrevStatus != $(event.target).attr("oldstatus")) {
                            vm.PrevStatus = $(event.target).attr("oldstatus")
                        }

                        var msg = Globalize.localize("ConfirmUpdateStatusRecord");
                        var isFor = vm.isfor;
                        if (vm.isfor == "TASKLISTING") {
                            //debugger;
                            msg = Globalize.localize("ConfirmUpdateTaskStatus");
                            if (vm.haschild == true) {
                                msg = Globalize.localize("ConfirmUpdateTaskStatus");
                            }
                            else if (vm.haschild == false && Number(vm.parentid) > 0) {
                                msg = Globalize.localize("ConfirmUpdateChildTaskStatus");
                            }
                            else {
                                msg = Globalize.localize("ConfirmUpdateStatusRecord");
                            }
                        }
                        var isStatusChange = false;

                        var inprogressStatusId = 0;
                        var pendingStatusId = 0;

                        $.each(vm.statuslist, function (filedIndex, fieldItem) {
                            if (fieldItem.STATUS_CODE == "REFPEN") {
                                pendingStatusId = fieldItem.STATUS_ID;
                            }
                            else if (fieldItem.STATUS_CODE == "PNPGRS") {
                                InprogressStatusId = fieldItem.STATUS_ID;
                            }
                        });

                        if (Number(vm.parentid) > 0 && vm.PrevStatus == "1002" && vm.StatusId == "1001") {
                            isStatusChange = true;
                        }
                        else if (Number(vm.parentid) > 0 && vm.PrevStatus != "1002" && vm.StatusId == 1001) {
                            isStatusChange = true;
                        }
                        else if (Number(vm.parentid) > 0 && vm.StatusId == Number(pendingStatusId)) {
                            isStatusChange = true;
                        }
                        else if (Number(vm.parentid) > 0 && vm.StatusId == Number(InprogressStatusId)) {
                            isStatusChange = true;
                        }
                        if (isStatusChange) {
                            //msg = Globalize.localize("ConfirmUpdateChildTaskStatus");
                            isFor = "TASKCHILDLISTING"
                        }
                        if (vm.isfor == "TASKLISTING") {
                            if (isStatusChange) {
                                msg = Globalize.localize("ConfirmUpdateChildTaskStatus");
                            }
                            else {
                                msg = Globalize.localize("ConfirmUpdateTaskStatus");
                            }
                        }
                        if (/*GetPrivilege('/Project/UpdateProjectStatus', true, false)*/ 1 == 1) {
                            confirmR(msg, true, Globalize.localize('UpdateCommonStatus'), function (result) {
                                if (statusId) {
                                    vm.StatusId = statusId;
                                }
                                var VarObject = {
                                    ID: id,
                                    StatusId: vm.StatusId,
                                    IsFor: isFor
                                }
                                var objectPostString = JSON.stringify(VarObject);
                                vm.$http.post(vm.apiurl + 'api/Common/CommonUpdateStatus', { postString: objectPostString },
                                    {
                                        headers: { 'Authorization': 'bearer ' + vm.tokeid }
                                    }).then(function (response) {
                                        hideLoader();
                                        if (response.body != null) {
                                            if (JSON.parse(response.bodyText).status === 'Success') {
                                                ShowAlert(Globalize.localize("RecordUpdatedSuccessfully"), "success", true, Globalize.localize('Alert'));
                                                vm.PrevStatus = vm.StatusId;
                                                if (typeof vm.callbackfunction != 'undefined' && vm.callbackfunction != null) {
                                                    vm.callbackfunction();
                                                }
                                            } else {
                                                ShowAlert(Globalize.localize("UnknownErrorOccur"), "failure", true, Globalize.localize('Alert'));
                                            }
                                        } else {
                                            ShowAlert(Globalize.localize("UnknownErrorOccur"), "failure", true, Globalize.localize('Alert'));
                                        }
                                        hideLoader();
                                    }, function (response) {
                                        hideLoader();
                                    });

                            }, function () {
                                //debugger;
                                vm.StatusId = vm.PrevStatus;
                            });
                        } else {
                            vm.StatusId = vm.PrevStatus;
                        }
                    }
                    else {
                        vm.StatusId = vm.PrevStatus;
                    }
                }
                else {
                    vm.StatusId = vm.PrevStatus;
                }
                //}
            }
        }
    }
 </script>
<template>
    <div class="cstm-drop-btn">
        <button v-if="isShowLoader" class="btn btn-dark w-100" type="button" disabled style="padding: 2px 10px 2px 2px;"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
        <select v-bind:disabled="StatusCode==StatusId" v-if="!isShowLoader" class="w-100" v-bind:oldstatus="PrevStatus" v-model="StatusId" v-on:change="ChangeStatus(dataid,$event)" checkPrivilege="yes" v-bind:data-id="IsReponsive? dataid : null" v-bind:style="{backgroundColor: StatusBgColor ,color: StatusColor}" v-bind:data-status="IsReponsive ? StatusId : null" v-bind:class="{'ddlchangestatus': IsReponsive}">
            <option v-for="s in StatusList" v-bind:value="s.STATUS_ID">
                {{s.STATUS}}
            </option>
        </select>
    </div>
 </template>
        

   
