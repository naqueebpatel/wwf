import React from 'react';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Footer from '../components/Footer';
import Blog from './Blog';
import AboutTwo from './AboutTwo';

const Home = () => {
    return (
        <>
            {/* <AboutUs /> */}
            <AboutTwo/>
            <ContactUs />
            <Blog />
            <Footer />
        </>
    );
};

export default Home;