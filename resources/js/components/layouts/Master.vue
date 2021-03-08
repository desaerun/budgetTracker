<template>
    <div id="app" class="container">
        <page-navigation></page-navigation>
        <router-view></router-view>
    </div>
</template>

<script>
    import PageNavigation from "../PageNavigation";

    export default {
        name: "Master",
        components: {
            PageNavigation
        }
    }
</script>

<style>
    * {
        box-sizing: border-box;
        margin:0;
        padding:0;
    }
    #app {
        font-family: 'Open Sans', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-size: 24px;
        height: 100vh;
    }
</style>
