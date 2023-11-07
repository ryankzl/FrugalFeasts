<template>

    <div class="background">
        <div class="container-fluid body">
            <div class="details">
                <h1>Thank you for your purchase!</h1>

                <h3>You have earned XXX keys. Head to Profile to check them out!</h3>
            </div>
        </div>
    </div>

  
   
</template>


<script>

export default {
    name: "Checkout",
}
       
</script>
    
<style scoped>
.background{
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;  
    min-height: calc(100vh - 100px);
}

.body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);		
}
.details{
    background-color: rgba(245, 245, 220, 0.9);
    padding: 2%;
    width: 85%;
	height: auto;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
</style>

  