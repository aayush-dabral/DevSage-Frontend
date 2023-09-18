import React, { useContext, useEffect, useState } from 'react'
import { BsArrowDownCircle } from 'react-icons/bs'
import homeBackground from '../../images/homeBackground.jpg'
import { Link } from 'react-router-dom'

import { UserContext } from '../../App'
import Loader from '../Loader/Loader'
import Footer from './Footer'
import Navbar from './Navbar'

import {Cloudinary} from "@cloudinary/url-gen";

import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

const Home = () => {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'da2guof6i'
    }
  });

  const myImage = cld.image('DevSage/homeBackground_adwpvw'); 

  const { state } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState('')

  useEffect(() => {
    setLoading(true);
    setImage(myImage.toURL());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  

  return (

    <div id='hero' className='bg-[#01080E] w-full'>
      {loading && image!=='' ? <Loader bg={'bg-[#01080E]'} />
        :
        <>
          {/* <Loader /> */}
          <Navbar colour={'transparent'} alignment={'mr-20'} />
          <section className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${image})` }}>
            <div className="flex flex-col text-white items-center font-montserrat mt-16">
              <h1 className='text-4xl mb-3
              md:text-[3.25rem] font-medium '>Dev Sage</h1>
              <div className='w-[34%] h-[3px] bg-white mt-2 mb-4' />
              <p className='text-xl
              md:text-2xl font-light'>Your personal coding playground</p>
              <BsArrowDownCircle size={30} className='my-4' />
            </div>
          </section>
          <div className='bg-[#01080E] text-white text-center mx-auto pb-64 mt-44 font-light w-[80%]
          md:w-[60%]'>
            <div className='text-2xl'>
              <p>Welcome to our cutting-edge online programming platform, your ultimate destination for honing your coding prowess! We offer an extensive array of challenges and our IDE is compatible with 50+ programming languages.
                <br /><br />
                Whether you're a novice eager to embark on your coding journey or a seasoned developer aiming to refine your skills, our platform provides the perfect playground. Join us today and unlock a world of coding excellence!</p>
              <br />
              <p><Link to={!state ? `./login` : `./questions`}><span className='text-[#1AA2D9] cursor-pointer hover:underline decoration-1 underline-offset-4'>Login</span></Link>
                <span className='text-[#1AA2D9]'>/</span>
                <Link to={!state ? `./register` : `./questions`}><span className='text-[#1AA2D9] cursor-pointer hover:underline decoration-1 underline-offset-4'>Register</span></Link> {''}
                to start solving problems!</p>
            </div>
          </div>
          <Footer />
        </>
      }
    </div>
      
  )
}

export default Home