<script setup lang="ts">
import { RouterLink } from "vue-router";
//console.log(GetName);
</script>
<template>
  <footer class="mt-3">
    <div class="container-fluid p-0 d-flex">
      <div
        class="col-sm-12 col-md-12 col-lg-2 float-left text-center py-0 d-sm-block d-lg-none ipadfix light-ftr-logo"
      >
        <a href="javascript:;"
          ><img src="/Content/images/footer-logo.png" alt="footer-logo"
        /></a>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-5 float-left pl-lg-0 ipadfix">
        <div class="contri_translate ipaddnone cursor-pointer">
            <span :title="$t('LnkForLanguageContribute')" id="ContributeToLang">{{ $t("LnkForLanguageContribute") }}</span>
        </div>
        <p class="copyright text-center" v-html="$t('CopyrightContent')">
        </p>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-2 float-left text-center pt-2 d-none d-lg-block ipaddnone light-ftr-logo">
          <a href="https://talygen.com/">
              <img src="/Content/images/footer-logo.png" alt="footer-logo" />
          </a>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-5 float-left text-center ipadfix">
        <ul>
          <li>
            <!--@if (TALYGEN.Repositories.CachedUser.UserInfo != null && TALYGEN.Repositories.CachedUser.UserInfo.UserType != "CL")
                        {-->
              <RouterLink to="/Feedback" title="$t('Feedback')">
                  {{ $t("Feedback") }}
              </RouterLink>
            <!--}-->
          </li>
          <li>
              <RouterLink to="/Test" :title="$t('Termsofservice')">
                  {{ $t("Termsofservice") }}
              </RouterLink>
          </li>
          <li>
              <RouterLink to="/AboutUs" :title="$t('AboutTALYGEN')">
                  {{ $t("AboutTALYGEN") }}
              </RouterLink>
          </li>
          <li>
              <RouterLink to="/TalygenHelp" title="$t('Help')">
                  {{ $t("Help") }}
              </RouterLink>
          </li>
          <li>
              <RouterLink to="/SupportTickets" title="$t('TalygenSupport')">
                  {{ $t("TalygenSupport") }}
              </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div id="ContributeToLanguage"></div>
    <!-- /.container -->
  </footer>
</template>
