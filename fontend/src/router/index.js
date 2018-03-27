import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import { store } from '@/store/'
import sellTaxi from '@/components/taxi/sell'
import sellTour from '@/components/tour/sell'
import setRoute from '@/components/taxi/setRoute'
import setAgent from '@/components/tour/setAgent'
import setTour from '@/components/tour/setTour'
import setUser from '@/components/user/setUser'
import login from '@/components/user/login'
import reportTaxiDay from '@/components/report/reportTaxiDay'
import reportTaxiPeriod from '@/components/report/reportTaxiPeriod'
import reportSummeryTaxiDay from '@/components/report/reportSummeryTaxiDay'
import reportSummeryTaxiPeriod from '@/components/report/reportSummeryTaxiPeriod'
import reportTourDay from '@/components/report/reportTourDay'
import reportTourPeriod from '@/components/report/reportTourPeriod'
import reportSummeryTourDay from '@/components/report/reportSummeryTourDay'
import reportSummeryTourPeriod from '@/components/report/reportSummeryTourPeriod'
import setBill from '@/components/setBill'
import setPercent from '@/components/setPercent'
import setPrint from '@/components/setPrint'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
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
    },
    {
      path: '/report/reportTaxiPeriod',
      name: 'reportTaxiPeriod',
      component: reportTaxiPeriod
    },
    {
      path: '/report/reportSummeryTaxiDay',
      name: 'reportSummeryTaxiDay',
      component: reportSummeryTaxiDay
    },
    {
      path: '/report/reportSummeryTaxiPeriod',
      name: 'reportSummeryTaxiPeriod',
      component: reportSummeryTaxiPeriod
    },
    {
      path: '/report/reportTourDay',
      name: 'reportTourDay',
      component: reportTourDay
    },
    {
      path: '/report/reportTourPeriod',
      name: 'reportTourPeriod',
      component: reportTourPeriod
    },
    {
      path: '/report/reportSummeryTourDay',
      name: 'reportSummeryTourDay',
      component: reportSummeryTourDay
    },
    {
      path: '/report/reportSummeryTourPeriod',
      name: 'reportSummeryTourPeriod',
      component: reportSummeryTourPeriod
    },
    {
      path: '/user/setUser',
      name: 'setUser',
      component: setUser
    },
    {
      path: '/user/login',
      name: 'login',
      component: login
    }, 
    {
      path: '/setPercent',
      name: 'setPercent',
      component: setPercent
    }, 
    {
      path: '/setPrint',
      name: 'setPrint',
      component: setPrint
    } 
  ]
})
//  
router.beforeEach((to,from,next) => {
  if(!store.getters.checkLoginUser && to.path !== '/user/login'){
    next({
      path: '/user/login'
    })
  }else{
    next()
  }
})

export default router