import carImage2 from './carImage2.jpg'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
        const [email, setEmail]=useState("");
        const [password, setPassword]=useState("");
    
        const navigate=useNavigate();

        const handleSubmit = async (e) =>{
            e.preventDefault();
            try{
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,{
                email,
                password
            });
    
            if(response.status==200){
                alert('Login successfully');
            }
        }catch(e){
            alert('error while creating user');
            console.log(e);
        }
        }
    
        return (
            <div className="bg-gray-600 h-screen   flex justify-center items-center">
                <div className="pt-20 md:pt-10 md:h-4/5 md:flex md:border md:border-black rounded-md md:bg-black mt-20 flex  ">
                    <div className='form md:w-1/2'>
                    <h1 className="text-white font-medium text-2xl text-center mt-10 md:mt-2">Sign In</h1>
                        <div className="flex justify-center items-center  mt-5 mb-10 md:mb-5">
                          <p className='font-semibold md:text-white'>New User?</p>
                          <a className='ml-2 text-white cursor-pointer'><u onClick={()=>{
                            navigate('/');
                            }}>Create an account</u></a>
                        </div>
                        <div className='flex justify-center items-center'>
                          <form onSubmit={handleSubmit} className='pb-5'>
                            <input type="email" className='my-4 p-3 w-full rounded-md' placeholder="Email" onChange={(e)=>setEmail(e.target.value)}  required/><br/>
                            <input type="password" className='my-4 p-3 w-full rounded-md' placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required/><br/>
                            <button className='bg-purple-600 px-14 w-full py-3 rounded-md my-2 cursor-hover text-white' type="submit">Sign In</button>
                          </form>
                        </div>
                    </div>
                    <div className='image px-3  '>
                      <img className="rounded-md h-3/4" src={carImage2}/>
                    </div>
                </div>
            </div>
        )
    }
 