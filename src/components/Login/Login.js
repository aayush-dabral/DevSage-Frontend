import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import homeBackground from '../../images/homeBackground.jpg'
import axios from 'axios'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from '../../App'

const Login = ({image}) => {

    const [visible, setVisible] = useState(false);

    const { dispatch, dispatchRole} = useContext(UserContext)

    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        email: "",
        password: ""
    });

    const [formData, updateFormData] = useState(initialFormData);

    const onChange = (e) => {
        // console.log(e.target.value)
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    }

    const onClick = async (e) => {
        e.preventDefault()
        try {
            console.log(formData);
            const options = {
                method: 'POST',
                withCredentials: true,
                url: `${process.env.REACT_APP_BASE_URL}/auth/login`,
                data: {
                    email: formData.email,
                    password: formData.password
                },
            };
            
            const result = await axios.request(options)
            if(result.status===200){
                dispatch({type:'USER', payload:true})
                if(result.data === 'ADMIN'){
                    dispatchRole({type:'ROLE', payload:'ADMIN'})
                    navigate('/adminQuestions')
                    toast.success('🦄 Login Successfull!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
                else{
                    navigate('/questions')
                    toast.success('🦄 Login Successfull!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }

                console.log("Successful Login")
                
            }
            else{
                toast.error('🦄 Incorrect Credentials!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            
            // console.log(result);
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <section className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${image})` }}>
            <div className="flex flex-col text-white items-center font-montserrat  mb-26 backdrop-blur-lg backdrop-brightness-150 py-12
            w-[90%]
            md:w-[50%]
            lg:w-[40%]
            xl:w-[35%
            2xl:w-[28%]">

                <h1 className='font-semibold mb-20
                text-4xl
                md:text-5xl'>Login</h1>
                <form className='flex flex-col items-center w-[90%] 
                text-xl
                md:text-2xl'>
                    <div className='mb-16 w-[90%]'>
                        {/* Email section */}
                        <input type="text" name="email" onChange={onChange} placeholder='Username' className='w-full bg-transparent border-b-[0.7px] pb-3 pl-2 focus:outline-none focus:border-b-2 focus:border-[#1AA2D9]' required />
                    </div>
                    <div className='mb-14 w-[90%] relative'>
                        {/* Password Section  */}
                        <input type={`${visible ? "text" : "password" }`} name="password" onChange={onChange} placeholder='Password' className='w-full bg-transparent border-b-[0.7px] pb-3 pl-2 focus:outline-none focus:border-b-2 focus:border-[#1AA2D9]' required />
                        <AiFillEye size={30} onClick={() => {setVisible(!visible)}} className={`${visible ? 'hidden' : 'block' } absolute right-0 top-0 cursor-pointer`} />
                        <AiFillEyeInvisible size={30} onClick={() => {setVisible(!visible)}} className={`${!visible ? 'hidden' : 'block' } absolute right-0 top-0 cursor-pointer`} />
                    </div>
                    <button onClick={onClick} className='w-[90%] text-black bg-[#1AA2D9] rounded-3xl py-2 font-bold'>Log In</button>
                </form>
                <p className='mt-4 text-lg font-light'>Don't have an account ? <Link to='/Signup'><span className='text-[#1AA2D9] font-medium'>Register</span></Link></p>
            </div>

        </section>        
    )
}

export default Login
