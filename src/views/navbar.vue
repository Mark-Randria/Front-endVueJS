<template>
    <div>
    <nav class="navbar" style="justify-content: center;">
        <form class="form-inline">
            <router-link to="/etudiant" class="btn btn-outline-light" type="button" style="margin:20px;">Etudiant</router-link> |
            <router-link to="/matiere" class="btn btn-outline-light" type="button" style="margin:20px;">Matiere</router-link> |
            <router-link to="/note" class="btn btn-outline-light" type="button" style="margin:20px;">Note</router-link> |
            <router-link to="/bulletin" class="btn btn-outline-light" type="button" style="margin:20px;">Bulletin</router-link> |
            <router-link to="/classement" class="btn btn-outline-light" type="button" style="margin:20px;">Classement</router-link>
        </form>
    </nav>
    </div>
</template>

<script>
    export default {
        name:'nav'
    }
</script>

<style scoped>

</style>