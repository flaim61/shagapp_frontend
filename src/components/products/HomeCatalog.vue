<template>
    <div class="col-sm-9 padding-right">
        <div class="features_items"><!--features_items-->
            <h2 class="title text-center">Features Items</h2>

            <div  v-for="(product, index) in this.products" :key="index" class="col-sm-4">
                <div class="product-image-wrapper">
                    <div class="single-products">
                        <div class="productinfo text-center">
                            <img :src="product.image" alt="" />
                            <h2>{{product.price}} Р</h2>
                            <p> {{product.name}} </p>
                            <a @click="this.$router.push(product.src)" class="btn btn-default add-to-cart">Узнать подробнее</a>
                        </div>
                    </div>
                    <div class="choose">
                        <ul class="nav nav-pills nav-justified">
                            <li><a href="#"><i class="fa fa-plus-square"></i>Добавить в Wishlist</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div><!--features_items-->


        <RecomendedProducts />

    </div>
</template>

<script>
    import RecomendedProducts from "./RecomendedProducts.vue";
    import { getProducts } from '../../services/methods.js';
    import { baseUrlStorage } from "../../services/config.js"

    export default {
        name: "HomeCatalog",
        components: {
            RecomendedProducts
        },
		data(){
			return {
				products: [],
			}
		},
		async created(){
			this.products = await this.getProducts();
		},
        methods: {
            async getProducts(){
                let products = await getProducts(this.$route.params.id);

                products = products.data.map(function(item, index) {
                    return {
                        name: item.name,
                        image: baseUrlStorage + item.image,
                        price: item.price,
                        src: '/product/' + item.id
                    };
                });

                return products;
            }
        }
    }
</script>

<style>
</style>
