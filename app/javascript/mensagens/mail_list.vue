<template>
    <div>
        <button id="compose" class="btn btn-sm btn-success btn-block" type="button">ESCREVER</button>
        <template v-for="message in messages">
        <a href="#">
            <div v-on:click="setMessage($event)" class="mail_list" :id="message.id">
                <div class="left">
                    <i class="fa fa-circle"></i>
                    <!-- <i class="fa fa-edit"></i>
                    <i class="fa fa-paperclip"></i> -->
                </div>
                <div class="right">
                    <h3>{{message.name}} <small>{{message.created_at | moment("ddd HH:mm")}}</small></h3>
                    <p>{{message.title}}</p>
                </div>
            </div>
        </a>
        </template>
    </div>
</template>
<script>
    import authMixins from '../mixins/authMixins'
    import userMixins from '../mixins/userMixins'
    export default {
        mixins:[userMixins,authMixins],
        data: function () {
            return {
                messages:[]
            }
        },

        channels: {
            InboxChannel: {
                connected() {
                    console.log("mail_list conected")
                    this.getMessages()
                },
                rejected() {console.log("mail_list rejected")},
                disconnected() {console.log("mail_list disconnected")},
                received(data) {
                    data['data'].forEach(e => {
                        var user_id = e['user_id']
                        var status = e['status']
                        if (this.user.id == user_id){
                            switch(status){
                                case 0:
                                    $.extend(e,{'name':'--MINHA--'})
                                    this.addMessage(e)
                                    break
                                case 1:
                                    $.extend(e,{'name':'--MINHA--'})
                                    this.addMessage(e)
                                    break
                                case 4:
                                    $.extend(e,{'name':'--MINHA--'})
                                    this.addMessage(e)
                                    break
                            }
                        }else{
                            switch(status){
                                case 1:
                                    var name = this.users[(this.users.findIndex(x => x.id == e["user_id"]))]["name"]
                                    $.extend(e,{'name':name})
                                    this.addMessage(e)
                                    break
                                case 3:
                                    var name = this.users[(this.users.findIndex(x => x.id == e["user_id"]))]["name"]
                                    $.extend(e,{'name':name})
                                    this.addMessage(e)
                                    break
                            }
                        } 
                    })
                }
            }
        },


        methods: {

            unsubscribe() {
                this.$cable.unsubscribe('InboxChannel')
            },
            
            getMessages: function (){
                this.$cable.perform({
                    channel: 'InboxChannel',
                    action: 'send_user_messages',
                    data: {
                        site_id: 1,
                        user_id: this.user.id,
                        mode:[0,1,3,4] 
                    }
                })
            },

            setMessage: function(event) {
                var targetId = event.currentTarget.id
                let obj = this.messages.find(obj => obj.id == targetId)
                this.$bus.$emit("getMail",obj)
            },

            addMessage: function(msg){
                if (this.messages.findIndex(x => x.id === msg.id)==-1){
                    this.messages.push(msg)
                }
                this.messages.sort((a, b) => (a.id < b.id) ? 1 : -1)
            }

        },

        created() {
            this.authUser()
            this.getUser(this.token)
            this.getUsers(this.token)
        },

        mounted() {

            this.$bus.$on("getMailList", () => {
                var t = this
                t.messages = []
                setTimeout(function(){t.getMessages()}, 1000)
            })

            this.$bus.$on("updateMailList", (id) => {
                if (id > 1){
                    this.messages.splice(this.messages.findIndex(function(i){
                        return i.id === id
                    }), 1)
                }
            })

        },

        watch:{
            user:function(){
                this.$cable.subscribe({
                    channel: 'InboxChannel'
                })
            }
        },
    }
</script>
<style scoped>
</style>