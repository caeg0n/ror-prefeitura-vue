import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import LoadScript from 'vue-plugin-load-script'
import ActionCableVue from 'actioncable-vue'
import axios from 'axios'
import AsyncComputed from 'vue-async-computed'
import ComposeMessage from '../mensagens/compose_message.vue'
import MailView from '../mensagens/mail_view.vue'
import MailList from '../mensagens/mail_list.vue'
import ProfileInfo from '../profile_info.vue'
import SideBarMenu from '../sidebar_menu.vue'
import TopNav from '../top_nav.vue'
import vueConfig from 'vue-config'


Vue.use(TurbolinksAdapter)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(LoadScript)
Vue.use(AsyncComputed)
Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: 'ws://localhost:5000/api/cable',
  connectImmediately: false,
})
Vue.use(vueConfig, {
  saveImagePath: '/',
  API:'http://192.249.2.216:8080'
})

//Vue.loadScript("/build/js/custom.js?"+Math.random())


document.addEventListener('turbolinks:load', () => {
  
  Vue.prototype.$bus = new Vue({
    data: function () {
      return {
      }
    },
  })

  const message_comp = new Vue({
    el: '#message_comp',
    components: {  
      'compose-message':ComposeMessage,
      'profile-info':ProfileInfo,
      'sidebar-menu':SideBarMenu,
      'top-nav':TopNav,
      'mail-view':MailView,
      'mail-list':MailList
    }
  })
  
})