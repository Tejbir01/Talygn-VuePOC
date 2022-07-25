import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/AboutUs",
            name: "AboutUs",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
            meta: {
                title: 'Home Page - Example App',
            }
        },
        {
            path: "/Dashboard",
            name: "Dashboard",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("@/components/Dashboard/Dashboard.vue"),
            meta: { title: 'Dashboard' } // <- I would to use this one
        },
        {
            path: "/CRM/Index",
            name: "CRMLead",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/CRM/LeadList.vue"),
            meta: { title: 'Leads'} // <- I would to use this one
        },
        {
            path: "/CRM/DealListing",
            name: "CRMDeal",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/CRM/Deal/List.vue"),
            meta: { title: 'Deals' } // <- I would to use this one
        },
        {
            path: "/CRM/ManageDeal",
            name: "CRMManageDeal",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/CRM/Deal/Manage.vue"),
            meta: { title: 'Manage Deal' } // <- I would to use this one
        },
        {
            path: "/CRM/ManageLead",
            name: "CRMManageLead",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/CRM/Lead/Manage.vue"),
            meta: { title: 'Manage Lead' } // <- I would to use this one
        }
    ],
});
const DEFAULT_TITLE = 'Home';
router.beforeEach((to, from, next) => {
    document.title = 'TALYGEN - ' + (to.meta.title || DEFAULT_TITLE);
    //document.title = `${to.meta.title}`
    next();
});
export default router;
