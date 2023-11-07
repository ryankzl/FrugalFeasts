<template>
   <div class="container-fluid">
        <div class="card-group">
    
            <div class="card">
              <img src="../assets/game_voucher.png" class="card-img-top" >
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button><router-link to="/Store"> View More </router-link></button>
              </div>
            </div>
    
            <div class="card">
              <img src="../assets/game_voucher.png" class="card-img-top" >
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                <button><router-link to="/Store"> View More </router-link></button>
              </div>
            </div>
    
            <div class="card">
              <img src="../assets/game_voucher.png" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                <button><router-link to="/Store"> View More </router-link></button>
                
              </div>
            </div>
    
        </div>
    </div>
</template>


<script>
import {RouterLink} from 'vue-router';

export default{
    name: "StoreCards",
};

</script>

<style scoped>

.card-img-top{
  height: auto;
  width: auto;
}

</style>

  