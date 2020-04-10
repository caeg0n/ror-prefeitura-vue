const imageMixins = {
    data() {
        return {
            imageFileName:"",
            imageSavePath:""
        }
    },

    methods: {

        saveBase64UrlImage: function (token,base64Data) {
            if (token != "") {
                var t = this
                var post = {}
                $.extend(post, {"base64Data":base64Data})
                $.extend(post, {"path":this.imageSavePath})
                $.extend(post, {"imageFileName":this.imageFileName})                  
                t.$http.post(this.$config.API+'/save_image', post, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).then(res => {
                    console.log(res)
                })
            }
        },
        
    }
}
export default imageMixins