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
                                
                                    <!-- Dynamically populate title and text from your storeData.breads -->
                                    <h5 class="card-title">{{ bread.name }}</h5>
                                    <p class="card-text">
                                            <p>Quantity:{{ bread.quantity }}</p>
                                            <p>Price: ${{ bread.price }}</p>                                       
                                    <!-- This bread costs ${{ bread.price }} and we have {{ bread.quantity }} left. -->
                                    </p>
                                    
                                    <!-- Add quantity adjustment buttons -->
                                    <button @click="addQuantity(bread.id)">+</button>
                                    <button @click="minusQuantity(bread.id)">-</button>
                                </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>

      

            </div>
        </div>
    </div>
    
   
</template>


<script>
    import { onMounted, reactive } from "vue";
    import { db } from "../firebase";
    import { getDoc, doc, updateDoc, increment} from "../../node_modules/firebase/firestore";

export default{
    name: "Store",

    setup() {
        const storeData = reactive({
            name: '',
            address: '',
            closeTime: '',
            breads: []
        });

        const fetchData = async () => {
            const docRef = doc(db, "business", "breadtalk");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                storeData.name = data.name;
                storeData.address = data.address;
                storeData.closeTime = data.close_time;
                // Assuming 'food' is the map containing your breads
                storeData.breads = Object.entries(data.food).map(([key, value]) => ({
                    id: key,
                    quantity: value[0],
                    price: value[1],
                    maxQuantity: 100 // You need to define the logic for maxQuantity
                }));
            } else {
                console.log("No such document!");
            }
        };

        onMounted(fetchData);

        return { storeData };
    },
  
    methods:{
        addQuantity(breadId) {
            const bread = this.breads.find((b) => b.id === breadId);
            if (bread && bread.quantity < bread.maxQuantity) {
                bread.quantity++;
            }
        },
        minusQuantity(breadId) {
            const bread = this.breads.find((b) => b.id === breadId);
            if (bread && bread.quantity > 0) {
                bread.quantity--;
            }
        },
    },
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
	height: 85%;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

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
    width: auto; /* Adjust the width as needed, or leave as 'auto' */
}

.card-img-top {
    width: 70%; /* Adjust as needed, or set a fixed width */
    height: auto; /* Keeps the aspect ratio */
    margin: 0 auto; /* This will help center the image if the parent is not a flex container */
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

  