import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueNativeSock from 'vue-native-websocket'
import AudioVisual from 'vue-audio-visual'

import './assets/webflow.css'

Vue.use(VueNativeSock, 'ws://localhost:3000')
Vue.use(AudioVisual)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
