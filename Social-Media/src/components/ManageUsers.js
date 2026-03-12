import React, { useEffect } from "react";
import UserHeader from "./UserHeader";
import axios from "axios";
import { FaCheck, FaTrash, FaTimes } from "react-icons/fa";

function ManageUsers(){
    const [data,setData]=React.useState([]);
    const [isAdmin, setIsAdmin]=React.useState(false);
    const username = localStorage.getItem("username");

    // Function to fetch users from API
    const getUsers = () => {
        const url = "https://localhost:7160/api/Registration/RegistrationList";
        axios.get(url)
        .then((results)=>{
            console.log(results.data);
            const dt = results.data;
            if(dt.statusCode === 200){
                setData(dt.listRegistrations);
            }
        }).catch((error)=>{
            console.log(error);
        });
    };

    const handleApprove = (e,id) => {
        e.preventDefault();
        console.log("Approve user:", id);
        const url = "https://localhost:7160/api/Registration/Approval";
        const data = {
            ID: id,
            Name: "",
            Email: "",
            Password: "",
            Type: "",
            PhoneNo: "",
            IsActive: 0,
            IsApproved: 1,
        };
        axios.post(url,data)
        .then((results)=>{
            console.log(results.data);
            const dt = results.data;
            alert(dt.statusMessage);
            // Reload the user list after approval
            getUsers();
        }).catch((error)=>{
            console.log(error);
        });
    };

    const handleDelete = (e,id) => {
        e.preventDefault();
        console.log("Delete user:", id);
        const url = "https://localhost:7160/api/Registration/DeleteUserRegistration";
        const data = {
            ID: id,
            Name: "",
            Email: "",
            Password: "",
            Type: "",
            PhoneNo: "",
            IsActive: 0,
            IsApproved: 1,
        };
        axios.post(url,data)
        .then((results)=>{
            console.log(results.data);
            const dt = results.data;
            alert(dt.statusMessage);
            // Reload the user list after deletion
            getUsers();
        }).catch((error)=>{
            console.log(error);
        });
    };

    useEffect(()=>{
        // Load users when component mounts
        getUsers();
    },[]);
    return(
        <div>
            <UserHeader />
            <h1>Manage Users</h1>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">PhoneNo</th>
      <th scope="col">IsActive</th>
      <th scope="col">IsApproved</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {data.map((data,index)=>{
        return(
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <th>{data.name}</th>
                <th>{data.email}</th>
                <th>{data.phoneNo}</th>
                <th>{data.isActive}</th>
                <th>{data.isApproved}</th>
                <th>
                    <button
                        className="btn btn-success btn-sm me-2"
                        onClick={(e) => handleApprove(e,data.id)}
                     
                        title="Approve"
                    >
                        <FaCheck />
                    </button>
                    <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={(e) => handleDelete(e,data.id)}
                        title="Delete"
                    >
                        <FaTrash />
                    </button>
                </th>
            </tr>
           
        )
    })}
   
  </tbody>
</table>
        </div>
    )
}
export default ManageUsers;