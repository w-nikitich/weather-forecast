import React from "react";
import Container from 'react-bootstrap/Container';
import isLogined from '../scripts/login';
import Login from "./Login";
import Logout from "./Logout";

// name, username, userphoto, login and manu
// menu (nav bootstrap component) must include login/signup, tasks, notes, username (click -> to user profile, which has userphoto, username)

function Header() {
    let loginBlock;

    if (isLogined()) {
        // log out 
    }
    else {
        loginBlock = <Login/>
    }

    return(
        <header className="header">
            <Container> 
                {loginBlock}
            </Container>
        </header>
    );
}

export default Header;