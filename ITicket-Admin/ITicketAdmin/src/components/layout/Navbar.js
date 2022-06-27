import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

function Navbar() {
    let token = localStorage.getItem('token');
    const [forrender, setForrender] = useState();
    function clearToken(e) {
        e.preventDefault()
        localStorage.removeItem('token')



        setForrender('');
        console.log(forrender);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Çıxış Etdiniz',
            showConfirmButton: false,
            timer: 1500
        })

        window.location.assign('http://localhost:3001/')
    };

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

    return (

        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="navbar-brand-wrapper d-flex align-items-center">
                <a className="navbar-brand brand-logo" href="index.html">
                    <img style={{ height: '60px' }} src={require('../../assets/logo/logoiticket.png')} alt="logo" className="logo-dark" />
                </a>

            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center flex-grow-1">
                <h5 className="mb-0 font-weight-medium d-none d-lg-flex">Welcome ITicket Admin Panel!</h5>
                <ul className="navbar-nav navbar-nav-right ml-auto">
                    <form className="search-form d-none d-md-block" action="#">
                        <i className="icon-magnifier"></i>
                        <input type="search" className="form-control" placeholder="Search Here" title="Search here" />
                    </form>
                    <li className="nav-item"><a href="/" className="nav-link"><i className="icon-basket-loaded"></i></a></li>
                    <li className="nav-item"><a href="/" className="nav-link"><i className="icon-chart"></i></a></li>

                    <li className="nav-item dropdown language-dropdown d-none d-sm-flex align-items-center">
                        <a href="/" className="nav-link"><button onClick={(e) => clearToken(e)} className="btn btn-outline-danger">Logout</button></a>
                    </li>
                    <li className="nav-item dropdown d-none d-xl-inline-flex user-dropdown">
                        <a className="nav-link " id="UserDropdown" href="/" data-toggle="dropdown" aria-expanded="false">
                            <span className="font-weight-normal">{user?.fullName} </span></a>

                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span className="icon-menu"></span>
                </button>
            </div>
        </nav>

    )
}

export default Navbar