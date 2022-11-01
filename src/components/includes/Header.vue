<template>
    <header id="header"><!--header-->
		<div class="header_top"><!--header_top-->
			<div class="container">
				<div class="row">
					<div class="col-sm-6">
						<div class="contactinfo">
							<ul class="nav nav-pills">
								<li><a href="#"><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
								<li><a href="#"><i class="fa fa-envelope"></i> info@domain.com</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="social-icons pull-right">
							<ul class="nav navbar-nav">
								<li><a href="#"><i class="fa fa-facebook"></i></a></li>
								<li><a href="#"><i class="fa fa-twitter"></i></a></li>
								<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
								<li><a href="#"><i class="fa fa-dribbble"></i></a></li>
								<li><a href="#"><i class="fa fa-google-plus"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div><!--/header_top-->

		<div class="header-middle"><!--header-middle-->
			<div class="container">
				<div class="row">
					<div class="col-sm-4">
						<div class="logo pull-left">
							<a href="index.html"><img src="../assets/images/home/logo.png" alt="" /></a>
						</div>
					</div>
					<div class="col-sm-8">
						<div class="shop-menu pull-right">
							<ul class="nav navbar-nav">

								<li v-if="this.isLogin"><a @click="this.$router.push('/user')"><i class="fa fa-user"></i> Аккаунт</a></li>
								<li><a href="#"><i class="fa fa-star"></i> Wishlist</a></li>
								<li><a href="checkout.html"><i class="fa fa-crosshairs"></i> Checkout</a></li>
								<li ><a @click="this.$router.push('/cart')"><i class="fa fa-shopping-cart"></i> Корзина </a></li>
								<li v-if="!this.isLogin"><a href="login.html"><i class="fa fa-lock"></i> Login</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div><!--/header-middle-->

		<div class="header-bottom"><!--header-bottom-->
			<div class="container">
				<div class="row">
					<div class="col-sm-9">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
						</div>
						<div class="mainmenu pull-left">
							<ul class="nav navbar-nav collapse navbar-collapse">
								<li><a href="#" @click="this.$router.push('/')" class="active">Главная</a></li>

								<Dropdown />

								<li class="dropdown"><a href="#">Blog<i class="fa fa-angle-down"></i></a>
                                    <ul role="menu" class="sub-menu">
                                        <li><a href="blog.html">Blog List</a></li>
										<li><a href="blog-single.html">Blog Single</a></li>
                                    </ul>
                                </li>
								<li><a href="contact-us.html">Contact</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="search_box pull-right">
							<input type="text" placeholder="Search"/>
						</div>
					</div>
				</div>
			</div>
		</div><!--/header-bottom-->
	</header><!--/header-->
</template>

<script>
	import Dropdown from "../Links/Dropdown.vue";
	import {
        register,
        isAuthorisated,
        login,
        resertPassword,
        getUserInfo
    } from '../../services/methods.js';
    import { token_key } from '../../services/config.js'

	export default {
		name: 'Header',
		components: {
			Dropdown
		},
		data() {
            return {
                isLogin: false,
                user: {
                    email: null,
                    name: null
                }
            }
        },
		async created() {
            this.isLogin = await this.checkLogin();
            this.user = await this.getUserInfo();
        },
		methods: {
            async checkLogin(){
                const request = await isAuthorisated();
                return request.data.status;
            },
            async register(){
                try {
                    let name = document.getElementById('name').value;
                    let email = document.getElementById('email').value;
                    let pass = document.getElementById('pass').value;
                    let pass_confirm = document.getElementById('pass_confirm').value;

                    if (name === "" ||
                        email === "" ||
                        pass === "" ||
                        pass_confirm === ""
                    ){
                        this.showError('Ошибка регистрации!');
                        return;
                    }

                    if (pass === pass_confirm) {
                        const user = {
                            "name": name,
                            "email": email,
                            "password": pass
                        }

                        const response = await register(user);

                        if(response.data.status === 'success'){
                            const token = response.data.token;
                            localStorage.setItem(token_key, token);
                            this.isLogin = true;
                        }else{
                            this.showError('Ошибка регистрации!');
                        }
                    }
                } catch (error) {
                    this.showError('Ошибка! Сервер временно не доступен!');
                }
            },
            logout(){
                localStorage.removeItem(token_key);
                this.isLogin = false;
            },
            async login(){
                try {
                    let email = document.getElementById('email_login').value;
                    let pass = document.getElementById('password_login').value;

                    const user = {
                        "email": email,
                        "password": pass
                    }

                    const response = await login(user);

                    if(response.data.status === 'success'){
                        const token = response.data.token;
                        localStorage.setItem(token_key, token);
                        this.isLogin = true;
                    }else{
                        this.showError('Ошибка авторизации!');
                    }
                } catch (error) {
                    this.showError('Ошибка! Сервер временно не доступен!');
                }
            },
            async passwordResert(){
                try {
                    let oldPassword = document.getElementById('old_password_reset').value;
                    let newPassword = document.getElementById('new_password_reset').value;
                    let newPasswordConfirm = document.getElementById('new_password_confirm_reset').value;

                    if (newPassword === newPasswordConfirm) {
                        const response = await resertPassword(
                            oldPassword,
                            newPassword
                        );

                        console.log(response);
                    }else{
                        this.showError('Ошибка смены пароля!');
                    }
                } catch (error) {
                    this.showError('Ошибка! Сервер временно не доступен!');
                }
            },
            async getUserInfo() {
                try {
                    const response = await getUserInfo();
                    let user = response.data.user;
                    let created_at = new Date(user.created_at);
                    const year = created_at.getFullYear();
                    const mounth = (created_at.getMonth()+1)<10 ? "0" + (created_at.getMonth()+1) : (created_at.getMonth()+1);
                    const date = created_at.getDate();
                    let created_at_formated = year + "/" + mounth + "/" + date;
                    user.created_at = created_at_formated;

                    return response.data.user;
                } catch (error) {
                    this.showError('Ошибка получения данных пользователя!');
                }
            },
            showError(text){
                this.$swal({
                    title: 'Ошибка!',
                    text: text,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            },
        }
	}
</script>

<style>

</style>
