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
                        <button @click='addCard()' v-if="this.isLogin && !this.productInCard" type="button" class="btn btn-fefault cart">
                            <i class="fa fa-shopping-cart"></i>
                            Добавить в корзину
                        </button>
                        <button @click='deleteInCard()' v-if="this.isLogin && this.productInCard" type="button" class="btn btn-fefault cart">
                            <i class="fa fa-shopping-cart"></i>
                            Удалить из корзины
                        </button>
                        <button v-if='!this.isLogin' @click="this.$router.push('/user')"  type="button" class="btn btn-fefault cart">
                            <i class="fa fa-shopping-cart"></i>
                             Войдите, чтобы купить
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
  import {
      register,
      isAuthorisated,
      login,
      resertPassword,
      getUserInfo
  } from '../../services/methods.js';

  export default {
    name: "ProductDetails",
    components: {
    },
    data(){
      return{
        product: [],
        productInCard: false,
        isLogin: false,
      }
    },
    async created(){
      this.isLogin = await this.checkLogin();
      this.product = await this.getProductInfo();
      this.productInCard = this.checkProductInCard();

      console.log(this.productInCard)
    },
    methods: {
      deleteInCard(){
        const card = JSON.parse(localStorage.card);
        const index = card.indexOf(this.product.id);
        if (index > -1) { // only splice array when item is found
          card.splice(index, 1); // 2nd parameter means remove one item only
        }

        this.productInCard = false;
        localStorage.setItem('card', JSON.stringify(card));
      },
      checkProductInCard(){
        if (localStorage.card == null) {
          return false;
        }

        const card = JSON.parse(localStorage.card);
        const product = card.find(element => element === this.product.id);

        if (product == null) {
          return false
        }

        return true;
      },
      addCard(){
        if (localStorage.card == null) {
          let card = [];
          card.push(this.product.id);
          localStorage.setItem('card', JSON.stringify(card));
        }else{
          const card = JSON.parse(localStorage.card);
          card.push(this.product.id)
          localStorage.setItem('card', JSON.stringify(card));
        }

        this.productInCard = true;
      },
      async checkLogin(){
          try {
            const request = await isAuthorisated();
            return request.data.status;
          } catch (e) {
            console.log('user is not authrisated!')
          }
      },
      async getProductInfo(){
        try {
          let infoProduct = await getInfoProduct(this.$route.params.id);

          infoProduct = {
            name: infoProduct.data.name,
            price: infoProduct.data.price,
            image: baseUrlStorage + infoProduct.data.image,
            id: infoProduct.data.id
          }

          return infoProduct;
        } catch (e) {
          console.log('get product info error')
        }
      }
    }
  }
</script>

<style>
</style>
