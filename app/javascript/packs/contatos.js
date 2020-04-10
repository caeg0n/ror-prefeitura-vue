import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import axios from 'axios'
import LoadScript from 'vue-plugin-load-script'
import ProfileDetails from '../contatos/profile_details.vue'
import ProfileInfo from '../profile_info.vue'
import SideBarMenu from '../sidebar_menu.vue'
import TopNav from '../top_nav.vue'
import vueConfig from 'vue-config'

Vue.use(LoadScript)
Vue.use(TurbolinksAdapter)
Vue.prototype.$http = axios
Vue.config.productionTip = false
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
  
  const contato_comp = new Vue({
    el: '#contato-comp',
    components:{'profile-info': ProfileInfo,
                'sidebar-menu': SideBarMenu,
                'profile-details': ProfileDetails,
                'top-nav':TopNav
                }
  })
  
})