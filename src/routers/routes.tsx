import {RouteRecordRaw} from 'vue-router';
import {First} from '../components/welcome/Main/First';
import {Second} from '../components/welcome/Main/Second';
import {Third} from '../components/welcome/Main/Third';
import {Forth} from '../components/welcome/Main/Forth';
import {FirstAction} from '../components/welcome/Footer/FirstAction';
import {Welcome} from '../views/Welcome';
import {StartPage} from '../views/StartPage';
import {SecondAction} from '../components/welcome/Footer/SecondAction';
import {ThirdAction} from '../components/welcome/Footer/ThirdAction';
import {ForthAction} from '../components/welcome/Footer/ForthAction';
import {ItemPage} from '../views/ItemPage';
import {ItemList} from '../components/item/ItemList';
import {ItemCreate} from '../components/item/ItemCreate';
import {TagCreate} from '../components/tag/TagCreate';
import {TagEdit} from '../components/tag/TagEdit';
import {TagPage} from '../views/TagPage';

export const routes: RouteRecordRaw[] = [
  {path: '/', redirect: '/welcome'},
  {
    path: '/welcome',
    component: Welcome,
    children: [
      {path: '', redirect: '/welcome/1',},
      {path: '1', name: 'welcome1', components: {main: First, footer: FirstAction}},
      {path: '2', name: 'welcome2', components: {main: Second, footer: SecondAction}},
      {path: '3', name: 'welcome3', components: {main: Third, footer: ThirdAction}},
      {path: '4', name: 'welcome4', components: {main: Forth, footer: ForthAction}},
    ]
  },
  {path: '/start', component: StartPage},
  {
    path: '/item', component: ItemPage,
    children: [
      {path: '', component: ItemList},
      {path: '/create', component: ItemCreate}
    ]
  },
  {
    path: '/tags', component: TagPage,
    children: [
      {path: 'create', component: TagCreate},
      {path: ':id/edit', component: TagEdit}
    ]
  }
];