import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import LoadScript from 'vue-plugin-load-script'
import axios from 'axios'
import SideBarMenu from '../sidebar_menu.vue'
import ProfileInfo from '../profile_info.vue'
import TopNav from '../top_nav.vue'
import vueConfig from 'vue-config'


Vue.use(TurbolinksAdapter)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(LoadScript);
Vue.use(vueConfig, {
  saveImagePath: '/',
  API:'http://192.249.2.216:8080'
})

Vue.loadScript("/vendors/jquery/dist/jquery.min.js")
Vue.loadScript("/vendors/bootstrap/dist/js/bootstrap.bundle.min.js")
Vue.loadScript("/vendors/fastclick/lib/fastclick.js")
Vue.loadScript("/vendors/nprogress/nprogress.js")
Vue.loadScript("/vendors/moment/min/moment.min.js")
Vue.loadScript("/vendors/fullcalendar/dist/fullcalendar.min.js")
Vue.loadScript("/build/js/custom.js?"+Math.random())


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