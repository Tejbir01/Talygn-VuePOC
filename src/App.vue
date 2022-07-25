<script setup>
    import { RouterLink, RouterView } from "vue-router";
    import { useRoute } from 'vue-router'
    import { storeToRefs } from "pinia";    
    import HelloWorld from "@/components/HelloWorld.vue";
    import TALYGENHeader from "@/components/Header/Header.vue";
    import TALYGENFooter from "@/components/Footer/Footer.vue";
    import ModuleHeader from "@/components/Header/ModuleHeader.vue";
    import { loggedUserInfo, moduleStore } from "@/stores/UserInfo";
    const { GetUserInfo } = storeToRefs(loggedUserInfo());
    const { GetModuleId } = storeToRefs(moduleStore());
    const route = useRoute();
</script>

<template>
    <TALYGENHeader />
    <ModuleHeader :modulemasterid="GetModuleId"></ModuleHeader>

    <section id="main-content" class="main-content">
        <div class="container-fluid">
            <div class="row" style="min-height:100vh;">
                <div class="col-12">
                    <RouterView />
                </div>
            </div>
        </div>
    </section>
    <div class="w-100 float-left">
        <TALYGENFooter />
    </div>
</template>

<style>
@import "@/assets/base.css";

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}
a{text-decoration:none;}
</style>
