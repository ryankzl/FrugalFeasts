// Imports Bootstrap CSS & JS
import "../node_modules/bootstrap/dist/css/bootstrap.css"; 
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

// Imports nes.css
import "../node_modules/nes.css/css/nes.min.css";

// Create Router & App
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
