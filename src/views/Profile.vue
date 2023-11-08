<template>
        <div class="background">
        <div class="container-fluid body">
            <div class="profile d-flex justify-content-center">

                <div class="card nes-container is-rounded left col-lg-5">
                    <h1>Profile</h1>
                    <img src="../assets/profile_avatar.png" id="profileImage">
                    <h3> Ryan</h3>   
                    <p>{{  userEmail }}</p>
                    <button class="nes-btn" @click="logOut">Log Out</button>
                </div>

                <div class="card nes-container is-rounded right col-lg-5">

                    <h1 id="header">Rewards</h1>

                    <div class="voucher">

                        <div class="card col-sm-6 col-md-4 ">
                            <img src="../assets/ChIJMUALI68Z2jER6yrUp2Z11Xk.png" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Voucher</h5>
                                <p class="card-text">Remaining {{ voucher1 }}</p>
                                <button class="nes-btn is-success" @click="redeemVoucher(1)">Redeem</button>  
                                
                            </div>
                        </div>

                        <div class="card col-sm-6 col-md-4">
                            <img src="../assets/ChIJOWmPzaUZ2jERtgmyBock1Y4.png" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Voucher</h5>
                                <p class="card-text">Remaining {{ voucher2 }}</p>
                                <button class="nes-btn is-success" @click="redeemVoucher(2)">Redeem</button>
                            </div>
                        </div>

                        <div class="card col-sm-6 col-md-4" >
                            <img src="../assets/ChIJfwEEIqYZ2jER7KGqeEBPVLw.png" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Voucher</h5>
                                <p class="card-text">Remaining {{ voucher3 }}</p>
                                <button class="nes-btn is-success" @click="redeemVoucher(3)">Redeem</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dialog-container" v-if="showDialog">
                    <div class="nes-dialog is-dark is-rounded" id="qr-dialog">
                        <img src="../assets/randomqr.png" alt="QR Code" />
                        <button class="nes-btn" @click="showDialog = false">Close</button>
                    </div>
                </div>

                

            </div>
        </div>
    </div>
    
</template>

<script>
    import { auth } from "../firebase"; // Make sure to import your Firebase auth instance
    import router from "../router"; // Import your Vue router instance
    import { db } from "../firebase";
    import { getDoc, doc, runTransaction, updateDoc, increment } from "../../node_modules/firebase/firestore";
    
    export default{
        name: "Profile",

        data() {
            return {
                userEmail: "",
                voucher1: 0,
                voucher2: 0,
                voucher3: 0,
                showDialog: false,
                currentQRCode: '',
            }
        },

        created(){
            this.initAuth();
        },
        methods: {
            redeemVoucher(voucherNumber) {
                // Logic to determine which QR code to show
                this.currentQRCode = `/path/to/qr-code-voucher-${voucherNumber}.png`;
                // Set showDialog to true to show the dialog
                this.showDialog = true;
            },
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
            async initAuth() {
            // Return a promise that resolves when the user state is confirmed
                await new Promise((resolve, reject) => {
                    const unsubscribe = auth.onAuthStateChanged(user => {
                        unsubscribe(); // Unsubscribe to avoid memory leaks
                        if (user) {
                            this.userEmail = user.email;
                            resolve(user);
                        } else {
                            console.error("No user is logged in.");
                            // Optionally redirect to the sign-in page
                            router.push('/signin');
                            reject(new Error("No user is logged in."));
                        }
                    });
                });

                // Once the user is confirmed, fetch the voucher data
                this.fetchVoucherData();
            },

            async fetchVoucherData(){
                if (auth.currentUser) { // Check if the currentUser is not null
                    const userEmail = auth.currentUser.email;
                    const docRef = doc(db, userEmail, "vouchers")
                    try {
                        const docSnap = await getDoc(docRef); // Ensure you get the document snapshot

                        if (docSnap.exists()){
                            const data = docSnap.data();
                            this.voucher1 = data.voucher1
                            this.voucher2 = data.voucher2
                            this.voucher3 = data.voucher3
                        } else {
                            console.log("No such document!");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    console.error("No user is logged in to fetch vouchers.");
                }
            },
            redeemVoucher(voucherNumber) {
                // Check if there are vouchers left to redeem
                if (this[`voucher${voucherNumber}`] > 0) {
                    // Decrement the voucher count locally
                    this[`voucher${voucherNumber}`]--;

                    // Show the QR code dialog
                    this.showDialog = true;

                    // Call a method to handle the database update
                    this.updateVoucherCount(voucherNumber);
                } else {
                    alert('No vouchers left to redeem.');
                }
            },

            async updateVoucherCount(voucherNumber) {
                // Assuming you're storing vouchers in the database with keys 'voucher1', 'voucher2', etc.
                const voucherKey = `voucher${voucherNumber}`;

                try {
                    const userEmail = auth.currentUser.email;
                    const userVouchersRef = doc(db, userEmail, "vouchers");

                    // Update the voucher count in the database
                    await updateDoc(userVouchersRef, {
                        [voucherKey]: increment(-1)
                    });

                    console.log(`Voucher ${voucherNumber} redeemed.`);
                } catch (error) {
                    console.error("Error redeeming voucher:", error);
                }
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
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
    align-items: center;
    min-height: calc(100vh - 100px);		
    
}
.profile{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
    /* background-color: rgba(245, 245, 220, 0.9);
    padding: 2%;
    width: 85%;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

    margin-top: 20px;
    margin-bottom: 20px;

    display: grid;
    grid-template-columns: 1fr 2fr; */
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
    width: 45%;
    height: auto;
}

.right  {
    /* padding: auto;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center; */
    /* grid-column: 2; */
    background-color: rgba(245, 245, 220, 0.9);
    
}

.voucher{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card-img-top, .voucherImage{
    width: auto;
    height: auto;
}

.dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure it's above other content */
    background-color: rgba(0, 0, 0, 0.5); /* Optional: for dimmed background */
}

/* Style the dialog itself */
#qr-dialog {
    background: black;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2; /* Ensure it's above the dimmed background */
}

#qr-dialog img {
    max-width: 100%;
    height: auto;
}

/* Styles added for responsiveness */
@media (max-width: 1500px) {
    /* Adjust font-sizes for medium screens like tablets */
    .card-title, .card-text {
        font-size: 0.7rem; /* Smaller font size */
    }
}

/* @media (max-width: 1500px) { */
    /* Adjust font-sizes for medium screens like tablets */
    /* .card-title{
        font-size: 0.7rem; /* Smaller font size */
        /* padding: 22px;  */

@media (max-width: 768px) {
    /* For small screens like mobile devices, stack the voucher cards */
    .voucher {
        flex-direction: column;
        align-items: center;
    }

    .card {
        width: 100%; /* Full width cards for smaller screens */
        margin-bottom: 1rem; /* Add some space between the cards */
    }

    /* Adjust font-sizes for smaller screens */
    .card-title, .card-text {
        font-size: 0.8rem; /* Even smaller font size */
    }

    /* Adjust button size for better touch interaction */
    .nes-btn {
        padding: 10px 20px; /* Larger padding */
        font-size: 0.8rem; /* Match the font-size with the text */
    }
}

@media (max-width: 480px) {
    /* For very small screens, make further adjustments as needed */
    .card-body {
        padding: 0.5rem; /* Reduce padding inside the card */
    }

    .card-title, .card-text {
        font-size: 0.7rem; /* Adjust font size for very small screens */
    }
}

</style>