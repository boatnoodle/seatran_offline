import Vue from 'vue'
import Vuex from 'vuex'
import routeTaxi from '@/store/module/routeTaxi'
import agent from '@/store/module/agent'
import tour from '@/store/module/tour'
import taxiTicket from '@/store/module/taxiTicket'
import tourTicket from '@/store/module/tourTicket'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        routeTaxi,
        agent,
        tour,
        taxiTicket,
        tourTicket
    }
    // plugins: [vuexLocal.plugin]
})