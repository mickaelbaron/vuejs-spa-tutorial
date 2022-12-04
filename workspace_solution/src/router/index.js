import { createRouter, createWebHistory } from 'vue-router'

import Global from '../components/Global.vue'
import Import from '../components/Import.vue'
import Export from '../components/Export.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/export',
      name: 'Export',
      component: Export
    },
    {
      path: '/',
      name: 'Global',
      component: Global
    },
    {
      path: '/import',
      name: 'Import',
      component: Import
    }
  ]
})

export default router
