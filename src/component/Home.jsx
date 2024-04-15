import React from "react";
import Navbar from "./Landing Page/Navbar";
import HeroSection from "./Landing Page/HeroSection";
import FeatureSection from "./Landing Page/FeatureSection";
import Pricing from "./Landing Page/Pricing";
import Footer from "./Landing Page/Footer";

const Home = () =>{
    return(
        <div className="App">
            <div>
                <Navbar />            
            </div>
                <div>
                <HeroSection />
                <FeatureSection />
                <Pricing />
                <Footer />
            </div>
        </div>
    );
};

export default Home;