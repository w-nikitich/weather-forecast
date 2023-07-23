import React from "react";
import {Link, Route, Routes} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";

{/* <Routes><Route path="/loginPage" element={<LoginPage/>} /></Routes> */}

function Login() {
    return(
        <div className="header__login">
            <Link to='/loginPage' relative="path">Sign In</Link>
            <Link to='/registrationPage' relative="path">Sign Up</Link>
            {/* <a className="header__sign--in" href="#">Sign In</a>
            <a className="header__sign--up" href="#">Sign Up</a> */}
        </div>
    );
}

export default Login;