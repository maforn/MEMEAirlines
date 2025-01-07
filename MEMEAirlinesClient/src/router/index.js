import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/BaseView.vue'
import NewFlight from "../views/NewFlight.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/new-flight', component: NewFlight}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;