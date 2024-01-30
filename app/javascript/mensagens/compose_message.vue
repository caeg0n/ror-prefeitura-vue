<template>
    <div class="compose col-md-6  ">
        <div class="compose-header">
            Nova Mensagem
            <button type="button" class="close compose-close">
                <span>×</span>
            </button>
        </div>
        <div class="compose-body">
            <div id="alerts"></div>
            <div class="btn-toolbar editor" data-role="editor-toolbar" data-target="#editor">
                <div class="btn-group">
                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font"><i class="fa fa-font"></i><b
                            class="caret"></b></a>
                    <ul class="dropdown-menu">
                    </ul>
                </div>
                <div class="btn-group">
                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font Size"><i
                            class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a data-edit="fontSize 5">
                                <p style="font-size:17px">Huge</p>
                            </a>
                        </li>
                        <li>
                            <a data-edit="fontSize 3">
                                <p style="font-size:14px">Normal</p>
                            </a>
                        </li>
                        <li>
                            <a data-edit="fontSize 1">
                                <p style="font-size:11px">Small</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="btn-group">
                    <a class="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i class="fa fa-bold"></i></a>
                    <a class="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i class="fa fa-italic"></i></a>
                    <a class="btn" data-edit="strikethrough" title="Strikethrough"><i
                            class="fa fa-strikethrough"></i></a>
                    <a class="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i
                            class="fa fa-underline"></i></a>
                </div>
                <div class="btn-group">
                    <a class="btn" data-edit="insertunorderedlist" title="Bullet list"><i class="fa fa-list-ul"></i></a>
                    <a class="btn" data-edit="insertorderedlist" title="Number list"><i class="fa fa-list-ol"></i></a>
                    <a class="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i
                            class="fa fa-dedent"></i></a>
                    <a class="btn" data-edit="indent" title="Indent (Tab)"><i class="fa fa-indent"></i></a>
                </div>
                <div class="btn-group">
                    <a class="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i
                            class="fa fa-align-left"></i></a>
                    <a class="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i
                            class="fa fa-align-center"></i></a>
                    <a class="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i
                            class="fa fa-align-right"></i></a>
                    <a class="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i
                            class="fa fa-align-justify"></i></a>
                </div>
                <div class="btn-group">
                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i
                            class="fa fa-link"></i></a>
                    <div class="dropdown-menu input-append">
                        <input class="span2" placeholder="URL" type="text" data-edit="createLink" />
                        <button class="btn" type="button">Add</button>
                    </div>
                    <a class="btn" data-edit="unlink" title="Remove Hyperlink"><i class="fa fa-cut"></i></a>
                </div>
                <div class="btn-group">
                    <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i
                            class="fa fa-picture-o"></i></a>
                    <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />
                </div>
                <div class="btn-group">
                    <a class="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i class="fa fa-undo"></i></a>
                    <a class="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i class="fa fa-repeat"></i></a>
                </div>
            </div>
            <div class="btn-group">
                <label class="control-label col-md-3 col-sm-3 ">Para</label>
                <select v-model="template_to" class="select2_single form-control" tabindex="-1">
                    <option v-for="user in users" v-bind:value="user.id">
                        {{ user.name }}
                    </option>
                </select>
            </div>
            <div class="btn-group">
                <label for="fullname">TITULO:</label>
                <input v-model="template_title" type="text" id="fullname">
            </div>
            <br><br>
            <div contenteditable @input="handleInput" id="editor" class="editor-wrapper"></div>
        </div>
        <div class="compose-footer">
            <button v-on:click="this.carregarMensagens" id="send" class="btn btn-sm btn-success" type="button">Criar</button>
        </div>
    </div>
</template>
<script>
    import authMixins from '../mixins/authMixins'
    import userMixins from '../mixins/userMixins'
    import strMixins from '../mixins/strMixins'
    export default {
        mixins:[userMixins,authMixins,strMixins],
        data: function () {
            return {
                template_title:'',
                template_to:'',
                template_message:'',
                message:{site_id:"",from_user:"",title:"",to_user:"",message:"",type_id:"",status:0}
            }
        },

        methods: {
            criaMensagem() {
                this.getUserById(this.token,this.template_to).then(
                    (resp) => {
                        var conn_status = resp["status"]
                        if (conn_status == 200){
                            var status = resp["data"]["status"]
                            this.message["to_user"] = resp["data"]
                            this.message["site_id"] = 1
                            this.message["type_id"] = 1
                            this.message["status"] = 0
                            this.message["from_user"] = this.user
                            this.message["message"] = this.template_message
                            this.message["title"] = this.template_title
                            if (this.user.id != resp["data"]["id"]){
                                this.$cable.perform({
                                    channel: 'InboxChannel',
                                    action: 'save_message',
                                    data: {
                                        message: this.message
                                    }
                                })
                            }
                        }
                    }, 
                    (error) => console.log(error.message)
                )
            },

            carregarMensagens: function() {
                this.criaMensagem()
                this.$bus.$emit("getMailList")
            },

            handleInput: function(e){
                this.template_message = e.target.innerHTML
            },
        },

        mounted() {  
        },

        created() {
            this.authUser()
            this.getUser(this.token)
            this.getUsers(this.token)
        }

    }
</script>
<style scoped>
</style>