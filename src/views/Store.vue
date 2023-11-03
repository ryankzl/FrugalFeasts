 
<template>

    <div class="container-fluid">
        <div class="nes-container is-rounded is-centered">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-6">
                    <i class="nes-octocat animate"></i>
                    <h1 class="mt-2">{{ bakeryInfo.name }}</h1>
                    <p>Address: {{ bakeryInfo.address }}</p>
                    <p>Opening hours: {{ bakeryInfo.openingHours }}</p>
                    <div class= "container-fluid text-center my-3">
                        <i class="nes-icon coin is-small"></i>
                        <p class="d-inline">Discount available !!!</p>
                        <i class="nes-icon coin is-small"></i>
                    </div>
                    <p>
                        <a class="nes-btn is-primary" :href="bakeryInfo.googleMapsLink">📍0.5km away</a>
                    </p>
                </div>
                <div class="col-12 col-sm-12 col-md-6">
                    <img :src="bakeryInfo.bakeryImage" width="50%">
                </div>
            </div>
        </div>
    </div>
                
    <div class="container-fluid">
        <div class="nes-container is-rounded p-3 rounded-4">
            <div class="container text-center">
                <h3>Bread</h3>
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
                                    <span class="text-danger d-inline">{{ bread.salePrice }}</span>
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

    <div class="container-fluid">
        <div class="d-flex justify-content-end">
            <a class="nes-btn is-primary mt-4" href="#">Checkout</a>
        </div>
    </div>  
                
                
   
</template>


<script>

export default{
    name: "Store",
    data(){
        return{
            bakeryInfo:{
                bakeryName: 'Swee Heng Bakery',
                address: 'Address: 201E Tampines St 23, #01-88 Tampines N 2 Shopping Street, Singapore 527201',
                openingHours: '6am to 9.30pm',
                distance: '0.5km',
                googleMapsLink: '', // Link back to location page
                bakeryImage: "/src/assets/bakery.jpg",
            }, 
            breads:[
                {
                    id: "sausage_bun",
                    name: "Sausage Bun",
                    image: "/src/assets/sausage bun.png",
                    originalPrice: "$2.30",
                    salePrice: "$1.00",
                    quantity: 0,
                },
                {
                    id: "kaya_bread",
                    name: "Kaya Bread",
                    image: "/src/assets/kaya bread.png",
                    originalPrice: "$2.50",
                    salePrice: "$1.20",
                    quantity: 0,
                },
                {
                    id: "egg_mayo_bun",
                    name: "Egg Mayo Bun",
                    image: "/src/assets/egg mayo bun.png",
                    originalPrice: "$2.00",
                    salePrice: "$0.90", 
                    quantity: 0,
                }, 
                {
                    id: "pork_floss_bun",
                    name: "Pork Floss Bun",
                    image: "/src/assets/pork floss bun.jpg",
                    originalPrice: "$2.20",
                    salePrice:"1.30",
                    quantity: 0, 
                }
            ]
        }
    }, 
    methods:{
        addQuantity(breadId) {
            const bread = this.breads.find((b) => b.id === breadId);
            if (bread) {
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


</style>

  