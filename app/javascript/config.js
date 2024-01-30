export default {
    development:{
        DBPATH:'',
        //não vai funcionar localmente '/app/db/imagens'
        SAVEIMAGEPATH: '/app/db/imagens',
        API:'http://localhost:8080',
        ACTIONCABLE:'ws://127.0.0.1:5000/api/cable'
    },
    //docker-local
    production:{
        DBPATH:'',
        SAVEIMAGEPATH: '/app/db/imagens',
        API:'http://site.intranet.campinapolis.net:8080',
        ACTIONCABLE:'ws://site.intranet.campinapolis.net:3000/api/cable'
    },
    //docker-remoto
    // production:{
    //     DBPATH:'',
    //     saveImagePath: '/imagens/',
    //     API:'http://192.168.1.15:8080',
    //     ACTIONCABLE:'ws://192.168.1.15:3000/api/cable'
    // },
};
