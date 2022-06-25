import axios from 'axios';
import React, { useState ,useEffect} from 'react';

import { NavLink } from 'react-router-dom';


function SideBar() {
    let token = localStorage.getItem('token');

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    const [user, setUser] = useState();
    
    useEffect(() => {
        if (token != null) {
            let email = parseJwt(token).sub[1]
            axios.get(`/api/Account/GetUserByEmail/${email}`)
                .then((res) => {
                    setUser(res.data)
                })
        }
    }, [token])
 

  
    let userdet = parseJwt(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
   
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item nav-profile">
                    <a href="/" className="nav-link">
                        <div className="profile-image">
                            <img className="img-xs rounded-circle" src={require('../../assets/logo/logoiticket.png')} alt='/' />
                            <div className="dot-indicator bg-success"></div>
                        </div>
                        <div className="text-wrapper">
                            <p className="profile-name">{user?.fullName}</p>
                            <p className="designation">{userdet }</p>
                        </div>
                        <div className="icon-container">
                            <i className="icon-bubbles"></i>
                            <div className="dot-indicator bg-danger"></div>
                        </div>
                    </a>
                </li>
                <li className="nav-item nav-category">
                    <span className="nav-link">Dashboard</span>
                </li>
                <li className="nav-item">

                    <NavLink className="menu-title nav-link" to='/events'><span >Event</span></NavLink>

                    <i className="icon-screen-desktop menu-icon"></i>

                </li>
                <li className="nav-item">


                    <NavLink className="menu-title nav-link" to='/halls'><span >Hall</span></NavLink>
                    <i className="icon-screen-desktop menu-icon"></i>

                </li>

                <li className="nav-item">


                    <NavLink className="menu-title nav-link" to='/slider'><span >Slider</span></NavLink>
                    <i className="icon-screen-desktop menu-icon"></i>

                </li>
                <li className="nav-item">


                    <NavLink className="menu-title nav-link" to='/category'><span >Category</span></NavLink>
                    <i className="icon-screen-desktop menu-icon"></i>

                </li>
            </ul>
        </nav>

    )
}

export default SideBar