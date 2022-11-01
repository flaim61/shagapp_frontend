<template>
    <CategoryBanner />

    <section>
        <div class="container">
            <div class="row">
                <div v-for="(card, index) in this.card" :key="index" class="col-lg-6 col-md-12 col-sm-12 product-card-in-cart">
                  <div class="row">
                    <div class="col-lg-4">
                      <img class="product-image" :src="card.image" alt="">
                    </div>
                    <div class="col-lg-4">
                      <div class="product-name">
                        {{ card.name }}
                      </div>
                      <div class="product-description">
                        {{ card.description }}
                      </div>
                      <div class="">
                        {{ card.price }} Руб.
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <a href="#" @click='deleteProductInCart(card.id)'>Удалить</a>
                    </div>
                  </div>
                </div>
            </div>
            <div class='empty-text' v-if='this.cardIsNullable'>
              Ваша корзина пуста!
            </div>
        </div>
    </section>
</template>

  <script>
    import { getProductsInCart } from '../services/methods.js';
    import { baseUrlStorage } from '../services/config.js';

    export default {
      name: 'Cart',
      components: {
      },
      data() {
          return {
              card: [],
              cardIsNullable: false
          }
      },
      async created(){
        this.card = await this.getCartProductArray();

        if (this.card.length === 0) {
          this.cardIsNullable = true;
        }
      },
      methods: {
        async getCartProductArray(){
          const card = JSON.parse(localStorage.card);
          const productInCard = await getProductsInCart(card);

          const productInCart = productInCard.data.products.map(function(item, index) {
              return {
                  name: item.name,
                  image: baseUrlStorage + item.image,
                  id: item.id,
                  price: item.price
              };
          });

          return productInCart
        },
        deleteProductInCart(id){
          const card = JSON.parse(localStorage.card);
          const index = card.indexOf(id);
          if (index > -1) { // only splice array when item is found
            card.splice(index, 1); // 2nd parameter means remove one item only
          }

          localStorage.setItem('card', JSON.stringify(card));
          location.reload();
        }
      }
    }
  </script>

  <style>
    .empty-text{
      text-align: center;
      font-size: 32px;
      text-transform: uppercase;
      padding: 30px 0px;
    }
    .product-image{
      width: 100%;
      object-fit: cover;
      height: 200px;
    }
    .product-card-in-cart{
      border: 1px solid grey;
      margin-bottom: 15px;
      padding: 15px;
    }
  </style>
