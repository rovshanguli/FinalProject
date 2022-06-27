import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function HallCreate() {
  //Prop for api start
  const [hallname, setHallname] = useState();
  const [halladdress, setHalladdress] = useState();
  const [hallplace, setHallplace] = useState();
  let token = JSON.parse(localStorage.getItem('token'))

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const bodyParameters = {
    Name: hallname,
    Address: halladdress,
    Place: hallplace,
  };

  async function create(e) {
    e.preventDefault();


    axios.post(
      '/api/Hall/CreateHall',
      bodyParameters,
      config
    ).then((response) => {
      Swal.fire({
        title: 'Success',
        text: 'Create Hall Success',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    })



  }
  //Prop for api end
  return (
    <div className='container'>
      <Form onSubmit={(e) => create(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Hall Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Hall Name" onChange={(e) => setHallname(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Hall Address</Form.Label>
          <Form.Control type="text" placeholder="Enter Hall Address" onChange={(e) => setHalladdress(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Place</Form.Label>
          <Form.Control type="number" placeholder="Enter Hall Place" onChange={(e) => setHallplace(e.target.value)} />
        </Form.Group>





        <Button variant="primary" type="submit" className='mt-3' >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default HallCreate