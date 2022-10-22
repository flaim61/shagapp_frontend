<template>
    <div class="col-sm-3">
        <div class="left-sidebar">
            <h2>Category</h2>
            <div class="panel-group category-products" id="accordian"><!--category-productsr-->
                
                <div v-for="(category, index) in this.category" :key="index" class="panel panel-default" >
                    <div class="panel-heading">
                        <h4 class="panel-title"><a @click="this.$router.push(category.src)">{{ category.name }}</a></h4>
                    </div>
                </div>
                
            </div><!--/category-products-->
        
            <div class="shipping text-center"><!--shipping-->
                <img src="/src/assets/images/home/shipping.jpg" alt="" />
            </div><!--/shipping-->
        
        </div>
    </div>
</template>

<script>
    import { getCategories } from '../../services/methods.js';

    export default {
        name: "LeftBar",
        components: {
            
        },
		data(){
			return {
				category: [],
			}
		},
		async created(){
			this.category = await this.getCategories();
		},
        methods: {
            async getCategories(){
                let category = await getCategories();
               
                category = category.data.map(function(item, index) {
                    return {
                        name: item.name,
                        src: '/category/' + item.id,
                        id: item.id
                    };
                });
                
                return category;
            }
        }
    }
</script>

<style>
</style>