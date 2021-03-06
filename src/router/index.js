import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.back()
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/mainFrame',
      name: 'mainFrame',
      component: () => import('../components/Home/mainFrame.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home/home.vue'),
          meta: {
            title: '请选择所需服务项目'
          }
        },
        {
          path: '/inquiry',
          name: 'inquiry',
          component: () => import('../views/home/inquiry.vue'),
          meta: {
            title: '询价'
          }
        },
        {
          path: '/mine',
          name: 'mine',
          component: () => import('../views/home/mine.vue'),
          meta: {
            title: '我的'
          }
        },
      ]
    },
    {
      path: '/addEnquiry',
      name: 'addEnquiry',
      component: () => import('../views/addEnquiry/addEnquiry.vue'),
      meta: {
        title: '提交询价单'
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/home/detail.vue'),
      meta: {
        title: ''
      }
    },
    {
      path: '/area',
      name: 'area',
      component: () => import('../views/addEnquiry/area.vue'),
      meta: {
        title: '地区选择'
      }
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/addEnquiry/success.vue'),
      meta: {
        title: '提交成功'
      }
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/login/login.vue'),
    //   meta: {
    //     title: '登陆'
    //   }
    // },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/addEnquiry/history.vue'),
      meta: {
        title: '历史记录'
      }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: () => import('../views/home/aboutUs.vue'),
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/companyRegister',
      name: 'companyRegister',
      component: () => import('../views/landPage/companyRegister.vue'),
      meta: {
        title: '公司注册'
      }
    },
    {
      path: '/companyRegister_tt',
      name: 'register_tt',
      component: () => import('../views/landPage/register_tt.vue'),
      meta: {
        title: '公司注册'
      }
    },
    {
      path: '/companyRegister_new',
      name: 'companyRegister_new',
      component: () => import('../views/landPage/companyRegister_new.vue'),
      meta: {
        title: '公司注册'
      }
    },
    {
      path: '/companyLogout',
      name: 'companyLogout',
      component: () => import('../views/landPage/companyLogout.vue'),
      meta: {
        title: '公司注销'
      }
    },
    {
      path: '/companyLogout_tt',
      name: 'logout_tt',
      component: () => import('../views/landPage/logout_tt.vue'),
      meta: {
        title: '公司注销'
      }
    },
    {
      path: '/companyLogout_new',
      name: 'logout_new',
      component: () => import('../views/landPage/companyLogout_new.vue'),
      meta: {
        title: '公司注销'
      }
    },
    {
      path: '/powerOfAttoney',
      name: 'powerOfAttoney',
      component: () => import('../views/login/powerOfAttoney.vue'),
      meta: {
        title: '协议'
      }
    },
    {
      path: '/netError',
      name: 'netError',
      component: () => import('../views/errorPage/netError.vue'),
      meta: {
        title: '网络错误'
      }
    },
    {
      path: '/404',
      name: 'error404',
      component: () => import('../views/errorPage/error404.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  scrollBehavior(to, from, saveTop){
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  }
})
