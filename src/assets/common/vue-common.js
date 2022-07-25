
export default {
    data: function () {
        return {
            NoteListType: 'card'
        }
    },
    methods: {
        openShowNotePopup: function () {
            var ths = this;
            ths.isShowNotePopup = true;
            $("#tab-notes").trigger("click");
            ths.loadData("notes");
            //this.isShowNotePopup = true;
        },
        FilterDDLandNormalValue: function (item) {
            if (item.length > 0) {
                try {
                    return JSON.parse(item)[0].name;
                } catch (ex) { return item }
            } else {
                return item;
            }
        },
        FilterDDLValueForID: function (item) {
            if (item.length > 0) {
                try {
                    return JSON.parse(item)[0].value;
                } catch (ex) { return '' }
            } else {
                return ''
            }
        },
        openCRMAttachmentModal: function () {
            if ((typeof this.checkForAdditionalPermission !== 'undefined') && this.checkForAdditionalPermission("AddAttachment") == false) {
                alertR(Globalize.localize("additionalOwnerAuthorityWarning"), true, Globalize.localize('Alert'));
            } else {
                this.showAttachmentModal = (this.showAttachmentModal == true) ? false : true;
            }
        },
        openCRMEmailModal: function (item) {
            var type = 'AddEmail';
            if (item != null) {
                type = 'UpdateEmail';
            }
            if ((typeof this.checkForAdditionalPermission !== 'undefined') && this.checkForAdditionalPermission(type) == false) {
                alertR(Globalize.localize("additionalOwnerAuthorityWarning"), true, Globalize.localize('Alert'));
            } else {
                this.sendEmailModal = (this.sendEmailModal == true) ? false : true;
                editid = item;
            }
        },
        ChangeCRMLeadOwnerCheck: function (event) {
            var varObj = this;
            $('.chkItems:checkbox:checked').not("[id^='chkAll']").each(function () {
                varObj.OwnerIds.push($(this).val());
            });

            if (this.OwnerIds.length > 0) {
                this.showLeadOwnerModal = (this.showLeadOwnerModal == true) ? false : true;
            }
            else {
                talygen.alert(Globalize.localize("Selectchangeleadowner"));
            }
        },
        openCRMExistingContactModel: function () {
            if ((typeof this.checkForAdditionalPermission !== 'undefined') && this.checkForAdditionalPermission("AddContact") == false) {
                alertR(Globalize.localize("additionalOwnerAuthorityWarning"), true, Globalize.localize('Alert'));
            } else {
                this.showExistingContactModal = (this.showExistingContactModal == true) ? false : true;
            }
        },
        openCRMContactModal: function (contactDetails) {
            var type = 'AddContact';
            if (contactDetails != null) {
                type = 'UpdateContact';
            }
            if ((typeof this.checkForAdditionalPermission !== 'undefined') && this.checkForAdditionalPermission(type) == false) {
                alertR(Globalize.localize("additionalOwnerAuthorityWarning"), true, Globalize.localize('Alert'));
            } else {
                this.iscontactDetails = contactDetails;
                this.showContactModal = (this.showContactModal == true) ? false : true;
            }
        },
        openCRMProductModel: function () {
            if ((typeof this.checkForAdditionalPermission !== 'undefined') && this.checkForAdditionalPermission("AddProducts") == false) {
                alertR(Globalize.localize("additionalOwnerAuthorityWarning"), true, Globalize.localize('Alert'));
            } else {
                this.showProductModal = (this.showProductModal == true) ? false : true;
            }
        },
        IsObject: function (obj) {
            return obj !== undefined && obj !== null && obj.constructor == Object;
        },
        CallFunction: function (fun, params) {
            this[fun].apply(null, params.split('^'));
        },
        onEnter: function (e) {
            e.stopPropagation();
            e.preventDefault();
            e.returnValue = false
            this.input = e.target.value + '\n'
        },
        convertSecondsToHHMM: function (d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);

            var hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + ":" : "00:";
            var mDisplay = m > 0 ? (m < 10 ? "0" : "") + m : "00";
            return hDisplay + mDisplay;
        },
        encodeHtmlCode: function (value) {
            if (Array.isArray(value) == false) {
                value = escape(value);
            }
            return value;
        },
        decodeHtmlCode: function (value) {
            if (Array.isArray(value) == false) {
                value = unescape(value);
            }
            return value;
        },
        convertDecimalValueInFormat: function (value) {
            try {
                /*var rslt = parseFloat(this.isBlank(item) ? 0 : item).toFixed(2).toLocaleString('en');
                var num_parts = rslt.split(".");
                num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return num_parts.join(".");*/
                value = parseFloat(value, 10);
                value = value.toFixed(2);
                value = parseFloat(value, 10);
                value = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                return value;
            } catch (ex) {
                return value
            }
        },
        convertIntValueInFormat: function (value) {
            try {
                value = parseInt(value, 10);
                value = value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                return value;
            } catch (ex) {
                return value
            }
        },
        getStatusClass: function (status, columnName) {
            // debugger;

            var returnClass = ''
            if (columnName == 'status_id' || columnName == 'status_name' || columnName == 'gin_status') {
                switch (status) {
                    case 'Active': case 'Approved':
                        returnClass = 'px-2 bg-success text-center text-white d-block';
                        break;
                    case 'Inactive': case 'Closed': case 'Cancelled': case 'Rejected':
                        returnClass = 'px-2 bg-danger text-center text-white d-block';
                        break;

                    case 'Approval Pending': case 'Partially Approved':
                        returnClass = 'px-2 bg-info text-center text-white d-block';
                        break;
                    case 'Received': case 'Partially Received':
                        returnClass = 'px-2 bg-secondary text-white text-center d-block';
                        break;
                    case 'Draft':
                        returnClass = 'px-2 bg-warning text-center text-white d-block';
                        break;
                    case 'No Gin':
                        returnClass = 'px-2 bg-primary text-center text-white d-block';
                        break;

                    default:
                        // returnClass = 'px-2 bg-light text-center text-dark d-block'; 
                        returnClass = 'px-2 bg-secondary text-center text-white d-block';
                }
                return returnClass;
            }
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
        formatDate: function (value) {
            if (value) {
                return moment(String(value), "YYYY-MM-DD").format(String(Globalize.culture().calendar.patterns.d).toUpperCase())
            }
        },
        formatDateTimeFunc: function (value) {
            if (value) {
                return moment(value).format(String(Globalize.culture().calendar.patterns.d).toUpperCase() + " " + String(Globalize.culture().calendar.patterns.t).replace("t", "A").replace("t", ""))
            }
        },
        formatUserDateToYYYYMMDD: function (value) {
            return moment(String(value), String(Globalize.culture().calendar.patterns.d).toUpperCase()).format("YYYY-MM-DD");
        },
        createString: function (array, key) {
            if (key == "value") {
                return array.map(function (obj) {
                    return "'" + obj[key] + "'";
                }).join(',');
            }
            else {
                return array.map(function (obj) {
                    return "'" + obj[key] + "'";
                }).join(',');
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
        convertDecimalValueInFormat: function (item) {
            try {
                var rslt = parseFloat(this.isBlank(item) ? 0 : item).toFixed(2).toLocaleString('en');
                var num_parts = rslt.split(".");
                num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return num_parts.join(".");
            } catch (ex) {
                return item
            }
        },
        GetLocalizedValue: function (fieldName, displayName) {
            try {
                if (this.isBlank(displayName)) {
                    var chk = Globalize.localize(String(fieldName).toUpperCase());
                    if (chk || /^\s*$/.test(chk) == true) {
                        return chk;
                    }
                    chk = Globalize.localize(String(fieldName));
                    if (chk || /^\s*$/.test(chk) == true) {
                        return chk;
                    }
                    return fieldName;
                }
                else {
                    var chk = Globalize.localize(String(displayName).toUpperCase());
                    if (chk || /^\s*$/.test(chk) == true) {
                        return chk;
                    }
                    chk = Globalize.localize(String(displayName));
                    if (chk || /^\s*$/.test(chk) == true) {
                        return chk;
                    }
                    return displayName;
                }
            }
            catch (ex) { console.log(ex) }
        },
        GetFieldPlaceHolder: function (str, displayName, isfor) {
            var name = this.GetLocalizedValue(str, displayName);
            try {
                if (isfor == "select") {
                    name = String.Format(Globalize.localize('SelectField'), name);
                }
                else {
                    if (displayName == 'PONumber') {
                        name = name;
                    } else {
                        name = String.Format(Globalize.localize('EnterField'), name);
                    }

                }
                return name;
            }
            catch (ex) {
                return name;
            }
        },
        isBlank: function (str) {
            return (!str || /^\s*$/.test(str));
        },
        truncateText: function (str, len) {
            if (String(str).length > len) {
                return String(str).substring(0, len) + "...";
            }
            else {
                return str;
            }
        },
        showDependentItem: function (item, value, parentIndex, chilDIndex) {
            var setValue = 0;
            if (value == "Yes" || value == "True" || value == "1") {
                setValue = 1;
            }
            $.each(this.GroupBy, $.proxy(function (key, parentItem) {
                $.each(parentItem.LeadData, function (childKey, childItem) {
                    if (childItem.parent_id == item.custom_field_id && childItem.dependent_type == 'show') {
                        childItem.dependent_show_type = setValue;
                    }
                    else if ('graduation' == item.name) {
                        $.each(parentItem.LeadData, function (filedIndex1, fieldItem1) {
                            if (fieldItem1.name == 'graduation_stream') {
                                if (value == "2") {
                                    fieldItem1.dependent_show_type = 1;
                                    fieldItem1.is_required = true;
                                } else {
                                    fieldItem1.dependent_show_type = 0;
                                    fieldItem1.is_required = false;
                                }
                            }
                        });
                    } else if ('post_graduation' == item.name) {
                        $.each(parentItem.LeadData, function (filedIndex1, fieldItem1) {
                            if (fieldItem1.name == 'post_graduation_stream') {
                                if (value == "2") {
                                    fieldItem1.dependent_show_type = 1;
                                    fieldItem1.is_required = true;
                                } else {
                                    fieldItem1.dependent_show_type = 0;
                                    fieldItem1.is_required = false;
                                }
                            }
                        });
                    } else if ('doctorate' == item.name) {
                        $.each(parentItem.LeadData, function (filedIndex1, fieldItem1) {
                            if (fieldItem1.name == 'doctorate_stream') {
                                if (value == "2") {
                                    fieldItem1.dependent_show_type = 1;
                                    fieldItem1.is_required = true;
                                } else {
                                    fieldItem1.dependent_show_type = 0;
                                    fieldItem1.is_required = false;
                                }
                            }
                        });
                    }

                });
                //var getitem = $.grep(parentItem.LeadData, function (childItem, index) {
                //    return (childItem.parent_id == item.custom_field_id && childItem.dependent_type == 'show');
                //});

                //getitem[0].childItem.dependent_show_type = setValue;
            }, this));
            $.each(this.GroupBy, $.proxy(function (key, parentItem) {
                $.each(parentItem.EventData, function (childKey, childItem) {
                    //  console.log(childItem.name);

                    if (childItem.parent_id == item.custom_field_id && childItem.name == 'recurring_date' && childItem.dependent_type == 'show') {
                        if (value == '4' || value == '5') {
                            setValue = 1;
                            childItem.is_required = true;
                        } else {
                            setValue = 0;
                            childItem.is_required = false;
                            childItem.dependent_show_type = setValue;
                        }
                        childItem.dependent_show_type = setValue;
                    } else if (childItem.parent_id == item.custom_field_id && childItem.name == 'week_day' && childItem.dependent_type == 'show') {
                        if (value == '3') {
                            setValue = 1;
                            childItem.is_required = true;
                        } else {
                            setValue = 0;
                            childItem.is_required = false;
                            childItem.dependent_show_type = setValue;
                        }

                        childItem.dependent_show_type = setValue;
                    } else if (childItem.parent_id == item.custom_field_id && childItem.dependent_type == 'show' && childItem.name == 'event_recurring_id') {
                        childItem.dependent_show_type = setValue;
                        childItem.is_required = (setValue == 1) ? true : false;
                    } else if (childItem.parent_id == item.custom_field_id && childItem.dependent_type == 'show') {
                        childItem.dependent_show_type = (setValue == 1) ? true : false;
                    }
                });
            }, this));



            //this.GroupBy[parentIndex].LeadData[chilDIndex].dependent_show_type = setValue;
            item.value = value;
        },
        MakeArray: function (value, type) {

            var array = [];
            var arr = String(value).split(',');
            if (type == "radio" || type == "checkbox") {
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        //debugger;
                        if (arr[i].split("|").length > 1) {
                            var person = { name: arr[i].split("|")[0].trim(), value: arr[i].split("|")[1].trim() };
                            array.push(person);
                        }
                        else {
                            var person = { name: arr[i].trim(), value: arr[i].trim() };
                            array.push(person);
                        }
                    }
                }
            }
            else {
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        var person = { name: arr[i].trim(), value: arr[i].trim() };
                        array.push(person);
                    }
                }
            }
            return array;
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
        MakeSelectArray: function (objItem) {
            var array = [];
            var arr = String(objItem.select_options).split(',');
            if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

                var person = { name: arr[0], value: arr[1] };
                array.push(person);
                //objItem.select_options = array;
            }
            return array
        },
        CheckResumeFileExtension: function (filename) {
            // debugger;
            var extension = filename.replace(/^.*\./, '');
            if (extension === filename) {
                extension = '';
            }
            else {
                extension = extension.toLowerCase();
            }
            //Check extension
            switch (extension) {
                case 'png':
                case 'jpeg':
                case 'jpg':
                case 'gif':
                case 'xlsx':
                case 'xls':
                case 'doc':
                case 'docx':
                case 'txt':
                case 'pdf':
                case 'csv':
                    return true;
                default:
                    return false;
            }
        },
        CheckImageResumeFileExtension: function (filename) {
            // debugger;
            var extension = filename.replace(/^.*\./, '');
            if (extension === filename) {
                extension = '';
            }
            else {
                extension = extension.toLowerCase();
            }
            //Check extension
            switch (extension) {
                case 'png':
                case 'jpeg':
                case 'jpg':
                case 'gif':
                case 'bmp':
                    return true;
                default:
                    return false;
            }
        },
        CheckCSVResumeFileExtension: function (filename) {
            // debugger;
            var extension = filename.replace(/^.*\./, '');
            if (extension === filename) {
                extension = '';
            }
            else {
                extension = extension.toLowerCase();
            }
            //Check extension
            switch (extension) {

                case 'csv':
                    return true;
                default:
                    return false;
            }
        },
        GetBase64String: function (evt, from) {
            //debugger;
            var vm = this;
            // vm.fileData = [];
            showLoader();
            var f = evt.target.files[0]; // FileList object
            var reader = new FileReader();
            if (typeof f == "undefined") {
                hideLoader();
                return false;
            }
            if (from == 'Gallery') {
                if (!this.CheckImageResumeFileExtension(f.name.toLowerCase())) {
                    //debugger;

                    // talygen.alert("Valid  files are JPEG, PNG, GIF,BMP");
                    ShowAlert("Valid  files are JPEG, PNG, GIF,BMP", "warning", true, "Alert");
                    reader.onload = (function (theFile) {
                        return function (e) {
                            var binaryData = '';
                            //Converting Binary Data to base 64
                            var base64StringEncoded = '';
                            //showing file converted to base64
                            var fileName = '';
                            var n = '';
                            var extensionName = '';
                            var attachemnetMime = '';
                            fileName = '';
                            vm.attachement_mime = '';
                            vm.fileName = '';
                            // vm.containerFileName =vm.containername;
                            vm.base64String = '';
                            vm.GalleryData.item_image = '';
                            hideLoader();
                        };
                    })(f);
                    reader.readAsBinaryString(f);
                }
                else {
                    // Closure to capture the file information.
                    reader.onload = (function (theFile) {
                        return function (e) {
                            var binaryData = e.target.result;
                            //Converting Binary Data to base 64
                            var base64StringEncoded = window.btoa(binaryData);
                            //showing file converted to base64
                            var fileName = f.name;
                            var n = fileName.lastIndexOf(".");
                            var extensionName = fileName.substring(n + 1, fileName.length);
                            var attachemnetMime = '{"ContentType":"' + f.type + '","Size":"' + f.size + '","Extension":"' + extensionName + '"}';
                            fileName = f.name;
                            vm.attachement_mime = attachemnetMime;
                            vm.fileName = fileName;
                            // vm.containerFileName =vm.containername;
                            vm.base64String = base64StringEncoded;
                            hideLoader();
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    reader.readAsBinaryString(f);
                }
            }
            else if (from == 'csv') {
                if (!this.CheckCSVResumeFileExtension(f.name.toLowerCase())) {
                    //debugger;

                    // talygen.alert("Valid  files are csv.");
                    ShowAlert("Valid  files are csv.", "warning", true, "Alert");
                    reader.onload = (function (theFile) {
                        return function (e) {

                            hideLoader();
                        };
                    })(f);
                    reader.readAsBinaryString(f);
                }
                else {
                    // Closure to capture the file information.
                    reader.onload = (function (theFile) {
                        return function (e) {
                            var table = document.createElement("table");
                            var rows = e.target.result.split("\n");
                            var checkNameOrEmail = rows[0].includes("Name,Email");
                            // debugger;
                            if (checkNameOrEmail == true) {

                                $.each(rows, function (index, value) {

                                    if (index > 0) {

                                        var nameArr = rows[index].split(',');
                                        var strEmail = nameArr[1];
                                        var strName = nameArr[0];
                                        var result = false;
                                        if (typeof strEmail != 'undefined' && strEmail != null && strEmail != '') {
                                            result = strEmail.includes("@");
                                        }
                                        if (result && strName != '') {
                                            var emailContactObj = {
                                                value: index,
                                                name: nameArr[1],
                                                first_value: nameArr[0]
                                            }

                                            vm.UPLOADCONTACTDDL.push(emailContactObj);
                                            vm.UPLOADCONTACTDDLALL.push(emailContactObj);
                                        }

                                    }
                                });
                            }
                            else {

                                //alertR("please upload valid file.you can download sample file.", true, Globalize.localize('Alert'));
                                ShowAlert("please upload valid file.you can download sample file.", "warning", true, "Alert");
                            }

                            hideLoader();
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    reader.readAsBinaryString(f);


                }
            }

            else if (from == 'WishList' || from == 'Event') {
                //debugger;
                //img.naturalWidth
                // alert(f.naturalWidth + " " + f.naturalHeight);

                if (!this.CheckImageResumeFileExtension(f.name.toLowerCase())) {
                    //debugger;

                    // talygen.alert("Valid  files are JPEG, PNG, GIF,BMP.");
                    ShowAlert("Valid  files are JPEG, PNG, GIF,BMP..", "warning", true, "Alert");
                    $("#item_image").val("");
                    reader.onload = (function (theFile) {
                        return function (e) {
                            var binaryData = '';
                            //Converting Binary Data to base 64
                            var base64StringEncoded = '';
                            //showing file converted to base64
                            var fileName = '';
                            var n = '';
                            var extensionName = '';
                            var attachemnetMime = '';
                            fileName = '';
                            vm.attachement_mime = '';
                            vm.fileName = '';
                            // vm.containerFileName =vm.containername;
                            vm.base64String = '';
                            vm.item_image = '';
                            hideLoader();
                        };
                    })(f);
                    reader.readAsBinaryString(f);
                }
                else {




                    // Closure to capture the file information.
                    reader.onload = (function (theFile) {
                        // var height = this.height;
                        // var width = this.width;
                        return function (e) {
                            //debugger;
                            var img;
                            // debugger;
                            //reader.readAsDataURL(f);
                            //img = new Image();
                            //img.onload = () => {
                            //    debugger;
                            //    var w = img.width;
                            //    var h = img.height;

                            //}
                            var binaryData = e.target.result;
                            //Converting Binary Data to base 64
                            var base64StringEncoded = window.btoa(binaryData);
                            //showing file converted to base64
                            var fileName = f.name;
                            var n = fileName.lastIndexOf(".");
                            var extensionName = fileName.substring(n + 1, fileName.length);
                            var attachemnetMime = '{"ContentType":"' + f.type + '","Size":"' + f.size + '","Extension":"' + extensionName + '"}';
                            fileName = f.name;
                            vm.attachement_mime = attachemnetMime;
                            vm.fileName = fileName;
                            // vm.containerFileName =vm.containername;
                            vm.base64String = base64StringEncoded;
                            hideLoader();
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    reader.readAsBinaryString(f);
                }
            }

            else {
                if (!this.CheckResumeFileExtension(f.name.toLowerCase())) {
                    //debugger;

                    // talygen.alert("Valid  files are JPEG, PNG, GIF,doc,docx,txt,pdf,xlsx,xls or csv.");
                    ShowAlert("Valid  files are JPEG, PNG, GIF,doc,docx,txt,pdf,xlsx,xls or csv.", "warning", true, "Alert");
                    reader.onload = (function (theFile) {
                        return function (e) {
                            var binaryData = '';
                            //Converting Binary Data to base 64
                            var base64StringEncoded = '';
                            //showing file converted to base64
                            var fileName = '';
                            var n = '';
                            var extensionName = '';
                            var attachemnetMime = '';
                            fileName = '';
                            vm.attachement_mime = '';
                            vm.fileName = '';
                            // vm.containerFileName =vm.containername;
                            vm.base64String = '';
                            hideLoader();
                        };
                    })(f);
                    reader.readAsBinaryString(f);
                }
                else {
                    // Closure to capture the file information.
                    reader.onload = (function (theFile) {
                        return function (e) {
                            var binaryData = e.target.result;
                            //Converting Binary Data to base 64
                            var base64StringEncoded = window.btoa(binaryData);
                            //showing file converted to base64
                            var fileName = f.name;
                            var n = fileName.lastIndexOf(".");
                            var extensionName = fileName.substring(n + 1, fileName.length);
                            var attachemnetMime = '{"ContentType":"' + f.type + '","Size":"' + f.size + '","Extension":"' + extensionName + '"}';
                            fileName = f.name;
                            vm.attachement_mime = attachemnetMime;
                            vm.fileName = fileName;
                            // vm.containerFileName =vm.containername;
                            vm.base64String = base64StringEncoded;
                            hideLoader();
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    reader.readAsBinaryString(f);
                }
            }


        }
    }
}

