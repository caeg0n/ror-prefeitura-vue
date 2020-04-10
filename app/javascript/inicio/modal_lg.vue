<template>
    <div class="col-md-6 col-sm-6  ">
        <div class="x_panel">
            <div class="x_content">
                <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true" id="upload_modal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel">Alterar Foto do Perfil</h4>
                                <button type="button" class="close" data-dismiss="modal"><span
                                        aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <!-- image cropping -->
                                <div class="container cropper">
                                    <div class="row">
                                        <div class="col-md-9">
                                            <div class="img-container">
                                                <img id="image" src="blob:http://localhost:5000/89bc0f2b-638e-45cb-b0e8-0723da53f954" alt="Picture">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="docs-preview clearfix">
                                                <div class="img-preview preview-md"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-9 docs-buttons">
                                            <div class="btn-group">
                                                <label class="btn btn-primary btn-upload" for="inputImage"
                                                    title="Upload image file">
                                                    <input type="file" class="sr-only" id="inputImage" name="file"
                                                        accept="image/*">
                                                    <span class="docs-tooltip" data-toggle="tooltip"
                                                        title="Importar Imagem">
                                                        <span class="fa fa-upload"></span>
                                                    </span>
                                                </label>
                                            </div>
                                            <div class="btn-group btn-group-crop">
                                                <button type="button" class="btn btn-primary"
                                                    data-method="getCroppedCanvas">
                                                    <!-- <span class="docs-tooltip" data-toggle="tooltip"> -->
                                                    Salvar Alterações
                                                    </span>
                                                </button>
                                            </div>
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Cancelar</button>
                                            <!-- Show the cropped image in modal -->
                                            <div class="modal fade docs-cropped" id="getCroppedCanvasModal"
                                                aria-hidden="true" aria-labelledby="getCroppedCanvasTitle" role="dialog"
                                                tabindex="-1">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal"
                                                                aria-hidden="true">&times;</button>
                                                            <!-- <h4 class="modal-title" id="getCroppedCanvasTitle"></h4> -->
                                                        </div>
                                                        <div class="modal-body" id="img_upload"></div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-default"
                                                                data-dismiss="modal">Fechar</button>
                                                            <a v-on:click="fileUpload()" class="btn btn-primary"
                                                                id="download">Salvar</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import userMixins from '../mixins/userMixins'
    import authMixins from '../mixins/authMixins'
    import imageMixins from '../mixins/imageMixins'

    export default {
        mixins: [userMixins, authMixins, imageMixins],
        data: function () {
            return {
                avatarPicSrc:""
            }
        },

        methods: {
            
            fileUpload: function () {
                var t = this
                var cont = 0
                var img = document.getElementById("download").getAttribute("href")
                document.getElementById("download").removeAttribute("href")
                var data = img
                this.imageSavePath = "/home/k43g0n/Documents/rails/prefeitura_vue/public"
                this.imageFileName = this.user.id
                this.saveBase64UrlImage(this.token, data)
                $('#getCroppedCanvasModal').modal('hide')
                $('#upload_modal').modal('hide')
                t.$bus.$emit("loadAvatar")
                var refreshIntervalId = setInterval(function(){
                    t.$bus.$emit("loadAvatar")
                    cont = cont + 1
                    if (cont > 5){clearInterval(refreshIntervalId)}
                }, 500)
            }
        },

        mounted() {
        },

        created() {
            this.authUser()
            this.getUser(this.token)
        }

    }
</script>
<style scoped>
</style>