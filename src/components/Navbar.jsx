// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { MdOutlineClose } from 'react-icons/md';
// import { FaBars } from 'react-icons/fa';

// const links = [
//     {
//         name: "Home",
//         path: '/'
//     },
//     {
//         name: "About Us",
//         path: '#about'
//     },
//     {
//         name: "Bill",
//         path: '/bill'
//     },
//     {
//         name: "Blog",
//         path: '#blog'
//     },
//     {
//         name: "Contact US",
//         path: '#contact'
//     }
// ];

// const Navbar = () => {
//     const [isNavShowing, setIsNavShowing] = useState(false);

//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
//             <div className="container-fluid">
//                 <button
//                     data-mdb-collapse-init
//                     className="navbar-toggler"
//                     type="button"
//                     data-mdb-target="#navbarRightAlignExample"
//                     aria-controls="navbarRightAlignExample"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                     onClick={() => setIsNavShowing(prev => !prev)}
//                 >
//                     {isNavShowing ? <MdOutlineClose /> : <FaBars />}
//                 </button>

//                 <div className={`collapse navbar-collapse ${isNavShowing ? 'show' : ''}`} id="navbarRightAlignExample">
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                         {links.map((link, index) => (
//                             <li key={index} className="nav-item">
//                                 <NavLink to={link.path} className="nav-link">{link.name}</NavLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React from 'react'
import Home from '../pages/Home'
import { NavLink } from 'react-router-dom'
const links = [
    {
        name: "Home",
        path: '/'
    },
    {
        name: "About Us",
        path: '#about'
    },
    {
        name: "Bill",
        path: '/bill'
    },
    {
        name: "Blog",
        path: '#blog'
    },
    {
        name: "Contact US",
        path: '#contact'
    }
];

const Navbar = () => {
    return (
        <>
            <header>
                <style>
                    {`
          /* Height for devices larger than 576px */
          @media (min-width: 992px) {
            #intro {
              margin-top: -58.59px;
            }
          }

          .navbar .nav-link {
            color: #fff !important;
          }
        `}
                </style>

                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-dark d-none d-lg-block" style={{ zIndex: 1 }}>
                    <div className="container-fluid">
                        {/* Navbar brand */}

                        <button className="navbar-toggler" type="button" data-mdb-collapse-init data-mdb-target="#navbarExample01"
                            aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarExample01">
                            <ul className="navbar-nav d-flex flex-row ms-auto">
                                {links.map((link, index) => (
                                    <li key={index} className="nav-item">
                                        <a href={link.path} className="nav-link">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* Navbar */}

                {/* Background image */}
                <div id="intro" className="bg-image vh-100 shadow-1-strong">
                    <video style={{ minWidth: '100%', minHeight: '100%' }} playsInline autoPlay muted loop>
                        <source className="h-100" src="https://mdbootstrap.com/img/video/Lines.mp4" type="video/mp4" />
                    </video>
                    <div className="mask" style={{
                        background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)'
                    }}>
                        <div className="container d-flex align-items-center justify-content-center text-center h-100">
                            <div className="text-white" data-mdb-theme="dark">
                                <h1 className="mb-3">WATER WORK FLOWS</h1>
                                <h5 className="mb-4"> Represents a paradigm shift in addressing the intricate challenges associated with Water supply management
                                    This project seeks to redefine how water resources are distributed and managed within village communities.</h5>
                                <NavLink to="/subscriberView">
                                    <button className="btn btn-outline-light btn-lg m-2" data-mdb-ripple-init>Watch Subscribers</button>
                                </NavLink>
                                <NavLink to="/productSource">
                                    <button className="btn btn-outline-light btn-lg m-2" data-mdb-ripple-init>View Products</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background image */}
            </header>
            <Home />
        </>


    )
}

export default Navbar