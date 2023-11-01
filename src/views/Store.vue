<template>

    <div class="container-fluid">
        <div class="row row-cols-1 row-cols-md-2">
            <!-- store name and details  -->
            <div class="col">
                <div class="nes-container is-rounded is-centered">
                    <i class="nes-octocat animate"></i>
                    <h1 class="mt-2">Swee Heng Bakery</h1>
                    <p>Address: 201E Tampines St 23, #01-88 Tampines N 2 Shopping Street, Singapore 527201</p>
                    <p>Opening hours: 6am to 9.30pm</p>
                    <p>
                        <a class="nes-btn is-primary" href="#">📍0.5km away</a>
                    </p>
                    <img src="../assets/bakery.jpg" width="50%"> </div>
            </div>
            <div class="col">
                <div class= "container-fluid text-center my-3">
                    <!-- coin -->
                    <i class="nes-icon coin is-small"></i>
                    <p class="d-inline">Discount available !!!</p>
                    <i class="nes-icon coin is-small"></i>
                </div>
                
                <div class= "nes-container is-rounded p-3 rounded-4 ">
                        <div class="container text-center">
                            <h3>Bread</h3>
                        </div>

                        <div class="row">
                            <div class="col col-sm-6 col-lg-4 col-mb-2">                           
                                <div class="card h-100" >
                                    <img src="../assets/sausage bun.png" class="card-img-top" alt="sausage bun">
                                    <div class="card-body">
                                        <p class="card-title" style="font-size:14px;padding-bottom:10px;">Sausage Bun
                                            <span class="text-success">(Available)</span>
                                        </p>
                                        <div class="card-text" style="font-size:10px">
                                            <p>
                                                <span class="text-decoration-line-through d-inline">$2.30</span>
                                                <span class="text-danger d-inline">$1.00</span>
                                            </p>
                                            <p>
                                                <span>Consume by:</span>
                                                <span class="text-danger">Today</span>
                                            </p>
                                            <p>Quantity: 0</p>
                                            <button type="button" class="nes-btn is-primary">-</button>
                                            <button type="button" class="nes-btn is-primary">+</button>
                                        </div>
                                    </div>
                                </div>
                            
            
                            </div>

                            <div class="col col-sm-6 col-lg-4 col-mb-2">                           
                                <div class="card h-100">
                                    <img src="../assets/kaya bread.png" class="card-img-top" alt="kaya bread">
                                    <div class="card-body">
                                        <p class="card-title" style="font-size:14px;padding-bottom:10px;">Kaya Bread
                                            <span class="text-success">(Available)</span>
                                        </p>
                                        <div class="card-text" style="font-size:10px">
                                            <p>
                                                <span class="text-decoration-line-through d-inline">$2.50</span>
                                                <span class="text-danger d-inline">$1.20</span>
                                            </p>
                                            <p>
                                                <span>Consume by:</span>
                                                <span class="text-danger">Today</span>
                                            </p>
                                            <p>Quantity: 0</p>
                                            <button type="button" class="nes-btn is-primary">-</button>
                                            <button type="button" class="nes-btn is-primary">+</button>
                                        </div>
                                    </div>
                                </div>
            
                            </div>

                            <div class="col col-sm-6 col-lg-4 col-mb-2">                            
                                <div class="card h-100">
                                    <img src="../assets/egg mayo bun.png" class="card-img-top" alt="egg mayo bun">
                                    <div class="card-body">
                                        <p class="card-title" style="font-size:14px;padding-bottom:10px;">Egg mayo bun
                                            <span class="text-success">(Available)</span>
                                        </p>
                                        <div class="card-text" style="font-size:10px">
                                            <p>
                                                <span class="text-decoration-line-through d-inline">$2.00</span>
                                                <span class="text-danger d-inline">$0.90</span>
                                            </p>
                                            <p>
                                                <span>Consume by:</span>
                                                <span class="text-danger">Today</span>
                                            </p>
                                            <p>Allergen: Egg</p>
                                            <p>Quantity: 0</p>
                                            <button type="button" class="nes-btn is-primary">-</button>
                                            <button type="button" class="nes-btn is-primary">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

            
                        </div>
                        
                </div>

                <div class="d-flex justify-content-end">
                    <a class="nes-btn is-primary mt-4" href="#">Checkout</a>
                </div>
                  
                
                
                
            </div>
        </div>
    </div>

 
</template>


<script>

export default{
    name: "Store",
};

</script>

<style scoped>
.about_us{
    text-align: center;
    background-color: cyan;
    margin-top: 100px;
}

</style>

  