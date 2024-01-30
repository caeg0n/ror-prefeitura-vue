import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import axios from 'axios'
import LoadScript from 'vue-plugin-load-script'
import ProfileDetails from '../contatos/profile_details.vue'
import ProfileInfo from '../profile_info.vue'
import SideBarMenu from '../sidebar_menu.vue'
import TopNav from '../top_nav.vue'
import VueConfig from 'vue-configuration'
import AppConfig from '../config.js'

Vue.use(LoadScript)
Vue.use(TurbolinksAdapter)
Vue.prototype.$http = axios
Vue.config.productionTip = true
Vue.use(VueConfig, {
  config: AppConfig
})

document.addEventListener('turbolinks:load', () => {

  Vue.prototype.$bus = new Vue({
    data: function () {
      return {
      }
    },
  })
  
  const contato_comp = new Vue({
    el: '#contato-comp',
    components:{'profile-info': ProfileInfo,
                'sidebar-menu': SideBarMenu,
                'profile-details': ProfileDetails,
                'top-nav':TopNav
                }
  })
  
})
