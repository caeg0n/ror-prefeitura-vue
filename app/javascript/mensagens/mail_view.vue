<template>
    <div class="inbox-body" id="content_mail">
        <div class="mail_heading row">
            <div class="col-md-8">
                <div class="btn-group">
                    <button v-on:click="sendThisMessage" :class="templateBtnUpdate" type="button"><i :class="templateBtnUpdateIcon"></i>
                        Enviar</button>
                    <button class="btn btn-sm btn-default" type="button" data-placement="top" data-toggle="tooltip"
                        data-original-title="Forward"><i class="fa fa-share"></i></button>
                    <button class="btn btn-sm btn-default" type="button" data-placement="top" data-toggle="tooltip"
                        data-original-title="Print"><i class="fa fa-print"></i></button>
                    <button v-on:click="delMessage" class="btn btn-sm btn-default" type="button" data-placement="top" data-toggle="tooltip"
                        data-original-title="Trash"><i class="fa fa-trash-o"></i></button>
                </div>
            </div>
            <div class="col-md-4 text-right">
                <p class="date"> 8:02 PM 12 FEB 2014</p>
            </div>
            <div class="col-md-12">
                <h4> {{message.title}}</h4>
            </div>
        </div>
        <div class="sender-info">
            <div class="row">
                <div class="col-md-12">
                    <strong>{{message.user_id}}</strong>
                    <!-- <span>(jon.doe@gmail.com)</span> --> para
                    <strong>{{getMessageTo}}</strong>
                    <a class="sender-dropdown"><i class="fa fa-chevron-down"></i></a>
                </div>
            </div>
        </div>
        <div class="view-mail">
            <p>{{message.message}}</p>
        </div>
        <!-- <div class="attachment">
            <p>
                <span><i class="fa fa-paperclip"></i> 3 attachments — </span>
                <a href="#">Download all attachments</a> |
                <a href="#">View all images</a>
            </p>
            <ul>
                <li>
                    <a href="#" class="atch-thumb">
                        <img src="/production/images/inbox.png" alt="img" />
                    </a>
                    <div class="file-name">
                        image-name.jpg
                    </div>
                    <span>12KB</span>
                    <div class="links">
                        <a href="#">View</a> -
                        <a href="#">Download</a>
                    </div>
                </li>
                <li>
                    <a href="#" class="atch-thumb">
                        <img src="/production/images/inbox.png" alt="img" />
                    </a>
                    <div class="file-name">
                        img_name.jpg
                    </div>
                    <span>40KB</span>
                    <div class="links">
                        <a href="#">View</a> -
                        <a href="#">Download</a>
                    </div>
                </li>
                <li>
                    <a href="#" class="atch-thumb">
                        <img src="/production/images/inbox.png" alt="img" />
                    </a>
                    <div class="file-name">
                        img_name.jpg
                    </div>
                    <span>30KB</span>
                    <div class="links">
                        <a href="#">View</a> -
                        <a href="#">Download</a>
                    </div>
                </li>
            </ul>
        </div> -->
    </div>
</template>
<script>
    import authMixins from '../mixins/authMixins'
    import userMixins from '../mixins/userMixins'
    import messageMixins from '../mixins/messageMixins'
    export default {
        mixins:[authMixins,userMixins,messageMixins],
        data: function () {
            return {
                templateBtnUpdate:"btn btn-sm btn-primary",
                templateBtnUpdateIcon:"fa fa-share-square",
                
                message:{}                
            }
        },
        
        methods: {

            sendThisMessage: function(){
                this.sendMessage(this.token,this.message).then(
                    (response) => {
                        var id =  response["data"][0]["id"]
                        if (id == 1){
                            this.templateBtnUpdate = "btn btn-sm btn-success"
                            this.templateBtnUpdateIcon = "fa fa-check"
                        }
                    }
                )
            },

            changeBtnUpdateColor:function(id){
                var status = ""
                this.getMessage(this.token,id).then(
                    (resp) => {
                        status = resp["data"]["status"]
                        if (status > 0){
                            this.templateBtnUpdate = "btn btn-sm btn-success"
                            this.templateBtnUpdateIcon = "fa fa-check"
                        }else{
                            this.templateBtnUpdate = "btn btn-sm btn-primary"
                            this.templateBtnUpdateIcon = "fa fa-share-square"
                        }
                    }, 
                    (error) => console.log(error.message)
                )
            },

            delMessage:function(){
                this.dropMessage(this.token,this.message.id).then(
                    (resp) => {this.$bus.$emit("updateMailList",this.message.id)}, 
                    (error) => console.log(error.message)
                )
            },
        },

        asyncComputed: {
            getMessageTo() {
                return new Promise((resolve) => {
                    resolve(
                        this.getUserById(this.token,this.message.to)
                        .then(response => response.data["name"])
                    )
                })
            }
        },

        mounted() {
            this.message = {}
            this.$bus.$on("getMail", (obj) => {
                this.message = obj
                this.changeBtnUpdateColor(this.message.id)
            })
            this.$bus.$on("updateMailList", (id) => {
                this.message = {}
            })
        },

        created() {
            this.authUser()
        }

    }
</script>
<style scoped>
</style>