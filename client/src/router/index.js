import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import RegularCards from '@/components/RegularCards'
import Search from '@/components/Search'
import Upload from '@/components/Upload'
import singleFile from '@/components/SingleFile'
import SearchSNU from '@/components/SearchSNU'

import store from '@/vuex/store'

// test login
// import Home from '@/components/Home'
import Me from '@/components/Me'
import LoginT from '@/components/Login_test'

const requireAuth = () => (from, to, next) => {
  if (store.getters.getIsAuth) return next()
  next('/login?returnPath=me')
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: requireAuth()
    },
    // test login
    {
      path: '/',
      name: 'LoginT',
      component: LoginT
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
      beforeEnter: requireAuth()
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/LoginT',
      name: 'LoginT',
      component: LoginT
    },
    {
      path: '/RegularCards',
      name: 'RegularCards',
      component: RegularCards
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/SearchSNU',
      name: 'SearchSNU',
      component: SearchSNU
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/singleFile',
      name: 'singleFile',
      component: singleFile
    }

  ]
})
