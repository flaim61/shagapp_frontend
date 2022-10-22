<template>
  <Slider />
	
	<section>
		<div class="container">
			<div class="row">
				<LeftBar />
				<HomeCatalog />
			</div>
		</div>
	</section>
</template>

<script>
  import Slider from "../components/banners/Slider.vue";
  import LeftBar from "../components/includes/LeftBar.vue";
  import HomeCatalog from "../components/products/HomeCatalog.vue";

  export default {
    name: 'Home',
    components: {
      Slider,
      LeftBar,
      HomeCatalog
    },
  }
</script>

<style>
</style>


