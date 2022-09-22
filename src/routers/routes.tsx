import {RouteRecordRaw} from 'vue-router';
import {First} from '../components/welcome/Main/First';
import {Second} from '../components/welcome/Main/Second';
import {Third} from '../components/welcome/Main/Third';
import {Forth} from '../components/welcome/Main/Forth';
import {FirstAction} from '../components/welcome/Footer/FirstAction';
import {SecondAction} from '../components/welcome/Footer/SecondAction';
import {ThirdAction} from '../components/welcome/Footer/ThirdAction';
import {ForthAction} from '../components/welcome/Footer/ForthAction';
import {ItemList} from '../components/item/ItemList';
import {ItemCreate} from '../components/item/ItemCreate';
import {TagCreate} from '../components/tag/TagCreate';
import {TagEdit} from '../components/tag/TagEdit';
import {TagPage} from '../views/TagPage';
import {SignInPage} from '../views/SignInPage';
import {StatisticsPage} from '../views/StatisticsPage';
import {ComingSoon} from '../views/ComingSoon';

export const routes: RouteRecordRaw[] = [
  {path: '/', redirect: '/welcome'},
  {
    path: '/welcome',
    component: () => import('../views/Welcome'),
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skipFeatures') === 'yes' ? next('/items') : next();
    },
    children: [
      {path: '', redirect: '/welcome/1',},
      {path: '1', name: 'welcome1', components: {main: First, footer: FirstAction}},
      {path: '2', name: 'welcome2', components: {main: Second, footer: SecondAction}},
      {path: '3', name: 'welcome3', components: {main: Third, footer: ThirdAction}},
      {path: '4', name: 'welcome4', components: {main: Forth, footer: ForthAction}},
    ]
  },
  {
    path: '/items',
    component: () => import('../views/ItemPage'),
    children: [
      {path: '', component: ItemList},
      {path: 'create', component: ItemCreate}
    ]
  },
  {
    path: '/tags',
    component: () => import('../views/TagPage'),
    children: [
      {
        path: 'create',
        component: () => import('../components/tag/TagCreate'),
      },
      {
        path: ':id/edit',
        component: () => import('../components/tag/TagEdit'),
      }
    ]
  },
  {
    path: '/sign_in',
    component: () => import('../views/SignInPage'),
  },
  {
    path: '/statistics',
    component: () => import('../views/StatisticsPage'),
  },
  {
    path: '/export',
    component: () => import('../views/ComingSoon'),
  }, {
    path: '/notify',
    component: () => import('../views/ComingSoon'),
  }
];