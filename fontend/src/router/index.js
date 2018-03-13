import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import sellTaxi from '@/components/taxi/sell'
import sellTour from '@/components/tour/sell'
import setRoute from '@/components/taxi/setRoute'
import setAgent from '@/components/tour/setAgent'
import setTour from '@/components/tour/setTour'
import setBill from '@/components/setBill'
import reportTaxiDay from '@/components/report/reportTaxiDay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/taxi/sell',
      name: 'sellTaxi',
      component: sellTaxi
    },
    {
      path: '/tour/sell',
      name: 'sellTour',
      component: sellTour
    },
    {
      path: '/taxi/setRoute',
      name: 'setRoute',
      component: setRoute
    },
    {
      path: '/tour/setAgent',
      name: 'setAgent',
      component: setAgent
    },
    {
      path: '/tour/setTour',
      name: 'setTour',
      component: setTour
    },
    {
      path: '/setBill',
      name: 'setBill',
      component: setBill
    },
    {
      path: '/report/reportTaxiDay',
      name: 'reportTaxiDay',
      component: reportTaxiDay
    }
  ]
})
