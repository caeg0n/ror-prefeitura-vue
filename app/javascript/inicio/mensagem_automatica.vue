<template>
    <li>
        <img src="/production/images/img.jpg" class="avatar" alt="Avatar">
        <div class="message_date">
            <h3 class="date text-info">24</h3>
            <p class="month">May</p>
        </div>
        <div class="message_wrapper">
            <h4 class="heading">{{msg.user_id}}</h4>
            <blockquote class="message">Raw denim you probably haven't heard of them
                jean shorts
                Austin.
                Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher
                synth.</blockquote>
            <br>
            <p class="url">
                <span class="fs1 text-info" aria-hidden="true" data-icon=""></span>
                <a href="#"><i class="fa fa-paperclip"></i> User Acceptance Test.doc
                </a>
            </p>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'MensagemAutomatica',
        data: function () {
            return {
            
            }
        },

        props: {
            msg: Object
        },

        methods: {
            mounted() {
            }
        }
    }
</script>

<style scoped>
</style>