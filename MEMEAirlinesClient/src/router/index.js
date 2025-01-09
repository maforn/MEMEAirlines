import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/BaseView.vue'
import NewFlight from "../views/NewFlight.vue";
import NewEmployee from "../views/NewEmployee.vue";
import AssignMainetance from "../views/AssignMainetance.vue";
import FlightMenus from "../views/FlightMenus.vue";
import CancelFlight from "../views/CancelFlight.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/new-flight', component: NewFlight},
    { path: '/new-employee', component: NewEmployee},
    { path: '/assign-maintenance', component: AssignMainetance},
    { path: '/flight-menus', component: FlightMenus},
    { path: '/cancel-flight', component: CancelFlight}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;