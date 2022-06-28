import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from "react-pagination-bar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Users() {
    const [users, setUser] = useState([]);
    const [tot, setTot] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [email, setEmail] = useState('');
    const [userid, setuserId] = useState();
    const [role, setRole] = useState();

    const pagePostsLimit = 5;
    let count = ((currentPage - 1) * pagePostsLimit);

    let token = JSON.parse(localStorage.getItem('token'))

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

  
    const loadUsers = async () => {
      
        await axios.get("https://localhost:44351/api/Account/GetAllUsers")
        .then(res => {
                setUser(res.data);
                setTot(res.data.length)
            })
    }


    function findUser(mail,id) {
        handleOpen();
        setEmail(mail);
        setuserId(id);
        getUserRole(mail);
    }

    async function changeRole(e) {
        e.preventDefault();

        await axios.get(`https://localhost:44351/api/Account/ChangeRole/${userid}`,
        
        config
        )
        .then(function (response) {
            handleClose()
            Swal.fire(
                "",
                'Updated',
                'success'
            )
        })
        .catch(function (error) {
            handleClose()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })

        });
    }

    async function getUserRole(mail) {
       
        await axios.get(`https://localhost:44351/api/Account/GetRoles/${mail}`)
            .then(res => {
                setRole(res.data);
            })
    }

    useEffect(() => {
        loadUsers();
    }, []);
    console.log(role);

    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> FullName </th>
                                <th> Username </th>
                                <th> Phone </th>
                                <th> Mail </th>
                                <th> Settings </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.slice((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit).map((user =>
                                    <tr key={user?.userName}>
                                        <td>{++count}</td>
                                        <td className="py-1">
                                            {user?.fullName}
                                        </td>
                                        <td className="py-1">
                                            {user?.userName}
                                        </td>
                                        <td> {user?.email} </td>
                                        <td> {user?.phoneNumber} </td>
                                        <td>
                                            <button className='btn btn-outline-warning' onClick={() => findUser(user?.email, user?.id)} >
                                                <i className="far fa-edit"></i></button>

                                            {/* <button className='btn btn-outline-danger' onClick={() => deleteEvent(user.id)}>
                                                <i className="fas fa-trash-alt"></i></button> */}
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                </div>
                <Pagination
                    startLabel={false}
                    endLabel={false}
                    onlyPageNumbers={true}
                    initialPage={currentPage}
                    itemsPerPage={pagePostsLimit}
                    totalItems={tot}
                    onPageСhange={(pageNumber) => setCurrentPage(pageNumber)}
                    pageNeighbours={1}
                    nextLabel={'>'}
                    prevLabel={'<'}
                />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {email}
                    
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h3>{role}</h3>
                        <button className='btn btn-outline-warning' onClick={(e) => changeRole(e)}>
                            Change Role</button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Users