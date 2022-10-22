<template>  
    <CategoryBanner />

    <section>
        <div class="container">
            <div class="row">
                <LeftBar />
                <Catalog />
            </div>
        </div>
    </section>
</template>
  
  <script>
    import LeftBar from "../components/includes/LeftBar.vue";
    import Catalog from "../components/products/Catalog.vue";
    import CategoryBanner from "../components/banners/CategoryBanner.vue";
  
    export default {
      name: 'Category',
      components: {
        LeftBar,
        Catalog,
        CategoryBanner
      }
    }
  </script>
  
  <style>
  </style>
  
  
  