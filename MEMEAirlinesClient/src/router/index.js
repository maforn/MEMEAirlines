import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/BaseView.vue'
import NewFlight from "../views/NewFlight.vue";
import SellTicket from "../views/SellTicket.vue";
import NewSupplier from "../views/NewSupplier.vue";
import UserTickets from "../views/UserTickets.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/new-flight', component: NewFlight},
    { path: '/sell-ticket', component:  SellTicket},
    { path: '/new-supplier', component: NewSupplier},
    { path: '/user-tickets', component: UserTickets}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;