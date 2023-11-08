<template>

        <div class="container-fluid body">
            <div class="container buttons">
                <div class="row">
                        
                        <!-- button 1 -->
                        <div class="col-lg-3 col-md-5 my-3">
                            <button type="button" class="nes-btn bg-white bigBtn" onclick="document.getElementById('dialog-dark-rounded1').showModal();">
                            <img src="/src/assets/header_logo.png" style="width: 150px; height: 150px;">
                            </button>
                            <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded1">
                                <form method="dialog">
                                    <p class="title">Our website: Frugal Feasts</p>
                                <p>Our website collaborates with bakeries and food retailers to list their items nearing
                                expiring dates for sale. We act as a middleman to connect these individuals to these stores for them to
                                discover available deals. With this, we aim to allow food retailers to reduce their food waste as well as 
                                for individuals to seek more affordable and sustainable food choices.</p>
                                <menu class="dialog-menu" style="text-align: center;">
                                    <button class="nes-btn">Return to About-Us Page</button>
                                </menu>
                                </form>
                            </dialog>
                        </div>
                        
                        <!-- button 2 -->
                        <div class="col-lg-3 col-md-5 my-3">
                            <button type="button" class="nes-btn bg-white bigBtn" onclick="document.getElementById('dialog-dark-rounded3').showModal();">
                                <img src="/src/assets/questionMark.png" style="width: 150px; height: 150px;">
                            </button>
                            <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded3">
                                <form method="dialog">
                                    <div class="content" style="text-align: left;">
                                    <p class="title">How to use</p>
                                    <p>Our website consists of:
                                    <ul>
                                        <li>
                                            <a href="/">Homepage</a>
                                        </li> 
                                        <li>
                                            <a href="/">Location page</a> which is accessed from Homepage after you have input your destination
                                        </li>
                                        <li>
                                            <a href="/Store">Store page</a> to show you all the products the store offers
                                        </li>
                                        <li>
                                            <a href="/Profile">Profile page</a> to store your purchases and vouchers
                                        </li> 
                                        <li>
                                <!-- when user click, it will link to game page if they r signed in. if not, they will go
                                to login/sign up page -->
                                            <a href="/Game">Game page</a> 
                                        </li>
                                    </ul>
                                    </p>
                                    </div>
                                    <p>First, <a href="/Auth">sign up/login</a> to your account. Next, purchase some items from our website and earn some 
                                        keys. With the keys, you can play our game to get vouchers. Lastly, collect your purchase from 
                                        the store and enjoy!
                                    </p>
                                    <menu class="dialog-menu" style="text-align: center;">
                                        <button class="nes-btn">Return to About-Us Page</button>
                                    </menu>
                                    
                                </form>
                            </dialog>
                        </div>
                        
                        <!-- button 3 -->
                        <div class="col-lg-3 col-md-5 my-3">
                            <button type="button" class="nes-btn bg-white bigBtn" onclick="document.getElementById('dialog-dark-rounded4').showModal();">
                                <img src="/src/assets/videogame.png" style="width: 150px; height: 150px;">
                            </button>
                            <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded4">
                                <form method="dialog">
                                    <p class="title">Our Game</p>
                                    <p>Our game is a gacha game that provides you the opportunity to get exclusive deals JUST FOR YOU.
                                        In order to play the game, all you have to do is <a href="/Auth">sign up/login</a> to your profile. From there, you will be able 
                                        to earn keys when you make a purchase through our website. With enough keys, you can unlock the treasure chest
                                        where you would be able to earn attractive vouchers for your next purchases.
                                    </p>
                                    <menu class="dialog-menu" style="text-align: center;">
                                        <button class="nes-btn">Return to About-Us Page</button>
                                        <a href="/Game" class="nes-btn is-success">
                                            <!-- when user click, it will link to game page if they r signed in. if not, they will go
                                                to login/sign up page -->
                                            Game Page
                                        </a>
                                    </menu>
                                </form>
                            </dialog>
                        </div>
            
                        <!-- button 4 -->
                        <div class="col-lg-3 col-md-5 my-3">
                            <button type="button" class="nes-btn bg-white bigBtn" onclick="document.getElementById('dialog-dark-rounded2').showModal();">
                                <img src="/src/assets/foodwaste.png" style="width: 150px; height: 150px;">
                            </button>
                            <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded2">
                                <form method="dialog">
                                <p class="title">More about food waste</p>
                                <p>Food “waste” refers to food that is fit for consumption but consciously discarded at the 
                                    retail or consumption phases. Food waste is one of the biggest waste streams in Singapore and 
                                    the amount of food waste generated has grown by around 20% over the last 10 years. Food waste 
                                    makes up about half of the average 1.5kg of waste disposed of by each household in Singapore 
                                    daily. Of which, more than half of household food waste can be prevented. When food is wasted, 
                                    more food has to be sourced to meet the food demand and this affects our food security since 
                                    Singapore imports over 90% of our food supply. Hence, it is important for us to play our part 
                                    to reduce food waste.</p>
                                <a href="https://www.towardszerowaste.gov.sg/foodwaste/" style="color: blueviolet;">Link to more information</a>
                                <menu class="dialog-menu" style="text-align: center;">
                                    <button class="nes-btn">Return to About-Us Page</button>
                                </menu>
                                </form>
                            </dialog>
                        </div>

                </div>
                    
            </div>
        </div>

    
 
</template>


<script>

export default{
    name: "About-Us",
};

</script>

<style scoped>

.body {
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed; 
    position: absolute;
    top: 100px;
    min-height: 100vh;
}

.title {
    color: coral;
    text-align: center;
}

.buttons {
    margin-top: 20%;
    margin-bottom: 20%;

    background-color: rgba(245, 245, 220, 0.9);
    padding: 2%;
    width: 85%;
	height: auto;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

}

.row {
    justify-content: center; 
    align-items: center;
}


</style>