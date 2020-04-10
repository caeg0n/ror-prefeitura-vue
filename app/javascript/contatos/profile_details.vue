<template>
    <div>
        <template v-for="user in users">
            <div class="col-md-4 col-sm-4 profile_details">
                <div class="well profile_view">
                    <div class="col-sm-12">
                        <h4 class="brief"><i>{{user.info}}</i></h4>
                        <div class="left col-md-7 col-sm-7">
                            <h2>{{user.name}}</h2>
                            <p><strong>{{user.email}}</strong></p>
                            <ul class="list-unstyled">
                                <!-- <li><i class="fa fa-building"></i> Local: {{user.local}} </li> -->
                                <li><i class="fa fa-phone"></i> Cel : {{user.phone}} </li>
                            </ul>
                        </div>
                        <div class="right col-md-5 col-sm-5 text-center">
                            <img :src="avatarPic(user.id)" alt="" class="img-circle img-fluid">
                        </div>
                    </div>
                    <div class=" profile-bottom text-center">
                        <div class=" col-sm-6 emphasis">
                            <!-- <p class="ratings">
                                <a>4.0</a>
                                <a href="#"><span class="fa fa-star"></span></a>
                                <a href="#"><span class="fa fa-star"></span></a>
                                <a href="#"><span class="fa fa-star"></span></a>
                                <a href="#"><span class="fa fa-star"></span></a>
                                <a href="#"><span class="fa fa-star-o"></span></a>
                            </p> -->
                        </div>
                        <div class=" col-sm-6 emphasis">
                            <!-- <button type="button" class="btn btn-success btn-sm"> <i class="fa fa-user"> -->
                                <!-- </i> <i class="fa fa-comments-o"></i> </button> -->
                            <!-- <button type="button" class="btn btn-primary btn-sm">
                                <i class="fa fa-user"> </i> View Profile
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import userMixins from '../mixins/userMixins'
    import authMixins from '../mixins/authMixins'

    export default {
        mixins: [userMixins, authMixins],
        data: function () {
            return {
                users: []
            }
        },

        computed: {
            
            
        },
        
        methods: {
            avatarPic: function (id) {
                return "/"+id+"_128x128.png?"+new Date().getTime()
            }
        },
        
        mounted () {
            
        },

        created() {
            this.authUser()
            this.getUser(this.token)
            this.getUsers(this.token)
        },

    }
</script>
<style scoped>
</style>