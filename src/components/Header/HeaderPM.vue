<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
defineProps<{
  msg: string;
}>();
</script>
<template>
  <input type="hidden" id="hdnSortExp" value="" />
  <input type="hidden" id="hdnSortBy" value="" />
  <input type="hidden" id="hdnChkMobile" value="no" />
  <div class="container-fluid">
    <RouterLink to="/Home" class="navbar-brand" checkPrivilege="Yes">
      <img
        src="@/Content/images/DefaultImages/company-logo.jpg"
        loading="lazy"
        id="imghdrCompanyLogo"
        class="img-fluid"
      />
    </RouterLink>
    <button
      class="navbar-toggler navbar-toggler-right"
      type="button"
      data-toggle="collapse"
      data-target="#navbarResponsive"
      aria-controls="navbarResponsive"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item m-n-item wizardnew">
          <a
            class="nav-link"
            data-toggle="modal"
            href="#choosewizards"
            title="Wizard"
            ><span class="text-lmenu">@Resources.Wizard</span></a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            title="@Resources.FullScreen"
            id="btnFullscreen"
            href="javascript:;"
          >
            <i class="zoom-screen" aria-hidden="true">
              <img
                class="dark-full-screen"
                style="height: 1rem; width: 1rem"
                src="/src/Content/Responsive/images/iconfinder_fullscreen.png"
              />
              <img
                class="light-full-screen"
                style="height: 1rem; width: 1rem; display: none"
                src="/src/Content/Responsive/images/iconfinder_fullscreen-light.png"
              />
            </i>
            <span class="text-lmenu">FullScreen</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            id="popChatLink"
            class="nav-link"
            title="@Resources.Communication"
            href="javascript:;"
            ><i class="fa fa-commenting-o actionicon_20"
              ><small
                id="popChatCount"
                class="notification_bell"
                style="display: none"
              ></small></i
            ><span class="bookmark text-lmenu">Communication</span></a
          >
        </li>
        <li class="nav-item">
          <a
            id="popNotificationLink"
            class="nav-link"
            title="@Resources.Notifications"
            href="javascript:;"
            ><i class="fa fa-bell position-relative" style="font-size: 18px"
              ><small
                id="popNotificationCount"
                class="noti-circle noti-green px-1 position-absolute d-none"
                style="left: 20px; top: -4px"
              ></small></i
            ><span class="bookmark text-lmenu ml-1">Notifications</span></a
          >
          <div
            id="divPopNotificationData"
            style="display: none"
            class="position-absolute border themecontrol"
          ></div>
        </li>
        <li class="nav-item">
          <a
            class="nav-link ancbookmark"
            title="@Resources.Bookmark"
            href="javascript:;"
            ><i class="fa fa-star"></i
            ><span class="bookmark text-lmenu">Bookmark</span></a
          >
        </li>
        <li class="nav-item d-none">
          <a class="nav-link" title="@Resources.Socialize" href="javascript:;"
            ><i class="fa fa-comments"></i>
            <span class="socialize">Socialize</span></a
          >
        </li>
        <RouterLink
          to="/Dashboard"
          class="nav-link sidebaricon"
          checkPrivilege="Yes"
        >
          <span>dashboard</span>
        </RouterLink>
        <li class="nav-item dropdown position-unset">
          <a
            class="nav-link dropdown-toggle sidebaricon position-relative"
            title="@Resources.FullMenu"
            href="javascript:;"
            id="navbarDropdownPortfolio"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-th-large i-lmenu"></i><span>FullMenu</span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right full-menu-new overflow-visible"
            id="fullMenuUl"
            aria-labelledby="navbarDropdownPortfolio"
            style="max-height: 1000px"
          >
            <div class="menu-search-panel">
              <input
                type="text"
                name="search"
                value=""
                class="menusearchitem"
                placeholder="Type to Search Menu items"
                autocomplete="off"
              />
              <a
                class="clear-search"
                href="javascript:;"
                title=""
                data-toggle-tooltip="tooltip"
                data-original-title="Clear"
                ><i class="fa fa-times"></i
              ></a>
            </div>
            <div class="navigation-panel w-100">
              <div class="nav-heading" style="display: none">
                <span
                  ><i
                    class="fa fa-home cursor-pointer text-dark pr-2 ancbacktomenu"
                  ></i
                ></span>
                <span><i class="fa fa-angle-right text-dark pr-2"></i></span>
                <span id="spntext"><i class="fa fa-th-list d-none"></i></span>
                <span class="back ml-auto"
                  ><a
                    class="cursor-pointer ancbacktomenu"
                    title=""
                    data-toggle-tooltip="tooltip"
                    data-original-title="Back"
                    ><i class="fa fa-chevron-left"></i>Back</a
                  ></span
                >
              </div>
              <div
                id="scrollbar"
                style="max-height: 350px"
                class="mCustomScrollbar _mCS_1 mCS_no_scrollbar"
              >
                <div
                  id="mCSB_1"
                  class="mCustomScrollBox mCS-dark-thick mCSB_vertical mCSB_inside"
                  style="max-height: none"
                  tabindex="0"
                >
                  <div
                    id="mCSB_1_container"
                    class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                    style="position: relative; top: 0; left: 0"
                    dir="ltr"
                  >
                    <ul>
                      <li
                        data-id="5"
                        data-name="Appointment Calendar"
                        id="menuitem1"
                        class="menuitem"
                        data-index="1"
                        data-show-pop="no"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll1' style='max-height:200px;'><li class='itemhover'>External Link for Appointment </li><li class='itemhover'>Appointment Report</li><li class='itemhover'>Consumer List</li><li class='itemhover'>Counter</li><li class='itemhover'>Course</li><li class='itemhover'>Schedule Appointment</li><li class='itemhover'>Appointment Service</li><li class='itemhover'>Token</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-calendar"></i>Appointment Calendar
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="16"
                        data-name="Approval"
                        id="menuitem2"
                        class="menuitem"
                        data-index="2"
                        data-show-pop="no"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll2' style='max-height:200px;'><li class='itemhover'>Approval Chain </li><li class='itemhover'>Approval Group</li><li class='itemhover'>Approval Report</li><li class='itemhover'>Approval Rule</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-check-circle"></i>Approval
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="6"
                        data-url="/Asset/Dashboard?reqhFrom=6"
                        data-privilege="Yes"
                        data-name="Asset Management "
                        id="menuitem3"
                        class="menuitem"
                        data-index="3"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="/Asset/Dashboard?reqhFrom=6"
                          checkprivilege="Yes"
                          data-content="<ul class='itemscroll w-100' id='itemscroll3' style='max-height:200px;'><li class='itemhover'>Group List</li><li class='itemhover'>Items Scan Summary</li><li class='itemhover'>Return Products</li><li class='itemhover'>RFID Asset Listing</li><li class='itemhover'>RFID Missing Assets</li><li class='itemhover'>Scanned Items</li><li class='itemhover'>Scanned Items Status</li><li class='itemhover'>Asset Dashboard</li><li class='itemhover'>Manage Product</li><li class='itemhover'>My Products</li><li class='itemhover'>Product Write-Off</li><li class='itemhover'>Product Report</li><li class='itemhover'>Product Assignment</li><li class='itemhover'>Products Container List</li><li class='itemhover'>Product Type</li><li class='itemhover'>New Product Type Request</li><li class='itemhover'>Pending Requests</li><li class='itemhover'>Maintenance Schedule</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer"
                        >
                          <i class="fa fa-th-list"></i>Asset Management
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="9"
                        data-name="Billing"
                        id="menuitem4"
                        class="menuitem"
                        data-index="4"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll4' style='max-height:200px;'><li class='itemhover'>Automate Flag Processing</li><li class='itemhover'>Billing Rule</li><li class='itemhover'>Billing Services</li><li class='itemhover'>Billing Setup</li><li class='itemhover'>Flag Records</li><li class='itemhover'>Client Report</li><li class='itemhover'>Add New Invoice</li><li class='itemhover'>Import Invoice</li><li class='itemhover'>Invoice</li><li class='itemhover'>Invoice Report</li><li class='itemhover'>Process &amp; Reprocess Charges</li><li class='itemhover'>Rate Schedule</li><li class='itemhover'>Received Invoice</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-wpforms"></i>Billing
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="0"
                        data-name="COMPANY SETUP"
                        id="menuitem5"
                        class="menuitem"
                        data-index="5"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll5' style='max-height:200px;'><li class='itemhover'>Clients</li><li class='itemhover'>Company Directory </li><li class='itemhover'>Company Setup</li><li class='itemhover'>Configuration</li><li class='itemhover'>Context Menu</li><li class='itemhover'>Manage Layout</li><li class='itemhover'>Manage Subscription</li><li class='itemhover'>Manage Tax</li><li class='itemhover'>Manage Tax</li><li class='itemhover'>Resource Approval</li><li class='itemhover'>Roles</li><li class='itemhover'>Search Vendors</li><li class='itemhover'>User</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-cog"></i>COMPANY SETUP
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="4"
                        data-url="/CRM/dashboard?reqhFrom=4"
                        data-privilege="Yes"
                        data-name="CRM"
                        id="menuitem6"
                        class="menuitem"
                        data-index="6"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="/CRM/dashboard?reqhFrom=4"
                          checkprivilege="Yes"
                          data-content="<ul class='itemscroll w-100' id='itemscroll6' style='max-height:200px;'><li class='itemhover'>Accounts</li><li class='itemhover'>Brand</li><li class='itemhover'>Campaign </li><li class='itemhover'>Communication</li><li class='itemhover'>Contact</li><li class='itemhover'>Contract</li><li class='itemhover'>CRM Dashboard</li><li class='itemhover'>CRM Report</li><li class='itemhover'>Deal</li><li class='itemhover'>Goods Inward</li><li class='itemhover'>Invoice</li><li class='itemhover'>Product</li><li class='itemhover'>Product Type</li><li class='itemhover'>Lead</li><li class='itemhover'>Price Book</li><li class='itemhover'>Purchase Order</li><li class='itemhover'>Quote</li><li class='itemhover'>Sales Order</li><li class='itemhover'>Stage</li><li class='itemhover'>Vendor</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer"
                        >
                          <i class="fa fa-handshake-o"></i>CRM
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="13"
                        data-url="/File/Dashboard?reqhFrom=13"
                        data-privilege="Yes"
                        data-name="Document Storage"
                        id="menuitem7"
                        class="menuitem"
                        data-index="7"
                        data-show-pop="no"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="/File/Dashboard?reqhFrom=13"
                          checkprivilege="Yes"
                          data-content="<ul class='itemscroll w-100' id='itemscroll7' style='max-height:200px;'><li class='itemhover'>File Dashboard</li><li class='itemhover'>Manage Client Storage</li><li class='itemhover'>Manage User Storage</li><li class='itemhover'>User Storage Report</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer"
                        >
                          <i class="fa fa-server"></i>Document Storage
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                    </ul>
                    <ul>
                      <li
                        data-id="11"
                        data-url="/Event/Dashboard?reqhFrom=11"
                        data-privilege="Yes"
                        data-name="Event Management"
                        id="menuitem8"
                        class="menuitem"
                        data-index="8"
                        data-show-pop="no"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="/Event/Dashboard?reqhFrom=11"
                          checkprivilege="Yes"
                          data-content="<ul class='itemscroll w-100' id='itemscroll8' style='max-height:200px;'><li class='itemhover'>Calendar</li><li class='itemhover'>Google Calendar</li><li class='itemhover'>Dashboard</li><li class='itemhover'>Event Management</li><li class='itemhover'>Manage Venue</li><li class='itemhover'>User Availability </li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer"
                        >
                          <i class="fa fa-calendar-check-o"></i>Event Management
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="2"
                        data-url="/Expenses/Dashboard?reqhFrom=2"
                        data-privilege="Yes"
                        data-name="Expense "
                        id="menuitem9"
                        class="menuitem"
                        data-index="9"
                        data-show-pop="no"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="/Expenses/Dashboard?reqhFrom=2"
                          checkprivilege="Yes"
                          data-content="<ul class='itemscroll w-100' id='itemscroll9' style='max-height:200px;'><li class='itemhover'>Add Expense</li><li class='itemhover'>Bulk Upload Expense</li><li class='itemhover'>Expense Approval</li><li class='itemhover'>Expense Report</li><li class='itemhover'>Expenses</li><li class='itemhover'>Expense Dashboard</li><li class='itemhover'>Project</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer"
                        >
                          <i class="fa fa-usd"></i>Expense
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="10"
                        data-name="General"
                        id="menuitem10"
                        class="menuitem"
                        data-index="10"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll10' style='max-height:200px;'><li class='itemhover'>Add a Report</li><li class='itemhover'>Auto Responder</li><li class='itemhover'>Custom Fields</li><li class='itemhover'>Custom Reports</li><li class='itemhover'>External Link</li><li class='itemhover'>Passport Information</li><li class='itemhover'>Manage Tags</li><li class='itemhover'>Organization Chart</li><li class='itemhover'>Provisional Rights</li><li class='itemhover'>Rule Engine</li><li class='itemhover'>Storage</li><li class='itemhover'>Tags</li><li class='itemhover'>Working Day</li><li class='itemhover'>Working Week</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-file"></i>General
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="7"
                        data-name="Hiring"
                        id="menuitem11"
                        class="menuitem"
                        data-index="11"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll11' style='max-height:200px;'><li class='itemhover'>Associated Vendors</li><li class='itemhover'>Candidate List</li><li class='itemhover'>Consultant List</li><li class='itemhover'>Group List</li><li class='itemhover'>Job Board Layout Settings</li><li class='itemhover'>Job List</li><li class='itemhover'>Job Post Report</li><li class='itemhover'>Job Requisition</li><li class='itemhover'>Manage Candidate</li><li class='itemhover'>Manage Job</li><li class='itemhover'>Offboard Employee List</li><li class='itemhover'>Policy</li><li class='itemhover'>Resignation</li><li class='itemhover'>Service</li><li class='itemhover'>Talent Pool List</li><li class='itemhover'>Vendor Listing</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-handshake-o"></i>Hiring
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="33"
                        data-url="/HR/Dashboard?reqhFrom=33"
                        data-privilege="Yes"
                        data-name="Human Resources"
                        id="menuitem12"
                        class="menuitem"
                        data-index="12"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="/HR/Dashboard?reqhFrom=33"
                          checkprivilege="Yes"
                          data-content="<ul class='itemscroll w-100' id='itemscroll12' style='max-height:200px;'><li class='itemhover'>Attendance</li><li class='itemhover'>Attendance Approval</li><li class='itemhover'>Candidate List</li><li class='itemhover'>Check-In Flag List</li><li class='itemhover'>Consultant List</li><li class='itemhover'>Group List</li><li class='itemhover'>HR Dashboard</li><li class='itemhover'>HR Report</li><li class='itemhover'>Induction Document List</li><li class='itemhover'>Leave</li><li class='itemhover'>Leave Approval</li><li class='itemhover'>Leave Type- Listing</li><li class='itemhover'>Manage Candidate</li><li class='itemhover'>Manage Check-In</li><li class='itemhover'>Talent Pool List</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer"
                        >
                          <i class="fa fa-exclamation-triangle"></i>Human
                          Resources
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="17"
                        data-name="Integration"
                        id="menuitem13"
                        class="menuitem"
                        data-index="13"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll13' style='max-height:200px;'><li class='itemhover'>Basecamp</li><li class='itemhover'>Cloud Storage</li><li class='itemhover'>Connector</li><li class='itemhover'>Email</li><li class='itemhover'>FreshBooks</li><li class='itemhover'>GPS Tracking</li><li class='itemhover'>IVR</li><li class='itemhover'>Microsoft Project Plan</li><li class='itemhover'>QuickBooks</li><li class='itemhover'>Salesforce</li><li class='itemhover'>Trello</li><li class='itemhover'>Twilio</li><li class='itemhover'>Unified Setup</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-clone"></i>Integration
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                    </ul>
                    <ul>
                      <li
                        data-id="14"
                        data-name="Performance Review"
                        id="menuitem14"
                        class="menuitem"
                        data-index="14"
                        data-show-pop="no"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll14' style='max-height:200px;'><li class='itemhover'>Performance Review</li><li class='itemhover'>Performance Review Report</li><li class='itemhover'>Provide Feedback</li><li class='itemhover'>Provide Review</li><li class='itemhover'>Review</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-file-text"></i>Performance Review
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="1"
                        data-url="/Project/Dashboard?reqhFrom=1"
                        data-privilege="Yes"
                        data-name="Project Management"
                        id="menuitem15"
                        class="menuitem"
                        data-index="15"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="/Project/Dashboard?reqhFrom=1"
                          checkprivilege="Yes"
                          data-content="<ul class='itemscroll w-100' id='itemscroll15' style='max-height:200px;'><li class='itemhover'>Dashboard</li><li class='itemhover'>Global Task</li><li class='itemhover'>Project</li><li class='itemhover'>Project Report</li><li class='itemhover'>Project Request</li><li class='itemhover'>Quotes</li><li class='itemhover'>Requested Time List</li><li class='itemhover'>Resource Scheduling </li><li class='itemhover'>Project Road Map</li><li class='itemhover'>Task</li><li class='itemhover'>To Do List</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer"
                        >
                          <i class="fa fa-folder-open"></i>Project Management
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="12"
                        data-url="/Ticketing/Dashboard?reqhFrom=12"
                        data-privilege="Yes"
                        data-name="Ticketing"
                        id="menuitem16"
                        class="menuitem"
                        data-index="16"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="/Ticketing/Dashboard?reqhFrom=12"
                          checkprivilege="Yes"
                          data-content="<ul class='itemscroll w-100' id='itemscroll16' style='max-height:200px;'><li class='itemhover'>Ticketing Dashboard</li><li class='itemhover'>Ticketing</li><li class='itemhover'>Add Ticket</li><li class='itemhover'>Unassigned Tickets</li><li class='itemhover'>Ticket Feedback</li><li class='itemhover'>Canned Reply</li><li class='itemhover'>Ticket Layout Settings</li><li class='itemhover'>Ticket Report</li><li class='itemhover'>Manage Service Board</li><li class='itemhover'>Ticket Group</li><li class='itemhover'>SLA</li><li class='itemhover'>Add ticket Group</li><li class='itemhover'>Knowledge Base</li><li class='itemhover'>Manage Category</li><li class='itemhover'>My Articles</li><li class='itemhover'>Product</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer"
                        >
                          <i class="fa fa-ticket"></i>Ticketing
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="3"
                        data-name="Time Tracking"
                        id="menuitem17"
                        class="menuitem"
                        data-index="17"
                        data-show-pop="yes"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll17' style='max-height:200px;'><li class='itemhover'>Audit Rule</li><li class='itemhover'>Bulk Time Entry</li><li class='itemhover'>Calendar</li><li class='itemhover'>Flag Track Entry</li><li class='itemhover'>Project Report</li><li class='itemhover'>Time Report</li><li class='itemhover'>Time Approval</li><li class='itemhover'>Timesheet</li><li class='itemhover'>Time Track</li><li class='itemhover'>Work Diary</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-clock-o"></i>Time Tracking
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                      <li
                        data-id="15"
                        data-name="Training"
                        id="menuitem18"
                        class="menuitem"
                        data-index="18"
                        data-show-pop="no"
                      >
                        <a
                          data-toggle="popover"
                          data-placement="right"
                          href="javascript:;"
                          data-content="<ul class='itemscroll w-100' id='itemscroll18' style='max-height:200px;'><li class='itemhover'>Training</li><li class='itemhover'>Training Report</li></ul>"
                          data-html="true"
                          class="mainmenu menuitemsover cursor-pointer menudashboard"
                        >
                          <i class="fa fa-clipboard"></i>Training
                        </a>
                        <span class="fa fa-angle-right gotosub"></span>
                      </li>
                    </ul>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_15"
                        data-p-id="15"
                        data-p-name="Training"
                      >
                        <li class="menuitem" menucount="0" count="1">
                          <a
                            href="/Training/Index?reqhFrom=15"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Training"
                            ><i class="fa fa-circle"></i>Training</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_15"
                        data-p-id="15"
                        data-p-name="Training"
                      >
                        <li class="menuitem" menucount="0" count="1">
                          <a
                            href="/TrainingReport/Index?reqhFrom=15"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Training Report"
                            ><i class="fa fa-circle"></i>Training Report</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_15"
                        data-p-id="15"
                        data-p-name="Training"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_16"
                        data-p-id="16"
                        data-p-name="Approval"
                      >
                        <li class="menuitem" menucount="1" count="1">
                          <a
                            href="/ApprovalChain/Index?reqhFrom=16"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Approval Chain "
                            ><i class="fa fa-circle"></i>Approval Chain
                          </a>
                        </li>
                        <li class="menuitem" menucount="1" count="2">
                          <a
                            href="/ApprovalGroup/Index?reqhFrom=16"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Approval Group"
                            ><i class="fa fa-circle"></i>Approval Group</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_16"
                        data-p-id="16"
                        data-p-name="Approval"
                      >
                        <li class="menuitem" menucount="1" count="1">
                          <a
                            href="/ApprovalReport/Index?reqhFrom=16"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Approval Report"
                            ><i class="fa fa-circle"></i>Approval Report</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_16"
                        data-p-id="16"
                        data-p-name="Approval"
                      >
                        <li class="menuitem" menucount="1" count="1">
                          <a
                            href="/ApprovalRule/Index?reqhFrom=16"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Approval Rule"
                            ><i class="fa fa-circle"></i>Approval Rule</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_16"
                        data-p-id="16"
                        data-p-name="Approval"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_13"
                        data-p-id="13"
                        data-p-name="Document Storage"
                      >
                        <li class="menuitem" menucount="1" count="2">
                          <a
                            href="/UserStorage/ManageClient?reqhFrom=13"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Client Storage"
                            ><i class="fa fa-circle"></i>Manage Client
                            Storage</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_13"
                        data-p-id="13"
                        data-p-name="Document Storage"
                      >
                        <li class="menuitem" menucount="1" count="1">
                          <a
                            href="/UserStorage/Manage?reqhFrom=13"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage User Storage"
                            ><i class="fa fa-circle"></i>Manage User Storage</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_13"
                        data-p-id="13"
                        data-p-name="Document Storage"
                      >
                        <li class="menuitem" menucount="1" count="1">
                          <a
                            href="/UserStorageReport/Index?reqhFrom=13"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="User Storage Report"
                            ><i class="fa fa-circle"></i>User Storage Report</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_13"
                        data-p-id="13"
                        data-p-name="Document Storage"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_14"
                        data-p-id="14"
                        data-p-name="Performance Review"
                      >
                        <li class="menuitem" menucount="1" count="1">
                          <a
                            href="/Review/Main?reqhFrom=14"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Performance Review"
                            ><i class="fa fa-circle"></i>Performance Review</a
                          >
                        </li>
                        <li class="menuitem" menucount="1" count="2">
                          <a
                            href="/PerformanceReviewReport/Index?reqhFrom=14"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Performance Review Report"
                            ><i class="fa fa-circle"></i>Performance Review
                            Report</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_14"
                        data-p-id="14"
                        data-p-name="Performance Review"
                      >
                        <li class="menuitem" menucount="1" count="1">
                          <a
                            href="/Feedback/UserFeedbackListing?reqhFrom=14"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Provide Feedback"
                            ><i class="fa fa-circle"></i>Provide Feedback</a
                          >
                        </li>
                        <li class="menuitem" menucount="1" count="2">
                          <a
                            href="/Review/ReviewListingForReviewer?reqhFrom=14"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Provide Review"
                            ><i class="fa fa-circle"></i>Provide Review</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_14"
                        data-p-id="14"
                        data-p-name="Performance Review"
                      >
                        <li class="menuitem" menucount="1" count="1">
                          <a
                            href="/Review/Index?reqhFrom=14"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Review"
                            ><i class="fa fa-circle"></i>Review</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_14"
                        data-p-id="14"
                        data-p-name="Performance Review"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_11"
                        data-p-id="11"
                        data-p-name="Event Management"
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Calendar/Calendar?reqhFrom=11"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Calendar"
                            ><i class="fa fa-circle"></i>Calendar</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/CalSource/Manage?reqhFrom=11"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Google Calendar"
                            ><i class="fa fa-circle"></i>Google Calendar</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="4">
                          <a
                            href="/Event/Index?reqhFrom=11"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Event Management"
                            ><i class="fa fa-circle"></i>Event Management</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_11"
                        data-p-id="11"
                        data-p-name="Event Management"
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Event/ManageLocation?reqhFrom=11"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Venue"
                            ><i class="fa fa-circle"></i>Manage Venue</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/UserAvailability/Index?reqhFrom=11"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="User Availability "
                            ><i class="fa fa-circle"></i>User Availability
                          </a>
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_11"
                        data-p-id="11"
                        data-p-name="Event Management"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_2"
                        data-p-id="2"
                        data-p-name="Expense "
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Expenses/Add?reqhFrom=2"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Add Expense"
                            ><i class="fa fa-circle"></i>Add Expense</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/Expenses/Import?reqhFrom=2"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Bulk Upload Expense"
                            ><i class="fa fa-circle"></i>Bulk Upload Expense</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="3">
                          <a
                            href="/ExpenseApproval/Index?reqhFrom=2"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Expense Approval"
                            ><i class="fa fa-circle"></i>Expense Approval</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_2"
                        data-p-id="2"
                        data-p-name="Expense "
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/ExpenseReport/Index?reqhFrom=2"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Expense Report"
                            ><i class="fa fa-circle"></i>Expense Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/Expenses/Index?reqhFrom=2"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Expenses"
                            ><i class="fa fa-circle"></i>Expenses</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_2"
                        data-p-id="2"
                        data-p-name="Expense "
                      >
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/Project/Index?reqhFrom=2"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Project"
                            ><i class="fa fa-circle"></i>Project</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_2"
                        data-p-id="2"
                        data-p-name="Expense "
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_5"
                        data-p-id="5"
                        data-p-name="Appointment Calendar"
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Appointment/GlobalURL?reqhFrom=5"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="External Link for Appointment "
                            ><i class="fa fa-circle"></i>External Link for
                            Appointment
                          </a>
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/AppointmentCalendarReport/Index?reqhFrom=5"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Appointment Report"
                            ><i class="fa fa-circle"></i>Appointment Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="3">
                          <a
                            href="/Consumer/List?reqhFrom=5"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Consumer List"
                            ><i class="fa fa-circle"></i>Consumer List</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_5"
                        data-p-id="5"
                        data-p-name="Appointment Calendar"
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Counter/index?reqhFrom=5"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Counter"
                            ><i class="fa fa-circle"></i>Counter</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/Course/Index?reqhFrom=5"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Course"
                            ><i class="fa fa-circle"></i>Course</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="3">
                          <a
                            href="/Service/Index?reqhFrom=5"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Schedule Appointment"
                            ><i class="fa fa-circle"></i>Schedule Appointment</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_5"
                        data-p-id="5"
                        data-p-name="Appointment Calendar"
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/ServiceMaster/List?reqhFrom=5"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Appointment Service"
                            ><i class="fa fa-circle"></i>Appointment Service</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/CounterToken/index?reqhFrom=5"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Token"
                            ><i class="fa fa-circle"></i>Token</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_5"
                        data-p-id="5"
                        data-p-name="Appointment Calendar"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_3"
                        data-p-id="3"
                        data-p-name="Time Tracking"
                      >
                        <li class="menuitem" menucount="3" count="1">
                          <a
                            href="/Audit/Index?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Audit Rule"
                            ><i class="fa fa-circle"></i>Audit Rule</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="2">
                          <a
                            href="/Timer/BulkTimeEntry?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Bulk Time Entry"
                            ><i class="fa fa-circle"></i>Bulk Time Entry</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="3">
                          <a
                            href="/Calendar/Calendar?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Calendar"
                            ><i class="fa fa-circle"></i>Calendar</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="4">
                          <a
                            href="/Timer/TrackEntryFlag?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Flag Track Entry"
                            ><i class="fa fa-circle"></i>Flag Track Entry</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_3"
                        data-p-id="3"
                        data-p-name="Time Tracking"
                      >
                        <li class="menuitem" menucount="3" count="1">
                          <a
                            href="/BIReport/Index?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Project Report"
                            ><i class="fa fa-circle"></i>Project Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="2">
                          <a
                            href="/BIReport/Index?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Time Report"
                            ><i class="fa fa-circle"></i>Time Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="3">
                          <a
                            href="/TimeApproval/Index?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Time Approval"
                            ><i class="fa fa-circle"></i>Time Approval</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_3"
                        data-p-id="3"
                        data-p-name="Time Tracking"
                      >
                        <li class="menuitem" menucount="3" count="1">
                          <a
                            href="/Timesheet/Index?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Timesheet"
                            ><i class="fa fa-circle"></i>Timesheet</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="2">
                          <a
                            href="/Timer/Index?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Time Track"
                            ><i class="fa fa-circle"></i>Time Track</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="3">
                          <a
                            href="/WorkDiary/Index?reqhFrom=3"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Work Diary"
                            ><i class="fa fa-circle"></i>Work Diary</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_3"
                        data-p-id="3"
                        data-p-name="Time Tracking"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_1"
                        data-p-id="1"
                        data-p-name="Project Management"
                      >
                        <li class="menuitem" menucount="3" count="2">
                          <a
                            href="/GlobalTask/Index?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Global Task"
                            ><i class="fa fa-circle"></i>Global Task</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="3">
                          <a
                            href="/Project/Index?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Project"
                            ><i class="fa fa-circle"></i>Project</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="4">
                          <a
                            href="/BIReport/Index?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Project Report"
                            ><i class="fa fa-circle"></i>Project Report</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_1"
                        data-p-id="1"
                        data-p-name="Project Management"
                      >
                        <li class="menuitem" menucount="3" count="1">
                          <a
                            href="/ProjectRequest/Index?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Project Request"
                            ><i class="fa fa-circle"></i>Project Request</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="2">
                          <a
                            href="/Quotation/Index?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Quotes"
                            ><i class="fa fa-circle"></i>Quotes</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="3">
                          <a
                            href="/Project/RequestTimeList?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Requested Time List"
                            ><i class="fa fa-circle"></i>Requested Time List</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="4">
                          <a
                            href="/ResourceScheduling/Create?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Resource Scheduling "
                            ><i class="fa fa-circle"></i>Resource Scheduling
                          </a>
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_1"
                        data-p-id="1"
                        data-p-name="Project Management"
                      >
                        <li class="menuitem" menucount="3" count="1">
                          <a
                            href="/RoadMap/View?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Project Road Map"
                            ><i class="fa fa-circle"></i>Project Road Map</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="2">
                          <a
                            href="/Task/Index?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Task"
                            ><i class="fa fa-circle"></i>Task</a
                          >
                        </li>
                        <li class="menuitem" menucount="3" count="3">
                          <a
                            href="/Project/ToDoList?reqhFrom=1"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="To Do List"
                            ><i class="fa fa-circle"></i>To Do List</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_1"
                        data-p-id="1"
                        data-p-name="Project Management"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_9"
                        data-p-id="9"
                        data-p-name="Billing"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/ClientFlag/Index?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Automate Flag Processing"
                            ><i class="fa fa-circle"></i>Automate Flag
                            Processing</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/BillingRule/RuleListing?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Billing Rule"
                            ><i class="fa fa-circle"></i>Billing Rule</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/BillingService/Index?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Billing Services"
                            ><i class="fa fa-circle"></i>Billing Services</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/BillingRule/ImportFormatListing?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Billing Setup"
                            ><i class="fa fa-circle"></i>Billing Setup</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="5">
                          <a
                            href="/ClientInvoice/CatchAll?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Flag Records"
                            ><i class="fa fa-circle"></i>Flag Records</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_9"
                        data-p-id="9"
                        data-p-name="Billing"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/ClientReport/Index?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Client Report"
                            ><i class="fa fa-circle"></i>Client Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/ClientBill/Create?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Add New Invoice"
                            ><i class="fa fa-circle"></i>Add New Invoice</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/ClientInvoice/ImportFileList?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Import Invoice"
                            ><i class="fa fa-circle"></i>Import Invoice</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/ClientBill/Index?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Invoice"
                            ><i class="fa fa-circle"></i>Invoice</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_9"
                        data-p-id="9"
                        data-p-name="Billing"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/InvoiceReport/Index?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Invoice Report"
                            ><i class="fa fa-circle"></i>Invoice Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/BillingRule/ReprocessCharge?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Process &amp; Reprocess Charges"
                            ><i class="fa fa-circle"></i>Process &amp; Reprocess
                            Charges</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/RateSchedule/Index?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Rate Schedule"
                            ><i class="fa fa-circle"></i>Rate Schedule</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/ClientBill/RecievedInvoice?reqhFrom=9"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Received Invoice"
                            ><i class="fa fa-circle"></i>Received Invoice</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_9"
                        data-p-id="9"
                        data-p-name="Billing"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_0"
                        data-p-id="0"
                        data-p-name="COMPANY SETUP"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/Client/Index?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Clients"
                            ><i class="fa fa-circle"></i>Clients</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/User/DirectoryListing?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Company Directory "
                            ><i class="fa fa-circle"></i>Company Directory
                          </a>
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/AnnouncementMessage/Index?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Company Setup"
                            ><i class="fa fa-circle"></i>Company Setup</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/Configuration/index?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Configuration"
                            ><i class="fa fa-circle"></i>Configuration</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="5">
                          <a
                            href="/CompanyAdmin/ViewContextMenu?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Context Menu"
                            ><i class="fa fa-circle"></i>Context Menu</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_0"
                        data-p-id="0"
                        data-p-name="COMPANY SETUP"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/Home/ManageLayout?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Layout"
                            ><i class="fa fa-circle"></i>Manage Layout</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/Billing/Index?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Subscription"
                            ><i class="fa fa-circle"></i>Manage Subscription</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/Tax/Index?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Tax"
                            ><i class="fa fa-circle"></i>Manage Tax</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/Home/ManageTax?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Tax"
                            ><i class="fa fa-circle"></i>Manage Tax</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_0"
                        data-p-id="0"
                        data-p-name="COMPANY SETUP"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/EmployeeSharing/RequestRaisedForMe?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Resource Approval"
                            ><i class="fa fa-circle"></i>Resource Approval</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/Roles/Index?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Roles"
                            ><i class="fa fa-circle"></i>Roles</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/vendoruser/searchvendors?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Search Vendors"
                            ><i class="fa fa-circle"></i>Search Vendors</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/User/Index?reqhFrom=0"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="User"
                            ><i class="fa fa-circle"></i>User</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_0"
                        data-p-id="0"
                        data-p-name="COMPANY SETUP"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_17"
                        data-p-id="17"
                        data-p-name="Integration"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/Integration/BaseCamp?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Basecamp"
                            ><i class="fa fa-circle"></i>Basecamp</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/Integration/GoogleDrive?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Cloud Storage"
                            ><i class="fa fa-circle"></i>Cloud Storage</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/Integration/Connector?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Connector"
                            ><i class="fa fa-circle"></i>Connector</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/Outlook/View?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Email"
                            ><i class="fa fa-circle"></i>Email</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="5">
                          <a
                            href="/Integration/FreshBooks?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="FreshBooks"
                            ><i class="fa fa-circle"></i>FreshBooks</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_17"
                        data-p-id="17"
                        data-p-name="Integration"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/Integration/Geotab?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="GPS Tracking"
                            ><i class="fa fa-circle"></i>GPS Tracking</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/Communication/IVR?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="IVR"
                            ><i class="fa fa-circle"></i>IVR</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/Integration/MicrosoftProjectPlan?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Microsoft Project Plan"
                            ><i class="fa fa-circle"></i>Microsoft Project
                            Plan</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/Integration/QuickBooks?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="QuickBooks"
                            ><i class="fa fa-circle"></i>QuickBooks</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_17"
                        data-p-id="17"
                        data-p-name="Integration"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/Integration/SalesForce?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Salesforce"
                            ><i class="fa fa-circle"></i>Salesforce</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/Trello/Add?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Trello"
                            ><i class="fa fa-circle"></i>Trello</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/Integration/Twilio?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Twilio"
                            ><i class="fa fa-circle"></i>Twilio</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/UnifiedCommunication/Setup?reqhFrom=17"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Unified Setup"
                            ><i class="fa fa-circle"></i>Unified Setup</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_17"
                        data-p-id="17"
                        data-p-name="Integration"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_10"
                        data-p-id="10"
                        data-p-name="General"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/Report/Add?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Add a Report"
                            ><i class="fa fa-circle"></i>Add a Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/AutoResponder/Index?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Auto Responder"
                            ><i class="fa fa-circle"></i>Auto Responder</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/CustomField/Index?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Custom Fields"
                            ><i class="fa fa-circle"></i>Custom Fields</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/Report/Index?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Custom Reports"
                            ><i class="fa fa-circle"></i>Custom Reports</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="5">
                          <a
                            href="/CompanyAdmin/ExternalLinkList?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="External Link"
                            ><i class="fa fa-circle"></i>External Link</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_10"
                        data-p-id="10"
                        data-p-name="General"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/Immigration/Index?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Passport Information"
                            ><i class="fa fa-circle"></i>Passport Information</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/Tag/Index?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Tags"
                            ><i class="fa fa-circle"></i>Manage Tags</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/OrganizationChart/OrgChart?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Organization Chart"
                            ><i class="fa fa-circle"></i>Organization Chart</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/ProvisionalRight/Index?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Provisional Rights"
                            ><i class="fa fa-circle"></i>Provisional Rights</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="5">
                          <a
                            href="/RuleEngine/Index?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Rule Engine"
                            ><i class="fa fa-circle"></i>Rule Engine</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_10"
                        data-p-id="10"
                        data-p-name="General"
                      >
                        <li class="menuitem" menucount="4" count="1">
                          <a
                            href="/Storage/index?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Storage"
                            ><i class="fa fa-circle"></i>Storage</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="2">
                          <a
                            href="/Tag/TagData?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Tags"
                            ><i class="fa fa-circle"></i>Tags</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="3">
                          <a
                            href="/WorkDay/Manage?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Working Day"
                            ><i class="fa fa-circle"></i>Working Day</a
                          >
                        </li>
                        <li class="menuitem" menucount="4" count="4">
                          <a
                            href="/Week/manage?reqhFrom=10"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Working Week"
                            ><i class="fa fa-circle"></i>Working Week</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_10"
                        data-p-id="10"
                        data-p-name="General"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_33"
                        data-p-id="33"
                        data-p-name="Human Resources"
                      >
                        <li class="menuitem" menucount="5" count="1">
                          <a
                            href="/Attendance/Index?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Attendance"
                            ><i class="fa fa-circle"></i>Attendance</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="2">
                          <a
                            href="/AttendanceApproval/Index?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Attendance Approval"
                            ><i class="fa fa-circle"></i>Attendance Approval</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="3">
                          <a
                            href="/HR/CandidateList?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Candidate List"
                            ><i class="fa fa-circle"></i>Candidate List</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="4">
                          <a
                            href="/Attendance/CheckinFlagList?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Check-In Flag List"
                            ><i class="fa fa-circle"></i>Check-In Flag List</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="5">
                          <a
                            href="/HR/ConsultantList?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Consultant List"
                            ><i class="fa fa-circle"></i>Consultant List</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="6">
                          <a
                            href="/HR/GroupListing?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Group List"
                            ><i class="fa fa-circle"></i>Group List</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_33"
                        data-p-id="33"
                        data-p-name="Human Resources"
                      >
                        <li class="menuitem" menucount="5" count="2">
                          <a
                            href="/HRReport/Index?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="HR Report"
                            ><i class="fa fa-circle"></i>HR Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="3">
                          <a
                            href="/HR/InductionDocumentList?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Induction Document List"
                            ><i class="fa fa-circle"></i>Induction Document
                            List</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="4">
                          <a
                            href="/HR/LeaveList?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Leave"
                            ><i class="fa fa-circle"></i>Leave</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="5">
                          <a
                            href="/LeaveApproval/Index?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Leave Approval"
                            ><i class="fa fa-circle"></i>Leave Approval</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_33"
                        data-p-id="33"
                        data-p-name="Human Resources"
                      >
                        <li class="menuitem" menucount="5" count="1">
                          <a
                            href="/HR/LeaveTypeListing?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Leave Type- Listing"
                            ><i class="fa fa-circle"></i>Leave Type- Listing</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="2">
                          <a
                            href="/HR/ManageCandidate?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Candidate"
                            ><i class="fa fa-circle"></i>Manage Candidate</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="3">
                          <a
                            href="/Attendance/UserTrack?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Check-In"
                            ><i class="fa fa-circle"></i>Manage Check-In</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="4">
                          <a
                            href="/HR/TalentPoolList?reqhFrom=33"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Talent Pool List"
                            ><i class="fa fa-circle"></i>Talent Pool List</a
                          >
                        </li>
                      </ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_7"
                        data-p-id="7"
                        data-p-name="Hiring"
                      >
                        <li class="menuitem" menucount="5" count="1">
                          <a
                            href="/vendoruser/associatedvendors?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Associated Vendors"
                            ><i class="fa fa-circle"></i>Associated Vendors</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="2">
                          <a
                            href="/HR/CandidateList?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Candidate List"
                            ><i class="fa fa-circle"></i>Candidate List</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="3">
                          <a
                            href="/HR/ConsultantList?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Consultant List"
                            ><i class="fa fa-circle"></i>Consultant List</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="4">
                          <a
                            href="/HR/GroupListing?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Group List"
                            ><i class="fa fa-circle"></i>Group List</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="5">
                          <a
                            href="/JobPost/ManageLayout?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Job Board Layout Settings"
                            ><i class="fa fa-circle"></i>Job Board Layout
                            Settings</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="6">
                          <a
                            href="/JobPost/JobListing?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Job List"
                            ><i class="fa fa-circle"></i>Job List</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_7"
                        data-p-id="7"
                        data-p-name="Hiring"
                      >
                        <li class="menuitem" menucount="5" count="1">
                          <a
                            href="/JobPostReport/Index?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Job Post Report"
                            ><i class="fa fa-circle"></i>Job Post Report</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="2">
                          <a
                            href="/JobPost/RequisitionList?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Job Requisition"
                            ><i class="fa fa-circle"></i>Job Requisition</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="3">
                          <a
                            href="/HR/ManageCandidate?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Candidate"
                            ><i class="fa fa-circle"></i>Manage Candidate</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="4">
                          <a
                            href="/JobPost/ManageJob?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Job"
                            ><i class="fa fa-circle"></i>Manage Job</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="5">
                          <a
                            href="/ExitPolicy/EmployeeExitListing?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Offboard Employee List"
                            ><i class="fa fa-circle"></i>Offboard Employee
                            List</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_7"
                        data-p-id="7"
                        data-p-name="Hiring"
                      >
                        <li class="menuitem" menucount="5" count="1">
                          <a
                            href="/Policy/policylisting?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Policy"
                            ><i class="fa fa-circle"></i>Policy</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="2">
                          <a
                            href="/ExitPolicy/EmployeeResignationList?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Resignation"
                            ><i class="fa fa-circle"></i>Resignation</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="3">
                          <a
                            href="/vendoruser/ServicesListing?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Service"
                            ><i class="fa fa-circle"></i>Service</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="4">
                          <a
                            href="/HR/TalentPoolList?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Talent Pool List"
                            ><i class="fa fa-circle"></i>Talent Pool List</a
                          >
                        </li>
                        <li class="menuitem" menucount="5" count="5">
                          <a
                            href="/vendoruser/VendorListing?reqhFrom=7"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Vendor Listing"
                            ><i class="fa fa-circle"></i>Vendor Listing</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_7"
                        data-p-id="7"
                        data-p-name="Hiring"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      ></ul>
                    </div>
                    <h4 class="hdrGroupName hdrGroupName_12 d-none">
                      Ticketing
                    </h4>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucounth="3" count="1">
                          <a
                            href="/Ticketing/Index?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Ticketing"
                            ><i class="fa fa-circle"></i>Ticketing</a
                          >
                        </li>
                        <li class="menuitem" menucountg="3" count="2">
                          <a
                            href="/Ticketing/add?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Add Ticket"
                            ><i class="fa fa-circle"></i>Add Ticket</a
                          >
                        </li>
                        <li class="menuitem" menucountg="3" count="3">
                          <a
                            href="/Ticketing/Unassigned?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Unassigned Tickets"
                            ><i class="fa fa-circle"></i>Unassigned Tickets</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucountg="3" count="1">
                          <a
                            href="/Ticketing/Feedback?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Ticket Feedback"
                            ><i class="fa fa-circle"></i>Ticket Feedback</a
                          >
                        </li>
                        <li class="menuitem" menucountg="3" count="2">
                          <a
                            href="/ReplyTemplate/Index?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Canned Reply"
                            ><i class="fa fa-circle"></i>Canned Reply</a
                          >
                        </li>
                        <li class="menuitem" menucountg="3" count="3">
                          <a
                            href="/Ticketing/ManageLayout?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Ticket Layout Settings"
                            ><i class="fa fa-circle"></i>Ticket Layout
                            Settings</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucountg="2" count="1">
                          <a
                            href="/TicketReport/Index?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Ticket Report"
                            ><i class="fa fa-circle"></i>Ticket Report</a
                          >
                        </li>
                      </ul>
                    </div>
                    <h4 class="hdrGroupName hdrGroupName_12 d-none">
                      Service Board
                    </h4>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucounth="1" count="1">
                          <a
                            href="/Ticketing/Chain?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Service Board"
                            ><i class="fa fa-circle"></i>Manage Service Board</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/Ticketing/Group?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Ticket Group"
                            ><i class="fa fa-circle"></i>Ticket Group</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/Ticketing/Policy?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="SLA"
                            ><i class="fa fa-circle"></i>SLA</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/Ticketing/AddGroup?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Add ticket Group"
                            ><i class="fa fa-circle"></i>Add ticket Group</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      ></ul>
                    </div>
                    <h4 class="hdrGroupName hdrGroupName_12 d-none">
                      Knowledge Base
                    </h4>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucounth="1" count="1">
                          <a
                            href="/KnowledgeBase/Index?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Knowledge Base"
                            ><i class="fa fa-circle"></i>Knowledge Base</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/KnowledgeBase/ManageCategory?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Category"
                            ><i class="fa fa-circle"></i>Manage Category</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/KnowledgeBase/ManageArticle?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="My Articles"
                            ><i class="fa fa-circle"></i>My Articles</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/Product/Index?reqhFrom=12"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Product"
                            ><i class="fa fa-circle"></i>Product</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_12"
                        data-p-id="12"
                        data-p-name="Ticketing"
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Asset/GroupListing?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Group List"
                            ><i class="fa fa-circle"></i>Group List</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/Asset/ItemsScanSummary?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Items Scan Summary"
                            ><i class="fa fa-circle"></i>Items Scan Summary</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Asset/ReturnItems?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Return Products"
                            ><i class="fa fa-circle"></i>Return Products</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/Asset/rfidassetlisting?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="RFID Asset Listing"
                            ><i class="fa fa-circle"></i>RFID Asset Listing</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Asset/RFIDMissingAssets?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="RFID Missing Assets"
                            ><i class="fa fa-circle"></i>RFID Missing Assets</a
                          >
                        </li>
                        <li class="menuitem" menucount="2" count="2">
                          <a
                            href="/Asset/ScannedItems?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Scanned Items"
                            ><i class="fa fa-circle"></i>Scanned Items</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucount="2" count="1">
                          <a
                            href="/Asset/RFIDMyDeviceList?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Scanned Items Status"
                            ><i class="fa fa-circle"></i>Scanned Items Status</a
                          >
                        </li>
                      </ul>
                    </div>
                    <h4 class="hdrGroupName hdrGroupName_6 d-none">
                      Item Management
                    </h4>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucounth="2" count="1">
                          <a
                            href="/AssetCatalog/Index?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Manage Product"
                            ><i class="fa fa-circle"></i>Manage Product</a
                          >
                        </li>
                        <li class="menuitem" menucountg="2" count="2">
                          <a
                            href="/Asset/MyItems?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="My Products"
                            ><i class="fa fa-circle"></i>My Products</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucountg="2" count="1">
                          <a
                            href="/AssetCatalog/ItemWriteOffList?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Product Write-Off"
                            ><i class="fa fa-circle"></i>Product Write-Off</a
                          >
                        </li>
                        <li class="menuitem" menucountg="2" count="2">
                          <a
                            href="/AssetReport/Index?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Product Report"
                            ><i class="fa fa-circle"></i>Product Report</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      ></ul>
                    </div>
                    <h4 class="hdrGroupName hdrGroupName_6 d-none">
                      Item Assignment
                    </h4>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucounth="1" count="1">
                          <a
                            href="/AssetAssignment/Index?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Product Assignment"
                            ><i class="fa fa-circle"></i>Product Assignment</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/Asset/AssetGrouping?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Products Container List"
                            ><i class="fa fa-circle"></i>Products Container
                            List</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/Asset/Index?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Product Type"
                            ><i class="fa fa-circle"></i>Product Type</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      ></ul>
                    </div>
                    <h4 class="hdrGroupName hdrGroupName_6 d-none">Requests</h4>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucounth="1" count="1">
                          <a
                            href="/AssetRequisition/NewAssetRequisitionListing?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="New Product Type Request"
                            ><i class="fa fa-circle"></i>New Product Type
                            Request</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/Asset/PendingRequest?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Pending Requests"
                            ><i class="fa fa-circle"></i>Pending Requests</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      >
                        <li class="menuitem" menucountg="1" count="1">
                          <a
                            href="/AssetCatalog/ScheduleUpdate?reqhFrom=6"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Maintenance Schedule"
                            ><i class="fa fa-circle"></i>Maintenance Schedule</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_6"
                        data-p-id="6"
                        data-p-name="Asset Management "
                      ></ul>
                    </div>
                    <div class="w-100 float-left">
                      <ul
                        class="submenu d-none clschild_4"
                        data-p-id="4"
                        data-p-name="CRM"
                      >
                        <li class="menuitem" menucount="6" count="1">
                          <a
                            href="/CRM/Accounts?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Accounts"
                            ><i class="fa fa-circle"></i>Accounts</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="2">
                          <a
                            href="/Brand/BrandListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Brand"
                            ><i class="fa fa-circle"></i>Brand</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="3">
                          <a
                            href="/CRM/CampaignListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Campaign "
                            ><i class="fa fa-circle"></i>Campaign
                          </a>
                        </li>
                        <li class="menuitem" menucount="6" count="4">
                          <a
                            href="/CommunicationModes/Index?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Communication"
                            ><i class="fa fa-circle"></i>Communication</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="5">
                          <a
                            href="/CRM/ContactListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Contact"
                            ><i class="fa fa-circle"></i>Contact</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="6">
                          <a
                            href="/CRM/ContractListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Contract"
                            ><i class="fa fa-circle"></i>Contract</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="8">
                          <a
                            href="/CRMReport/Index?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="CRM Report"
                            ><i class="fa fa-circle"></i>CRM Report</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_4"
                        data-p-id="4"
                        data-p-name="CRM"
                      >
                        <li class="menuitem" menucount="6" count="1">
                          <a
                            href="/CRM/DealListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Deal"
                            ><i class="fa fa-circle"></i>Deal</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="2">
                          <a
                            href="/CRM/InwardListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Goods Inward"
                            ><i class="fa fa-circle"></i>Goods Inward</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="3">
                          <a
                            href="/CRM/InvoiceListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Invoice"
                            ><i class="fa fa-circle"></i>Invoice</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="4">
                          <a
                            href="/CRM/ItemListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="No"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Product"
                            ><i class="fa fa-circle"></i>Product</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="5">
                          <a
                            href="/CRM/ItemTypeListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="No"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Product Type"
                            ><i class="fa fa-circle"></i>Product Type</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="6">
                          <a
                            href="/CRM/Index?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Lead"
                            ><i class="fa fa-circle"></i>Lead</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="7">
                          <a
                            href="/CRM/PriceBookListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Price Book"
                            ><i class="fa fa-circle"></i>Price Book</a
                          >
                        </li>
                      </ul>
                      <ul
                        class="submenu d-none clschild_4"
                        data-p-id="4"
                        data-p-name="CRM"
                      >
                        <li class="menuitem" menucount="6" count="1">
                          <a
                            href="/CRM/PurchaseOrderListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Purchase Order"
                            ><i class="fa fa-circle"></i>Purchase Order</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="2">
                          <a
                            href="/CRM/QuotationListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Quote"
                            ><i class="fa fa-circle"></i>Quote</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="3">
                          <a
                            href="/CRM/SalesOrderListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Sales Order"
                            ><i class="fa fa-circle"></i>Sales Order</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="4">
                          <a
                            href="/CRM/StageListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Stage"
                            ><i class="fa fa-circle"></i>Stage</a
                          >
                        </li>
                        <li class="menuitem" menucount="6" count="5">
                          <a
                            href="/CRM/VendorListing?reqhFrom=4"
                            title=""
                            id="cadmin_messageboard_link"
                            checkprivilege="Yes"
                            data-toggle-tooltip="tooltip"
                            data-original-title="Vendor"
                            ><i class="fa fa-circle"></i>Vendor</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    id="mCSB_1_scrollbar_vertical"
                    class="mCSB_scrollTools mCSB_1_scrollbar mCS-dark-thick mCSB_scrollTools_vertical"
                    style="display: none"
                  >
                    <div class="mCSB_draggerContainer">
                      <div
                        id="mCSB_1_dragger_vertical"
                        class="mCSB_dragger"
                        style="
                          position: absolute;
                          min-height: 30px;
                          top: 0px;
                          height: 0px;
                        "
                      >
                        <div
                          class="mCSB_dragger_bar"
                          style="line-height: 30px"
                        ></div>
                      </div>
                      <div class="mCSB_draggerRail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
