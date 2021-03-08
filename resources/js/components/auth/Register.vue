<template>
    <div class="login mt-5">
        <div class="card">
            <div class="card-header">
                Register
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            v-model="details.username"
                            placeholder="Username"
                        />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            id="email"
                            v-model="details.email"
                            placeholder="Email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="details.password"
                            placeholder="Password"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password_confirmation">Verify</label>
                        <input
                            type="password"
                            class="form-control"
                            id="password_confirmation"
                            v-model="details.password_confirmation"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button type="button" @click="register" class="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
    name: "Register",
    data() {
        return {
            details: {
                username: null,
                email: null,
                password: null,
                password_confirmation: null,
            }
        }
    },
    computed: {
        ...mapGetters(["errors"]),
    },
    mounted() {
        this.$store.commit("setErrors", {});
    },
    methods: {
        ...mapActions("auth", ["sendRegisterRequest"]),
        register: function() {
            this.sendRegisterRequest(this.details).then(() => {
                this.$router.push({name: "Home"});
            });
        }
    }
}
</script>

<style scoped>

</style>
