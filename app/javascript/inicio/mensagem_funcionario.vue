<template>
    <div>
        <template v-for="msg in messages">
            <li>
                <img :src="msg.img" class="avatar" alt="Avatar">
                <div class="message_date">
                    <h3 class="date text-error">{{msg.created_at | moment("D")}}</h3>
                    <p class="month">{{msg.created_at | moment("MMM")}}</p>
                </div>
                <div class="message_wrapper">
                    <h4 class="heading">{{msg.name}}</h4>
                    <blockquote class="message">{{msg.message}}</blockquote>
                    <br>
                    <p class="url">
                        <span class="fs1" aria-hidden="true" data-icon=""></span>
                        <!-- <a href="#" data-original-title="">Download</a> -->
                    </p>
                </div>
            </li>
        </template>
    </div>
</template>

<script>
    import authMixins from '../mixins/authMixins'
    import userMixins from '../mixins/userMixins'
    export default {
        mixins:[authMixins,userMixins],
        name: 'MesagemFuncionario',
        data: function () {
            return {
                messages:[],
            }
        },

        channels: {
            UserChannel: {
                connected() {
                    console.log("mensagem_funcionario conected")
                    this.getMessages()
                },
                rejected() {console.log("mensagem_funcionario rejeitado")},
                disconnected() {console.log("mensagem_funcionario disconectado")},
                received(data) {
                    data['data'].forEach(e => {
                        var user_id = e['user_id']
                        var status = e['status']
                        if (this.user.id == user_id){
                            switch(status){
                                case 1:
                                    $.extend(e,{'name':'--MINHA--'})
                                    $.extend(e,{'img':this.$config.saveImagePath+e['user_id']+".png"})
                                    this.addMessage(e)
                                    break
                                case 4:
                                    $.extend(e,{'name':'--MINHA--'})
                                    $.extend(e,{'img':this.$config.saveImagePath+e['user_id']+".png"})
                                    this.addMessage(e)
                                    break
                            }
                        }else{
                            switch(status){
                                case 1:
                                    var name = this.users[(this.users.findIndex(x => x.id == e["user_id"]))]["name"]
                                    $.extend(e,{'name':name})
                                    $.extend(e,{'img':this.$config.saveImagePath+e['user_id']+".png"})
                                    this.addMessage(e)
                                    break
                                case 3:
                                    var name = this.users[(this.users.findIndex(x => x.id == e["user_id"]))]["name"]
                                    $.extend(e,{'name':name})
                                    $.extend(e,{'img':this.$config.saveImagePath+e['user_id']+".png"})
                                    this.addMessage(e)
                                    break
                            }
                        } 
                    })
                }
            }
        }, 

        methods: {

            addMessage: function(msg){
                if (this.messages.findIndex(x => x.id === msg.id)==-1){
                    this.messages.push(msg)
                }
                this.messages.sort((a, b) => (a.id < b.id) ? 1 : -1)
            },

            getMessages: function (){
                this.$cable.perform({
                    channel: 'UserChannel',
                    action: 'send_message',
                    data: {
                        site_id: 1,
                        user_id: this.user.id,
                        mode:[1,3,4] 
                    }
                })
            },

            unsubscribe() {
                this.$cable.unsubscribe('UserChannel')
            }

        },

        created() {
            this.authUser()
            this.getUser(this.token)
            this.getUsers(this.token)
        },

        mounted(){
        },

        watch:{

            user:function(){
                this.$cable.subscribe({
                    channel: 'UserChannel',
                    room: 'public'
                })
            }

        },

    }
</script>

<style scoped>
</style>