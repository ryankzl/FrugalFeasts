<template>
    
    <div class="background">
        <div class="container-fluid body">
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
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;  
    height: calc(100vh - 100px);
}
.body{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);			
}
.searchbar{
    background-color: rgba(245, 245, 220, 0.9);
    padding: 2%;
    width: 50%;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

#search_field{
    text-align: center;
	margin-bottom: 25px;
}
h2{
	margin-bottom: 25px;
}
</style>