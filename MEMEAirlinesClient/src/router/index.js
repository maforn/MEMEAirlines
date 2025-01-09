import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/BaseView.vue'
import NewFlight from "../views/NewFlight.vue";
import SellTicket from "../views/SellTicket.vue";
import NewSupplier from "../views/NewSupplier.vue";
import UserTickets from "../views/UserTickets.vue";
import MonthlyRevenue from "../views/MonthlyRevenue.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/new-flight', component: NewFlight},
    { path: '/sell-ticket', component:  SellTicket},
    { path: '/new-supplier', component: NewSupplier},
    { path: '/user-tickets', component: UserTickets},
    { path: '/monthly-revenue', component: MonthlyRevenue}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;