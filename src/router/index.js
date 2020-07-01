import Vue from "vue";
import VueRouter from "vue-router";

import Registration from '../pages/Registration'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Registration}
]

const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: "active",
    routes
})

export default router