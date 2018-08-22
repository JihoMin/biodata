import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import RegularCards from '@/components/RegularCards'
import Search from '@/components/Search'
import Upload from '@/components/Upload'
import singleFile from '@/components/SingleFile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Login',
      component: Login
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
