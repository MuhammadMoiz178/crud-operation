import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function UpdateUser() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/getUser/${id}`)
        const data = await res.json()

        // assuming backend returns { name, email, age }
        setName(data.name)
        setEmail(data.email)
        setAge(data.age)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUser()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await fetch(`/api/updateUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age }),
      })

      navigate("/") // redirect after update
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>

          <div className='mb-2'>
            <label>Name</label>
            <input
              type="text"
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label>Email</label>
            <input
              type="email"
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label>Age</label>
            <input
              type="text"
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
