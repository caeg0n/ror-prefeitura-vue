<template>
    <section class="login_content">
        <form v-on:submit.prevent="thisLogin()">
            <h1>PREFEITURA | INTRANET</h1>
             <div v-if="this.error==true">
                <login-status/>
            </div>
            <div>
                <input v-model="username" type="text" class="form-control" placeholder="Usuário" required="" />
            </div>
            <div>
                <input v-model="password" type="password" class="form-control" placeholder="Senha" required="" />
            </div>
            <div>
                <button class="btn btn-default submit" data-turbolinks="false">Entrar</button>
                <!-- <a class="reset_pass" href="#">Lost your password?</a> -->
            </div>
            <div class="clearfix"></div>
            <div class="separator">
                <!-- <p class="change_link">New to site?
                  <a href="#signup" class="to_register"> Create Account </a>
                </p> -->
                <div class="clearfix"></div>
                <br />
                <div>
                    <h1><img src="/production/images/bra.png" alt=""> Prefeitura de Campinápolis</h1>
                    <p>©2020 CPD. Carlos Eduardo T.I</p>
                </div>
            </div>
        </form>
    </section>
</template>
<script>
    import authMixins from 'mixins/authMixins'
    import LoginStatus from 'login/login_status.vue'
    export default {
        mixins:[authMixins],
        components: {
            LoginStatus
        },
        data: function () {
            return {
                error:false,
                username:"",
                password:""
            }
        },

        methods: {
            thisLogin: function(){
                this.login(this.username,this.password)
            }
        },

        mounted() {
        },

        watch: {
            token: function () {
                if (this.loged_in == true){
                    location.href = '/inicio/index'
                }else{
                    this.error = true
                }
            },
        },

    }
</script>
<style scoped>
</style>