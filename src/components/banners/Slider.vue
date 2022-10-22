<template>
    <section id="slider"><!--slider-->
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<div id="slider-carousel" class="carousel slide" data-ride="carousel">
						<ol class="carousel-indicators">
							<li  v-for="(banner, index) in this.bannerImages" :key="index" 
								data-target="#slider-carousel" 
								:data-slide-to="index+1"></li>
						</ol>
						
						<div class="carousel-inner" id="main-slider">
							<div v-for="(banner, index) in this.bannerImages" :key="index" class="item">
								<div class="col-sm-12">
									<h1><span>E</span>-SHOPPER</h1>
									<h2>{{ banner.name }}</h2>
									<p>{{ banner.description }}</p>
									<p>{{ banner.style.background}}</p>
									<button type="button" class="btn btn-default get">Get it now</button>
								</div>
								<!--<div class="col-sm-6">
									<img src="/src/assets/images/home/girl1.jpg" class="girl img-responsive" alt="" />
									<img src="/src/assets/images/home/pricing.png"  class="pricing" alt="" />
								</div>-->
							</div>
							
							
						</div>
						
						<a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
							<i class="fa fa-angle-left"></i>
						</a>
						<a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
							<i class="fa fa-angle-right"></i>
						</a>
					</div>
					
				</div>
			</div>
		</div>
	</section><!--/slider-->
</template>

<script>
	import {
		getBanners
	} from "../../services/methods.js";

	export default {
		name: 'Slider',
		components: {
		},
		data(){
			return {
				bannerImages: [],
			}
		},
		async created(){
			this.bannerImages = await this.getBannerImages();
		},
		methods:{
			async getBannerImages(){
				let banners = await getBanners();
				
				banners = banners.data.map(function(item, index) {
                    return {
                        name: item.name,
						description: item.description,
						style: {
							background: item.image_src
						},
                        id: item.id
                    };
                });

				return banners;
			}
		}
	}
</script>

<style>
</style>