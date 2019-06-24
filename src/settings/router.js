import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.notRequiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!store.getters['auth/api/isAuthenticated']) {
      next({
        name: 'Login',
        query: {
          redirect: to.name
        }
      })
    } else {
      next()
    }
  }

  if (to.matched.some(record => record.meta.notWithoutAuth)) {
    // этот путь только без авторизовации,
    // если пользователь авторизован, то перенаправляем на страницу новостей
    if (store.getters['auth/api/isAuthenticated']) {
      next({
        name: 'News'
      })
    }
  }

  next()
})
