<script>
export default{
    name: 'Header',
};

import {RouterLink} from 'vue-router';
</script>

<template>
    <div class="container-fluid margin-adjust">
        <nav class="navbar navbar-dark bg-dark fixed-top">
            <div class="container-fluid ">
                <!-- Menu Start -->
                <!-- Button-->
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon nes-pointer"></span>
                </button>

                <!-- Slide Out Menu -->
                <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">

                    <!-- Menu Header -->
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                        <!-- Items In Menu -->
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <router-link to="/Game" class="nav-link"> Games! </router-link>
                                </li>

                                <li class="nav-item">
                                    <router-link to="/About-Us" class="nav-link"> About-Us </router-link>
                                </li>

                                <li class="nav-item">
                                    <router-link to="/Profile" class="nav-link"> Profile </router-link>
                                </li>

                                <li class="nav-item">
                                    <router-link to="/Store" class="nav-link"> Store </router-link>
                                </li>
                            </ul>
                        </div>
                                
                </div>
                <!-- Menu End -->

                <!-- Branding/Logo Start -->
                <router-link to="/" class="branding">
                    <img src="../assets/header_bread.png">
                    <h1>Frugal Feasts</h1>
                    <img src="../assets/header_bread.png">
                </router-link>
                <!-- Branding/Logo End -->

                <!-- Profile Button -->
                <router-link to="/Login" class="nes-btn">Log In!</router-link>            
                <!-- Profile End -->
            </div>
        </nav> 
    </div>
</template>

<style>
    /* Popup Menu Width */
    .offcanvas-start {
        max-width: 250px; 
    }

    /* Header Height */
    .navbar {
        height: 100px;
    }

    /* Branding Styling */
    .branding,
    .branding:hover {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: white;
    }
    img{
        height: 70px;
    }
    a{
        text-decoration: none;
    }

    /* Menu Button Margin (For centering of branding/logo) */
    .navbar-toggler{
        margin-right: 80px;
    }

    /* Views Appear Below Header */
    .margin-adjust{
        margin-bottom: 100px;
    }
        
</style>