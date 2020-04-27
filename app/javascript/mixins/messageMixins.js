//COMO USAR
// this.getMessage(id).then(
//     (resp) => {
//         status = resp["data"]["status"]
//         if (status > 0){
//             this.templateBtnUpdateIcon = "fa fa-check"
//         }else{
//             this.templateBtnUpdateIcon = "fa fa-share-square"
//         }
//     }, 
//     (error) => console.log(error.message)
// )

//MESSAGES STATUS LIST
// STATUS = 0 -> CRIADA
// STATUS = 1 -> ENVIADA 
// STATUS = 2 -> DELETADA PARA MIM

const messageMixins = {
    data() {
        return {
        }
    },

    methods: {
        getMessage: function (token,id) {
            const p = this.$http.get(this.$config.API+'/get_message', {
                headers: { Authorization: 'Bearer ' + token },
                params: {
                    id: id
                },
            })
            return p         
        },


        sendMessage: function(token,message){
            var post = {}
            $.extend(post, {"message_id":message.id,"status":1})
            const p = this.$http.post(this.$config.API+'/update_message_status', post,{
                headers: { Authorization: 'Bearer ' + token },
            })
            return p
        },


        dropMessage: function (token,id) {
            if (token != "") {
                var post = {}
                $.extend(post, {"message_id":id})
                const p = this.$http.post(this.$config.API+'/drop_message', post,{
                    headers: { Authorization: 'Bearer ' + token },
                })
                return p
            }         
        },

        updateMessageStatus: function (token,id,status){
            if (token != "") {
                var post = {}
                $.extend(post, {"message_id":id})
                $.extend(post, {"status":status})
                const p = this.$http.post(this.$config.API+'/update_message_status', post,{
                    headers: { Authorization: 'Bearer ' + token },
                })
                return p
            }
        }

    }
}
export default messageMixins