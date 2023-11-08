<template>
    <section class="p-5 background">
      <div class="mx-auto d-flex align-items-center justify-content-center text-center" style="flex-direction: column;">
        <h2 class="mb-5 mt-0 col-sm-6 text-dark searchbar">Find Your Closest Bakery</h2>
        <div class="col-12 col-sm-6 -center">
          <div class="card w-100 mt-5">
            <div class="card-header bg-dark project-name" id="header">
              <h5 class="text-white fw-bold">SEARCH NEAREST BAKERY</h5>
            </div>
            <div class="card-body search-bg p-4">
              <form @submit.prevent="navigateToLocation()">
                <div class="form-group">
                  <label for="location_search">ADDRESS SEARCH: </label>
                  <input type="text" class="form-control mt-3" id="location_search" v-model="locationSearch" aria-describedby="Address_Search" placeholder="Enter Address/Postal Code">
                </div>
                <div class="d-flex flex-row-reverse">
                    <!-- <router-link :to="{ name: 'location', params: { postalCode: locationSearch } }"> -->
                        <button type="submit" class="btn btn-primary btn-sm mt-4">Search</button>
                    <!-- </router-link> -->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data() {
      return {
        locationSearch: "",
      };
    },
    methods: {
      navigateToLocation() {
        // Navigate to the location route with the postal code as a parameter
        this.$router.push({ name: 'Location', params: { postalCode: this.locationSearch } });
      },
    },
  };
  </script>

<style scoped>
.background{
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;  
    background-attachment: fixed;
	  position: absolute;
    min-height: 100vh; 
	  width: 100%;
    /* height: calc(100vh - 100px); */
}
.body{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);			
}
.searchbar{
    background-color: rgba(245, 245, 220, 0.9);
    padding: 2%;
    width: 50%;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
#search_field{
    text-align: center;
	margin-bottom: 25px;
}
h2{
	margin-bottom: 25px;
    color: white;
}
</style>