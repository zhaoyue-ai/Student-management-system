import Vue from 'vue';
import VueRouter from 'vue-router';

import login from '@/views/login/index.vue';
import logon from '@/views/logon/index.vue';
import main from '@/views/main/index.vue';
import notFound from '@/views/notFound/index.vue';
import stulist from '@/views/main/stulist/index.vue';
import addstu from '@/views/main/addstu/index.vue';
import cookie from '@/utils/cookie';

Vue.use(VueRouter);

const routes = [{
  path: '/login',
  component: login,
},
{
  path: '/logon',
  component: logon,
},
{
  path: '/main',
  redirect: '/main/stulist',
  component: main,
  children: [{
    path: 'stulist',
    component: stulist,
  },
  {
    path: 'addstu',
    component: addstu,
  },
  ],

},
{
  path: '/notFound',
  component: notFound,
},

];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'active',
});
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/login');
    return;
  }
  // 如果没有组件与路由相对应，就直接跳转到报错页面
  if (to.matched.length === 0) {
    next('/notFound');
    return;
  }
  // 登陆拦截
  if (to.matched[0].path === '/main') {
    const username = cookie.getCookie('username');
    if (username) {
      next();
    } else {
      next('/login');
    }
  }
  next();
});

export default router;
