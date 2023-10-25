<template>
    
    <div class="container-fluid background">
        <!-- Search Bar -->
        <div class="container-fluid searchbar">
            <form action="">
                <div class="nes-field">
                    <label for="search_field"><h2>Begin Your Adventure!</h2></label>
                    <input type="text" id="search_field" class="nes-input" placeholder="Enter Locations/Stores/Food">
                </div>
                <!-- Search Button -->
                <router-link to="/Location" class="nes-btn is-success"> Begin! </router-link>
            </form>
        </div>
    
    </div>
        
</template>

<script>
import {RouterLink} from 'vue-router';
export default{
    name: "Home",
};

</script>

<style scoped>
.background{
    background-image: url("../assets/home_background.jpg");
    background-repeat: no-repeat;
    background-size: cover;  
    position: absolute;
    top:100px;
    height: 100vh;
}
.searchbar{
    margin: auto;
    margin-top: 20%;
    width: 50%;
    text-align: center;

}
</style>