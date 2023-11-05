<template>
    <div class="container-fluid body">
        <section class="nes-container container-fluid" width="auto">
            <section class="message-list">
                <section class="message -left ">
                    <img src="/src/assets/mushroom.jpg" style="width: 150px; height: 150px; border: solid black 5px;">
                    <!-- Balloon -->
                    <div class="nes-balloon from-left">
                    <p>Our application: Frugal Feasts</p>
                    </div>
                </section>
                
                <br>
            
                <section class="message -right" style="margin: auto;">
                    <!-- Balloon -->
                    <div class="nes-balloon from-right" style="max-width: 86%;">
                        <p>Our application collaborates with bakeries and food retailers to list their items nearing
                            expiring dates for sale. We act as a middleman to connect these individuals to these stores for them to
                            discover available deals. With this, we aim to allow food retailers to reduce their food waste as well as 
                            for individuals to seek more affordable and sustainable food choices.
                        </p>
                    </div>
                    <img src="/src/assets/humans.jpeg" style="width: 150px; height: 150px; border: solid black 5px;">
                </section>
            </section>
        </section>

        
        <section class="nes-container container-fluid" width="auto">
            <section class="message-list">
                <section class="message -left">
                    <img src="/src/assets/mushroom.jpg" style="width: 150px; height: 150px; border: solid black 5px;">
                        <!-- Balloon -->
                        <div class="nes-balloon from-left">
                        <p>More about food waste</p>
                        </div>
                </section>
                
                <br>
            
                <section class="message -right ">
                    <!-- Balloon -->
                    <div class="nes-balloon from-right" style="max-width: 86%;">
                    <p>Food “waste” refers to food that is fit for consumption but consciously discarded at the 
                        retail or consumption phases. Food waste is one of the biggest waste streams in Singapore and 
                        the amount of food waste generated has grown by around 20% over the last 10 years. Food waste 
                        makes up about half of the average 1.5kg of waste disposed of by each household in Singapore 
                        daily. Of which, more than half of household food waste can be prevented. When food is wasted, 
                        more food has to be sourced to meet the food demand and this affects our food security since 
                        Singapore imports over 90% of our food supply. Hence, it is important for us to play our part 
                        to reduce food waste.
                    </p>
                    </div>
                    <img src="/src/assets/humans.jpeg" style="width: 150px; height: 150px; border: solid black 5px;">
                </section>
            </section>
        </section>
    </div>
 
</template>


<script>

export default{
    name: "About-Us",
};

</script>

<style scoped>

.body {
    background-image: url("../assets/home_background.jpg");

    max-width: 100%;
    margin: 0;
    padding: 0;
}

</style>