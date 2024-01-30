import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import axios from 'axios'
import LoginForm from '../login/login_form.vue'
import LoginStatus from '../login/login_status.vue'
import VueConfig from 'vue-configuration'
import AppConfig from '../config.js'

Vue.use(TurbolinksAdapter)
Vue.prototype.$http = axios
Vue.config.productionTip = true
Vue.use(VueConfig, {
  config: AppConfig
})

document.addEventListener('turbolinks:load', () => {
    
    const login_form = new Vue({
        el: '#login_form',
        components: { 'login-form':LoginForm,
                      'login-status':LoginStatus
        }
    })

})