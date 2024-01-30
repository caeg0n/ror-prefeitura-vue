<template>
  <div class="profile clearfix">
    <div class="profile_pic">
      <img :src="avatarPic" alt="..." class="img-circle profile_img">
    </div>
    <div class="profile_info">
      <span>Bem vindo,</span>
      <h2>{{ name }}</h2>
    </div>
  </div>
</template>

<script>
  import userMixins from 'mixins/userMixins'
  import authMixins from 'mixins/authMixins'
  import strMixins from 'mixins/strMixins'
  
  export default {
    mixins:[userMixins,authMixins,strMixins],  
    data: function () {
      return {
        avatarPic:"/production/images/user-placeholder.png",
        name: ""
      }
    },

    methods: {

      getAvatar: function(){
        var t = this
        var cont = 0
        var url = this.avatarPic = "/imagens/"+this.user.id+"_128x128.png"+"?"+(new Date()).getTime()
        $.get(url)
        .done(function() {
          var refreshIntervalId = setInterval(function(){
          t.avatarPic = "/imagens/"+t.user.id+"_128x128.png"+"?"+(new Date()).getTime()
          cont = cont + 1
          if (cont > 5){clearInterval(refreshIntervalId)}
          }, 500) 
          }).fail(function() {
            t.avatarPic = "/production/images/user-placeholder.png"
          })
        },

    },
        
    mounted () {

      this.getUser(this.token) 
      this.$bus.$on("loadAvatar", () => {
        this.avatarPic = "/imagens/"+this.user.id+"_128x128.png?"+new Date().getTime()
      })

    },

    watch:{
      user:function(){
        this.name = this.capitalLetter(this.user["name"])
        this.getAvatar()
      }
    },

    created(){
      this.authUser()
    }

  }
</script>
<style scoped>
</style>