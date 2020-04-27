const authMixins = {
    data() {
        return {
            loged_in:false,
            token: ""
        }
    },

    methods: {

        _getToken: function(){
            return localStorage.token
        },


        authUser: function(){
            if (typeof this.getToken()==='undefined' || this.getToken()==""){
                this.logout()
            }
        },

        getToken: function(){
            this.token = this._getToken()
            return this.token
        },

        login: function (user,pass) {
            console.log(user,pass)
            this.$http.get(this.$config.API+'/entrar', {
                headers: { Authorization: "Basic " + btoa(user + ":" + pass) },
            }).then(resp => {  
                this.token = resp["data"][0]["token"]
                if (resp["data"][0]["id"] > 0){
                    localStorage.token = this.token
                    this.loged_in = true
                }else{
                    localStorage.removeItem('token')
                    this.loged_in = false
                }
            }).catch(error => {          
                console.log(error)       
            })
        },

        logout: function () {
            localStorage.removeItem('token')
            location.href = '/login/index'
            //var origem = document.location.origin
            //this.$http.get('http://localhost:8080/sair', {
                //crossDomain: true,
                //withCredentials: true,
                //params: {
                //    o: origem
                //},
            //}).then(resp => {  
            //    console.log(resp)
            //})
            //.catch(error => {          
            //    console.log(error)       
            //})
        },

        domainLogin: function(user,pass){
            this.$http.get(this.$config.API+'/domain_entrar', {
                headers: { Authorization: "Basic " + btoa(user + ":" + pass) },
            }).then(resp => {
                var data = resp["data"]
                var id = data["id"]
                if (id == 1){
                    var username = data["resp"]["email"]
                    var password = data["resp"]["password"]
                    
                }
                this.login(username,password)
            }).catch(error => {          
                console.log(error)       
            })
        }
    },
}
export default authMixins