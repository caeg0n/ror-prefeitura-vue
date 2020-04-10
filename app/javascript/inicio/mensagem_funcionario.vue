<template>
    <div>
        <template v-for="msg in user_messages">
            <li>
                <img src="" class="avatar" alt="Avatar">
                <div class="message_date">
                    <h3 class="date text-error">21</h3>
                    <p class="month">May</p>
                </div>
                <div class="message_wrapper">
                    <h4 class="heading">{{processMessageFrom(msg.user_id)}}</h4>
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
        props:['user_messages'],
        data: function () {
            return {
            }
        },

        methods: {

            processMessageFrom(m) {
                var x = ""
                this.getUserById(this.token,m).then(
                    (resp) => {
                        status = resp["data"]["status"]
                        //if (status > 0){
                            x = "jjjjjjj"
                            //this.templateBtnUpdateIcon = "fa fa-check"
                        //}else{
                            //this.templateBtnUpdateIcon = "fa fa-share-square"
                        //}
                    }, 
                    (error) => console.log(error.message)
                )
                return x
            },

            mounted() {
            }

        },

        asyncComputed:{
            
        },

        created() {
            this.authUser()
        }

    }
</script>

<style scoped>
</style>