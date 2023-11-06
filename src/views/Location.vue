<template>
  <section class="p-5 background">
    <div class="mx-auto d-flex align-items-center justify-content-center text-center" style="flex-direction: column;">
      <div class="card w-40" style="max-width: 700px; background-color: grey; padding: 20px;">
        <div class="card-header bg-dark project-name" id="header">
          <h5 class="text-white fw-bold">Results</h5>
        </div>
      <GMapMap
        :center="center"
        :zoom="15"
        map-type-id="terrain"
        style="width: 50vw; height: 300px"
        ref="myMapRef"
        :clickable="false"
      >
        <GMapMarker 
          v-if="userMarkerLocation"
          :position="userMarkerLocation.position"
          :clickable="userMarkerLocation.clickable"
          :icon="userMarkerLocation.icon"
        />
        <GMapMarker
          :key="index"
          v-for="(bakery, index) in bakeries"
          :position="bakery.geometry.location"
          :clickable="true"
          @click="showBakeryDetails(bakery)"
          @rightclick="getDirections()"
          :id="bakery.place_id"
        />
        <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="infowindowMarkerId !== null"
          style="width: 300px; height: 100px"
          :position="infoCoordinates"
        >
          <div>
            <h4 style="font-family: Arial, Helvetica, sans-serif;">{{ selectedPlaceName }}</h4>
            <p>{{ selectedPlaceAddress }}</p>
            <p><a :href="link">View on Google Maps</a></p>
          </div>
        </GMapInfoWindow>
      </GMapMap>
    </div>
    <!-- Store Cards Container -->
    <div class="store-cards-container mt-4" style="background-color: grey; display: flex; flex-wrap: wrap; justify-content: space-between;">
        <!-- Store Card 1 -->
        <div class="store-card" style="background-color: white; border: 2px solid black; padding: 10px; margin: 10px; width: calc(33.33% - 20px);">
          <img src="../assets/bakery2.jpg" alt="Store Image 1" class="store-image" style="width: 80%; height: auto; border: 2px solid black;" />
          <h6 class="mt-3">Epi D'or</h6>
          <p>Products: Product 1, Product 2, Product 3</p>

          <p class="distance">Distance: 82m</p>
        </div>

        <!-- Store Card 2 -->
        <div class="store-card" style="background-color: white; border: 2px solid black; padding: 10px; margin: 10px; width: calc(33.33% - 20px);">
          <img src="../assets/bakery.jpg" alt="Store Image 2" class="store-image" style="width: 80%; height: auto; border: 2px solid black;" />
          <h6 class="mt-3">Tiong Bahru Bakery</h6>
          <p>Products: Product 1, Product 2, Product 3</p>

          <p class="distance">Distance: 99m</p>
        </div>


        <!-- Store Card 3 -->
        <div class="store-card" style="background-color: white; border: 2px solid black; padding: 10px; margin: 10px; width: calc(33.33% - 20px);">
          <img src="../assets/bakery3.jpg" alt="Store Image 3" class="store-image" style="width: 80%; height: auto; border: 2px solid black;" />
          <h6 class="mt-3">Duke Bakery</h6>
          <p>Products: Product 1, Product 2, Product 3</p>

          <p class="distance">Distance: 900m</p>
        </div>
      </div>
  </div>
  </section>
  
</template>

<script>
export default {
  name: 'Location',
  data() {
    return {
      center: { lat: 1.3521, lng: 103.8198 },
      locationSearch: this.$route.params.postalCode,
      bakeries: [],
      infoCoordinates: null,
      selectedPlaceName: "",
      selectedPlaceAddress: "",
      link: "",
      service: null,
      infowindowMarkerId: null,
      userMarkerLocation: null,
      directionsRenderer: null,
    };
  },
  methods: {
    async initMap() {
      const map = await this.$refs.myMapRef.$mapPromise;
      this.service = new google.maps.places.PlacesService(map);
    },
    async fetchNearbyBakeries() {
      const address = this.locationSearch;
      const geocoder = new google.maps.Geocoder();

      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(results);
            console.log(results);
          } else {
            reject('Geocode was not successful for the following reason: ' + status);
          }
        });
      });

      const userLocation = results[0].geometry.location;
      this.userMarkerLocation = {
        position: userLocation,
        clickable: true,
        icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      };
      console.log('Latitude:', userLocation.lat());
      console.log('Longitude:', userLocation.lng());
      const map = await this.$refs.myMapRef.$mapPromise;
      map.setCenter(userLocation);
      this.service = new google.maps.places.PlacesService(map);

      const nearbyResults = await new Promise((resolve) => {
        this.service.nearbySearch({
          location: userLocation,
          radius: 2000,
          type: 'bakery',
        }, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          }
        });
      });

      // Create markers for nearby bakeries
      console.log(nearbyResults);
      this.bakeries = nearbyResults;
    },
    showBakeryDetails(bakery) {
      this.infowindowMarkerId = bakery.place_id;
      const request = {
        placeId: bakery.place_id,
        fields: ['name', 'place_id', 'formatted_address', 'geometry'],
      };

      const place = new Promise((resolve) => {
        this.service.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
            this.selectedPlaceAddress = place.formatted_address;
            this.selectedPlaceName = place.name;
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            this.infoCoordinates = { lat: latitude, lng: longitude };
            console.log(this.infoCoordinates);

            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`;
            this.link = googleMapsLink;
          }
        });
      });
    },
    openMarker(id) {
      this.infowindowMarkerId = id;
    },
    getDirections() {
      const directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      directionsService.route(
        {
          origin: this.userMarkerLocation.position,
          destination: this.infoCoordinates,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === "OK") {
            this.directionsRenderer.setDirections(response);
          }
          else {
            window.alert("Directions request failed due to " + status);
          }
        });
    },
  },
  created() {
    // Call the initMap function to initialize the map and services
    this.initMap();
    // Fetch nearby bakeries based on the postal code received as a prop
    this.fetchNearbyBakeries();
  },
};
</script>


<style scoped>
.background{
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;  
    height: 100%;
}
.body{
    display: flex;
    justify-content: right;
    align-items: center;
    height: calc(100vh - 100px);			
}
</style>