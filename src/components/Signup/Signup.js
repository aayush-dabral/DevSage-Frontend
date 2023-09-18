import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import homeBackground from '../../images/homeBackground.jpg'
import axios from 'axios'
import { toast } from 'react-toastify'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const Signup = () => {

    const [visible, setVisible] = useState(false);
    const [conVisible, setConVisible] = useState(false);

    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        email: "",
        password: "",
        conPassword: ""
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

        if(formData.password !== formData.conPassword){
            toast.error('Passwords in both fields must be same!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        
        try {
            console.log(formData);
            const options = {
                method: 'POST',
                url: `${process.env.REACT_APP_BASE_URL}/auth/signup`,
                data: {
                    email: formData.email,
                    password: formData.password
                },
            };
            
            const result = await axios.request(options)
            if(result.status===200){
                toast.success('Registration successfull!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/login")
            }
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${homeBackground})` }}>
            <div className="flex flex-col text-white items-center font-montserrat mb-26 backdrop-blur-lg backdrop-brightness-150 mt-8 py-10
            w-[90%]
            md:w-[50%]
            lg:w-[40%]
            xl:w-[35%
            2xl:w-[28%]">

                <h1 className='font-semibold mb-20
                text-4xl
                md:text-5xl'>Signup</h1>
                <form className='flex flex-col items-center w-[90%] 
                text-xl
                md:text-2xl'>
                    <div className='mb-16 w-[90%]'>
                        {/* Email section */}
                        <input type="text" name="email" placeholder='Username/Email' onChange={onChange} className='w-full bg-transparent border-b-[0.7px] pb-3 pl-2 focus:outline-none focus:border-b-2 focus:border-[#1AA2D9]' required />
                    </div>
                    <div className='mb-14 w-[90%] relative'>
                        {/* Password Section  */}
                        <input type={`${visible ? "text" : "password" }`} name="password" placeholder='Password' onChange={onChange} className='w-full bg-transparent border-b-[0.7px] pb-3 pl-2 focus:outline-none focus:border-b-2 focus:border-[#1AA2D9]' required />
                        <AiFillEye size={30} onClick={() => {setVisible(!visible)}} className={`${visible ? 'hidden' : 'block' } absolute right-0 top-0 cursor-pointer`} />
                        <AiFillEyeInvisible size={30} onClick={() => {setVisible(!visible)}} className={`${!visible ? 'hidden' : 'block' } absolute right-0 top-0 cursor-pointer`} />
                    </div>
                    <div className='mb-14 w-[90%] relative'>
                        {/* Password Section  */}
                        <input type={`${conVisible ? "text" : "password" }`} name="conPassword" placeholder='Confirm Password' onChange={onChange} className='w-full bg-transparent border-b-[0.7px] pb-3 pl-2 focus:outline-none focus:border-b-2 focus:border-[#1AA2D9]' required />
                        <AiFillEye size={30} onClick={() => {setConVisible(!conVisible)}} className={`${conVisible ? 'hidden' : 'block' } absolute right-0 top-0 cursor-pointer`} />
                        <AiFillEyeInvisible size={30} onClick={() => {setConVisible(!conVisible)}} className={`${!conVisible ? 'hidden' : 'block' } absolute right-0 top-0 cursor-pointer`} />
                    </div>
                    <button onClick={onClick} className='w-[90%] text-black bg-[#1AA2D9] rounded-3xl py-2 font-bold'>Sign Up</button>
                </form>
                <p className='mt-1 text-xl font-light'>Already have an account ? <Link to='/Signup'><span className='text-[#1AA2D9] font-medium'>Login</span></Link></p>
            </div>
        </section>
    )
}

export default Signup
