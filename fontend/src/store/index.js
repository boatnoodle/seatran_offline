import Vue from 'vue'
import Vuex from 'vuex'
import routeTaxi from '@/store/module/routeTaxi'
import agent from '@/store/module/agent'
import tour from '@/store/module/tour'
import taxiTicket from '@/store/module/taxiTicket'
import tourTicket from '@/store/module/tourTicket'
import reportTaxi from '@/store/module/reportTaxi'
import reportTour from '@/store/module/reportTour'
import user from '@/store/module/user'
import system from '@/store/module/system'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        routeTaxi,
        agent,
        tour,
        taxiTicket,
        tourTicket,
        reportTaxi,
        reportTour,
        user,
        system
    },
    plugins: [createPersistedState()]
})