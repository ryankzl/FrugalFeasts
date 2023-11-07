<template>

    <div class="background">
        <div class="container-fluid body ">
            <div class="store">

                <div class="left">
                    
                    <img src="../assets/food_croissant.png" id="bakeryImage">
                   
                    <h1>Name</h1>   

                    <p>Address</p>

                    <p>Closes At:</p>

                    <button class="nes-btn" id="directions">📍Directions</button>
                </div>

                <div class="right">
                    this is right side
                </div>

                <!-- <div class="row">
                    <img src="../assets/bakery2.jpg">


                    <div class="details">
                    <h1>
                        Bakery Name
                    </h1>  

                    <p>
                        Address Goes Here
                    </p>

                    <p>
                        Opening Hours
                    </p>
                    </div>               

                </div> -->

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
.background{
    background-image: url("../assets/background.png");
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
    border: solid 2px black;


    /* Fills box and flushes content down */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

}

#bakeryImage{
    width: 50%;
    height: auto;
    border-radius: 20px;
    border: solid 2px black;
}

.right  {
    grid-column: 2;
    border:  solid  2px blue;
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

  