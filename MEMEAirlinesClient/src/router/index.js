import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/BaseView.vue'
import NewFlight from "../views/NewFlight.vue";
import NewEmployee from "../views/NewEmployee.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/new-flight', component: NewFlight},
    { path: '/new-employee', component: NewEmployee},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;