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
							<div v-for="(item, index) in this.bannerImages" :key="index" class="item">
								<img :src="item" style="width: 100%">
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
	import { getBanners } from "../../services/methods.js";
	import { baseUrlStorage } from '../../services/config.js';

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
				let images = [];

				for (let i = 0; i < banners.data[0].images.length; i++) {
					images.push(baseUrlStorage + banners.data[0].images[i])
				}
				return images;
			}
		}
	}
</script>

<style>
</style>