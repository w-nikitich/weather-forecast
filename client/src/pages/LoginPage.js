import React from 'react';
import LoginForm from '../components/LoginForm';
import Container from "react-bootstrap/esm/Container";

function LoginPage() {
    console.log('hi');
    return(
        <div className='login'>
            <Container>
                <div className='login__wrapper'>
                    <LoginForm sign={'in'}/>
                </div>  
            </Container>
        </div>
    )
}

export default LoginPage;