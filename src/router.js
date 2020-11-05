import Vue from "vue"
import Router from 'vue-router'

Vue.use(Router);
const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: () => import('./pages/login.vue')
    },
    {
      path: '/home',
      component: () => import('./pages/home.vue'),
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: () => import('./pages/welcome.vue')
        }, {
          path: "/users",
          component: () => import('./pages/user.vue')
        }, {
          path: "/rights",
          component: () => import('./pages/rights.vue')
        }, {
          path: '/roles',
          component: () => import('./pages/roles.vue')
        }, {
          path: '/categories',
          component: () => import('./pages/categories.vue')
        }, {
          path: '/params',
          component: () => import('./pages/params.vue')
        }, {
          path: '/goods',
          component: () => import('./pages/goods.vue')
        }
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  // 进入登录页 直接放行
  if (to.path === '/login') return next()
  //  进入其他页面,没有token,直接进入login 页面
  if (!sessionStorage.getItem('token')) return next('/login');
  //  放行
  next();
})

export default router