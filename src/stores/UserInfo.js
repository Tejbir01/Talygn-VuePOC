import { defineStore } from "pinia";

export const loggedUserInfo = defineStore({
    id: "UserInfo",
    state: () => ({
        ID: 769083,
        CompanyId: 270936,
        Name: "James Smith",
        TimeFormat: "12",
        Email: "jamessmith@yopmail.com",
        UserType: "CA",
        Avatar: "",
        ContainerName: "",
        CompanyLogo: "",
        Currency: "USD",
        Gender: "M",
        PageSize: 10,
        IsWithCC: "no",
        DoNotShowDirtyCheck: false,
        IsClientCA: true,
        CompanyStatusCode: "ACT",
        LoginStatus: 0,
        TimeZoneStatus: 0,
        IsInTrial: 0,
        IsDefault: true,
        TimeZone: "+530",
        MenuType: "Top",
        MenuTypeCode: "T",
        Theme: "Default",
        OrgComapanyId: null,
        CompanyName: "Drish Info Tech",
        EnableMyDashboard: true,
        FlagNotificationCheck: false,
        IsVendor: false,
        IsInitialSetup: false,
        IsContextMenuClosed: true,
        Token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkY5NzUyMzUxODkwQjNGMDI3QTMzRTIxMzNEQjREQkRGIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTQ1NzExODQsImV4cCI6MTY1NDU4OTE4NCwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMC4yMDA6OTA5NiIsImF1ZCI6WyJDUk1BUEkiLCJUaWNrZXRpbmciXSwiY2xpZW50X2lkIjoiTVZDSHlicmlkIiwic3ViIjoiNzY5MDgzIiwiYXV0aF90aW1lIjoxNjU0NTcxMTgyLCJpZHAiOiJsb2NhbCIsInByZWZlcnJlZF91c2VybmFtZSI6Ijc2OTA4MyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImphbWVzc21pdGhAeW9wbWFpbC5jb20iLCJ1c2VydHlwZSI6IkNBIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkphbWVzIE9TbWl0aCIsImlzZGVmYXVsdCI6dHJ1ZSwiZ2VuZGVyIjoiTSIsImNvbXBhbnlJZCI6MjcwOTM2LCJ0b2tlbmlkIjoiIiwiaWQiOjc2OTA4MywiY29tcGFueU5hbWUiOiJEcmlzaCBJbmZvIFRlY2giLCJjb250YWluZXJOYW1lIjoiY2ctZHJpc2gtaW5mby10ZWNoLTI3MDkzNiIsImxvZ2luU3RhdHVzIjoiMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkNBIiwiaXNFbmFibGVMb2dpbiI6IlRydWUiLCJhY3RpdmVMaWNlbnNlQ291bnQiOiIxMzciLCJ3b3JraW5nTGFuZ3VhZ2UiOiJlbiIsInRpbWVGb3JtYXQiOiIiLCJ0cmlhbE1lc3NhZ2UiOiIiLCJpbml0aWFsU2V0dXAiOiJUcnVlIiwiaXNTZWFyY2hCYXJPZmYiOiJGYWxzZSIsImlzTWVudVNsaWRlck9mZiI6IlRydWUiLCJjb21wYW55U3RhdHVzQ29kZSI6IkFDVCIsInJlc2V0X1Bhc3N3b3JkIjoiRmFsc2UiLCJtZW51dHlwZSI6IlRvcCIsInRpbWV6b25lIjoiKzA1OjMwIiwidGhlbWUiOiJEZWZhdWx0IiwiY29tcGFueWxvZ28iOiJjb21wYW55LWxvZ28uanBnIiwiYXZhdGFyIjoiQXhxZVRMd2xLdGltYWdlcy5wbmciLCJkYXRlRm9ybWF0IjoiIiwiSXNJblRyaWFsIjoiRmFsc2UiLCJDdXJyZW5jeSI6IihVU0QpIiwiUGFnZVNpemUiOiIxNSIsIklzVmVuZG9yIjoibm8iLCJJc0NsaWVudENBIjoiQ0EiLCJUaW1lWm9uZVN0YXR1cyI6IkZhbHNlIiwiSXNXaXRoQ0MiOiJUcnVlIiwiRG9Ob3RTaG93RGlydHlDaGVjayI6IlRydWUiLCJFbmFibGVNeURhc2hib2FyZCI6IlRydWUiLCJGbGFnTm90aWZpY2F0aW9uQ2hlY2siOiJGYWxzZSIsIk9yZ0NvbWFwYW55SWQiOiIwIiwic2lkIjoiMzQyQ0Y1MEI3QjBBQjg4REUxN0ZFRTE5QjZEMUExNUYiLCJpYXQiOjE2NTQ1NzExODQsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.b4I7X9vT5EMqQhudw_CqTpc6WIn8Tie4vmTqQLbFQmubIHo7IPHss7G5L7Vyy5eGkyglf2fR2uBUaIhPkYw2RR59qR9W8MekWVuP2OWhMfdU82VTKmzoj26tVvs0VludXhklJNjFIuCx7vxXsK8g-kZj3Nue0GUBbq3xQstJGr-A4mJTsdFdmxEb2W95mRQ4olmYS7bYcLk6Fv7CpU7NGIG7RWOLl-ntfoP4De6cbmwSJ9ve2268w5uXfn-_cOBcjwcfjUOug4RkfbxQHP_ilfZVkw8085xh2Z4DC0uD6jDFYN3ANwMy-pC993mx1SBpBZbGGUp1qmOV4_BVYsGdjA'
    }),
    getters: {
        GetUserInfo: (state) => {
            return state;
        }
    },
    actions: {
        async SetUserInfo(key, value) {
            if (key == "menutype") {
                this.MenuType = value;
            }
            else if (key == "contextmenuclosed") {
                this.IsContextMenuClosed = value;
            }
            else if (key == "name") {
                //debugger;
                this.Name = 'Radhay Chauhan';
            }
        },
        //async fetchPost(id) {

        //}
    },
    persist: true,
});





export const moduleStore = defineStore({
    id: "moduleMaster",
    state: () => ({
        ModuleId: 0,
    }),
    getters: {
        GetModuleId: (state) => state.ModuleId,
    },
    actions: {
        SetModuleId(value) {
            this.ModuleId = value;
        },
    },
});