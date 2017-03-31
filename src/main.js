import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'
import {
  store
} from './store/store';

Vue.use(VueResource);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
