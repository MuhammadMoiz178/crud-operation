import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function Users() {

    const [users,setUsers] = useState([{
        name:"Moiz",
        email:"moiz@gmail.com",
        age:20,
    }])

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json(); // convert to JSON
        setUsers(data); // update state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
 
           <Link to="/create" className='w-50 bg-white rounded p-3'>Add+</Link>
            <table className='table'>
             <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
             </thead>

             <tbody>
               {users.map((user)=>{
                return <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                        <Link to="/update" className='btn btn-success'>Update</Link>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                 </tr>
               })}
             </tbody>
            </table>

        </div>
    </div>
  )
}

export default Users