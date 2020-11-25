import Vue from 'vue'
import App from './App.vue'
import YmapPlugin from 'vue-yandex-maps'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

const yaMapSettings = {
  apiKey: '82ae0101-ed7e-42db-b5cd-c5e674b36772',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
}

Vue.use(YmapPlugin, yaMapSettings)
Vue.use(Notifications)

new Vue({
  render: h => h(App),
}).$mount('#app')
