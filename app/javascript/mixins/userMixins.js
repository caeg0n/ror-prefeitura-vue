const userMixins = {
    data() {
        return {
            countUsersResp:{},
            user:{},
            users:{}
        }
    },

    methods: {

        countUsers: function (token) {
            if (token != "") {
                this.$http.get(this.$config.API+'/get_number_of_users', {
                    headers: { Authorization: 'Bearer ' + token },
                }).then(resp => {
                    this.countUsersResp = resp
                }).catch(error => {
                    console.log(error)
                })
            }
        },

        getUser: function (token) {
            if (token != "") {
                this.$http.get(this.$config.API+'/get_user', {
                    headers: { Authorization: 'Bearer ' + token },
                }).then(resp => {
                    this.user = resp["data"]
                }).catch(error => {
                    console.log(error)       
                })
            }else{
                console.log("LOGIN ERROR")
            }
        },

        getUserById: function (token,id) {
            const p = this.$http.get(this.$config.API+'/get_user_by_id?id='+id, {
                headers: { Authorization: 'Bearer ' + token },
            })
            return p
        },

        getUsers: function (token) {
            if (token != "") {
                this.$http.get(this.$config.API+'/get_users', {
                    headers: { Authorization: 'Bearer ' + token },
                }).then(resp => {
                    this.users = resp["data"]
                })
                    .catch(error => {          
                    console.log(error)       
                })
            }else{
                console.log("LOGIN ERROR")
            }
        },

        createUser: function (token,post){
            const p = this.$http.post(this.$config.API+'/new_user', post,{
                headers: { Authorization: 'Bearer ' + token },
            })
            return p
        },


    }
}
export default userMixins