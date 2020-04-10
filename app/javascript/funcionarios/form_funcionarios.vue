<template>
    <div class="x_panel">
        <div class="x_title">
            <h2>Novo <small> Funcionario</small></h2>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                        aria-expanded="false"><i class="fa fa-wrench"></i></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a class="dropdown-item" href="#">Settings 1</a>
                        </li>
                        <li><a class="dropdown-item" href="#">Settings 2</a>
                        </li>
                    </ul>
                </li>
                <li><a class="close-link"><i class="fa fa-close"></i></a>
                </li>
            </ul>
            <div class="clearfix"></div>
        </div>

        <div v-if="this.alert_success==true">
            <mensagem-success/>
        </div>

        <div v-if="this.alert_error==true">
            <mensagem-error/>
        </div>


        <div class="x_content">
            <br />
            <form @submit.prevent="submit" id="cadastro-funcionario" class="form-horizontal form-label-left" data-parsley-validate="">
                <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name" >Nome Completo
                        <span class="required">*</span>
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                        <input :class="this.nameClass" type="text" name="name" v-model="name" required="required">
                        <div v-html="error_name"></div>
                    </div>
                </div>
                
                <div class="item form-group">
                    <label for="local" class="col-form-label col-md-3 col-sm-3 label-align">Local de Trabalho <span class="required">*</span></label>
                    <p>
                    <div class="col-md-5 col-sm-5 ">
                        <select v-model="local" id="local" :class="this.localClass" required="">
                            <option value="cpd">CPD</option>
                            <option value="rh">RH</option>
                            <option value="jur">JURIDICO</option>
                            <option value="lici">LICITAÇÂO</option>
                        </select>
                        <div v-html="error_local"></div>
                    </div>
                    </p>
                </div>

                <div class="item form-group">
                    <label for="middle-name" class="col-form-label col-md-3 col-sm-3 label-align">Email <span class="required">*</span></label>
                    <div class="col-md-6 col-sm-6 ">
                        <input :class="this.mailClass" type="text" name="mail" required="required" v-model="mail">
                        <div v-html="error_mail"></div>
                    </div>
                </div>
   
                <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align">Senha <span class="required">*</span>
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                        <input :class="this.passClass" required="required" type="password" v-model="pass" >
                        <div v-html="error_pass"></div>
                    </div>
                </div>

                <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align">Confirme a Senha <span class="required">*</span>
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                        <input :class="this.checkPassClass" required="required" type="password" v-model="check_pass">
                        <div v-html="error_check_pass"></div>
                    </div>
                </div>

                <div class="ln_solid"></div>
                <div class="item form-group">
                    <div class="col-md-6 col-sm-6 offset-md-3">
                        <button v-on:click="reset()" class="btn btn-primary" type="button">Cancelar</button>
                        <button type="submit" class="btn btn-success">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
    import MensagemSuccess from 'funcionarios/mensagem_success.vue'
    import MensagemError from 'funcionarios/mensagem_error.vue'
    import userMixins from '../mixins/userMixins'
    import authMixins from '../mixins/authMixins'

    export default {
        mixins: [userMixins, authMixins],
        components: {
            MensagemSuccess,
            MensagemError
        },
        data: function () {
            return {
                alert_success:false,
                alert_error:false,
                name:'',
                mail:'',
                pass:'',
                local:'',
                check_pass:'',
                error_name:'',
                error_mail:'',
                error_pass:'',
                error_check_pass:'',
                error_local:'',
                nameClass:'form-control',
                localClass:'form-control',
                mailClass:'form-control',
                passClass:'form-control',
                checkPassClass:'form-control',
            }
        },

        methods: {

            validaNome(){
                if (this.name == ""){
                    this.nameClass = "form-control parsley-error"
                    this.error_name = '<ul class="parsley-errors-list filled" id="parsley-id-1"><li class="parsley-required">Este campo é obrigatório.</li></ul>'
                    return false
                }else{
                    this.nameClass = "form-control"
                    this.error_name = ''
                    return true
                }
            },

            validaLocal(){
                if (this.local == ""){
                    this.localClass = "form-control parsley-error"
                    this.error_local = '<ul class="parsley-errors-list filled" id="parsley-id-5"><li class="parsley-required">Este campo é obrigatório.</li></ul>'
                    return false
                }else{
                    this.localClass = "form-control"
                    this.error_local = ''
                    return true
                }
            },

            validaMail(){
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
                if (regex.test(this.mail)==false){
                    this.mailClass = "form-control parsley-error"
                    this.error_mail = '<ul class="parsley-errors-list filled" id="parsley-id-2"><li class="parsley-required">Email invalido!</li></ul>'
                    return false
                }else{
                    this.mailClass = "form-control"
                    this.error_mail = ''
                    return true
                }

            },

            validaSenha(){
                var result = false
                if (this.pass==""){
                    this.passClass = "form-control parsley-error"
                    this.error_pass = '<ul class="parsley-errors-list filled" id="parsley-id-3"><li class="parsley-required">A senha não pode ficar em branco!</li></ul>'
                    result = false
                }
                if (this.check_pass==""){
                    this.checkPassClass = "form-control parsley-error"
                    this.error_check_pass = '<ul class="parsley-errors-list filled" id="parsley-id-4"><li class="parsley-required">A confirmação da senha não pode ficar em branco!</li></ul>'
                    result = false
                }
                if (this.pass=="" && this.check_pass==""){
                    return false
                }
                if (this.pass != this.check_pass){
                    this.passClass = "form-control parsley-error"
                    this.error_pass = '<ul class="parsley-errors-list filled" id="parsley-id-3"><li class="parsley-required">Senhas não conferem!</li></ul>'
                    this.checkPassClass = "form-control parsley-error"
                    this.error_check_pass = '<ul class="parsley-errors-list filled" id="parsley-id-4"><li class="parsley-required">Senhas não conferem!</li></ul>'
                    result = false
                }else{
                    this.passClass = "form-control"
                    this.checkPassClass = "form-control"
                    this.error_pass = ''
                    this.error_check_pass = ''
                    result = true
                }
                return result
            },

            reset(){
                this.local = ''
                this.name = ''
                this.mail = ''
                this.pass = ''
                this.check_pass = ''
                this.error_name = ''
                this.error_local = ''
                this.error_mail = ''
                this.error_pass = ''
                this.error_check_pass = ''
                this.nameClass = 'form-control'
                this.mailClass = 'form-control'
                this.passClass = 'form-control'
                this.localClass = 'form-control'
                this.checkPassClass = 'form-control'
            },
       
            submit() {
                var t = this
                var fields = {}
                var post = {}
                t.alert_success = false
                t.alert_error = false
                $('#cadastro-funcionario').parsley().destroy()
                var validaNome = this.validaNome()
                var validaLocal = this.validaLocal()
                var validaMail = this.validaMail()
                var validaPass = this.validaSenha()
                if (validaNome && validaMail && validaPass && validaLocal) {
                    var name = t.name
                    var mail = t.mail
                    var pass = t.pass
                    var info = t.local
                    $.extend(fields, {name})
                    $.extend(fields, {mail})
                    $.extend(fields, {pass})
                    $.extend(post, fields, {info})
                    t.createUser(t.token,post).then(
                        (resp) => {
                            var status = resp["data"][0]["id"]
                            if (status == 1){
                                t.alert_success = true
                                t.reset()
                            }else{
                                t.alert_error = false
                                t.reset()
                            }
                        }, 
                        (error) => console.log(error.message)
                    )
                    
                }
            },
        },

        // watch:{
        //     user:function(){
        //     }
        // },

        created() {
            this.authUser()
            this.getUser(this.token)
        },

    }
</script>


<style scoped>
</style>