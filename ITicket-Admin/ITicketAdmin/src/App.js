import './assets/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/layout/SideBar';
import Navbar from './components/layout/Navbar'
import EventTable from './components/Event/EventTable';
import CreateEvent from './components/Event/CreateEvent';
import HallTable from './components/Hall/HallTable';
import HallCreate from './components/Hall/HallCreate';
import SliderTable from './components/Slider/SliderTable';
import SliderCreate from './components/Slider/SliderCreate';
import CategoryTable from './components/Category/CategoryTable';
import CategoryCreate from './components/Category/CategoryCreate';
import UpdateCategory from './components/Category/UpdateCategory';
import HallUpdate from './components/Hall/HallUpdate';
import SliderUpdate from './components/Slider/SliderUpdate';
import Login from './components/Account/Login';
import Protection from './components/Protection';
import { useState } from 'react';




import UpdateEvent from './components/Event/UpdateEvent';
function App() {

  let [user, setUser] = useState("");
  let currentToken = localStorage.getItem('token');
  let currentUser;
  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
  let userdet;
  if (currentToken != null) {
    userdet = parseJwt(currentToken)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  if (userdet === "SuperAdmin" || userdet === "Admin") {
    currentUser = currentToken;
    console.log(user);
  }
  
  return (
    <Router >
      <div className="container-scroller">
        {(localStorage.getItem("token") === currentUser) ? <Navbar /> : ''}
        <div className='container-fluid page-body-wrapper'>
          {(localStorage.getItem("token") === currentUser) ? <SideBar /> : ''}
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <Routes>
                  <Route path='/' element={<Login user={setUser} />} />
                  <Route element={<Protection />}>
                    <Route path="/events" element={<EventTable />} />
                    <Route path="/eventcreate" element={<CreateEvent />} />
                    <Route path="/hallcreate" element={<HallCreate />} />
                    <Route path="/halls" element={<HallTable />} />
                    <Route path="/slider" element={<SliderTable />} />
                    <Route path="/slidercreate" element={<SliderCreate />} />
                    <Route path="/category" element={<CategoryTable />} />
                    <Route path="/categorycreate" element={<CategoryCreate />} />
                    <Route path="/categoryupdate/:id" element={<UpdateCategory />} />
                    <Route path="/hallupdate/:id" element={<HallUpdate />} />
                    <Route path="/sliderupdate/:id" element={<SliderUpdate />} />
                    <Route path="/eventupdate/:id" element={<UpdateEvent />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;