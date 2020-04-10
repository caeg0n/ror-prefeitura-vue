import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import axios from 'axios'
//import LoadScript from 'vue-plugin-load-script'
import LoginForm from '../login/login_form.vue'
import LoginStatus from '../login/login_status.vue'
import vueConfig from 'vue-config'

//Vue.use(LoadScript)
Vue.use(TurbolinksAdapter)
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(vueConfig, {
  saveImagePath: '/',
  API:'http://192.249.2.216:8080'
})

//Vue.loadScript("/vendors/jquery/dist/jquery.min.js")


document.addEventListener('turbolinks:load', () => {
    
    const login_form = new Vue({
        el: '#login_form',
        components: { 'login-form':LoginForm,
                      'login-status':LoginStatus
        }
    })

})