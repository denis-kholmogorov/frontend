export default [{
    path: '/shift-password',
    name: 'ShiftPassword',
    meta: {
      layout: 'form',
      notRequiresAuth: true
    },
    component: () => import('@/pages/Shift/ShiftPassword.vue')
  },
  {
    path: '/shift-email',
    name: 'ShiftEmail',
    meta: {
      layout: 'form',
      notRequiresAuth: true
    },
    component: () => import('@/pages/Shift/ShiftEmail.vue')
  },
  {
    path: '/shift-email-success',
    name: 'ShiftEmailSuccess',
    meta: {
      layout: 'form',
      notRequiresAuth: true
    },
    component: () => import('@/pages/Shift/ShiftEmailSuccess.vue')
  }
]
