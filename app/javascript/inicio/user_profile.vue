<template>
    <div class="row">
        <div class="col-md-12 col-sm-12 ">
            <div class="x_panel">
                <div class="x_title">
                    <h2>PERFIL DO FUNCIONÁRIOO <!-- <small>do funcionario</small> --> </h2>
                    <ul class="nav navbar-right panel_toolbox">
                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>
                <div class="x_content">
                    <!-- <button type="button" v-on:click="this.sendMessage">Click Me!</button> -->
                    <div class="col-md-3 col-sm-3  profile_left">
                        <div class="profile_img">
                            <div id="crop-avatar">
                                <!-- Current avatar -->
                                <img class="img-responsive avatar-view" :src="avatarPic" alt="Avatar"
                                    title="Change the avatar" width="220px" height="220px">
                            </div>
                        </div>
                        <h3>{{this.user.name}}</h3>
                        <ul class="list-unstyled user_data">
                            <li><i class="fa fa-map-marker user-profile-icon"></i> {{this.user.info}}</li>
                            <li>
                                <i class="fa fa-briefcase user-profile-icon"></i> {{this.user.phone}}
                            </li>
                            <li class="m-top-xs">
                                <i class="fa fa-external-link user-profile-icon"></i>
                                <a href="" target="_blank">{{this.user.email}}</a>
                            </li>
                        </ul>
                        <a v-on:click="sendAvatar" class="btn btn-success" data-toggle="modal"
                    data-target=".bs-example-modal-lg"><i class="fa fa-edit m-right-xs"></i>Editar o Perfil</a>
                        <br>
                        <!-- start skills -->
                        <!-- end of skills -->
                    </div>
                    <div class="col-md-9 col-sm-9 ">
                        <!-- start of user-activity-graph -->
                        <!-- end of user-activity-graph -->
                        <div class="" role="tabpanel" data-example-id="togglable-tabs">
                            <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                                <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab"
                                        data-toggle="tab" aria-expanded="true" class="active"
                                        aria-selected="true">Mensagens do Dominio</a>
                                </li>
                            </ul>
                            <div id="myTabContent" class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="tab_content1"
                                    aria-labelledby="home-tab">
                                    <!-- start recent activity -->
                                    <ul class="messages">
                                        <!-- <div class="mensagem_funcionario">
                                            <mensagem-funcionario v-for="message in number_of_user_messages"></mensagem-funcionario>
                                        </div> -->
                                        <div class="mensagem_automatica">
                                            <!-- <mensagem-automatica v-for="msg in domain_messages" :msg="msg"></mensagem-automatica> -->
                                        </div>
                                        <div class="mensagem_funcionario">
                                            <mensagem-funcionario></mensagem-funcionario>
                                        </div>
                                    </ul>
                                    <!-- end recent activity -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import authMixins from '../mixins/authMixins'
    import MensagemAutomatica from 'inicio/mensagem_automatica.vue'
    import MensagemFuncionario from 'inicio/mensagem_funcionario.vue'
    import userMixins from '../mixins/userMixins'
    export default {
        mixins:[userMixins,authMixins],
        components: {
            MensagemAutomatica,
            MensagemFuncionario
        },
        data: function () {
            return {
                avatarPic:"/production/images/user-placeholder.png",
                domain_messages:[],
            }
        },

        // channels: {
        //     DomainChannel: {
        //         connected() {this.sendMessage('DomainChannel')},
        //         rejected() {},
        //         disconnected() {},
        //         received(data) {
        //             this.domain_messages.push(data["data"])
        //         }
        //     },
        // },
        
        methods: {

            sendAvatar: function(){
                this.$bus.$emit("sendAvatar",this.avatarPic)
            },

            getAvatar: function(){
                var t = this
                var cont = 0
                var url = this.avatarPic = "/"+this.user.id+".png"+"?"+(new Date()).getTime()
                $.get(url)
                .done(function() {
                    var refreshIntervalId = setInterval(function(){
                    t.avatarPic = "/"+t.user.id+".png"+"?"+(new Date()).getTime()
                    cont = cont + 1
                    if (cont > 5){clearInterval(refreshIntervalId)}
                }, 500) 
                }).fail(function() {
                    t.avatarPic = "https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01-300x250.png"
                })
            },

            saveMessage: function() {
                this.domain_messages = []
                var message = {from_user:"",to_user:"",message:"",type_id:""}
                message["type_id"] = 0 
                message["from_user"] = this.user
                message["message"] = "teste"
                this.$cable.perform({
                    channel: 'DomainChannel',
                    action: 'save_message',
                    data: {
                        message: message
                    }
                })
            },

            unsubscribe() {
                this.$cable.unsubscribe('DomainChannel')
                this.$cable.unsubscribe('UserChannel')
            }
        },

        watch:{
            user:function(){
                this.getAvatar()
            }
        },

        mounted() {
            
            // this.$cable.subscribe({
            //     channel: 'DomainChannel',
            //     room: 'public'
            // }),

            this.$bus.$on("loadAvatar", () => {
                this.avatarPic = "/"+this.user.id+".png?"+new Date().getTime()
            })

        },

        created() {
            this.authUser()
            this.getUser(this.token)
        }

    }
</script>


<style scoped>
</style>