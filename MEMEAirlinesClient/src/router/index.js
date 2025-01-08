import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/BaseView.vue'
import NewFlight from "../views/NewFlight.vue";
import NewCustomer from '../views/NewCustomer.vue';
import NewMaintenance from '../views/NewMaintenance.vue';
import PassengerList from '../views/PassengerList.vue';
import FlightHours from '../views/FlightHours.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/new-flight', component: NewFlight },
    { path: '/new-customer', component: NewCustomer },
    { path: '/new-maintenance', component: NewMaintenance },
    { path: '/passenger-list', component: PassengerList },
    { path: '/flight-hours', component: FlightHours }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;