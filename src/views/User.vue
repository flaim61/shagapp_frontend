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
                    Здравствуйте, Имя!
                </p>
                <li>
                    Имя: Имя
                </li>
                <li>
                    Email: Почта
                </li>
                <div class='d-flex flex-column justify-content-between'>
                    <h5>Хотите поменять пароль?</h5>
                    <input type="password" placeholder="Введите старый пароль"><br>
                    <input type="password" placeholder="Введите новый пароль"><br>
                    <input type="password" placeholder="Введите подтверждение пароля"><br>
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
    import { register, isAuthorisated, login } from '../services/methods.js';
    import { token_key } from '../services/config.js'

    export default {
        name: 'User',
        components: {
        },
        data() {
            return {
                isLogin: false
            }
        },
        async created() {
            this.isLogin = await this.checkLogin();
            console.log(this.isLogin);
        },
        methods: {
            async checkLogin(){ 
                const request = await isAuthorisated();
                return request.data.status;
            },
            async register(){
                let name = document.getElementById('name').value;
                let email = document.getElementById('email').value;
                let pass = document.getElementById('pass').value;
                let pass_confirm = document.getElementById('pass_confirm').value;
                
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
                        alert('Произошла ошибка');
                    }
                }
            },
            logout(){
                localStorage.removeItem(token_key);
                this.isLogin = false;
            },
            async login(){
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
                    alert('Произошла ошибка');
                }
            }
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
  
  
  