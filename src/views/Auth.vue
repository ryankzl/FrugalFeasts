<template>
    <div class="background">
        <div class="container-fluid body">

            <PopUp ref="popup"></PopUp>
            
            <div class="container-fluid form">
                <h3 v-if="isSignUpMode">Create An Account!</h3>
                <h3 v-else>Log In!</h3>

                <form @submit.prevent="isSignUpMode ? signup() : login()">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="email" v-model="email" placeholder="yaesh@is216.com">
                    </div>
        
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password" placeholder="password123!">
                    </div>
                    
                    <button type="submit" class="nes-btn">{{ isSignUpMode ? 'Sign Up' : 'Log In' }}</button>
                    
                    <p @click="toggleMode">{{ isSignUpMode ? 'Already Have An Account? ->' : 'Create New Account ->' }}</p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import PopUp from "../components/AuthPopUp.vue"; 
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";


export default {
    name: "Auth",

    components: {
         PopUp
        },

    data() {
        return {
            email: "",
            password: "",
            isSignUpMode: false,
            showPopup: false,
            popupType: '',
            popupMessage: '',
            popupRedirect: ''
        };
    },
    methods: {
        login() {
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // User is signed in
                    const user = userCredential.user;
                    console.log("User logged in:", user);
                    this.$refs.popup.checker("login", "success");
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Login failed:", errorCode, errorMessage);
                    // Handle specific login error for no email
                    if (errorCode === "auth/user-not-found") {
                        this.$refs.popup.checker("login", "no_account");
                    } else {
                        this.$refs.popup.checker("login", "error", errorMessage);
                    }
                });
        },
        signup() {
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then( async (userCredential) => {
                    const user = userCredential.user;       
                    this.$refs.popup.checker("signup", "success");
                    await this.initializeUserData(this.email);         
                    

                })
                .catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        this.$refs.popup.checker("signup", "email_in_use");
                    } else {
                        this.$refs.popup.checker("signup", "error", error.message);
                    }
                });
        },

        toggleMode() {
            this.isSignUpMode = !this.isSignUpMode;
        },
        
        async initializeUserData(email) {
            const userCollectionRef = collection(db, email);
            const userDocRef = doc(userCollectionRef, "gameInfo");

            try {
                await setDoc(userDocRef, {
                    win: 0,
                    loss: 0,
                    keys: 0
                });
            } catch (error) {
                console.error("Error initializing user data:", error);
                throw error; // Rethrow to handle it in the caller function
            }
        },
    }
};
</script>

<style scoped>
    /* Your styles here */
    .background{
		background-image: url(../assets/background.png);
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
	.form{ 
        background-color: rgba(245, 245, 220, 0.9);
		padding: 2%;
		width: 50%;
		text-align: center;	
        border-radius: 20px; 
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	}
    .nes-btn{
		margin-bottom: 20px
	}
	p{
		color: black
	}	
</style>
