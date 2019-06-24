export default [{
    path: '/admin/login',
    name: 'AdminLogin',
    meta: {
      layout: 'empty'
    },
    component: () => import('@/pages/Admin/Login.vue')
  },
  {
    path: '/admin/statistics',
    name: 'AdminStatistics',
    component: () => import('@/pages/Admin/Statistics.vue')
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('@/pages/Admin/Users.vue')
  },
  {
    path: '/admin/comments',
    name: 'AdminComments',
    component: () => import('@/pages/Admin/Comments.vue')
  },
  {
    path: '/admin/posts',
    name: 'AdminPosts',
    component: () => import('@/pages/Admin/Posts.vue')
  },
  {
    path: '/admin/moderators',
    name: 'AdminModerators',
    component: () => import('@/pages/Admin/Moderators.vue')
  },
  {
    path: '/admin/moderators/edit',
    name: 'AdminEdit',
    component: () => import('@/pages/Admin/Edit.vue')
  }
]
