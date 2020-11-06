import Vue from "vue"
import Router from 'vue-router'

Vue.use(Router);
const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: () => import(/*webpackChunkName:"login_home_welcome"*/'./pages/login.vue')
    },
    {
      path: '/home',
      component: () => import(/*webpackChunkName:"login_home_welcome"*/'./pages/home.vue'),
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: () => import(/*webpackChunkName:"login_home_welcome"*/'./pages/welcome.vue')
        }, {
          path: "/users",
          component: () => import(/*webpackChunkName:"users"*/'./pages/user.vue')
        }, {
          path: "/rights",
          component: () => import(/*webpackChunkName:"users"*/'./pages/rights.vue')
        }, {
          path: '/roles',
          component: () => import(/*webpackChunkName:"users"*/'./pages/roles.vue')
        }, {
          path: '/categories',
          component: () => import(/*webpackChunkName:"categories"*/'./pages/categories.vue')
        }, {
          path: '/params',
          component: () => import(/*webpackChunkName:"categories"*/'./pages/params.vue')
        }, {
          path: '/goods',
          component: () => import(/*webpackChunkName:"categories"*/'./pages/goods.vue')
        },{
          path:'/reports',
          component: () => import(/*webpackChunkName:"reports"*/'./pages/report.vue')
        }
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  // 进入登录页 直接放行
  if (to.path === '/login') return next()
  //  进入其他页面,没有token,直接进入login 页面
  // console.log(sessionStorage.getItem('token'))
  if (!sessionStorage.getItem('token')) return next('/login');
  //  放行
  next();
})

export default router