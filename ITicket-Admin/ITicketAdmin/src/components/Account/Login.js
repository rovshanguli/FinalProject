import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();



  async function login(e) {

    function parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    };

    e.preventDefault();
    await axios.post(`/api/Account/Login`, {
      Email: email,
      Password: password
    }, { 'Content-Type': 'multipart/form-data' })
      .then(function (response) {
        if (response.data.status === "success" || response.status === 200) {
          let userdet = parseJwt(response.data)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          if (userdet === "User") {
            Swal.fire({
              position: 'top-end',
              icon: 'Error',
              title: 'You are not authorized to access this page',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            localStorage.setItem("token", JSON.stringify(response.data));
            props.user(localStorage.getItem("token"))

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Ugurla giris etdiz',
              showConfirmButton: false,
              timer: 1500
            })
            navigate('/events')
          }



        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Email və ya şifrə yanlışdır',
            showConfirmButton: false,
            timer: 1500
          })
        }


      })
      .catch(function (error) {

      })
  }
  return (
    <div className="container">
      <div className="wrapper">
        <form className="p-3 mt-3" onSubmit={(e) => login(e)}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" name="userName" id="userName" onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password" name="password" id="pwd" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <button className="btn mt-3" type='submit'>Login</button>
        </form>

      </div>
    </div>
  )
}

export default Login