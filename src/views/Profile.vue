<template>
    <div class="background">
        <!-- Profile Card -->
        <div class="left_container">
            <div class="card nes-container is-rounded" style="width: 400px; text-align: center;">
                <h3 style="text-align:center">Profile</h3>
                <img class="card-img-top" style="height: 300px" src="../assets/profile male image.png">
                <div class="card-body">
                    <p class="card-text" style="text-align: center;">
                        <br>
                        Name: Ryan khoo Zun;<br>
                        Email: ryan.zhoon@gamil.com <br>
                        Contact: 9756 3409
                    </p>
                    <a img src="./home.html" class="nes-btn is-primary">Back Home</a>
                </div>
            </div>
      </div>

        <!-- "Hello world" text container -->
        <div class="right_container">
            <div class="container" style="width: 1000px;">
                <div class="card nes-container is-rounded" style="text-align: center; height: 380px;">
                  <h3>Recent Purchases</h3>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo nihil harum omnis quia cumque molestiae tempora quos placeat nulla. Facilis, fuga iure ullam sunt velit excepturi esse beatae totam cumque?</p>  
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ex ipsum dolorem temporibus commodi ullam totam facere sunt inventore exercitationem magnam accusamus placeat omnis aliquid, obcaecati consectetur voluptas adipisci. Facilis.</p>
                  <p>Hello World</p>
                </div>
            </div>

        <!-- Rewards -->
            <div class="container" style="width: 1000px;">
                <div class="card nes-container is-rounded" style="background-color: lightblue; margin-top: 15px; height: 255px">
                    <h3 style="text-align:center">Rewards</h3>
                    <div class="card-body">
                        <p class="card-text">
                        <br>
                            <ul>
                                <li> <span style="color:red">30%</span> off at Swee Heng Bakery</li>
                                <li> <span style="color:red">40%</span> off at Toast Box</li>
                                <li> <span style="color:red">15%</span> off at Zun Long House</li>
                            </ul>
                        </p>
                    <a img src="./home.html" class="nes-btn is-primary">Back Home</a>
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
            }
        }
    };
</script>
  
<style scoped>
.background{
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;  
    height: calc(100vh - 100px);
    display: flex;
    justify-content: flex-start;
}
.profile{
    text-align: center;
    background-color: cyan;
    margin-top: 100px;
}
.left_container {
          margin-left: 10px;
          margin-top: 20px;
      }

      /* Style the text "Hello world" container */
.right_container {
          margin-top: 20px;
          margin-left: 10px;
          text-align: center;
      }

/* .game{
    background-color: rgba(245, 245, 220, 0.9);
    padding: 2%;
    width: 85%;
	height: 85%;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

	display: grid;
	grid-template-rows: auto 2fr 1fr;
	grid-template-columns: 1fr 2fr 1fr;
} */

</style>