<template>
    <div class="row" style="display: block-inline;">
        <div class="tile_count">
            <div class="col-md-2 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-user"></i> Funcionarios</span>
                <div class="count">{{numero_de_funcionarios}}</div>
                <!-- <span class="count_bottom"><i class="green">-- </i> -----------</span> -->
            </div>
            <div class="col-md-2 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-desktop"></i> INTRANET</span>
                <div :class="this.classDisplayIntranet">{{intranet_status}}</div>
                <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>{{count_intranet}} </i> verificações</span>
            </div>
            <div class="col-md-2 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-desktop"></i> PREFEITURA</span>
                <div :class="this.classDisplayPrefeitura">{{prefeitura_status}}</div>
                <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>{{count_prefeitura}} </i> verificações</span>
            </div>
            <div class="col-md-2 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-desktop"></i> DC-SAUDE</span>
                <div :class="this.classDisplayDcsaude">{{dcsaude_status}}</div>
                <span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>{{count_dcsaude}} </i> verificações</span>
            </div>
            <div class="col-md-2 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-desktop"></i> SRV01-SAUDE</span>
                <div :class="this.classDisplaySrv01saude">{{srv01saude_status}}</div>
                <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>{{count_srv01saude}} </i> verificações</span>
            </div>
            <!-- <div class="col-md-2 col-sm-4  tile_stats_count"> -->
                <!-- <span class="count_top"><i class="fa fa-desktop"></i> DC-SEMEC</span>
                <div :class="this.classDisplayDcsemec">{{dcsemec_status}}</div>
                <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
            -->
            <!-- </div>  -->
            
        </div>
    </div>
</template>


<script>
    import userMixins from 'mixins/userMixins'
    import authMixins from 'mixins/authMixins'
    
    export default {
        mixins:[userMixins,authMixins],
        data: function () {
            return {
                count_intranet:0,
                count_prefeitura:0,
                count_dcsaude:0,
                count_srv01saude:0,
                classDisplayIntranet:"count red",
                classDisplayPrefeitura:"count red",
                classDisplayDcsaude:"count red",
                classDisplayDcsemec:"count red",
                classDisplaySrv01saude:"count red",
                numero_de_funcionarios: "",
                intranet_status:"offline",
                prefeitura_status:"offline",
                dcsaude_status:"offline",
                //dcsemec_status:"offline",
                srv01saude_status:"offline"
                
            }
        },

        created(){
            this.authUser()
        },

        methods: {
            get_intranet_status: function (){
                var cont = this.count_intranet + 1
                var origem = document.location.origin
                this.count_intranet = cont
                this.$http.get(this.$config.get(process.env.NODE_ENV+'.API')+'/get_server_status?ip=192.168.1.1', {
                    crossDomain: true,
                    xhrFields: { withCredentials: true },
                    params: {
                        o: origem
                    },
                }).then(resp => {
                    if (resp["data"][0]["id"] == 1) {
                        this.intranet_status = "online"
                        this.classDisplayIntranet = "count green"
                    }else{
                        this.intranet_status = "offline"
                        this.classDisplayIntranet = "count red"
                        cont = 0
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            get_prefeitura_status: function (){
                var cont = this.count_prefeitura + 1
                var origem = document.location.origin
                this.count_prefeitura = cont
                this.$http.get(this.$config.get(process.env.NODE_ENV+'.API')+'/get_server_status?ip=192.168.1.252', {
                    crossDomain: true,
                    xhrFields: { withCredentials: true },
                    params: {
                        o: origem
                    },
                }).then(resp => {
                    if (resp["data"][0]["id"] == 1) {
                        this.prefeitura_status = "online"
                        this.classDisplayPrefeitura = "count green"
                    }else{
                        this.prefeitura_status = "offline"
                        this.classDisplayPrefeitura = "count red"
                        cont = 0
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            get_dcsaude_status: function (){
                var cont = this.count_dcsaude + 1
                var origem = document.location.origin
                this.count_dcsaude = cont
                this.$http.get(this.$config.get(process.env.NODE_ENV+'.API')+'/get_server_status?ip=192.168.3.1', {
                    crossDomain: true,
                    xhrFields: { withCredentials: true },
                    params: {
                        o: origem
                    },
                }).then(resp => {
                    if (resp["data"][0]["id"] == 1) {
                        this.dcsaude_status = "online"
                        this.classDisplayDcsaude = "count green"
                    }else{
                        this.dcsaude_status = "offline"
                        this.classDisplayDcsaude = "count red"
                        cont = 0
                    }
                }).catch(error => {
                    console.log(error)
                })
            },


            get_srv01saude_status: function (){
                var cont = this.count_srv01saude + 1
                var origem = document.location.origin
                this.count_srv01saude = cont
                this.$http.get(this.$config.get(process.env.NODE_ENV+'.API')+'/get_server_status?ip=192.168.3.2', {
                    crossDomain: true,
                    xhrFields: { withCredentials: true },
                    params: {
                        o: origem
                    },
                }).then(resp => {
                    if (resp["data"][0]["id"] == 1) {
                        this.srv01saude_status = "online"
                        this.classDisplaySrv01saude = "count green"
                    }else{
                        this.srv01saude_status = "offline"
                        this.classDisplaySrv01saude = "count red"
                        cont = 0
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            get_servers_status: function(){
                this.get_intranet_status()
                this.get_prefeitura_status()
                this.get_dcsaude_status()
                this.get_srv01saude_status()                      
            },
            
        },

        mounted() {
            this.get_intranet_status()
            this.get_prefeitura_status()
            this.get_dcsaude_status()
            this.get_srv01saude_status()   
            this.countUsers(this.token)
            this.$nextTick(function () {
                window.setInterval(() => {
                    this.get_servers_status()
                },5000);
            })
            
        },

        watch:{
            countUsersResp:function(){
                this.numero_de_funcionarios = this.countUsersResp["data"]["quantidade"]
            }
        },

    }
</script>


<style scoped>
</style>