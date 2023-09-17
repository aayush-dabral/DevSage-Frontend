import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { IoReorderThree } from 'react-icons/io5'

// import axios from 'axios'

import { UserContext } from '../../App'

const Navbar = ({ colour, alignment, edit }) => {

  const navigate = useNavigate();

  const { state, dispatch, role } = useContext(UserContext)

  const [isScrolled, setIsScrolled] = useState(false);
  const [navActivate, setNavActivate] = useState(false);

  const options = {
    method: 'POST',
    withCredentials: true,
    url: `http://localhost:4000/auth/logout`,
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };


    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    const res = await axios.request(options);
    if (res.status !== 201) {
      return console.log("Error in logging out");
    }
    dispatch({ type: 'USER', payload: false })
    navigate('../login')
  }

  const handleClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // Add this line for smooth scrolling
    });
  }

  return (

    <div className={`flex flex-col fixed z-50 w-full duration-500 ${navActivate ? 'backdrop-blur-lg backdrop-brightness-100' : ''}`}>
      <div className={`flex h-12 w-full bg-[${colour}] text-white justify-between  ${isScrolled ? `${colour} bg-opacity-70 backdrop-filter backdrop-blur-lg duration-1000` : ``}`}>
        <div className='text-2xl my-auto ml-[8%]
        xl:ml-[5%]'>
          <h1>Dev Sage</h1>
        </div>
        <ul className='hidden 
        md:flex text-lg font-montserrat items-center justify-items-end '>
          <Link to="../" className='mr-3'>Home</Link>
          <li className='mr-3 mb-3 font-semibold'>.</li>
          {role === "ADMIN" ?
            (<Link to="../adminQuestions"><li className='mr-3'>Questions</li></Link>)
            :
            (<Link to="../questions"><li className='mr-3'>Questions</li></Link>)
          }

          <li className='mr-3 mb-3 font-semibold'>.</li>

          {!edit ? (
            <>
              <li onClick={handleClick} className='mr-3 cursor-pointer'>Contact</li>
              <li className='mr-3 mb-3 font-semibold'>.</li>
            </>)

            :
            (<></>)}

          {state ? (
            <>
              <li onClick={handleLogout} className={`${alignment} text-[#1AA2D9] font-semibold cursor-pointer`}>Logout</li>
            </>
          ) : (
            <>
              <Link to="../login"><li className='mr-3 text-[#1AA2D9] font-semibold'>Login</li></Link>
              <li className='mr-3 mb-3 font-semibold'>.</li>
              <Link to="../signup"><li className={`${alignment} text-[#1AA2D9] font-semibold`}>Signup</li></Link>
            </>
          )}
        </ul>

        <IoReorderThree size={32.5} onClick={() => { setNavActivate(!navActivate) }} className='mr-[5%] mt-1
      md:hidden'/>
      </div>


      <div>
        {navActivate && (

          <div className="ml-[8%] text-white pb-6 mt-2 md:hidden">
            <ul className="">
              <Link to="../" className='mr-3 mt-2'>Home</Link>

              {role === "ADMIN" ?
                (<Link to="../adminQuestions"><li className='mr-3 mb-2 mt-2'>Questions</li></Link>)
                :
                (<Link to="../questions"><li className='mr-3 mb-2 mt-2'>Questions</li></Link>)
              }

              {!edit ? (
                <>
                  <li onClick={handleClick} className='mr-3 mb-2 cursor-pointer'>Contact</li>
                </>)

                :
                (<></>)}

              {state ? (
                <>
                  <li onClick={handleLogout} className={`${alignment} text-[#1AA2D9] font-semibold cursor-pointer`}>Logout</li>
                </>
              ) : (
                <>
                  <Link to="../login"><li className='mr-3 text-[#1AA2D9] font-semibold mb-2'>Login</li></Link>
                  <Link to="../signup"><li className={`${alignment} text-[#1AA2D9] font-semibold`}>Signup</li></Link>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

    </div>
  )
}

export default Navbar