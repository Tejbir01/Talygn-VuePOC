
export default {
    data: function () {
        return {
            ShowManageView: false,
            StatusListForListing: []
        }
    },
    methods: {

        insertNotification: function (commonApiUrl, postJSONNew, tokenId) {
            //debugger;
            var vm = this;
            // showLoader();
            var objectPostStringNew = JSON.stringify(postJSONNew);

            vm.$http.post(commonApiUrl + 'api/Notification/InsertNotification', { postString: objectPostStringNew }, {
                headers: { 'Authorization': 'bearer ' + tokenId }
            }).then(function (response) {


            });
        },

        getStatuslistForListing: function (commonApiUrl, StatusType, lang, tokenId) {
            // debugger;
            var vm = this;
            var url = commonApiUrl + "api/Common/GetStatusDDLData?langCode=" + lang + "&statusType=" + StatusType + "&hasglobal=true";
            showLoader();
            vm.$http.get(url, {
                headers: { 'Authorization': 'bearer ' + tokenId }
            }).then(function (response) {
                if (response.data.status == "Success") {
                    var json = response.data.result;
                    vm.StatusListForListing = json.data;
                }
            });
        },
        isCRMShowStausDrop: function (status, moduleName) {
            if (status == 'Draft' || status == 'Partially Received' || status == 'Approved' || status == 'Rejected' || status == 'Received' || status == 'Partially Approved' || status == 'Partially Rejected' || status == 'Approval Pending' || status == 'In Stock' || status == 'Cancelled' || (status == "Closed" && moduleName != "CRM_LEADS")) {
                return false;
            }
            return true;
        },
        ManageView: function () {
            //if (GetPrivilege("/Project/AddMemberInProject", true, false)) {
            this.ShowManageView = true;
            setTimeout(function () {
                $("#modalManageView").modal('show');
                setTimeout(function () {
                    SetBootstraptoolTip(); 0
                }, 200);
            }, 1000);
            // }
        },
        sortdata: function (sortBy, callBackFunction) {
            this.SortBy = sortBy;
            var sortExp = 'ASC';
            if (this.SortExp == 'ASC') {
                sortExp = 'DESC';
            }
            this.SortExp = sortExp;
            this.PageNumber = 1;
            this.GroupStart = this.PageNumber;
            this.GroupEnd = this.PageNumber + 2;
            if (typeof callBackFunction != 'undefined' && callBackFunction != null) {
                callBackFunction();
            } else {
                this.FetchData();
            }
        },
        openFilterPopUp: function (source_id) {
            this.showFilter = true;
        },
        UrlHistory: function (params, controllerName, actionName) {
            if (history.pushState) {
                var historyUrl = "/" + controllerName + "/" + actionName;
                historyUrl = historyUrl + "?" + params;
                history.pushState({}, null, historyUrl);
            }
        }
    }
}

//export default [listingMixin, commonMixin];