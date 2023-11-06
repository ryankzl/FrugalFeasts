<template>
    <div class="container-fluid border border-danger border-5 profile">
        <h1>This is the Profile page</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odit dicta atque. Commodi iste nisi eveniet impedit in deleniti excepturi mollitia doloremque animi dolore eum ratione et, officiis ipsum quis.</p>
        <button class="nes-btn" @click="logOut"> Log Out </button>
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
.profile{
    text-align: center;
    background-color: cyan;
    margin-top: 100px;
}

</style>