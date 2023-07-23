import React, { useState } from 'react';
import Container from "react-bootstrap/esm/Container";
import LoginForm from '../components/LoginForm';

function RegistrationPage() {
    // const [email, setEmail] = useState('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const checkValidity = (email, username, password) => {
    //     // email
    //     if (email.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    //         console.log('ok');
    //     }
    //     else {
    //         console.log('not okay');
    //     }

    //     if (username.length >= 2) {
    //         console.log('ok')
    //     }
    //     else {
    //         console.log('not okay');
    //     }

    //     if (password.toLowerCase().match(/[ a-zA-Z0-9-_]{6,16}$/)) {
    //         console.log('ok')
    //     }
    //     else {
    //         console.log('not okay');
    //     }
    // }

    return (
        <div className='registration'>
            <Container>
                <div className='registration__wrapper'>
                    <LoginForm sign={'up'}/>
                </div>
            </Container>
        </div>
    );
}

export default RegistrationPage;