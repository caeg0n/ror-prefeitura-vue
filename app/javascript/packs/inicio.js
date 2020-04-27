import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import axios from 'axios'
import ActionCableVue from 'actioncable-vue'
import LoadScript from 'vue-plugin-load-script'
import VueLoadScript from 'vue-load-script-plus'
import AsyncComputed from 'vue-async-computed'
import TopNav from '../top_nav.vue'
import ProfileInfo from '../profile_info.vue'
import TopTiles from '../top_tiles.vue'
import SideBarMenu from '../sidebar_menu.vue'
import UserProfile from '../inicio/user_profile.vue'
import MensagemAutomatica from '../inicio/mensagem_automatica.vue'
import MensagemFuncionario from '../inicio/mensagem_funcionario.vue'
import ModalLg from '../inicio/modal_lg.vue'
import vueConfig from 'vue-config'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(LoadScript)
Vue.use(VueLoadScript)
Vue.use(TurbolinksAdapter)
Vue.use(AsyncComputed)
Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: 'ws://192.249.2.216:5000/api/cable',
  connectImmediately: true,
})
Vue.use(vueConfig, {
  saveImagePath: '/',
  API:'http://192.249.2.216:8080'
})

const moment = require('moment')
require('moment/locale/pt-br')
Vue.use(require('vue-moment'), {
  moment
})

//Vue.loadScript("/build/js/custom.js?"+Math.random())


document.addEventListener('turbolinks:load', () => {

  Vue.prototype.$bus = new Vue({
    data: function () {
      return {
      }
    },
  })
  
  const inicio_comp = new Vue({
      el: '#inicio_comp',
      components: { 'top-nav':TopNav,
                    'profile-info':ProfileInfo,
                    'top-tiles':TopTiles,
                    'sidebar-menu': SideBarMenu,
                    'user-profile': UserProfile,
                    'mensagem-automatica': MensagemAutomatica,
                    'mensagem-funcionario': MensagemFuncionario,
                    'modal-lg': ModalLg
      }
  })
})