import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './route';

import './assets/main.css';

const app = createApp(App);
app.use(store);
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from) => {
  console.log('output->to', to);
  console.log('output->from', from);
  // return { name: 'routerpush' };
});
app.use(router);
app.mount('#app');
