import React, { useEffect } from 'react'
import { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
function Users() {

    const [users,setUsers] = useState([{
        name:"Moiz",
        email:"moiz@gmail.com",
        age:20,
    }])

  const fetchedRef = useRef(false);

useEffect(() => {
  if (fetchedRef.current) return;
  fetchedRef.current = true;

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers((prev) => [...prev, ...data]);
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
                return <tr key={user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                        <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
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