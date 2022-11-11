import routerLinkTest from './components/routerLinkTest.vue';
import routerPush from './components/routerPush.vue';
import User from './User.vue';
import UserProfile from './components/userProfile.vue';
import namedView from './components/namedView.vue';
import left from './components/namedView/left.vue';
import right from './components/namedView/right.vue';
import middle from './components/namedView/middle.vue';
const routes = [
  {
    name: 'namedview',
    path: '/namedview',
    components: {
      left,
      right,
      default: middle
    }
  },
  {
    name: 'routerlinktest',
    path: '/routerlink',
    component: routerLinkTest
  },
  {
    name: 'routerpush',
    path: '/routerpush',
    component: routerPush,
    beforeEnter (to, from, next) {
      console.log('output-to', to);
      console.log('output-from', from);
      alert('路由自己的守卫被触发');
      next();
    }
  },
  {
    name: 'user',
    path: '/user/:username',
    component: User,
    children: [
      {
        path: 'profile',
        component: UserProfile
      }
    ]
  },
  {
    path: '/user/:username/info/:sex',
    component: User
  }

];

export default routes;
