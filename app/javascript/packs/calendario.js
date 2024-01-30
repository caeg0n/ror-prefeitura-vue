import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import LoadScript from 'vue-plugin-load-script'
import axios from 'axios'
import SideBarMenu from '../sidebar_menu.vue'
import ProfileInfo from '../profile_info.vue'
import TopNav from '../top_nav.vue'
import VueConfig from 'vue-configuration'
import AppConfig from '../config.js'

Vue.use(TurbolinksAdapter)
Vue.prototype.$http = axios
Vue.config.productionTip = true
Vue.use(LoadScript);
Vue.loadScript("/vendors/jquery/dist/jquery.min.js")
Vue.loadScript("/vendors/bootstrap/dist/js/bootstrap.bundle.min.js")
Vue.loadScript("/vendors/fastclick/lib/fastclick.js")
Vue.loadScript("/vendors/nprogress/nprogress.js")
Vue.loadScript("/vendors/moment/min/moment.min.js")
Vue.loadScript("/vendors/fullcalendar/dist/fullcalendar.min.js")
Vue.loadScript("/build/js/custom.js?"+Math.random())
Vue.use(VueConfig, {
  config: AppConfig
})


document.addEventListener('turbolinks:load', () => {
  
  const calendario_comp = new Vue({
    el: '#calendario_comp',
    components: {
      'sidebar-menu':SideBarMenu,
      'profile-info':ProfileInfo,
      'top-nav':TopNav  
    }
  })

})
