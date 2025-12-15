import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Backend_uri=import.meta.env.BACKEND_URL
function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${Backend_uri}/api/users`)
      const data = await res.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return

    try {
      await fetch(`${Backend_uri}/api/delete/${id}`, {
        method: "DELETE",
      })

      setUsers((prev) => prev.filter((user) => user._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/create" className='btn btn-primary mb-3'>Add+</Link>

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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className='btn btn-success me-2'>
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Users
