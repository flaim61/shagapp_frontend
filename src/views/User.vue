<template>
    <section id="form" v-if="!this.isLogin"><!--form-->
		<div class="container">
			<div class="row">
				<div class="col-sm-4 col-sm-offset-1">
					<div class="login-form"><!--login form-->
						<h2>Войти в ваш аккаунт</h2>
						<form action="#">
							<input type="email" placeholder="Email" id="email_login" />
							<input type="password" placeholder="Пароль" id="password_login"  />
							<div type="submit" class="btn btn-default"  @click="login()">Войти</div>
						</form>
					</div><!--/login form-->
				</div>
				<div class="col-sm-1" >
					<h2 class="or">ИЛИ </h2>
				</div>
				<div class="col-sm-4">
					<div class="signup-form"><!--sign up form-->
						<h2>Вы новый пользователь?</h2>
						<form action="#">
							<input type="text" placeholder="Имя" id='name'/>
							<input type="email" placeholder="Email" id='email'/>
							<input type="password" placeholder="Пароль" id='pass'/>
                            <input type="password" placeholder="Проверка пароля" id='pass_confirm'/>
							<div type="submit" class="btn btn-default" @click="register()">Создать аккаунт</div>
						</form>
					</div><!--/sign up form-->
				</div>
			</div>
		</div>
	</section>
    <section v-if="this.isLogin">
        <div class="container d-flex justify-content-between">
            <div>
                <p>
                    Здравствуйте, {{ this.user.name }} !
                </p>
                <li>
                    Имя: {{ this.user.name }}
                </li>
                <li>
                    Email: {{ this.user.email }}
                </li>
                <li>
                    Зарегистрирован с: {{ this.user.created_at }}
                </li>
                <div class='d-flex flex-column justify-content-between'>
                    <h5>Хотите поменять пароль?</h5>
                    <input type="password" placeholder="Введите старый пароль" id='old_password_reset'><br>
                    <input type="password" placeholder="Введите новый пароль" id='new_password_reset'><br>
                    <input type="password" placeholder="Введите подтверждение пароля" id='new_password_confirm_reset'><br>
                    <div type="submit" class="btn btn-default" >Обновить пароль</div>
                </div>
            </div>
            <div>
                <div class='btn btn-default' @click="logout()">
                    Выйти
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
    import { 
        register, 
        isAuthorisated, 
        login,
        resertPassword,
        getUserInfo
    } from '../services/methods.js';
    import { token_key } from '../services/config.js'

    export default {
        name: 'User',
        components: {
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
    .d-flex{
        display: flex;
    }
    .justify-content-between{
        justify-content: space-between;
    }
    .flex-column{
        flex-direction: column;
    }
</style>
  
  
  