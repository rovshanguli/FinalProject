import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// import UpdateCategory from './UpdateCategory';


function CategoryTable() {
    let count = 0;



    const [categories, setCategories] = useState([]);
    let token = JSON.parse(localStorage.getItem('token'));

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        loadCategory();

    }, []);

    const loadCategory = async () => {

        const result = await axios.get("https://localhost:44351/api/Category/GetAllCategories")
        setCategories(result.data);

    }

    const deleteCategory = async (id) => {
    
        await axios.delete(`/api/Category/DeleteCategory/${id}`,
        config
        )
        .then(function (response) {

            Swal.fire(
                "",
                'Deleted',
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
        loadCategory();
    }

    const UpdateCategory = async id => {
        console.log(id);
    }






    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title d-flex justify-content-between">Categories
                        <Link to='/categorycreate' className="btn btn-success btn-fw">Create Category</Link>
                    </h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> Category Name </th>
                                <th> Settings </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((category =>

                                    <tr key={category.id}>
                                        <td>{++count}</td>
                                        <td className="py-1">
                                            {category.name}
                                        </td>
                                        <td><Link to={`/categoryupdate/${category.id}`}  ><button className='btn btn-outline-warning' onClick={() => UpdateCategory(category.id)} ><i className="far fa-edit"></i></button></Link> <button className='btn btn-outline-danger' onClick={() => deleteCategory(category.id )}> <i className="fas fa-trash-alt"></i></button> </td>

                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default CategoryTable