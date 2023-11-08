<template>
   <div class="container-fluid mt-2">
        <div class="card-group">
          
            <div class="card" v-for="(place, index) in placesData" :key="index">
              <img :src="`/src/assets/${place.id}.png`" class="card-img-top">
              <div class="card-body">
                <h4 class="card-title">{{ place.name }}</h4>
                <!-- <p class="card-text">{{ place.address }}</p> -->
                <p>Closes:{{ place.closing_time }}</p>
                <button><router-link :to="`/Store/${place.id}`"> View More </router-link></button>
                <!-- <Store :placesData="placesData"/> -->
              </div>
            </div>  
    
        </div>
    </div>
</template>


<script>
import {RouterLink} from 'vue-router';

export default{
    name: "StoreCards",
    props: {
      placesData: {
        type: Array,
        default: () => []
      }
    },
};

// console.log(place.id);

</script>

<style scoped>

.card-img-top{
  height: auto;
  width: auto;
}

</style>

  