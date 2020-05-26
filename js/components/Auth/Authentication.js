define(['Base/Component', 'css!AuComp/style'], function (Component) {
    'use strict';

    class Authentication extends Component {
        render() {
            return `
                <section>               
                <div id="container_registration">
                    <a class="hiddenanchor" id="toregister"></a>
                    <a class="hiddenanchor" id="tologin"></a>
                    <div id="wrapper" class="wrapper">
                        <div id="login" class="wrapper__login form">
                                <h1>Вход</h1> 
                                <p> 
                                    <label for="username" class="uname" data-icon="u"> Ваш e-mail или логин</label>
                                    <input id="username" name="username" required="required" type="text" placeholder="Vasya или vasya_pryanik@list.com">
                                </p>
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p"> Ваш пароль </label>
                                    <input id="password" name="password" required="required" type="password" placeholder="например 123456"> 
                                </p>
                                <p class="keeplogin"> 
                                    <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping">
                                    <label for="loginkeeping">Запомнить меня</label>
                                </p>
                                <p class="wrapper__login_button button"> 
                                    <input id="btnLogin" type="submit" value="Войти"> 
                                </p>
                                <p class="wrapper__login_change">
                                    Не зарегистрированы еще ?
                                    <a href="#toregister" class="to_register">Присоединяйтесь</a>
                                </p>
                        </div>
                        
                        <div id="register" class="wrapper__register form">
                                <h1> Регистрация </h1> 
                                <p> 
                                    <label for="usernamesignup" class="wrapper__register_uname" data-icon="u">Ваш логин</label>
                                    <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="Vasya">
                                </p>
                                <p> 
                                    <label for="fiosignup" class="wrapper__register_youmail" data-icon="e">Ваша Фамилия и Имя</label>
                                    <input id="fiosignup" name="fiosignup" required="required" type="text" placeholder="Иванов Иван"> 
                                </p>
                                <p> 
                                    <label for="passwordsignup" class="wrapper__register_youpasswd" data-icon="p">Ваш пароль </label>
                                    <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="123456">
                                </p>
                                <p> 
                                    <label for="passwordsignup_confirm" class="wrapper__register_youpasswd" data-icon="p">Подтвердите ваш пароль </label>
                                    <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="123456">
                                </p>
                                <p class="wrapper__register_button button"> 
                                    <input id="btnRegister" type="submit" value="Регистрация"> 
                                </p>
                                <p class="wrapper__register_change">  
                                    Уже зарегистрированы ?
                                    <a href="#tologin" class="to_register"> Войдите на сайт </a>
                                </p>
                            </form>
                        </div>                      
                    </div>
                </div>  
            </section>
            `;  
        }

        afterMount() {
            this.Authentication();

        }

        Authentication() {
            const url = 'http://tensor-school.herokuapp.com';
            let btnLogin = document.getElementById('btnLogin');
            let btnRegister = document.getElementById('btnRegister');

            // Клик по кнопке "Войти"
            btnLogin.onclick = function () {
                let login = document.getElementById('username').value;
                let password = document.getElementById('password').value;
                if ((login && password) != '') {
                    fetch(url + '/user/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            login: login,
                            password: password,
                        }),
                        credentials: 'include'
                    }).then(
                        response => {
                            if (response.status == 200)
                                document.location.href = 'index.html';
                            else
                                alert("Пользователя с таким логином и паролем не существует!");
                        });
                } else {
                    // Пользователь ввел не все поля
                    alert("Заполните все поля!");
                }
            }

            // Клик по кнопке "Регистрация"
            btnRegister.onclick = function () {
                let login = document.getElementById('usernamesignup').value;
                let name = document.getElementById('fiosignup').value;
                let password = document.getElementById('passwordsignup').value;
                let password_confirm = document.getElementById('passwordsignup_confirm').value;
                if ((password && password_confirm && password && login && name) != '') {
                    if (password.length < 5) {
                        // Пользователь ввел пароль меньше 5 символов
                        alert("Пароль должен быть не меньше 5 символов!");
                    } else if (password == password_confirm) {
                        // Регестрируем пользователя

                        // !!!!!!!! Поле mail никуда не записывается в меру функции создания пользователя в API

                        fetch(url + '/user/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: new URLSearchParams({
                                login: login,
                                password: password,
                            }),
                            credentials: 'include'
                        })
                        .then(response => {
                            if (response.status >= 400) {
                                alert("Oops! Пользователь с таким логином уже существует. :c");
                                return Promise.reject();
                            }
                            else {
                                return response.json();
                            };
                        })
                        .then((response) => {
                            response.data.name = name;
                            return fetch(url + '/user/update', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(response.data),
                                credentials: 'include',
                            })
                        })
                        .then(() => {
                            document.location = '/';
                        });
                    } else {
                        // Пользователь ввел несовпадающие пароли
                        alert("Пароли не совпадают!");
                    }
                } else {
                    // Пользователь ввел не все поля
                    alert("Заполните все поля!");
                }
            }
        }
    }


    return Authentication;
});
