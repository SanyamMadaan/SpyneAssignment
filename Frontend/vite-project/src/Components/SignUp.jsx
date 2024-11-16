import { useState } from 'react';
import loginpagecar from './loginpagecar.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp(){

    const [username,setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const navigate=useNavigate('/');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/createUser`,{
            username,
            email,
            password
        });

        if(response.status==200){
            alert('User created successfully');
        }
    }catch(e){
        alert('error while creating user');
        console.log(e);
    }
    }

    return (
        <div className="bg-gray-600 h-screen   flex justify-center items-center">
            <div className="lg:py-40 md:mt-4 md:flex md:border md:border-black rounded-md md:bg-black">
                <div className='image px-2 lg:px-5 '>
                  <img className="rounded-md p-2 " src={loginpagecar}/>
                </div>
                <div className='form md:w-1/2'>
                <h1 className="text-white font-medium text-3xl text-center mt-10 lg:mt-0 md:mt-2">Create an account</h1>
                    <div className="flex justify-center items-center  mt-5 mb-10 md:mb-5">
                      <p className='font-semibold md:text-white'>Already have an account?</p>
                      <a className='ml-1 text-white cursor-pointer'><u onClick={()=>{
                        navigate('/login');
                      }}>Log in</u></a>
                    </div>
                    <div className='flex justify-center items-center'>
                      <form onSubmit={handleSubmit} className='pb-5'>
                        <input type="text" className='my-2 lg:my-3 w-full p-2 rounded-md' placeholder="Username" onChange={(e)=>setUsername(e.target.value)} required /><br/>
                        <input type="email" className='my-2 p-2 lg:my-3 w-full rounded-md' placeholder="Email" onChange={(e)=>setEmail(e.target.value)}  required/><br/>
                        <input type="password" className='my-2 p-2 lg:my-3 w-full rounded-md' placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required/><br/>
                        <button className='bg-purple-600 px-14 w-full lg:my-3 py-2 rounded-md my-2 cursor-hover text-white' type="submit">Create account</button>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    )
}