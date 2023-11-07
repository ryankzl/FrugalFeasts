<template>
    <div class=" container-fluid background">

        <div class="container-fluid">
            <div class="nes-container is-rounded is-centered my-3">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-6 mb-2">
                        <div class="nes-container is-rounded bg-white mt-2">
                            <i class="nes-octocat animate"></i>
                            <!-- store details -->
                            <p class="mt-2">{{ bakeryInfo.bakeryName }}</p>
                            <p>Address: {{ bakeryInfo.address }}</p>
                            <p>Opening hours: {{ bakeryInfo.openingHours }}</p>
                            <div class= "container-fluid text-center my-3">
                                <i class="nes-icon coin is-small"></i>
                                <p class="d-inline">&nbspDiscount available !!!&nbsp</p>
                                <i class="nes-icon coin is-small"></i>
                            </div>
                            <p>
                                <!-- distance of the store from where the user is located -->
                                <!-- the button will link to google maps showing the location from the user to the bakery  -->
                                <a class="nes-btn is-primary" :href="bakeryInfo.googleMapsLink">📍{{bakeryInfo.distance}} km away</a>
                            </p>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6">
                        <img :src="bakeryInfo.bakeryImage" class="centered-image">
                    </div>
                </div>
            </div>
        </div>
                    
        <div class="container-fluid">
            <div class="nes-container is-rounded p-3 rounded-4">
                <div class="container text-center mb-3">
                    <p>Bread</p>
                </div>
                <div class="row">
                    <div v-for="bread in breads" :key="bread.id" class="col-6 col-sm-6 col-md-4 col-lg-2 col-mb-2">
                        <div class="card h-100">
                            <img :src="bread.image" class="card-img-top" :alt="bread.name">
                            <div class="card-body">
                                <p class="card-title" style="font-size:14px;padding-bottom:10px;">
                                    {{ bread.name }}
                                    <span class="text-success">(Available)</span>
                                </p>
                                <div class="card-text" style="font-size:10px">
                                    <p>
                                        <span class="text-decoration-line-through d-inline">{{ bread.originalPrice }}</span>
                                        <span class="text-danger d-inline">&nbsp{{ bread.salePrice }}</span>
                                    </p>
                                    <p>
                                        <span>Consume by:</span>
                                        <span class="text-danger">Today</span>
                                    </p>
                                    <p :id="bread.id">Quantity: {{ bread.quantity }}</p>
                                    <button :name="bread.id" type="button" class="nes-btn is-primary" @click="minusQuantity(bread.id)">-</button>
                                    <button :name="bread.id" type="button" class="nes-btn is-primary" @click="addQuantity(bread.id)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- checkout button with a pop up box to confirm order -->
        <div class="container-fluid">
            <div class="d-flex justify-content-end mt-4">
                <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-dark-rounded').showModal();">
                    Checkout
                </button>
                <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded">
                    <form method="dialog">
                        <p class="title">Confirm checkout</p>
                        <p>Would you like to confirm your order?</p>
                        <menu class="dialog-menu">
                            <button class="nes-btn">Cancel</button>
                            <!-- link to checkout page -->
                            <a class="nes-btn is-primary" href="/Checkout">Confirm</a>
                        </menu>
                    </form>
                </dialog>
            </div>
        </div>

    </div>
                
                
   
</template>


<script>

export default{
    name: "Store",
    data(){
        return{
            bakeryInfo:{
                bakeryName: 'Tiong Bahru Bakery',
                address: '252 North Bridge Road, #B1-11, Raffles City Shopping Centre, Singapore 179103',
                openingHours: '7.30am to 10pm',
                distance: '', //distance from the user 
                googleMapsLink: '', // Link to google maps
                bakeryImage: "/src/assets/bakery.jpg",
            }, 
            //list of bread objects 
            breads:[
                {
                    id: "sausage_bun",
                    name: "Sausage Bun",
                    image: "/src/assets/sausage bun.png",
                    originalPrice: "$2.30",
                    salePrice: "$1.00",
                    quantity: 0,
                    maxQuantity: 12,
                },
                {
                    id: "kaya_bread",
                    name: "Kaya Bread",
                    image: "/src/assets/kaya bread.png",
                    originalPrice: "$2.50",
                    salePrice: "$1.20",
                    quantity: 0,
                    maxQuantity: 10,
                },
                {
                    id: "pineapple_bun",
                    name: "Pineapple Bun",
                    image: "/src/assets/pineapple bun.jpg",
                    originalPrice: "$2.00",
                    salePrice: "$0.90", 
                    quantity: 0,
                    maxQuantity: 8,
                }, 
                {
                    id: "pork_floss_bun",
                    name: "Pork Floss Bun",
                    image: "/src/assets/pork floss bun.jpg",
                    originalPrice: "$2.20",
                    salePrice:"1.30",
                    quantity: 0,
                    maxQuantity: 6,
                }, 
                {
                    id: "cinnamon_bun",
                    name: "Cinnamon Bun",
                    image: "/src/assets/cinnamon bun.jpg",
                    originalPrice: "$1.80",
                    salePrice:"0.80",
                    quantity: 0,
                    maxQuantity: 7,
                },
                {
                    id: "red_bean_bun",
                    name: "Red Bean Bun",
                    image: "/src/assets/red bean bun.jpg",
                    originalPrice: "$2.30",
                    salePrice:"1.70",
                    quantity: 0,
                    maxQuantity: 9,
                }


            ]
        }
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

.centered-image {
    height: 100%; /* Make the image's height span the entire column */
    width: 90%; /* Maintain the image's original aspect ratio */
    max-width: 100%; /* Ensure the image doesn't exceed the column's width */   
}

.background{
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed; 
    position: absolute;
    top: 100px;
    min-height: 100vh;
}


</style>

  