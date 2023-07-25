import React from "react";
import Header from "../components/Header";
import Weather from "../components/Weather";

function HomePage() {
    return(
        <div className="home">
            <Header/>
            <Weather sign={'empty'}/>
        </div>
    )
}

export default HomePage;