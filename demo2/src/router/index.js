import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Single from '@/components/game/Single'
import Double from '@/components/game/Double'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/single',
      name: 'single',
      component: Single
    },
    {
      path: '/double',
      name: 'double',
      component: Double
    },
    
  ]
})
