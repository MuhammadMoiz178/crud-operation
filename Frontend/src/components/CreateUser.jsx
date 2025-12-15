import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Backend_uri=import.meta.env.BACKEND_URL
function CreateUser() { 
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const navigate = useNavigate()
   const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(`${Backend_uri}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        age: age,
      }),
    });
    const data = await response.json();
    console.log(data);
    navigate('/')
   }
  return (
     <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
     <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={submitHandler}>
            <h2>Add User</h2>

            <div className='mb-2'>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter Name' className='form-control'
                onChange={(e)=>setName(e.target.value)}
                 />
            </div>

            <div className='mb-2'>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='Enter Email' className='form-control' 
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className='mb-2'>
                <label htmlFor="">Age</label>
                <input type="text" placeholder='Enter Age' className='form-control' 
                onChange={(e)=>setAge(e.target.value)}
                />
            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
     </div>
    </div>
  )
}

export default CreateUser