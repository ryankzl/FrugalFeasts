<template>

    <div class="background">
        <div class="container-fluid body ">
            <div class="store">
                    <!-- Store Details -->
                    <div class="card nes-container is-rounded left">
                            <img src="../assets/food_croissant.png" id="bakeryImage">
                            <h3>{{ storeData.name }}</h3>   
                            <small><p>{{ storeData.address }}</p></small>
                            <p>Closes At: {{ storeData.closeTime }}</p>
                            <!-- Would like to link this to external google maps later -->
                            <button class="nes-btn" id="directions">📍Directions</button>
                    </div>
                    <!-- Bread Details -->
                    <div class="card nes-container is-rounded right" id="food_card">
                        <div class="row row-cols-1 row-cols-md-2 g-4">
                        
                            <!-- Use v-for to iterate over each item in storeData.breads -->
                            <div class="col" v-for="(bread, index) in storeData.breads" :key="index">
                                <div class="card">
                                
                                <!-- Use the dynamic src binding for images -->
                                <img :src="`/src/assets/food_${bread.id}.png`" class="card-img-top">
                                <div class="card-body">
                                <hr>
                                    <!-- Dynamically populate title and text from your storeData.breads -->
                                    <h5 class="card-title">{{ bread.id }}</h5>
                                    <p class="card-text">
                                            <!-- This is the stores data -->                                            
                                            <p>Quantity:{{ bread.quantity }}</p>
                                            <p>Price: ${{ bread.price }}</p>                                       
                                            <!-- This is the quantity customer orders -->
                                            <p>How Many: {{ customerQuantities[bread.id] }}</p>
                                    </p>
                                    
                                    <!-- Add quantity adjustment buttons -->
                                    <button class="nes-btn" @click="minusCustQuantity(bread.id)">-</button>
                                    <button class="nes-btn" @click="addCustQuantity(bread.id)">+</button>
                                    
                                </div>
                                
                                </div>
                                
                            </div>
                            
                        </div>
                        <div class="row">
                            <!-- <router-link to="/Checkout">  -->
                            <button class="nes-btn is-success checkout" @click="stockUpdate(); keysUpdate()">Checkout</button>
                            <!-- </router-link> -->
                        </div>
                    </div>

                  

            </div>
        </div>
    </div>
    
   
</template>


<script>
import { auth } from "../firebase";
import { db } from "../firebase";
import { getDoc, doc, runTransaction, updateDoc, increment } from "../../node_modules/firebase/firestore";

export default {
    name: "Store",

    data() {
        return {
        storeData: {
            name: '',
            address: '',
            closeTime: '',
            breads: []
        },
        customerQuantities: {}
        };
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        async fetchData() {
            const docRef = doc(db, "business", "ChIJfwEEIqYZ2jER7KGqeEBPVLw");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                this.storeData.name = data.name;
                this.storeData.address = data.address;
                this.storeData.closeTime = data.closing_time;
                this.storeData.breads = Object.entries(data.food).map(([key, value]) => ({
                id: key,
                price: value[0], // Here the first element is price
                quantity: value[1], // Here the second element is quantity
                maxQuantity: value[1] // Assuming you want to keep track of the max quantity
                }));

                // Initialize customerQuantities for each bread
                this.storeData.breads.forEach(bread => {
                this.customerQuantities[bread.id] = 0;
                });
            } else {
                console.log("No such document!");
            }
            },

        addCustQuantity(breadId) {
        if (this.customerQuantities[breadId] < this.storeData.breads.find(b => b.id === breadId).maxQuantity) {
            this.customerQuantities[breadId]++;
        }
        },

        minusCustQuantity(breadId) {
        if (this.customerQuantities[breadId] > 0) {
            this.customerQuantities[breadId]--;
        }
        },

        
        // Update Stock
        async stockUpdate() {
            try {
                await runTransaction(db, async (transaction) => {
                    const docRef = doc(db, "business", "ChIJfwEEIqYZ2jER7KGqeEBPVLw");
                    const snapshot = await transaction.get(docRef);

                    if (!snapshot.exists) {
                        throw new Error("Document does not exist!");
                    }

                    const data = snapshot.data();

                    // Prepare updates for the transaction
                    for (const [breadId, quantity] of Object.entries(this.customerQuantities)) {
                        const bread = data.food[breadId];
                        if (bread && quantity <= bread[1]) {
                            // Create a new array with the updated quantity
                            const updatedBreadData = [bread[0], bread[1] - quantity];
                            // Set the whole array at once
                            transaction.update(docRef, `food.${breadId}`, updatedBreadData);
                        } else {
                            throw new Error(`Not enough stock for ${breadId} or it does not exist`);
                        }
                    }
                    console.log(this.customerQuantities)
                });

                console.log('Transaction successfully committed!');
            } catch (e) {
                console.error("Transaction failed: ", e);
            }
        },

        // Update User Keys

        async keysUpdate(){

            // iterate through customerQuantities taking the value and adding
            const keysToAdd = Object.values(this.customerQuantities).reduce((sum, quantity) => sum + quantity, 0);

            try {
                const userEmail = auth.currentUser.email;
                const docRefGame = doc(db, userEmail, "gameInfo");

                // Increment the keys atomically
                await updateDoc(docRefGame, {
                    keys: increment(keysToAdd)
                });

                console.log('Keys successfully incremented!');
            } catch (e) {
                console.error("Failed to increment keys: ", e);
            }

        }
        // Update User Purchases

            

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

.store{
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

#bakeryImage{
    width: 70%;
    height: auto;
    border-radius: 20px;
    border: solid 2px black;
}

.right  {
    grid-column: 2;
    background-color: rgba(245, 245, 220, 0.9);
}

#food_card{
    display: flex;
    justify-content: center; /* Centers children horizontally */
    align-items: center; /* Centers children vertically */
    height: auto; /* Adjust the height as needed, or leave as 'auto' */
    max-width: auto; /* Adjust the width as needed, or leave as 'auto' */
}

.card-img-top {
    width: 70%; /* Adjust as needed, or set a fixed width */
    height: auto; /* Keeps the aspect ratio */
    margin: auto; /* This will help center the image if the parent is not a flex container */
}



.checkout{
    grid-column: 2;
    width: fit-content;
    align-self: center;
    margin-top: 20px;
}


/* Fixes for mobile */
@media (max-width: 768px) {
    .store {
        grid-template-columns: 1fr;
    }
    .left, .right {
        grid-column: 1;
    }
}

</style>

  