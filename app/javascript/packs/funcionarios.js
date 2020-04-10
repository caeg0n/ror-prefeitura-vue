import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import LoadScript from 'vue-plugin-load-script'
import axios from 'axios'
import FormFuncionarios from '../funcionarios/form_funcionarios.vue'
import MensagemSuccess from '../funcionarios/mensagem_success.vue'
import MensagemError from '../funcionarios/mensagem_error.vue'
import ProfileInfo from '../profile_info.vue'
import SideBarMenu from '../sidebar_menu.vue'
import TopNav from '../top_nav.vue'
import vueConfig from 'vue-config'


Vue.use(TurbolinksAdapter)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(LoadScript)
Vue.use(vueConfig, {
  saveImagePath: '/',
  API:'http://192.249.2.216:8080'
})

Vue.loadScript("/vendors/parsleyjs/dist/parsley.min.js")
Vue.loadScript("/vendors/parsleyjs/dist/i18n/pt-br.js")
//Vue.loadScript("/build/js/custom.js?"+Math.random())

document.addEventListener('turbolinks:load', () => {

  Vue.prototype.$bus = new Vue({
    data: function () {
      return {
      }
    },
  })

  
  const funcionarios_comp = new Vue({
    el: '#funcionarios_comp',
    components: {
      'profile-info':ProfileInfo,  
      'form-funcionarios':FormFuncionarios,
      'mensagem-success':MensagemSuccess,
      'mensagem-error':MensagemError,
      'sidebar-menu':SideBarMenu,
      'top-nav':TopNav
    }
  })

})