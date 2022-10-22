<template>
    <div class="col-sm-9 padding-right">
        <div class="product-details"><!--product-details-->
            <div class="col-sm-5">
                <div class="view-product">
                    <img :src="this.product.image" alt="" style='object-fit:contain'/>
                 
                </div>
                <div id="similar-product" class="carousel slide" data-ride="carousel">


                      <!-- Controls -->
                      <a class="left item-control" href="#similar-product" data-slide="prev">
                        <i class="fa fa-angle-left"></i>
                      </a>
                      <a class="right item-control" href="#similar-product" data-slide="next">
                        <i class="fa fa-angle-right"></i>
                      </a>
                </div>

            </div>
            <div class="col-sm-7">
                <div class="product-information"><!--/product-information-->
                    <!--<img :src="" class="newarrival" alt="" />-->
                    <h2>{{this.product.name}}</h2>
                    <p>Арт.: {{this.product.id}}</p>
                    <img src="images/product-details/rating.png" alt="" />
                    <span>
                        <span>{{this.product.price}} Руб.</span>
                        <button type="button" class="btn btn-fefault cart">
                            <i class="fa fa-shopping-cart"></i>
                            Add to cart
                        </button>
                    </span>
                    <p>{{this.product.description}}</p>
                    <a href=""><img src="images/product-details/share.png" class="share img-responsive"  alt="" /></a>
                </div><!--/product-information-->
            </div>
        </div><!--/product-details-->
    </div>
</template>

<script>
  import { getInfoProduct } from '../../services/methods.js';
  import { baseUrlStorage } from '../../services/config.js';

  export default {
    name: "ProductDetails",
    components: {
    },
    data(){
      return{
        product: []
      }
    }, 
    async created(){
      this.product = await this.getProductInfo();
    },
    methods: {
      async getProductInfo(){
        let infoProduct = await getInfoProduct(this.$route.params.id);

        infoProduct = {
          name: infoProduct.data.name,
          price: infoProduct.data.price,
          image: baseUrlStorage + infoProduct.data.image,
          id: infoProduct.data.id
        }

        console.log(infoProduct);
        return infoProduct;
      }
    }
  }
</script>

<style>
</style>