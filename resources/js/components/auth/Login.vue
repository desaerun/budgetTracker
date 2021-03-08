<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-7">
                <div class="card">
                    <div class="card-header">
                        <h2 class="login-heading">Login</h2>
                    </div>
                    <div class="login-form card-body">

                        <form action="#" @submit.prevent="login">
                            <div class="form-row">
                                <label for="username" class="col-md-4 col-form-label text-md-right">Username/Emai</label>
                                <div class="col-md-6">
                                    <input type="email" name="username" id="username" class="form-control" v-model="username">
                                </div>
                            </div>

                            <div class="form-row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input type="password" name="password" id="password" class="form-control" v-model="password">
                                </div>
                            </div>

                            <div class="form-row mb-0">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login() {
                this.$store.dispatch('retrieveToken', {
                    username: this.username,
                    password: this.password,
                })
                    .then(response => {
                        let redir = this.$route.query.redirect;
                        if (redir) {
                            this.$router.push({path: redir})
                        } else {
                            this.$router.push({name: 'dashboard'})
                        }

                    })
            },
        }
    }
</script>

<style>

</style>
