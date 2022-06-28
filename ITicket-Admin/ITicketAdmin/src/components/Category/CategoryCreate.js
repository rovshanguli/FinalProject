import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from "sweetalert2";

function CategoryCreate() {
    //Prop for api start
    const [categoryname, setCategoryname] = useState();
    let token = JSON.parse(localStorage.getItem('token'))

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const bodyParameters = {
        Name: categoryname
    };


    async function create(e) {
        e.preventDefault();
      
        await axios.post('/api/Category/CreateCategory',  
        bodyParameters,
        config
        )
            .then(function (response) {

                Swal.fire(
                    categoryname,
                    'Created',
                    'success'
                )
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })

            });



    };

   
    //Prop for api end
    return (
        <div className='container'>
            <Form onSubmit={(e) => create(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Category Name" onChange={(e) => setCategoryname(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-3' >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CategoryCreate