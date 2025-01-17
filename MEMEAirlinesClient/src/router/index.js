import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/BaseView.vue'
import NewFlight from "../views/NewFlight.vue";
import SellTicket from "../views/SellTicket.vue";
import NewSupplier from "../views/NewSupplier.vue";
import UserTickets from "../views/UserTickets.vue";
import MonthlyRevenue from "../views/MonthlyRevenue.vue";
import NewCustomer from '../views/NewCustomer.vue';
import NewMaintenance from '../views/NewMaintenance.vue';
import PassengerList from '../views/PassengerList.vue';
import FlightHours from '../views/FlightHours.vue';
import NewEmployee from "../views/NewEmployee.vue";
import AssignMainetance from "../views/AssignMainetance.vue";
import FlightMenus from "../views/FlightMenus.vue";
import CancelFlight from "../views/CancelFlight.vue";
import NewAircraft from "../views/NewAircraft.vue"
import AssignCrew from '../views/AssignCrew.vue';
import SupplierList from '../views/SupplierList.vue';
import EmployeePay from '../views/EmployeePay.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/new-flight', component: NewFlight},
    { path: '/sell-ticket', component:  SellTicket},
    { path: '/new-supplier', component: NewSupplier},
    { path: '/user-tickets', component: UserTickets},
    { path: '/monthly-revenue', component: MonthlyRevenue},
    { path: '/new-flight', component: NewFlight },
    { path: '/new-customer', component: NewCustomer },
    { path: '/assign-crew', component: AssignCrew },
    { path: '/new-maintenance', component: NewMaintenance },
    { path: '/new-aircraft', component: NewAircraft },
    { path: '/passenger-list', component: PassengerList },
    { path: '/flight-hours', component: FlightHours },
    { path: '/new-employee', component: NewEmployee},
    { path: '/employee-pay', component: EmployeePay},
    { path: '/supplier-list', component: SupplierList },
    { path: '/assign-maintenance', component: AssignMainetance},
    { path: '/flight-menus', component: FlightMenus},
    { path: '/cancel-flight', component: CancelFlight}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;