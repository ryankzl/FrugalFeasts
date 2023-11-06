<template>
    <div v-if="showPopup">
        <!-- Sign Up -->
        <div v-if= " page === 'signup'  && messageType === 'success' " class="popup success">
            <h1>Sign Up Success! Redirecting You Home...</h1>
        </div>
        <div v-else-if= " page === 'signup'  && messageType === 'error_1' " class="popup error">
            <h1>Email Exists. Please Log In! Redirecting You To Login Page...</h1>
        </div>
        <!-- Log In -->
        <div v-else-if="page === 'login' && messageType === 'success'" class="popup success">
        <h1>Login Success! Redirecting You Home...</h1>
        </div>
        <div v-else-if="page === 'login' && messageType === 'error'" class="popup error">
            <h1>Login Failed. Please Try Again!</h1>
        </div>        
        
        <div v-else-if="page === 'login' && messageType === 'no_account'" class="popup error">
        <h1>No Account Found. Please Sign Up! Redirecting You To Signup Page...</h1>
        </div>

    </div>
</template>

<script>
export default {
    name: "AuthPopUp",
    data() {
        return {
            page: '',
            showPopup: false,
            messageType: '', // 'success', 'error', etc.
        };
    },
    methods: {
        checker(page, type, message = '') {
            this.messageType = type;
            this.showPopup = true;
            this.page = page

            // Redirect after timeout
            setTimeout(() => {
                this.showPopup = false;

                // Login & Signup -> Success -> Direct Home
                if (this.messageType === 'success'){
                    this.$router.push("/")
                }

                // if (this.page === 'login' && this.messageType === 'no_account'){
                // }

            }, 3000); // Adjust the time as needed
        },
    },
};
</script>

<style scoped>
    .popup {
        /* Shared styles for all popups */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        background: white;
        padding: 20px;
        border-radius: 5px;
        min-width: 200px;
        text-align: center;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    
   
</style>
