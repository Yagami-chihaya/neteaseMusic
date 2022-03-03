import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/discover'
  },
  {
    path: '/discover',
    name: 'Discover',
    component: ()=>import('../views/discover/Discover.vue'),
    children:[
      {
        path:'',
        redirect:'/recommend',
        
      },
      {
        path:'/recommend',
        name:'Recommend',
        component:()=>import('../views/discover/childViews/Recommend.vue')
      },
      {
        path:'/top',
        name:'Top',
        component:()=>import('../views/discover/childViews/Top.vue')
      },
      {
        path:'/musiclist',
        name:'MsuicList',
        component:()=>import('../views/discover/childViews/Musiclist.vue')
      },
      {
        path:'/radio',
        name:'Radio',
        component:()=>import('../views/discover/childViews/Radio.vue')
      },
      {
        path:'/singer',
        name:'Singer',
        component:()=>import('../views/discover/childViews/Singer.vue')
      },
      {
        path:'/newdvd',
        name:'NewDVD',
        component:()=>import('../views/discover/childViews/NewDVD.vue')
      }
    ]
  },
  {
    path:'/search_page',
    name:'SearchPage',
    component:()=>import('../views/search_page/SearchPage.vue')
  },
  {
    path:'/mine_music',
    name:'Mine_music',
    component:()=>import('../views/mine_music/Mine_music.vue')
  },
  {
    path:'/follow',
    name:'Follow',
    component:()=>import('../views/follow/Follow.vue')
  },
  {
    path:'/download',
    name:'Download',
    component:()=>import('../views/download/Download.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
