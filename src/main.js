// Imports Bootstrap CSS & JS
import "../node_modules/bootstrap/dist/css/bootstrap.css"; 
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

// Imports nes.css
import "../node_modules/nes.css/css/nes.min.css";

// Create Router & App
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

// Import FDE
import equal from 'fast-deep-equal';

const VITE_GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const app = createApp(App)

app.use(router)

app.use(VueGoogleMaps, {
    load: {
        key: VITE_GOOGLE_MAP_API_KEY,
        libraries: "places",
        callback: "initMap",
        V: "weekly",
    },
})

app.mount('#app')
