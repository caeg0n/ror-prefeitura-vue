<template>
    <div>
        <button id="compose" class="btn btn-sm btn-success btn-block" type="button">ESCREVER</button>
        <template v-for="message in messages">
        <a href="#">
            <div v-on:click="setMessage($event)" class="mail_list" :id="message.id">
                <div class="left">
                    <i class="fa fa-circle"></i>
                    <i class="fa fa-edit"></i>
                    <i class="fa fa-paperclip"></i>
                </div>
                <div class="right">
                    <h3>{{message.user_id}} <small>3.00 PM</small></h3>
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
                    this.getMessages()
                },
                rejected() {console.log("rejected")},
                disconnected() {console.log("disconnected")},
                received(data) {
                    var message = data["data"]
                    if (message["user_id"] == this.user["id"]){
                        message["user_id"] = "--MINHA--"
                    }else{
                        var name = this.users[(this.users.findIndex(x => x.id == message["user_id"]))]["name"]
                        message["user_id"] = name
                    }
                    this.messages.push(message)
                    this.messages.sort((a, b) => (a.id < b.id) ? 1 : -1)
                }
            }
        },


        methods: {
            
            getMessages: function (){
                this.$cable.perform({
                    channel: 'InboxChannel',
                    action: 'send_user_messages',
                    data: {
                        site_id: 1,
                        user_id: this.user["id"] 
                    }
                })
            },

            setMessage: function(event) {
                var targetId = event.currentTarget.id
                let obj = this.messages.find(obj => obj.id == targetId)
                this.$bus.$emit("getMail",obj)
            }

        },

        mounted() {

            this.$bus.$on("getMailList", () => {
                var t = this
                t.messages = []
                setTimeout(function(){t.getMessages()}, 1000)
            })

            this.$bus.$on("updateMailList", (id) => {
                this.messages.splice(this.messages.findIndex(function(i){
                    return i.id === id
                }), 1)
            })

        },

        created() {
            this.authUser()
            this.getUser(this.token)
            this.getUsers(this.token)
            this.$cable.subscribe({
                channel: 'InboxChannel',
                room: 'public'
            })
        }


    }
</script>
<style scoped>
</style>