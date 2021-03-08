<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand">Budget Tracker</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-links">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbar-links">
            <ul class="navbar-nav mr-auto" v-if="loggedIn">
                <li class="nav-item">
                    <router-link :to="{ name: 'dashboard'}" class="nav-link">Dashboard <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'income'}" class="nav-link">Income</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'bills'}" class="nav-link">Bills</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'page'}" class="nav-link">Page</router-link>
                </li>
            </ul>
        </div>
        <div class="navbar">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" v-if="!loggedIn">
                    <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
                </li>

                <li class="nav-item" v-if="!loggedIn">
                    <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
                </li>

                <li class="nav-item" v-else>
                    <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
            }
        },
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn;
            }
        }
    }
</script>

<style scoped>
    .nav-item a {
        color: #636b6f;
        padding: 0 25px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: .1rem;
        text-decoration: none;
        text-transform: uppercase;
    }
    .nav-item .router-link-active {
        color: black;
    }
</style>
