import React, { useState, useEffect, ReactDOM } from 'react';
import Button from 'react-bootstrap/Button';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginForm({sign}) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {


    //   })
    function isUsernameValid() {
        const loginInput = document.getElementsByClassName('login__input--up')[0];
        const loginText = document.getElementsByClassName('login__text')[0];

        if (username.length >= 2) {
            if (loginInput.classList.contains('unvalid')) {
                loginInput.classList.remove('unvalid');
                loginText.classList.remove('unvalid');
            }

            return true;
        }
        else {
            loginInput.classList.add('unvalid');
            loginText.classList.add('unvalid');

            return false;
        }
    }

    function isEmailValid() {
        const loginInput = document.getElementsByClassName('login__input--up')[1];
        const loginText = document.getElementsByClassName('login__text')[1];

        if (email.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            if (loginInput.classList.contains('unvalid')) {
                loginInput.classList.remove('unvalid');
                loginText.classList.remove('unvalid');
            }

            return true;
        }
        else {
            loginText.innerHTML = 'Unvalid email adress. Enter your email';
            loginInput.classList.add('unvalid');
            loginText.classList.add('unvalid');

            return false;
        }
    }

    function isPasswordValid() {
        const loginInput = document.getElementsByClassName('login__input--up')[2];
        const loginText = document.getElementsByClassName('login__text')[2];

        if (password.toLowerCase().match(/^[ a-zA-Z0-9-_]{6,16}$/)) {
            if (loginInput.classList.contains('unvalid')) {
                loginInput.classList.remove('unvalid');
                loginText.classList.remove('unvalid');
            }

            return true;
        }   
        else {
            loginInput.classList.add('unvalid');
            loginText.classList.add('unvalid');

            return false;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const form = document.getElementsByClassName('login__form--up')[0];
        const loginInput = document.getElementsByClassName('login__input--up');
        const loginText = document.getElementsByClassName('login__text');
        const buttonsClass = document.getElementsByClassName('login__buttons--in')[0];

        if (buttonsClass !== undefined) {
            navigate("/registrationPage");
        }
        else {
            const usernameValid = isUsernameValid();
            const emailValid = isEmailValid();
            const passwordValid = isPasswordValid();

            if ((usernameValid && emailValid && passwordValid) === true) {
                // add to db
                console.log('true', form)

                try {
                    const response = await axios.get(`http://localhost:3000/users/${email}`);
                    const isExist = response.data.status;
                    console.log(isExist)
                    if (isExist) {
                        console.log('isExist')
                        loginText[1].innerHTML = 'This email already exists. Please, sign in';
                        loginText[1].classList.add('unvalid');
                    }
                    else {
                        if (loginText[1].classList.contains('unvalid')) {
                            loginText[1].classList.remove('unvalid');
                        }

                        axios.post('http://localhost:3000/users', {
                                email, username, password
                        });

                        navigate("/");
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
    }

    return(
        <div className={`login__block--${sign}`}>
            <div className={`login__text--in`}>
                <p>Login or register</p>
            </div>
            <div className={`login__text--up`}>
                <p>Register</p>
            </div>

            <form className={`login__form--${sign}`} onSubmit={(event) => {handleSubmit(event)}} method="POST">
                <label className={`login__label--up`}>
                    Create your username (login)
                </label>
                <p className='login__text'>Login must contain minimum 2 characters</p>
                <input className={`login__input--up`} type='text' name='username' placeholder='Enter your username (login)'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        />

                <label className={`login__label--in`}>
                    Enter your login or email:
                </label>
                <label className={`login__label--up`}>
                    Enter your email:
                </label>
                
                <p className='login__text'></p>

                <input className={`login__input--in`} type='text' name='login' placeholder='Enter your login or email'/>
                <input className={`login__input--up`} type='text' name='email' placeholder='Enter your email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        />

                <label className={`login__label--in`}>
                    Enter your password:
                </label>
                <label className={`login__label--up`}>
                    Create your password:
                </label>

                <p className='login__text'>Password must be minimum 6 characters and maximum 16 characters. Only letters, numbers, hyphen, underscore allowed</p>

                <input className={`login__input--in`} type='text' name='password' placeholder='Enter your password'/>
                <input className={`login__input--up`} type='text' name='password' placeholder='Enter your password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}/>

                <div className={`login__buttons--${sign}`}>
                    <Button id='sign__in' type="submit">Sign In</Button>
                    <Button className='sign__up link' type="submit">
                            Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;