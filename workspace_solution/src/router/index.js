import Vue from 'vue'
import Router from 'vue-router'

import Common from '@/components/Common'
import Import from '@/components/Import'
import Export from '@/components/Export'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/export',
      name: 'Export',
      component: Export
    },
    {
      path: '/',
      name: 'Common',
      component: Common
    },
    {
      path: '/import',
      name: 'Import',
      component: Import
    }
  ]
})