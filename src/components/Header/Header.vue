<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import HeaderUser from "@/components/Header/HeaderCompany.vue";
    import HeaderCL from "@/components/Header/HeaderCL.vue";
    import { loggedUserInfo } from "@/stores/UserInfo";
    const { GetUserInfo } = storeToRefs(loggedUserInfo());
//console.log(GetName);
</script>
<template>
  <div class="wrapper" style="min-height: auto">
    <header>
      <nav
        class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top switch-menu navbar px-lg-0"
      >
        <span class="text-white d-none"> {{ GetUserInfo.Name }}</span>
        <HeaderUser v-if="GetUserInfo.UserType == 'CA' || GetUserInfo.UserType == 'PM' || GetUserInfo.UserType == 'NU'" />
        <HeaderCL v-if="GetUserInfo.UserType == 'CL'" />
      </nav>
    </header>
  </div>
</template>
<style>
.ml-auto,
.mx-auto {
  margin-left: auto !important;
}
.dropdown-menu-right {
    right: 0;
    left: auto !important;
}
</style>
