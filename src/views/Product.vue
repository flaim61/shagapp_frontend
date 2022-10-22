<template>
    <section>
        <div class="container">
            <div class="row">
                <LeftBar />
                <ProductDetails />
            </div>
        </div>
    </section>
</template>
  
<script>
    import LeftBar from "../components/includes/LeftBar.vue";
    import ProductDetails from "../components/products/ProductDetails.vue";

    export default {
        name: 'Product',
        components: {
            LeftBar,
            ProductDetails
        },
    }
</script>

<style>
</style>
  
  
  