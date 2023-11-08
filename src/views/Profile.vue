<template>
        <div class="background">
        <div class="container-fluid body">
            <div class="profile">

                <div class="card nes-container is-rounded left">
                    <h1>Profile</h1>
                    <img src="../assets/profile_avatar.png" id="profileImage">
                    <h3> Ryan</h3>   
                    <p>{{  userEmail }}</p>
                    <button class="nes-btn" @click="logOut">Log Out</button>
                </div>

                <div class="card nes-container is-rounded right">

                    <h1 id="header">Rewards</h1>

                    <div class="voucher">

                        <div class="card">
                            <img src="../assets/voucher_shyan.jpg" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Voucher</h5>
                                <p class="card-text">Remaining</p>
                                <button class="nes-btn is-success">Redeem</button>    
                                
                            </div>
                        </div>

                        <div class="card">
                            <img src="../assets/voucher_aly.jpg" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Voucher</h5>
                                <p class="card-text">Remaining</p>
                                <button class="nes-btn is-success">Redeem</button>

                            </div>
                        </div>

                        <div class="card" >
                            <img src="../assets/voucher_vig.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Voucher</h5>
                                <p class="card-text">Remaining</p>
                                <button class="nes-btn is-success">Redeem</button>

                            </div>
                        </div>
                    </div>

                 
                </div>

                

            </div>
        </div>
    </div>
    
</template>

<script>
    import { auth } from "../firebase"; // Make sure to import your Firebase auth instance
    import router from "../router"; // Import your Vue router instance
    
    export default{
        name: "Profile",

        data() {
            return {
                userEmail: ""
            }
        },

        created(){
            this.fetchUserEmail();
        },
        methods: {
            async logOut() {
                try {
                    await auth.signOut();
                    alert('You are now logged out.'); // Simple alert for logout notification
                    router.push('/'); // Redirect to home page
                } catch (error) {
                    console.error("Logout Error:", error);
                    alert('Failed to log out. Please try again.');
                }
            },
            fetchUserEmail() {
                // Listen for changes to the user's sign-in state
                auth.onAuthStateChanged(user => {
                    if (user) {
                        this.userEmail = user.email;
                    } else {
                        console.error("No user is logged in.");
                        // Optionally redirect to the sign-in page
                        router.push('/signin');
                    }
                });
            },


        }
    };
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
.profile{
    background-color: rgba(245, 245, 220, 0.9);
    padding: 2%;
    width: 85%;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

    margin-top: 20px;
    margin-bottom: 20px;

    display: grid;
    grid-template-columns: 1fr 2fr;
}

.left {
    grid-column: 1;
    /* Fills box and flushes content down */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(245, 245, 220, 0.9);

}

#profileImage{
    width: 80%;
    height: auto;
}

.right  {
    /* grid-column: 2; */
    background-color: rgba(245, 245, 220, 0.9);
    
}

.voucher{
    display: flex;
}

.card-img-top, .voucherImage{
    width: auto;
    height: auto;
}

.form{
    display:grid;
    

}


</style>