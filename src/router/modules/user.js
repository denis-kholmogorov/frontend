import News from '@/pages/User/News'

export default [{
    path: '/',
    name: 'News',
    component: News
  },
  {
    path: '/im',
    name: 'Im',
    component: () => import('@/pages/User/Im.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/User/Profile.vue')
  },
  {
    path: '/profile/:id',
    name: 'ProfileId',
    component: () => import('@/pages/User/ProfileId.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/pages/User/Settings.vue')
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('@/pages/User/Friends.vue')
  },
  {
    path: '/friends/find',
    name: 'FriendsFind',
    component: () => import('@/pages/User/FriendsFind.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/pages/User/Search.vue')
  }
]
